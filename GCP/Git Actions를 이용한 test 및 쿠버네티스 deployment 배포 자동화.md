# Git Actions를 이용한 test 및 쿠버네티스 deployment 배포 자동화

[TOC]

## test 코드 작성

### pytest 

- pytest : python testing 툴
- `pip install pytest` 명령어를 통해 pytest 설치
- `python -m pytest -v` 명령어를 통해, 해당 repository에 속하는 `test` 글자가 포함되는 python 파일은 test 진행됨

### unittest

- unittest : python 단위 테스트 프레임워크
- 관련 참조 문서
  - [python doc - unittest](https://docs.python.org/ko/3/library/unittest.html)
  - [unittest 위키독스 ](https://wikidocs.net/16107)
  - [[파이썬] 단위 테스트의 기본 (unittest)](https://www.daleseo.com/python-unittest-testcase/)



## CI&CD.yml 작성

우선 쿠버네티스 deployment 배포할 수 있도록 서비스 계정 생성 및 권한 부여를 한다.

그 후, `<해당 git 레포지토리>/.github/workflows` 에 yml 파일을 만든다.

yml 파일을 만들때 권한이 부여된 서비스 계정을 사용할 수 있도록, `gcloud container clusters get-credentials <클러스터이름> --zone <지역명>` 와 같은 코드를 넣어주어야 한다.

아래는 yml파일에는 docker image build 및 push 소스도 포함되어 있다.

```yaml
name: Docker Image CI&CD
on:
  push:
    branches: [master]
env:
  GKE_DEPLOY_KEY: ${{ secrets.GKE_DEPLOY_KEY }}
  GCR_KEY_JSON: ${{ secrets.GSK }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Get current version
      id: version
      run: echo "::set-output name=version::$(sed -r -n '/version = \"([^\"]+)\"/{s//\1/; p}' ./pyproject.toml)"

    - name: Setup gcloud environment
      uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
      with:
        service_account_key: ${{ env.GKE_DEPLOY_KEY }}
        project_id: <프로젝트이름>
    - run: gcloud container clusters get-credentials <클러스터명> --zone <지역명>

    - name: Use gcloud CLI
      run: gcloud info

    - name: build & test & push docker image
      run: |
        pwd
        echo $GCR_KEY_JSON | docker login -u _json_key --password-stdin asia.gcr.io
        docker build --build-arg BUILDKIT_INLINE_CACHE=1 \
          --cache-from $IMAGE_NAME:latest \
          -t $IMAGE_NAME:latest \
          -t $IMAGE_NAME:service \
          -t $IMAGE_NAME:${{ github.sha }} \
          -t $IMAGE_NAME:${{ steps.version.outputs.version }} .
        gsutil -m cp -r <다운받을 모델 위치 주소.(예시:gs://mode.dict/nlp/ml_model/)> .
        docker run -v <연결할 host dir (예시:/home/runner/worker/nlp)>:<연결할 container dir (예시:/app/)> $IMAGE_NAME:latest python -m pytest -v
        docker push $IMAGE_NAME:latest
        docker push $IMAGE_NAME:service
        docker push $IMAGE_NAME:${{ github.sha }}
        docker push $IMAGE_NAME:${{ steps.version.outputs.version }}
      env:
        GCR_KEY_JSON: ${{ secrets.GSK }}
        DOCKER_BUILDKIT: 1
        IMAGE_NAME: asia.gcr.io/<해당 GCS 프로젝트 이름>/${{ github.event.repository.name }}

    - name: deploy
      if: github.ref == 'refs/heads/master'
      run: kubectl rollout restart deployment <deployment명> --namespace <네임스페이스명>

```

### Get current version

- version 정보를 가져옴

### Setup gcloud environment

- `gcloud container clusters get-credentials <클러스터명> --zone <지역명>` 을 통해 `cluster` 접근 권한이 가능하도록 설정

### Use gcloud CLI

- gcloud의 정보 확인가능
  - 현재 Account와 Project 등 확인가능

### build & test & push docker image

- `gsutil -m cp -r <다운받을 모델 위치 주소.(예시:gs://mode.dict/nlp/ml_model/)> .` 명령어를 통해 모델의 파라미터 등을 포함하는 폴더를 다운받음
- `docker run -v <연결할 host dir (예시:/home/runner/worker/nlp)>:<연결할 container dir (예시:/app/)>` 명령어를 통해 다운받을 폴더를 container에서 사용할 수 있도록 볼륨 마운트
- `python -m pytest -v` 명령어를 통해 모델 테스트를 하도록 한다. 이때 테스트가 성공하지 못한다면 `docker push` 를 하지 않게됨 (`python -m pytest -v` 명령어보다 뒤에 있으므로)
- `docker push $IMAGE_NAME:latest` 명령어를 통해 모델 테스트가 성공하면, docker 이미지 push

### deploy

- `kubectl rollout restart deployment <deployment명> --namespace <네임스페이스명>` 명령어를 통해, 생성 및 푸쉬된 도커 이미지를 배포할 수 있도록 함



## 참고자료

- [setup-gcloud github actions](https://github.com/google-github-actions/setup-gcloud)
- [서비스 계정에 역활 부여](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts?hl=ko)

- [Cloud Storage에 대한 IAM 권한](https://cloud.google.com/storage/docs/access-control/iam-permissions?hl=ko)

- [python doc - unittest](https://docs.python.org/ko/3/library/unittest.html)
- [unittest 위키독스 ](https://wikidocs.net/16107)
- [[파이썬] 단위 테스트의 기본 (unittest)](https://www.daleseo.com/python-unittest-testcase/)

