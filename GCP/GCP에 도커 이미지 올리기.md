1. Google Container Registry API 연동

2. Google Cloud SDK 설치

3. 도커 이미지 업로드

   우선, 다음 명령어로 Docker가 Container Registry를 인증하도록 구성

   ```shell
   gcloud auth configure-docker
   ```

   gcp에 도커 이미지를 올리기 전, 이미지 이름 및 태그 설정

   ```shell
   docker tag [로컬 이미지명]:[태그명] [Google Container Registry 호스트명]/[프로젝트 ID]/[이미지명]:[태그명]
   # 예시 : docker tag centos:7 asia.gcr.io/[프로젝트 ID]/centos:7
   ```

   이후 도커이미지 올리기

   ```shell
   docker push [Google Container Registry 호스트명]/[프로젝트 ID]/[이미지명]:[태그명]
   # 예시 : docker push centos:7 asia.gcr.io/[프로젝트 ID]/centos:7
   ```

   

4. 도커 이미지 다운로드

   ```shell
   docker pull [Google Container Registry 호스트명]/[프로젝트 ID]/[이미지명]:[태그명]
   # 예시 :  docker pull asia.gcr.io/[프로젝트 ID]/centos:7
   ```

   



### 참조 문서

- https://cloud.google.com/container-registry/docs/advanced-authentication#linux
- https://nirsa.tistory.com/75