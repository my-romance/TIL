# REST API란?



[TOC]

## REST 개념

### REST란

- Representational State (REST)
  - 웹에 존재하는 모든 자원을 이름으로 구분하여, 해당 자원의 상태(정보)를 처리하는 것을 의미
  - 즉, 자원(resource)의 표현(representation)에 의한 상태 전달
    1. 자원으 표현
       - 자원: 해당 소프트웨어가 관리하는 모든 것. Ex) 문서, 그림, 데이터, 해당 소프트웨어 자체 등
       - 자원의 표현 : 그 자원을 표현하기 위한 이름. Ex) DB의 학생정보가 자원일 때, "students"를 자원의 표현으로 설정.
    2. 상태(정보) 전달
       - 데이터가 요청되어지는 시점에서 자원의 상태(정보)를 전달.
       - JSON 혹은 XML를 통해 데이터를 주고 받는 것이 일반적.
  - 월드 와이드 웹(www)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 개발 아키텍처의 한 형식
    - REST는 기본적으로 웹의 기존 기술과 HTTTP 프로토콜을 그대로 활용하기 때문에 웹의 장점을 최대로 활용할 수 있는 아키텍처 스타일.
    - REST의 구성
      1. 자원(Resource)  : URI (Uniform Resource Identifier)
      2. 행위(Verb) : HTTP Method
      3. 표현(Representation)
- REST의 구체적인 개념
  - **웹에 존재하는 모든 자원(이미지, 텍스트, 디비 내용 등)에 고유한 ID인 HTTP URI 부여해 활용**하는 것으로, 자원을 정의하고 자원에 대한 주소를 지정하는 방법론을 의미.
  - HTTP URI를 통해 자원을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 자원에 대한 CRUD Operation을 적용하는 것.
    - CRUD Operation
      - CREATE : 생성(POST)
      - READ : 조회(GET)
      - UPDATE : 수정(PUT)
      - DELETE : 삭제(DELETE)
      - HEAD : head 정보 조회(HEAD)
  - 즉, REST는 자원 기반 구조(ROA, Resource Oriented Architecture) 설계의 중심에 Resource가 있고, HTTP Method를 통해 Resource를 처리하도록 설계된 아키텍쳐.



### REST의 필요성

- 애플리케이션 분리 및 통합
- 다양한 클라이언트의 등장
- 최근의 서버 프로그램은 다양한 브라우저와 안드로이드폰, 아이폰 과 같은 모바일 디바이스에서도 통신을 할 수 있어야 함



### REST 구성 요소

1. 자원(Resource)  : URI
   - 모든 자원에 고유한 ID가 존재하고, 이 자원은 Server에 존재
   - 자원을 구별하는 ID는 "/groups/:group_id"와 같은 HTTP URI.
   - **Client는 URI를 이용하여 자원을 지정하고, 해당 자원의 상태(정보)에 대한 조작을 Server에 요청**
2. 행위(Verb) : HTTP Method
   - HTTP 프로토콜의 Method(GET, POST, PUT, DELETES) 사용
3. 표현(Representation)
   - **Client가 자원의 상태(정보)에 대한 조작을 요청하면, Server는 이에 적절한 응답(Representation)을 보냄**
   - REST에서 하나의 자원은 JSON, XML, TEXT, RSS 등 여러 형태의 Representation으로 나타내어 질 수 있고, 보통 JSON, XML을 통해 데이터를 주고 받는것이 알반적.



### REST의 특징

1. Server-Client (서버-클라이언트) 구조

   - 자원이 있는 쪽이 Server, 자원을 요청하는 쪽이 Client
     - REST Server : API를 제공하고 비즈니스 로직 처리 및 저장을 책임짐
     - Clinet : 사용자 인증이나 context(세션, 로그인 정보) 등을 직접 관리하고 책임짐
   - 서로 간 의존성이 줄어듦

2. Stateless(무상태)

   - HTTP 프로토콜은 Stateless Protocol이므로, REST 역시 무상태성을 가짐
   - state가 있다/없다의 의미는 사용자나 클라이언트의 context를 서버쪽에 유지하지 않든다는 의미로, HTTP Session과 같은 Context 저장소에 상태 정보를 저장하지 않는 것을 의미함

   - Client의 context를 Server에 저장하지 않는다.
     - 즉, 세션과 쿠키와 같은 context 정보를 신경쓰지 않아도 되므로, 구현이 간단해짐
   - Server는 각각의 요청을 완전히 별개의 것으로 인식하고 처리
     - 각 API 서버는 Client의 요청만을 단순 처리함
     - 즉, 이전 요청이 다음 요청의 처리에 연관되어서는 안됨. (물론, 이전 요청이 DB를 수정하여 DB에 의해 바뀌는 것은 혀용)
     - Server의 처리방식에 일관성을 부여하고, 부담이 줄어들며 서비스의 자유도가 높아짐

3. Cacheable(캐시처리 가능)

   - 웹 표준 HTTP 프로토콜을 그대로 사용하므로, 웹에서 사용하는 기존의 인프라를 그대로 활용 가능
     - 즉,  HTTP가 가진 강력한 특징 중 하나인 캐싱 기능 적용 가능
     - HTTP 프로토콜 표준에서 사용하는 Last-Modified 태크나 E-Tag를 이용하면 캐싱 구현 가능
   - **대량의 요청을 효율적으로 처러히가 위해 캐시가 요구됨**
   - 캐시 사용을 통해 응답 시간이 빨라지고, **REST Server 트랙잭션이 발생하지 않기 때문에** 전체 응답시간, 성능, 서버의 자원이용률을 향상시킬 수 있음 

4. Layered System(계층화)

   - Client는 REST API Server만 호출
   - REST Server는 다중 계층으로 구성될 수 있음
     - API Server는 순수 비즈니스 로직을 수행하고, 그 앞단에 보안, 로드밸런싱, 암호화, 사용자 인증 등을 추가하여 구조상의 유연성 제공 가능
     - 또한 로드밸런싱, 공유 캐시 등을 통해 확장성과 보안성 향상 가능
   - PROXY, 게이트웨이 같은 네트워크 기반의 중간 매체 사용 가능

5. Code-on-Demand(optional)

   - Server로부터 스크립트를 받아서 Client에서 실행
   - 반드시 충족할 필요 없음

6. Uniform Interface(인터페이스 일관성)

   - URI로 지정한 Resource에 대한 조작을 통일되고 한정적인 인터페이스로 수행
   - HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용 가능
     - 특정 언어나 기술에 종속되지 않음



## REST API 개념

### REST API란

- API(Application Programming Interface)란
  - 데이터와 기능의 집합을 제공하 컴퓨터 프로그램간 상호작용을 촉진하며, 서로 정보를 교환가능 하도록 하는 것.
- REST API란
  - REST 기반으로 서비스 API를 구현한 것
  - 최근 OpenAPI(누구나 사용할 수 있도록 공개된 API : 구글 맵, 공공 데이터 등), 마이크로 서비스(하나의 큰 어플리케이션을 여러 개의 작은 어플리케이션으로 쪼개어 변경과 조합이 가능하도록 만든 아키텍처)등을 제공하는 업체 대부분은 REST API를 제공함



### REST API 특징

- 사내 시스템들도 REST 기반으로 시스템을 분산해 확장성과 재사용성을 높여, 유지보수 및 운용을 편리하게 할 수 있음
- REST는 HTTP 표준을 기반으로 구현하므로, HTTP를 지원하는 프로그램 언어로 Clinet, Server를 구현할 수 있음
- 즉, REST API를 제작하면 델파이 클라이언트 뿐만 아니라, 자바, C#, 파이썬, 웹 등을 이용해 클라이언트를 제작할 수 있음



### REST API 설계 기본 규칙

- 참고 리소스 원형
  - 도큐먼트 : 객체 인스턴스나 데이터베이스 레코드와 유사한 개념
  - 컬렉션 : 서버에서 관리하는 디렉터리라는 리소스
  - 스토어 : 클라이언트에서 관리하는 리소스 저장소

1. URI는 정보의 자원을 표현해야 함

   - resource는 동사보다는 명사를, 대문자보다는 소문자를 사용해야 함
   - resource는 도큐먼트 이름으로는 단수 명사를 사용해야함
   - resource는 컬렉션 이름으로는 복수 명사를 사용해야함
   - resource는 스토어 이름으로는 복수 명사를 사용해야함
     - Ex : GET /Member/1 → GET /members/1

2. 자원에 대한 행위는 HTTP Method(GEP, PUT, POST, DELETE 등)로 표현

   - URI에 HTTP Mothod가 들어가면 안됨
   - URI에 행위에 대한 동사 표현이 들어가면 안됨. (즉, CRUD 기능을 나타내는 것은 URI에 사용하지 않음)
     - Ex : GET /members/show/1 → GET /members/1

   - 경로 부분 중 변하는 부분은 유일한 값으로 대체. (즉, :id는 하나의 특정 resource를 나타내는 고유값)
     - Ex : Student를 생성하는 route: Post /students
     - Ex : id=12인 students를 삭제하는 route : DELETE /students/12



### REST API 설계 규칙

1. 슬래시 구분자(/)는 계층 관계를 나타내는데 사용
   - Ex : `http://restapi.example.com/houses/apartments`
2. URI 마지막 문자로 슬래시(/)를 포함하지 않기
   - URI에 포함되는 모든 글자는 리소스의 유일한 식별자로 사용되어야하며, URI가 다르다는 것은 리소스가 다르다는 것이고 역으로 리소스가 다르면 URI도 달라져야 함
   - REST API는 분명한 URI를 만들어 통신을 해야 하기 때문에, 혼동을 주지 않도록 URI 경로의 마지막에는 슬래시(/)를 사용하지 않음
   - Ex : `http://restapi.example.com/houses/apartments/`
3. 하이픈(-)은 URI 가독성을 높이는데 사용
   - 불가피하게 긴 URI경로를 사용하게 된다면 하이픈을 사용해 가독성 향상
4. 밑줄(_)은 URI에 사용하지 않음
5. URI 경로에는 소문자가 적합
6. 파일 확장자는 URI에 포함하지 않음
   - 대신, Accept header 사용
   - Ex) `http://restapi.example.com/members/soccer/345/photo.jpg` (X)
   - Ex) `GET / members/soccer/345/photo HTTP/1.1 Host: restapi.example.com Accept: image/jpg` (O)



### REST API 설계 예시

| CRUD                        | HTTP verbs | Route         |
| --------------------------- | ---------- | ------------- |
| resource들의 목록을 표시    | GET        | /resource     |
| resource 하나의 내용을 표시 | GET        | /resource/:id |
| resource를 생성             | POST       | /resource     |
| resource를 수정             | PUT        | /resource/:id |
| resource를 삭제             | DELETE     | /resource/:id |



## RESTful 개념

### RESTful이란

- RESTful은 일반적으로 REST라는 아키텍처를 구현하는 웹서비스를 나타내기 위해 사용되는 용어
  - "REST API"를 제공하는 웹서비스를 "RESTful"하다고 할 수 있음
- RESTful은 REST를 TEST답게 쓰기 위한 방법으로, 누군가가 공식적으로 발표한 것은 아님
  - 즉, REST 원리를 따르는 시스템은 RESTful이란 용어로 지칭



### RESTful 목적

- 이해하기 쉽고, 사용하기 쉬운 REST API를 만드는 것
- RESTful한 API를 구현하는 근본적인 목적이 성능 향상에 있는 것이 아니라, 일관적으로 컨벤션을 통한 API의 이해도 및 호환성을 높이는 것이 주 동기. → 성능이 중요한 상황에서는 굳이 RESTful한 API를 구현할 필요 없음



### RESTful 하지 못한 경우

- EX : CRUD 기능을 모두 POST로만 처리하는 API
- EX :  route에 resource, id 외의 정보가 들어가는 경우(/students/updateName)



### 참조 문서

- https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html
- https://ijbgo.tistory.com/20