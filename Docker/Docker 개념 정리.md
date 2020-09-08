# Docker 

컨테이너 기반의 오픈소스 가상화 플랫폼으로, 애플리케이션을 신속하게 구축, 테스트 및 배표할 수 있는 소프트웨어 플렛폼.

소프트웨어를 컨테이너라는 표준화된 유닛으로 패키지하며, 이 컨테이너에는 라이브러리, 시스템 도구, 코드, 런타임 등 소프트웨어를 실행하는데 필요한 모든 것이 포함됨.



### 컨테이너

- 정의 : 개별 software의 실행에 필요한 실행환경을 독립적으로 운용할 수 있도록 기반환경 또는 다른 실행환경과의 간섭을 막고 실행의 독립성을 확보해주는 운영체계 수준의 격리 기술



### Docker 작동 방식

- Container 가상화 방식 :  **서버 운영 체제 가상화** →  Docker는 각 서버에 설치되며 컨테이터를 구축, 시작 또는 중단하는데 사용할 수 있는 간단한 명령을 제공.
- VM 가상화 방식 : **서버 하드웨어 가상화**

![container vs VM](https://cloud.google.com/images/containers-landing/containers-101.png?authuser=0&hl=ko)



### Docker 이미지

- 정의 : 컨테이너를 정의하는 읽기 전용 템플릿
- 코드에 필요한 라이브러리 및 종속성에 대한 정의를 비롯해 실행되는 코드가 포함됨
- 즉, **Docker 컨테이너 = Docker 이미지의 인스턴스화**



### DockerFile

- 이미지를 생성하기 위한 스크립트로, Dockerfile을 빌드하면 이미지를 얻게됨

- 핵심 명령어는 copy, run

  - copy : 파일을 복사
  - run : 실행

- DockerFile을 만드는 방법은 실제 쉘 스크립트의 내용을 이용하면 됨

- DockerFile 명령어

  ```dockerfile
  # 1. ubuntu 설치 (패키지업데이트 + 만든사람 표시)
  FROM ubuntu:16.04
  MAINTAINER 만든사람(or 만든사람 이메일)
  RUN apt-get -y update
  
  
  # 2. A설치
  RUN apt-get -y install A
  
  # 3. 소스 복사
  COPY ./user/src/app
  
  # 4. 패키지 설치 (실행 directory 설정)
  WORKDIR /usr/src/app
  RUN bundle install
  
  # 5. 실행
  CMD ~
  ```

  1. FROM : **베이스 이미지를 저장**. 반드시 지정해야 하며, **어느 ("a") 이미지도 베이스 이미지가 될 수 있음**. tag는 될 수 있으면 기본값보단 구체적인 버전 (16.04)을 지정하는 것이 좋음.이미 만들어진 다양한 베이스 이미지는 [Docker hub](https://hub.docker.com/explore/)에서 확인가능

  2. COPY : 파일이나 directory를 이미지로 복사. 일반적으로 소스를 복사하는데 사용. Target directory가 없다면 자동으로 생성

  3. ADD : COPY 명령어와 매우 유사하나 몇가지 추가기능 있음.
     - 추가기능 1 : `src`에 파일대신 URL 입력가능
     - 추가기능 2 : `src`에 압축 파일을 입력하는 경우 자동으로 압축을 해제하면서 복사됨 

  4. RUN : 명령어를 그대로 실행

  5. CMD : 도커 컨테이너가 실행되었을 때 실행되는 명령어 정의. 빌드할 때는 실행되지 않으며 여러 개의 `CMD`가 존재할 경우 마지막 `CMD`만 실행됨. 한꺼번에 여러개의 프로그램을 실행하고 싶다면 `run.sh` 파일을 작성하여 데몬으로 실행하거나 [supervisord](http://supervisord.org/), [forego](https://github.com/ddollar/forego)와 같은 여러 개의 프로그램을 실행하는 프로그램 사용.
  6. WORKDIR : RUN, CMD, ADD, COPY 등이 이루어질 기본 디렉터리 설정. `RUN cd /path`를 하더라도 다음 명령어에선 위치가 초기화되기에 같은 directory에서 계속 작업하기 위해선 `WORKDIR`을 사용해야함
  7. EXPOSE : 도커 컨테이너가 실행되었을 때 요청을 기다리고 있는 (Liesten) 포트를 지정. 여러개의 포트 지정가능.
  8. VOLUME : 컨테이너 외부에 파일 시스템을 마운트 할 때 사용. 반드시 지정하지 않아도 마운트할 수 있지만, 기본적으로 지정해두는 것이 좋음
  9. ENV : 컨테이너에서 사용할 환경변수 지정. 컨테이너를 실행할 때 `-e` 옵션을 사용하면 기존 값을 오버라이딩함.

- DockerFile 예시

  ```dockerfile
  From ubuntu:16.04
  RUN apt-get update
  RUN apt-get install -y software-properties-common
  RUN add-apt-repository -y ppa:fkrull/deadsnakes
  # RUN apt-get update
  RUN apt-get install -y --no-install-recommends python3.6 python3.6-dev python3-pip python3-setuptools python3-wheel gcc
  
  RUN python3.6 -m pip install pip --upgrade
  
  ADD . /python-docker
  
  WORKDIR /python-docker
  
  RUN apt-get install -y language-pack-ko
  RUN locale-gen ko_KR.UTF-8
  ENV LANG ko_KR.UTF-8
  ENV LANGUAGE ko_KR.UTF-8
  ENV LC_ALL ko_KR.UTF-8
  
  RUN pip3 install -r requirements.txt
  #ENTRYPO:INT ["python"]
  CMD python3.6 app.py
  
  ```

  

### 도커 설치 및 컨테이너 실행

- 리눅스에서 도커 설치 (feat. 자동 설치 스크립트 이용)

  ```kernel
  curl -fsSL https://get.docker.com/ | sudo sh 
  ```

- sudo 없이 사용하기

  docker는 기본적으로 root 권한이 필요. root가 아닌 사용자가 sudo 없이 사용하려면 해당 사용자를 `docker` 그룹에 추가하기

  ```kernel
  sudo usermod -aG docker $USER # 현재 접속중인 사용자에게 권한주기
  sudo usermod -aG docker your-user # your-user 사용자에게 권한주기
  ```

- 컨테이너 실행하기

  ```kernel
  docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
  ```

  | Option | Description                                       |
  | ------ | ------------------------------------------------- |
  | -i     | Container가 STDIN을 유지하도록 설정               |
  | -t     | Container에 터미널을 할당                         |
  | -d     | Container를 Deamon형태로 실행 (백그라운드로 실행) |
  | -p     | Host와 Container의 Port를 연결 (포워딩)           |
  | -v     | Host와 Container의 directory를 연결 (마운트)      |
  | -rm    | 프로세스 종료 시 Container 자동 삭제              |
  | -name  | Container 이름을 설정                             |
  | -e     | 컨테이너 내에서 사용할 환경변수 설정              |
  | -it    | -i와 -t를 동시에 사용, 터미널 입력을 위한 옵션    |



### Docker 기본 명령어

- 컨테이너 목록 확인 → ps

  ```
  docker ps [options]
  ```

- 컨테이너 중지 → stop

  ```
  docker stop [options] container [container...]
  ```

- 컨테이너 제거 → rm
  : 종료된 컨테이너를 완전히 제거하는 명령어

  ```
  docker rm [options] container [container...]
  ```

- 이미지 목록 확인하기 → images

  ```
  docker images [options] [repository[:tag]]
  ```

- 이미지 다운로드하기 → pull

  ```
  docker pull [options] name[:tag|@digest]
  ```

- 이미지 삭제하기 → rmi

  ```
  docker rmi [options] image [image...]
  ```

- 컨테이너 로그보기 → logs
  : 컨테이너가 정상적으로 동작하는지 

  ```
  docker logs [options] container
  ```

- 컨테이너 명령어 실행하기 → exec
  : 실행중인 컨테이너에 들어가거나 컨테이너의 파일을 실행. run 명령어는 새로 컨테이너를 만들어서 실행하고, exec는 실행중인 컨테이너에 실행

  ```
  docker exec [options] container command [arg...]
  ```



### Docker 컨테이너 커밋(Commit) 하기

- 현재까지 작업해 놓은 컨테이너를 그대로 저장하고 싶은 경우, 실행중인 컨테이너를 커밋.

- docker commit CONTAINER IMAGE_NAME 명령어 이용

  ```
  docker commit a_container a_image
  ```

  

### Docker 이미지 push하기

- Docker cloud에 로그인

  ```
  docker login
  ```

- docker user id 변수 지정해놓기

  ```
  export DOCKER_ID_USER = "USER_ID"
  ```

- Docker Image에 태그 달기

  ```
  docker tag a_image $DOCKER_ID_USER/a_image
  ```

- tag가 적용되어 있는 image를 docker cloud에 push

  ```
  docker push $DOCKER_ID_USER/a_image
  ```



### Docker 빌드하기

- ```
  docker build [OPTIONS] PATH | URL | -
  
  # 예시
  docker build -t app .
  ```



### 컨테이너 업데이트

도커에서 컨테이너를 업데이트 하는 방법

![컨테이너 업데이트](https://subicura.com/assets/article_images/2017-01-19-docker-guide-for-beginners-2/container-update.png)

1. 새 버전의 이미지를 다운(pull)받음
2. 기존 컨테이너를 삭제 
3. 새 이미지를 기반으로 새 컨테이너를 실행

단, 컨테이너 삭제시 유지해야하는 데이터는 컨테이너 내부가 아닌 외부 스토리지에 저장해야 함.

→ 클라우스 서비스 및 데이터 볼륨(Data Volume)을 이용하여 저장하도록 하자.



### Docker Compose

도커는 복잡한 설정을 쉽게 관리하기 위해 YAML 방식이 설정파일을 이용한 **Docker Compose**라는 툴을 제공

Docker Compose는 컨테이너 여럿을 띄우는 docker application을 정의하고 실행하는 도구 (Tool for defining and running **multi-container Docker applications**)

- Docker Compose의 장점
  1. 컨테이너 실행에 필요한 옵션을 `docker-compose.yml`파일에 적어두어 관리 가능
  2. 컨테이너 간 의존성 관리 가능
- 도커와 도커 컴포즈비교
  - dockerFile VS dockerfile-dev : 서버 구성을 문서화 한것
  - docker build VS docker-compose build : 도커 이미지 반들기
  - docker run의 옵션들 VS docker-Compose.yml : 이미지에 붙이는 장식들
  - docker run VS docker compose up : 장식 붙은 이미지를 실제로 실행



### 이미지 저장소

도커는 빌드한 이미지를 서버에 배포하기 위해 직접 파일을 복사하는 방법 대신 **도커 레지스트리**라는 **이미지 저장소**를 사용.

도커 명령어를 이용하여 이미지를 registry에 푸시(push)하고 다른 서버에서 풀(pull) 받아 사용한느 구조.

### 참조 자료

- https://aws.amazon.com/ko/docker/
- [[Docker] 개념 정리 및 사용방법까지.](https://cultivo-hy.github.io/docker/image/usage/2019/03/14/Docker정리/#도커-기본-명령어)
- [docker run 옵션](https://ossian.tistory.com/46)
- [docker 컨테이너 커밋 및 이미지 푸쉬](https://nicewoong.github.io/development/2018/03/06/docker-commit-container/)
- [docker compose 관련 문서](http://raccoonyy.github.io/docker-usages-for-dev-environment-setup/)

