# HTTP 메서드 활용

[TOC]

## 클라이언트에서 서버로 데이터 전송

### Client에서 서버로 데이터를 전송하는 2가지 방식

1. 쿼리 파라미터를 통한 데이터 전송
   - GET 메소드에서 사용
   - 주로 정렬 필터를 사용할 때 사용 (검색어)
2. HTTP 메시지 바디를 통한 데이터 전송
   - POST, PUT, PATCH 메서드에서 사용
   - 회원 가입, 상품주문, 리소스 등록, 리소스 변경 등을 할 때 주로 사용

### Client에서 서버로 데이터를 전송하는 4가지 상황

1. 정적 데이터 조회

   ![정적 데이터 조회](https://media.vlpt.us/images/dnstlr2933/post/1790d3d1-1318-4056-ac3d-9c06efb3650e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.00.34.png)

   - 정적 데이터 : 이미지, 정적 데이터 문서 등
   - 클라이언트가 서버에 GET 메서드를 이용해서 요청메시지를 보내면, 서버가 해당 리소스를 전달해줌
   - 정적 데이터는 일반적으로 **쿼리 파라미터 없이 리소스 경로(URL)로 단순 조회** 가능

2. 동적 데이터 조회

   ![동적 데이터 조회](https://media.vlpt.us/images/dnstlr2933/post/75bc2600-1941-4f30-9290-11c47d9d87a4/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.11.43.png)

   - 이미지 설명대로, **쿼리 파라미터를 기반으로 정렬 필터해서 결과를 동적으로 생성**
     - 쿼리 파라미터 : key1=value1&key2=value2
   - 주로 검색, 게시판 목록에서 정렬 필터를 할 때 사용
   - **조회 조건을 줄여주는 필터(=검색어), 조회 결과를 정렬하는 정렬 조건**에 주로 사용
   - 조회이므로 GET 사용

3. HTML Form 이용한 데이터 전송

   - POST 전송 - 저장

     ![POST 전송-저장](https://media.vlpt.us/images/dnstlr2933/post/817463a2-8dce-48c7-9e2e-2d908d7a2b28/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-03%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%202.55.48.png)

     - Content-Type : application/x-www-form-urlencoded라면
       - **form의 내용을 메시지 Body를 통해서 전송(key=value, 쿼리 파라미터 형식)**
       - 전송 데이터를 url encoding 처리
         - 예) abcrla -> abc%EA%9B%80

   - GET 전송 - 저장 (오류)

     ![스크린샷 2021-01-07 오전 12.18.02](https://media.vlpt.us/images/dnstlr2933/post/d7518bef-bada-4ad9-9702-1ad70ab6a883/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-07%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2012.18.02.png)

     - Post 대신 Get 메서드를 From 박스에서 사용함  → 이런 경우, 전달받은 값을 HTTP 요청 메시지의 Body가 아닌 Query문으로 알아서 변환
     - 하지만, GET을 리소스 변경이 발생하는 곳에 사용하면 안됨 → 정상 진행 X

   - Multipart/from-data 데이터 전송

      ![](https://media.vlpt.us/images/dnstlr2933/post/296861ed-bce7-431f-8e3c-13a0b0f73d18/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-01-09%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2010.16.57.png)

     - 위 그림에서 Boundary(---XXX)를 통해  username, age, file 등을 구분지어서 보내는 것처럼, 멀티 파드를 가지는 data를 보내는 form
     - 파일 업로드 같은 바**이너리 데이터 전송시 사용**
     - **다른 종류의 여러 파일과 폼의 내용을 함께 전송 가능**



### HTTP API 설계 예시

- API 설계 - POST 기반 등록

  - 회원 관리 시스템

    - 회원 목록 /members → GET
    - 회원 등록/members → POST

    - 회원 조회/members/{id} → GET
    - 회원 수정/members/{id} → PATCH, PUT, POST
      - 보통 게시글 수정의 경우, 부분이 바뀌더라도 PUT으로 일괄 변경 함
    - 회원 삭제/members/{id} → DELETE

  - POST - 신규 자원등록 특징

    - 요청 메시지를 받은 서버가 **새로 등록된 리소스의 URI 생성**

    - HTTP/1.1 201 Created

      Location: /members/100

  - **컬렉션 (Collection)**

    - 서버가 관리하는 리소스 디렉토리
    - 서버가 리소스의 URI를 생성하고 관리
    - 위 예제에서 컬렉션은 **/members**

- API 설계 - PUT 기반 등록

  - 파일 관리 시스템

    - 파일 목록 /files → GET
    - 파일 조회 /files/{filename} → GET
    - 파일 등록 /files/{filename} → PUT
      - 기존 파일이 있어도 덮어쓴다
    - 파일 삭제 /files/{filename} → DELETE
    - 파일 대량 등록 /files → POST
      - POST 는 상황에 맞게 사용 가능.

  - PUT - 신규 자원 등록 특징

    등록을 위해 POST 대신 PUT을 사용한다면, 차이점은?

    - 클라이언트가 리소스 URI를 알고 있어야 함
      - 파일 등록 /files/{filename} → PUT
      - PUT /files/start.jpg
    - 클라이언트가 직접 리소스의 URI를 지정
    - **스토어(Store)**
      - 클라이언트가 관리하는 리소스 저장소
      - 클라이언트가 리소스의 URI을 알고 관리
      - 여기서 스토어는 /files
    - 즉, 클라이언트가 관리하는 리소스의 URI를 지정해서 서버에게 등록해달라고 요청. 그러면 서버는 해당 리소스를 전달 받은 URI에 등록 해줌
    - **참고, 대부분 POST 기반의 Collection의 관리 시스템을 사용**

- HTML FORM 사용
  - HTML, FROM은 GET, POST만 지원
  - PUT, PATCH, DELETE를 대체해야함
    - 회원 목록 /members → **GET**
    - 회원 등록 폼 /members/**new** → **GET**
    - 회원 등록 /members/**new**, /members → **POST**
    - 회원 조회 /members/{id} → **GET**
    - 회원 수정 폼 /members/{id}/**edit** → **GET**
    - 회원 수정 /members/{id}/**edit** → **GET**, /members/{id} → **POST**
    - 회원 삭제 /members/{id}/**delete** → **POST**
  - 컨트롤 URI
    - GET, POST만 지원하므로 제약 존재
    - 이런 제약을 해결하기 위해 `동사로 된 리소스 경로` 를 사용
    - 위에서는  /new, /edit, /delete가 컨트롤 URI
    - HTTP 메서드로 해결하기 애매한 경우 사용함 (HTTP API 포함)



## 참고 자료

- https://velog.io/@dnstlr2933/HTTP-API-%EC%84%A4%EA%B3%84 