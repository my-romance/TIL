# HTTP 기본

[TOC]

## HTTP란?

### HTTP(HyperText Transfer Protocol) 의미

- HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 프로토콜
- 웹에서 이루어지는 모든 데이터 교환의 기초이며, 클라이언트-서버 프로토콜이기도 함
- 지금은 HTML, TEXT 뿐만 아니라 거의 모든 것을 HTTP로 전송 가능
  - HTTP로 전송가능한 리소스들
    - HTML, TEXT
    - IMAGE, 음성, 영상, 파일
    - JSON, XML(API)
    - 거의 모든 형태의 데이터 전송 가능



### HTTP의 종류

- 역사에 따른 http 종류
  - HTTP/0.9 (1991) : GET 메서드만 지원, HTTP 헤더 X
  - HTTP/1.0 (1996) : 메서드, 헤더 추가
  - **HTTP/1.1 (1997) : 가장 많이 사용되고 개발자들에게 가장 중요한 버전**
    - 최근에 나온 2,3보다 많이 쓰이는 이유는 1.1 스펙에 개발자에게 필요하고 중요한 대부분의 기능이 다 들어 있기 때문. 2,3 버전은 거의 성능 개선에 초점이 맞춰져 있음
  - HTTP/2 (2015) : 성능 개선
  - HTTP/3 (진행중) : TCP 대신 UDP 사용, 성능 개선
- 기반 프로토콜에 따른 http 종류
  - TCP : HTTP/1.1 & 2
  - UDP : HTTP/3



## HTTP의 특징

- 클라이언트-서버 구조
- 무상태 프로토콜(Stateless), 비연결성
- HTTP 메시지
- 단순함, 확장가능



### 클라이언트 서버 구조

- HTTP의 구조 
  - 애플리케이션 계층의 프로토콜로, TCP 혹은 암호화된 TCP 연결인 TLS를 통해 전송됨
  - HTTP 확장성을 통해, 여러 리소스들을 HTTP로 전송가능
  - 클라이언트-서버 프로토콜

- 클라이언트-서버 프로토콜
  - 클라이언트와 서버 사이에 이루어지는 요청/응답(request/response) 프로토콜
    - 예시 : 클라이언트인 웹브라우저가 HTTP를 통하여 서버로부터 웹페이지나 그림 정보를 요청하면, 서버는 이 요청에 응답하여 필요한 정보를 해당 사용자에게 전달

- 클라이언트-서버 구조의 중요성
  - 예전에는 클라이언트와 서버라는 개념이 분리되지 않고, 한 뭉텅이로 존재
  - 클라이언트-서버 구조 분리된 후 독립적인 진화 가능해짐
    - 서버 : 비즈니스 로직, 데이터 등
    - 클라이언트 : UI. 사용성 등
    - 즉, 클라이언트는 복잡한 비즈니스 로직이나 데이터를 다룰 필요없이 UI와 사용성에만 집중 가능
      서버는 복잡한 비즈니스 로직과 데이터, 서버의 아키텍처나 백엔드 트래픽 등에 대해서만 집중 가능

- 클라이언트-서버 작동 원리
  - 클라이언트와 서버들은 개별적인 메시지 교환에 의해 통신 (데이터 스트림과 대조적으로)
    - 요청(requests) 메시지 : 보통 브라우저인 클라이언트에 의해 전송되는 메시지
    - 응답(response) 메시지 : 서버에서 응답으로 전송되는 메시지
  - 요청과 응답 사이에는 여러 개체 존재
    - 게이트웨이 : 다양한 작업을 수행
    - 프록시 : 캐시 역활
      <img src="https://media.vlpt.us/images/gparkkii/post/a9bc4b29-815b-424a-a1a0-e7b2e7f8fc63/Client-server-chain.png" alt="Client-server-chain" style="zoom:65%;" />
    - ETC



### 무상태 프로토콜

- 무상태 프로토콜 

  - 의미 : 어떠한 이전 요청과도 무관한 각각의 요청을 독립적인 트랜잭션으로 취급하는 통신 프로토콜 → 통신이 독립적인 쌍의 요청과 응답을 이루게 함
  - 장점 : 서버 확장성이 높음
  - 단점 : 클라이언트가 추가 데이터를 전송해야 함

- 상태(Stateful) 유지 VS 무상태(Stateless) 차이

  <img src="https://media.vlpt.us/images/gparkkii/post/7ed4bec8-0ee4-476b-a923-532ea6a85f49/1_IoFCbOzsSjGOBXHUqdtpIQ.png" alt="1_IoFCbOzsSjGOBXHUqdtpIQ" style="zoom:67%;" />

  - 상태 유지 : 항상 같은 서버가 유지되어야 함
    - 서버가 클라이언트의 이전 상태를 보존하기 때문에 중간에 응답 서버가 바뀌면 안됨
    - 중간에 서버가 바뀔 때 마다 상태정보를 다른 서버에게 알려 주어야 함
  - 무상태 유지 : 중간에 다른 서버로 바뀌어도 됨
    - 갑자기 클라이언트 요청이 증가해도 대거 서버 투입 가능. 즉, 응답 서버를 쉽게 바꿀 수 있음

- 무상태(Stateless) 프로토콜의 실무한계

  - 무상태로 설계할 수 없는 경우 존재
    - 무상태 설계 가능한 경우 예시 : 로그인이 필요 없는 단순한 서비스 소개 화면
    - 무상태 설계 가능하지 않은 경우 예시 : 로그인
      - 로그인한 사용자의 경우 로그인 했다는 상태를 서버에 유지해야하는데, 일반적으로 브라우저 쿠키와 서버 세션등을 사용해서 상태를 유지 (상태유지는  최소한만 사용하는 것이 좋음)



### 비연결성

서버와 클라이언트의 연결을 유지(connection)하는 모델은 클라이언트가 서버에 요청을 보내면 응답을 받고 난 후에도 계속 서버에 접속된 상태로 남아있게 됨  → 많은 서버 자원 소모

서버와 클라이언트의 연결을 유지하지 않는(connectionless) 모델은 클라이언트가 서버에 요청을 보내면 응답을 받은 후 바로 클라이언트와 서버의 연결을 끊음 → 최소한의 서버 자원 소모

- HTTP의 비연결성

  - 서버와 클라이언트의 연결을 유지 하지 않는 모델
  - 서버 자원 효율적 사용 가능

- 비연결성의 한계

  - TCP/IP 연결을 새로 맺어야 함 
    - 3 way handshake 등의 시간 추가됨
  - 웹브라우저로 사이트 요청 시, HTML 뿐만이 아니라 자바스크립트, css, 추가 이미지 등 수 많은 자원이 함께 다운로드 됨
  - 지금은 HTTP의 **지속 연결(Persistent Connection)**으로 문제 해결
  - HTTP 2&3에서 더 많은 최적화 됨

- **지속 연결(Persistent Connection)**

  ![다운로드 (6)](https://media.vlpt.us/images/gparkkii/post/871b2a79-1b69-4424-86af-2007df697332/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3%20(6).png)

  - 클라이언트와 서버 간 연결, 종료 시간 낭비 완화
  - 맨 처음 파일 요청을 위한 TCP 연결이 세팅된 후터는 또다시 TCP 연결은 하지 않고, 처음에 연결된 TCP연결을 이용하여 나머지 파일에 대해서 클라이언트와 서버가 요청/응답
  - 또한 요청에 대한 응답을 기다리지 않고 한번에 연속해서 요청을 할수가 있는데 이를 파이프라이닝 함. 서버가 만약 연속된 요구를 수신하게 되면, 서버는 객체를 연속으로 보냄.
    -  HTTP의 디폴트 모드는 파이프라이닝을 이용한 지속 연결 사용



### HTTP 메시지

<img src="https://media.vlpt.us/images/gparkkii/post/531ed3d6-a210-4c97-ac23-00aaf9926436/HTTPMsgStructure2.png" alt="HTTPMsgStructure2" style="zoom:80%;" />

- HTTP 요청 메시지 (Request)
  - 예시
    <img src="https://media.vlpt.us/images/gparkkii/post/0a8a066b-b53b-4c86-a522-32e848c5f54f/HTTP_Request.png" alt="HTTP_Request" style="zoom:80%;" />

- HTTP 응답 메시지 (Response)

  - 예시

    <img src="https://media.vlpt.us/images/gparkkii/post/c5ee6879-e3af-49f9-a8d0-5922b49c53ce/HTTP_Response.png" alt="HTTP_Response" style="zoom:80%;" />

### 단순함, 확장가능



## 참조 자료

- https://velog.io/@gparkkii/ABOUTHTTP
- [HTTP 비지속 연결과 지속 연결](https://wogh8732.tistory.com/21)
- [위키백과/HTTP](https://ko.wikipedia.org/wiki/HTTP)

