# gsutil 명령어 정리

### gsutil을 위한 사전 준비

- gcloud 설치

- gsutil 설치

  ```shell
  gcloud components install gsutil
  ```



### gsutil 명령어 모음

```shell
gsutil list                           # 나의 버킷 리스트 보기
gsutil ls -r gs://버킷이름             # 버킷 안에 들어있는 파일 확인
gsutil du -s gs://버킷이름             # 버킷 용량 확인
gsutil mb gs://버킷이름                # 버킷 생성
gsutil rb gs://버킷이름                # 버킷 삭제
gsutil cp 로컬 파일 위치 gs://버킷이름   # 로컬 -> 버킷 복사
gsutil cp gs://버킷이름 로컬 파일 위치   # 버킷 -> 로컬 복사
gsutil mv 로컬 파일 위치 gs://버킷이름   # 로컬 -> 버킷 이동
gsutil mv gs://버킷이름 로컬 파일 위치   # 버킷 -> 로컬 이동
gsutil rm gs://버킷이름/파일이름        # 파일 삭제
gsutil ls -L gs://버킷이름/파일이름     # 파일 정보 보기
```



### 참조문서

- https://jungwoon.github.io/bigquery/2017/10/28/gcs-gsutil/