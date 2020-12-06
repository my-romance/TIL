# REST API 설계 가이드

### 1. URI는 정보의 자원을 표현해야함

리소스명은 동사보다는 명사를 사용.

```http
GET /members/delete/1
```

위와 같은 방식은 REST를 제대로 적용하지 않은 URI. delete와 같은 행위에 대한 표현이 들어가서는 안됨.



### 2. 자원에 대한 행위는 HTTP Method로 표현

HTTP Method는 GET, POST, PUT, DELETE 등이 존재.

**[HTTP Method의 알맞은 역활]**

| METHOD | ROLE                                                         |
| ------ | ------------------------------------------------------------ |
| POST   | POST를 통해 해당 URI를 요청하면 리소스를 생성                |
| GET    | GET를 통해 해당 리소스 조회. 리소스를 조회하고 해당 도큐먼트에 대한 자세한 정보를 가져옴 |
| PUT    | PUT를 통해 해당 리소스를 수정                                |
| DELETE | DELETE를 통해 리소스를 삭제                                  |

위의 잘못된 URI를 HTTP Method를 통해 수정해 보면 아래와 같이 수정 가능.

```http
DELETE /members/1
```

회원정보를 가져올 때는 GET, 회원 추가를 표현하고자 할 때는 POST Method를 사용하여 표현.

- 회원 정보를 가져오는 URI 예시

  ```
  GET /members/show/1		(x)
  GET /members/1				(o)
  ```

- 회원 추가 URI 예시

  ```
  GET /members/insert/2	(x) # GET 메서드는 리소스 생성에 맞지 않음
  POST /members/2				(x)
  ```



### 3. URI 설계 시 주의할점

- 슬래시 구분자(/)는 계층관계를 나타내는데 사용

- URI 마지막 문자로 슬래시(/)를 포함하지 않는다.

- 하이픈(-)은 URI 가독성을 높이는데 사용, 밑줄(_)은 사용하지 않는다.

- URI 경로에는 소문자가 적합하다.

- 파일 확장자는 URI에 포함시키지 않는다. (확장자를 표시하고 싶은 경우 아래와 같이 Accept header 사용)

  ```
  GET /members/soccer/345/photo HTTP/1.1 Host: restapi.example.com Accept: image/jpg
  ```

  

- 

### 4. 리소스 간의 관계를 표현하는 방법

- 리소스 간의 관계가 있는 경우

  ```
  # /리소스명/리소스 ID/관계가 있는 다른 리소스명
  GET /users/{userid}/devices # (일반적으로 소유 ‘has’의 관계를 표현할 때)
  ```

- 컨트롤 자원을 의미하는 URL은 예외적으로 동사 허용

  ```
  http://api.test.com/posts/duplicating		# (X)
  http://api.test.com/posts/duplicate			# (O)
  ```



### 5. HTTP status code

- 100 : **정보**, 서버가 요청을 알아 들음
- 200 : 성공, 서버가 요청을 예상한대로 완료함
- 300 : 라다이렉션, 요청을 완료하려면 클라이언트의 추가 작업이 필요
- 400 : 클라이언트 에러, 클라이언트가 유효하지 않은 요청을 함
- 500 : 서버 에러, 서버가 서버 에러때문에 유효한 요청을 수행하지 못함.

- 에러 핸들링
  - **400 Bad Request** : 클라이언트가 유효하지 않은 요청을 보낸 경우 (request body나 파라미터를 빼먹은 경우같이)
  - **401 Unauthorized** : 해당 서버에 클라이언트 인증이 실패한 경우
  - **403 Forbidden** : 클라이언트가 인증은 됐지만 요청한 자원에 대한 권한은 없는 경우 (예를 들어 로그인된 사용자가 관리자 페이지에 접근하는 경우 겠죠?)
  - **404 Not Found** : 요청한 자원이 존재하지 않는 경우
  - **412 Precondition Failed** : Request Header 필드 중 한 개 이상의 값이 잘못 된 경우
  - **500 Internal Server Error** : 서버에서 발생된 일반적인 에러
    - 500대 에러를 클라이언트에게 보여주면 안됨. 500에러는 요청을 처러하는데 서버에서 예상하지 못함 예외발생 같은 경우에 대한 신호이기 때문.그러므로 서버 내부 에러는 클라이언트의 비지니스 X.
      대신, 서버측 개발자는 부지런히 내부에러를 처리하거나 캐치하여 400대 에러를 내려주어야 함. 예를 들어, 요청된 자원이 존재하지 않는다면 500 에러가 아닌 404에러를 주어야 함.
  - **503 Service Unavailable** : 요청된 서비스가 이용가능하지 않는 경우



### 참고자료

- https://meetup.toast.com/posts/92
- https://sanghaklee.tistory.com/57
- https://pjh3749.tistory.com/273