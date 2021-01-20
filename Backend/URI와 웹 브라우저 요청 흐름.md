# URI와 웹 브라우저의 요청 흐름



## URI

### URI, URL, URN

- URI (Uniform Resource Identifier)

  -  로케이터(Uniform Resource Location), 이름(Uniform Resource Name) 또는 둘 다로 분류 될 수 있음
  - URI라는 큰 개념은 리소스를 식별하는 것. 즉, 로케이터와 이름을 식별하는 방법을 의미.

- URL과 URN

  - URL : 리소스의 위치를 지정
  - URN : 리소스의 이름을 부여

  - URN은 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되어 있지 않기때문에 거의 URL 만을 사용
    ![스크린샷 2020-12-26 오후 7.10.44](https://media.vlpt.us/images/gparkkii/post/20832403-90a6-41c0-b609-f795e22a2b7f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-12-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.10.44.png) 



### URI 알아보기

- URI 단어 의미
  - Uniform : 리소스를 식별하는 통일된 방식
  - Resource : URI로 식별할 수 있는 모든 것(제한 없음)
  - Identifier : 다른 항목과 구분하는데 필요한 정보
- URI 문법
  `https://www.google.com:443/search?q=hello&hl=ko`
  - 프로토콜(Protocol) : https
  - 호스트명(Host)  : www.google.com
  - 포트번호(PORT) : 443
  - 패스(PATH) : /search
  - 쿼리 파라미터 (Query Parameter) : ?q=hello&hl=ko



### URL 구조

- URL Scheme

  - 예시

    **scheme**: [userinfo@]host\[:port]\[/path]\[?query][#fragment]

    **https**://www.google.com:433/search?q=hello&hl=ko

  - 스키마는 주로 프로토콜 사용
    - 프로토콜 : 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙. 즉, 통신 규약. http, https, hfp 등이 있음
      - https(HTTP Secure) : http에 강력한 보안 추가

- URL User Info

  - 예시

    scheme: **[userinfo@]**host\[:port]\[/path]\[?query][#fragment]

    *https:*//www.google.com:433/search?q=hello&hl=ko

  - URL에 사용자 정보를 포함해서 인증하는 용도. 잘 사용되지는 않음

- URL Host

  - 예시

    scheme: [userinfo@]**host**[:port]\[/path][?query][#fragment]

    *https*://**www.google.com**:433/search?q=hello&hl=ko

  - 호스트 명으로, 도메인 이름 또는 IP 주소 사용 가능

- URL Port

  - 에시

    scheme: [userinfo@]host**[:port]**\[/path][?query][#fragment]

    *https*://www.google.com:**433**/search?q=hello&hl=ko

  - 일반적으로 웹브라우저에서는 생략가능하지만, 특정 서버에 따로 접근해야 할 경우 명시 해야함

- URL Path

  - 예시

    scheme: [userinfo@]host[:port]**[/path]**[?query][#fragment]

    *https://*www.google.com:433/**search**?q=hello&hl=ko

  - 리소스의 경로로 계층적 구조를 이룸
  - Path 다른 예시
    - /home/file1/jpg
    - /members
    - /members/100,/items/iphone12

- URL Query

  - 예시

    scheme: [userinfo@]host[:port][/path]**[?query]**[#fragment]

    *https*://www.google.com:433/search**?q=hello&hl=ko**

  - ?로 시작하고 그 뒤에 key와 value 쌍이  `Key=Value` 형태로 사용. 여러 key, value 쌍을 사용할 경우 &으로 연결
    - `?key1=value1&key2=value2`

- URL Fragment

  - 예시

    scheme: [userinfo@]host[:port][/path][?query]**[#fragment]**

    *https://*docs.spring.io/spring-boot/docs/current/reference/html/getting-started.html**#getting-started-introducing-spring-boot**

  - html 내부 북마크 등에 사용되며, 서버에 전송되는 정보는 아님





## 웹 브라우저 요청 흐름

### HTTP 요청 메시지

- HTTP : HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 프로토콜

- URI를 통해 웹 브라우저는 DNS 서버에서 IP 조회 → HTTP PORT 정보를 찾아낸 후, HTTP 요청 메시지 생성

  <img src="https://media.vlpt.us/images/gparkkii/post/d56c4e01-208c-4afd-8d30-e1795818baff/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-12-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.46.03.png" alt="스크린샷 2020-12-26 오후 7.46.03" style="zoom:30%;" />

### HTTP 메시지 전송

![2203DD9C-0A7E-4521-AE3C-C2204E5C375E](https://media.vlpt.us/images/gparkkii/post/b29b3137-a58d-4441-ae5e-32c9550464d5/2203DD9C-0A7E-4521-AE3C-C2204E5C375E.jpeg)

### 패킷 내부의 HTTP 데이터

![301BAB6F-FED0-4703-82B3-0AE615BEDEC7](https://media.vlpt.us/images/gparkkii/post/7c9a17a0-8818-4cc6-b925-70844d388968/301BAB6F-FED0-4703-82B3-0AE615BEDEC7.jpeg)

### 패킷 전송 프로세스

1. 패킷 전송
   <img src="https://media.vlpt.us/images/gparkkii/post/b578158e-cdd4-4155-85b1-057306eb5600/A700DD7E-F066-4A8B-9663-5414AD609C0A.jpeg" alt="패킷 전송" style="zoom:40%;" />

2. 응답 메시지 생성

   ![HTTP 응답 메시지](https://media.vlpt.us/images/gparkkii/post/358a0a7f-3902-41be-8067-0e5b745e7c2e/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202020-12-26%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%207.49.30.png)
   

3. 응답 메시지 전달

   - 응답 메시지를 패킷에 담아 전달

   <img src="https://media.vlpt.us/images/gparkkii/post/c283baed-7d51-4e0c-aed3-721c6f4a6953/5304F9C4-0727-4822-B9F3-4DDDA71F3C34.jpeg" alt="응답 메시지 전달" style="zoom:40%;" align = "left"/>

4. 브라우저 HTML 렌더링
   <img src="https://media.vlpt.us/images/gparkkii/post/a395d827-d251-4c06-9524-4c7d2f88a648/97673BBC-B23D-4045-BE02-5D7BFA53F51C.jpeg" alt="브라우저 HTML 렌더링" style="zoom:40%;" />



### 참고 자료

- https://velog.io/@gparkkii/URIwebprocess