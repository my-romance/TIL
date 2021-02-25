# Git Actions를 이용한 docker image BUILD 및 GCR 내 PUSH

[TOC]

## CI&CD.yml 작성

`<해당 git 레포지토리>/.github/workflows` 에 yml파일을 만든다.

yml 파일을 작성할 때  GCR에 권한을 가지기 위해 `echo $GCR_KEY_JSON | docker login -u _json_key --password-stdin asia.gcr.io`와 같은 코드를 넣어주어야 한다. 이때, `GCR_KEY_JSON` 은  **secrets** 의 value에 해당된다.

전체 코드는 아래와 같다

```yaml
name: Docker Image CI
on:
  push:
    branches: [ master]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Get current version
      id: version
      run: echo "::set-output name=version::$(sed -r -n '/version = \"([^\"]+)\"/{s//\1/; p}' ./pyproject.toml)"
    - name: build & push docker image
      run: |
        echo $GCR_KEY_JSON | docker login -u _json_key --password-stdin asia.gcr.io
        docker build --build-arg BUILDKIT_INLINE_CACHE=1 \
          --cache-from $IMAGE_NAME:latest \
          -t $IMAGE_NAME:latest \
          -t $IMAGE_NAME:${{ github.sha }} \
          -t $IMAGE_NAME:${{ steps.version.outputs.version }} .
        docker run $IMAGE_NAME:latest python -m pytest -v
        docker push $IMAGE_NAME:latest
        docker push $IMAGE_NAME:${{ github.sha }}
        docker push $IMAGE_NAME:${{ steps.version.outputs.version }}
      env:
        IMAGE_NAME: asia.gcr.io/<해당 GCS 프로젝트 이름>/${{ github.event.repository.name }}
        GCR_KEY_JSON: ${{ secrets.GSK }}
        DOCKER_BUILDKIT: 1
```



## JSON 키 파일을 이용한 Google Cloud 리소스 권한 부여

### 1. 서비스 계정 만들기

### 2. 서비스 계정에 권한 부여

### 3. 키 파일 생성

```sh
gcloud iam service-accounts keys create ~/keyfile.json --iam-account [NAME]@[PROJECT_ID].iam.gserviceaccount.com
```

이때 `~/keyfile.json` 은 현재 폴더 내에 keyfile.json을 생성하겠다는 의미

- 참조

  - 생성된 키 list 조회

    ```sh
    gcloud iam service-accounts keys list --iam-account [NAME]@[PROJECT_ID].iam.gserviceaccount.com
    ```

  - 생성된 키 삭제

    ```sh
    gcloud iam service-accounts keys delete <해당키id>  --iam-account [NAME]@[PROJECT_ID].iam.gserviceaccount.com
    ```

### 4. GitHub secrets에 키 파일 등록

GitHub - settings - secrets에 `new repository secret` 을 통해 repository secrets를 등록

이때 name은 자신이 원하는 변수(예시:GSK)를 넣고 value에는 생성된 키파일 내용을 넣는다





## 참고자료

- https://cloud.google.com/container-registry/docs/advanced-authentication#json-key