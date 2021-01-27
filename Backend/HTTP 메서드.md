# HTTP 메서드

[TOC]

## HTTP 요청 메소드 종류

### GET

- 오로지 데이터를 받는 용도
- 클라이언트가 서버에 리소스를 요청할 때 사용 **(CRUD에서 Read)**

### POST

- 특정 리소스에 엔티티를 제출할 때 사용됨 → 이는 종종 서버의 상태 변화나 부작용을 일으킴
- 클라이언트가 서버의 리소스를 새로 만들 때 사용 **(CRUD에서 Create)**

### PUT 

- 목적 리소스의 모든 현재 표시를 요청 payload로 바꿈
- 클라이언트가 서버의 리소스를 수정할 때 사용  **(CRUD에서 Update : 전체 수정)**

### PATCH

-  클라이언트가 서버 리소스 중 일부만을 수정할 때 사용 **(CRUD에서 Update : 일부 수정)**

### DELETE 

- 클라이언트가 서버 리소스를 삭제할 때 사용 **(CRUD에서 Delete)**

### HEAD 

- `Get` 메서드의 요청과 동일한 응답을 요구하지만, 응답 본문을 포함하지는 않음. 
- **즉, 클라이언트가 서버의 정상 작동 여부를 확인할때 사용**

### OPTIONS 

- 클라이언트가 서버에서 해당 URL이 어떤 메소드를 지원하는지 확인할 때 사용

### CONNECT

- 간단히 말하자면, 목적 리소스로 식별되는 서버로의 경로 연결하는데 쓰임
- 클라이언트가 프록시를 통하여 서버와 SSL 통신을 하고자 할 때 사용

### TRACE

- 목적 리소스의 경로를 따라서 메시지를 loop-back 테스트함
- 클라이언트와 서버간 통신 관리 및 디버깅 할때 사용



## HTTP 메소드의 특징

### GET

- 캐싱 가능
- 북마크 가능
- 브라우저에 기록이 남음
- URL에 Query String 형식으로 데이터를 전송하기에 보안 취약
- URL의 길이 제한 O (각 브라우저, 서버 마다 최대 길이 다름)
- 초과된 데이터는 절단되어 보내짐
- 멱등성 O (같은 요청이면 반환되는 모든 응답은 동일해야 함)

### POST

- 캐싱 불가능
- 브라우저에 기록이 남지 않음
- 북마트 불가능
- 데이터 길이 제한 X
- 멱등성 X (같은 요청이라도 응답이 각각 다르다)

### PUT

- 캐싱 불가능
- 멱등성 O

### PATCH

- 캐싱 가능
- 멱등성 X

### DELETE

- 캐싱 불가능
- 멱등성 X



### 특징 요약표

| HTTP 메소드 | 요청에 Body가 있음 | 응답에 Body가 있음 | 안전 | 멱등 | 캐시가능 |
| :---------: | :----------------: | :----------------: | :--: | :--: | :------: |
|     GET     |         X          |         O          |  O   |  O   |    O     |
|    POST     |         O          |         O          |  X   |  X   |    O     |
|     PUT     |         O          |         O          |  X   |  O   |    X     |
|    PATCH    |         O          |         O          |  X   |  X   |    O     |
|   DELETE    |         X          |         O          |  X   |  O   |    X     |
|    HEAD     |         X          |         X          |  O   |  O   |    O     |
|   OPTIONS   |     선택 사항      |         O          |  O   |  O   |    X     |
|   CONNECT   |         O          |         O          |  X   |  X   |    X     |
|    TRACE    |         X          |         O          |  O   |  O   |    X     |



## GET VS POST

- https://mommoo.tistory.com/60





## 참고자료

- https://developer.mozilla.org/ko/docs/Web/HTTP/Methods
- https://programmer93.tistory.com/38
- https://ko.wikipedia.org/wiki/HTTP

