# 호스트 폴더에 Docker 컨테이너로 만들어진 파일 생성

Docker Volume을 통해 Docker 컨테이너 실행으로 만들어진 파일을  호스트 폴더에 생성할 수 있다.



### Dockerfile 생성

```dockerfile
# syntax=docker/dockerfile:experimental

FROM python:3.7.9

RUN pip install Wikipedia-API

WORKDIR /app # root에 만들어짐

EXPOSE 80
CMD ["python", "crawl_wiki.py"]
```

우선 docker 이미지를 만들기 위해 Dockerfile을 위와 같이 만듦

이때 wiki 문서를 크롤링하기 위해 필요한 패키지인 Wikipedia-API를 설치함



### docker 이미지 생성

```shell
docker image build -t crawling_wiki:latest .
```

docker의 이미지와 태그를 `crawling_wiki:latest` 로 하여 docker 이미지 생성



### docker 컨테이너 생성

```shell
docker run -it --name crawling_wiki -v <연결할 host dir>:<연결할 container dir> -p 6010:80 crawling_wiki/latest
```

`-v` 파라미터를 통해 볼륨을 마운트 한다.

- 예시 : `-v ~/workspace/crawling/wikiData/:/app/` 

이때 경로가 정확한지 확인해주어야 함. 



### 참조 문서

- http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter06/04

