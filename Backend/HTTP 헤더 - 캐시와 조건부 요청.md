# HTTP 헤더 - 캐시와 조건부 요청

[TOC]

## 캐시

### 캐시가 없을때 기본 동작

**첫번째 요청**

- 클라이언트  → 서버 : 요청

  ```
  GET /starg.jpg
  ```

- 서버  → 클라이언트 : 응답

  ```
  HTTP/1.1 200 OK
  Content-Type: image/jpeg 
  Content-Length: 34012
  
  lkj123kljoiasudlkjaweioluywlnfdo912u34ljko98udjkla
  slkjdfl;qkawj9;o4ruawsldkal;skdjfa;ow9ejkl3123123
  ```

  

**두번째 요청**

- 첫번째 요청과 동일하게 통신한다.

- 즉, 계속 요청하면 **똑같이** 클라이언트와 서버가 통신하여 데이터를 주고 받음
  - 데이터가 변경되지 않아도 계속 네트워크를 통해서 데이터를 다운로드
  - 인터넷 네트워크는 시간이 걸리고, 비싸다
  - 브라우저 로딩 속도는 시간이 걸림



### 캐시가 적용된 동작

**첫번째 요청**

- 클라이언트  → 서버 : 요청

  ```
  GET /starg.jpg
  ```

- 서버  → 클라이언트 : 응답

  ```
  HTTP/1.1 200 OK
  Content-Type: image/jpeg 
  cache-control: max-age=60
  Content-Length: 34012
  
  lkj123kljoiasudlkjaweioluywlnfdo912u34ljko98udjkla
  slkjdfl;qkawj9;o4ruawsldkal;skdjfa;ow9ejkl3123123
  ```

**두번째 요청**

- 우선, 브라우저 캐시 메모리 확인
- 캐시 유효 시간동안 원하는 해당 데이터 찾음
  - 데이터가 존재하는 경우 이를 가져옴
  - 데이터가 존재하지 않거나, 캐시 유효 시간이 지나갔다면 서버로 요청

- 즉, 캐시 사용시 비싼 네트워크 비용 및 브라우저 로딩 속도 향상

- 하지만 캐시 유효 시간이 지났다면, 다시 서버를 통해 데이터를 주고 받아야함

  - 캐시 유효 시간이 지났지만, 기존 데이터와 동일하다는 것을 안다면 굳이 새로 다운 받을 필요가 없음에도 이를 수행

    → **검증 헤더와 조건부 요청** 개념



## 검증 헤더와 조건부 요청 1

**캐시 시간 초과**

- 캐시 유효 시간이 지난 경우, 두가지 경우 존재
  1. 서버에서 실제로 기존 데이터를 변경한 경우 : (origin) → (new)
  2. 서버에서 기존 데이터 변경하지 않은 경우 : (origin)



### 서버에서 기존 데이터 변경하지 않은 경우

데이터(정확히 HTTP Body)를 서버에서 전송하는 대신, **저장해두었던 캐시 재사용**  ← 검증헤더 사용

**첫번째 요청**

- 클라이언트  → 서버 : 요청

  ```http
  GET /starg.jpg
  ```

- 서버  → 클라이언트 : 응답

  ```http
  HTTP/1.1 200 OK
  Content-Type: image/jpeg 
  cache-control: max-age=60
  Last-Modified: 2020년 11월 10일 10:00:00
  Content-Length: 34012
  
  lkj123kljoiasudlkjaweioluywlnfdo912u34ljko98udjkla
  slkjdfl;qkawj9;o4ruawsldkal;skdjfa;ow9ejkl3123123
  ```

  - 검증 헤더인 `Last-Modified` 가 추가됨. 데이터의 마지막 수정 시간 기록
  - 응답을 받은 웹브라우저(클라이언트는) 60초 동안 유효하다는 정보를 브라우저 캐시 메모리에 넣고
    추가적으로 마지막 수정 시간도 같이 저장

**두번째 요청 (캐시 유효 시간 만료한 경우)**

캐시 유효 시간이 초과되어 다시 요청을 보내야 하는 경우

- 클라이언트  → 서버 : 요청

  ```
  GET /starg.jpg
  if-modified-since : 2020년 11월 10일 10:00:00
  ```

  - `if-modified-since`가 추가되어 요청. 캐시 메모리에 저장되어 있는 마지막 수정 시간을 넣음

- 서버 → 클라이언트 : 응답

  - 서버가 요청 메시지의 `if-modified-since` 의 값 확인

  - 서버 데이터의 최종 수정일 값과 다른지 판단

    - 같다면 캐시유효 시간을 다시 설정해주고, Body를 비운채 응답 메시지 보냄 (데이터를 추가하는 것보다 용량 감소 → 비용 감소)

      ```http
      HTTP/1.1 304 Not Modified
      Content-Type: image/jpeg
      cache-control: max-age=60
      Last-Modified: 2020년 11월 10일 10:00:00
      Content-Length: 34012
      ```

    - 다르다면 서버 데이터를 포함한 응답 메시지 보냄

  - 클라이언트는 서버가 보낸 응답 메시지로 데이터가 변경 유무 확인

    - 데이터가 변경되지 않았다면 캐시 메타 정보만을 업데이트
    - 데이터가 변경하였다면 응답 메시지에 포함된 데이터도 업데이트



## 검증 헤더와 조건부 요청 2

### 검증헤더

- 캐시 데이터와 서버 데이터가 같은지 검증하는 헤더
- Last-Modified, ETag

### 조건부 요청 헤더

- 검증 헤더로 조건에 따른 분기
- `If-Modified-Since` : `Last-Modified` 사용
- `If-None-Match` : `ETag`사용
- 조건이 만족한다면 `200 ok` →  즉, 데이터가 변한 경우
- 조건이 만족하지 않는다면 `304 Not Modified ` →  즉, 데이터가 변하지 않은 경우

### Last-Modified & If-Modified-Since 단점

- 1초 미만 단위로 캐시 조정 불가능 ← 최소 시간 단위가 초라서
- 날짜 기반의 로직 사용
  - 데이터를 수정해서 날짜가 다르지만, 데이터의 결과는 똑같은 경우에도 변경된 것으로 인식 → 재다운로드
- 서버에서 별도의 캐시 로직을 관리하고 싶은 경우
  - 예를 들어 주석과 같이 데이터의 영향이 없는 경우 캐시를 유지하고 싶은 경우, 이를 해결하지 못함

### ETag & If-None-Match

- 서버는 데이터에 임의의 고유한 버전 이름(ETag)을 달아줌
- 데이터가 변경되면 이 이름을 바꿔서 변경
  - ETag : "v1" → "v2"
- (Last-Modified & If-Modified-Since와 마찬가지로) ETag 값이 서버와 클라이언트에서 일치하면 `304`, 다르면 `200` 응답 메시지 반환

**첫번째 요청**

- 클라이언트 → 서버

  ```null
  GET /star.jpg
  ```

- 서버 → 클라이언트

  ```null
  HTTP/1.1 200 OK
  Content-Type: image/jpeg
  cache-control: max-age=60
  ETag: "v1"
  Content-Length: 34012
  
  lkj123kljoiasudlkjaweioluywlnfdo912u34ljko98udjklasl 
  kjdfl;qkawj9;o4ruawsldkal;skdjfa;ow9ejkl3123123
  ```

**두번째 요청 (캐시 유효 시간 만료한 경우)**

- 클라이언트 → 서버

  ```
  GET /star.jpg
  If-None-Match:"v1"
  ```

- 서버 → 클라이언트

  ```null
  HTTP/1.1 304 Not Modified
  Content-Type: image/jpeg
  cache-control: max-age=60 ETag: "v1" Content-Length: 34012
  
  (body X)
  ```

  - 요청 메시지의 `If-None-Match` 값과 서버의 `ETag` 값이 같기에, **If-None-Match 조건문의 결과가 false** → `304` 응답 메시지 보냄
    - 서버의 응답을 받은 클라이언트(웹 브라우저)는 캐시 저장소에 있던 기존 데이터의 캐시 유효 시간 재설정 및 해당 데이터 재사용

- ETag & If-None-Match 장점

  - 캐시 제어 로직을 서버에서 완전히 관리
  - 클라이언트는 단순히 ETag값을 서버에 제공할 뿐, 캐시 매커니즘을 모름
  - 다양하게 사용 가능
    - 애플리케이션 배포 주기에 맞춰서 ETag 모두 갱신 등



## 참고 자료

- https://velog.io/@dnstlr2933/HTTP-%ED%97%A4%EB%8D%94%EC%BA%90%EC%8B%9C%EC%99%80-%EC%A1%B0%EA%B1%B4%EB%B6%80-%EC%9A%94%EC%B2%AD