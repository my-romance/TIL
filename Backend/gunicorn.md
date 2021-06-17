# gunicorn

[TOC]

## gunciron

### gunicorm이란

- Python WSGI HTTP Server for UNIX

- 즉, WSGI의 일종

  

### WSGI이란

- WSGI (Web Server Gateway Interface)
  - 웹서버와 웹 애플리케이션의 인터페이스를 위한 파이썬 프레임워크.
  - 웹서버에서의 요청을 해석하여 파이썬 응용프로그램에 던지는 역활
- WSGI는 CGI에서 파생된 개념으로, CGI와 다른 방식으로 일을 하나 목적은 비슷하다고 보면 될 듯.
  - 기존의 파이썬 웹 애플리케이션 프레임워크는 웹 서버를 선택하는데 제약이 있어, 보통 GCI, FastCGI, mode_python과 같은 커스텀 API 중에 하나만 사용할 수 있도록 디자인 되었음.
  - WSGI는 이에 반하여 low-level로 만들어져 웹서버와 웹 애프리케이션, 프레임워크 간의 벽을 허물었음

### CGI란

- CGI (Common Gateway Interface)
  - 웹서버와 외부 프로그램 사이에서 정보를 주고받는 방법이나 규약을 의미.
  - 동적인 웹을 개발하기위해서는 사용자들이 입력하는 데이터를 처리할 로직이 필요했고, 이를 외부 프로그램을 통해 처리.
    개발자들은 각자 자신이 사용하던 언어를 사용하기에 언어가 제각각 → 제각각의 언어들이 사용자들의 다양한 요청(http request)을 이해할 수 있게 정해놓은 규약이나 프로그램이 GCI ( [링크참조](https://this-programmer.tistory.com/entry/gunicorn%EC%9D%80-%EB%8C%80%EC%B2%B4-%EB%AD%90%ED%95%98%EB%8A%94-%EB%86%88%EC%9D%BC%EA%B9%8C-%EB%B6%80%EC%A0%9C-CGI-WSGI%EB%8A%94-%EB%8C%80%EC%B2%B4-%EB%AD%90%EB%83%90) )



## 참고자료

- [위키백과 : WSGI](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%84%9C%EB%B2%84_%EA%B2%8C%EC%9D%B4%ED%8A%B8%EC%9B%A8%EC%9D%B4_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4)
- [gunicorn 공식문서](https://docs.gunicorn.org/en/stable/)
- https://this-programmer.tistory.com/entry/gunicorn%EC%9D%80-%EB%8C%80%EC%B2%B4-%EB%AD%90%ED%95%98%EB%8A%94-%EB%86%88%EC%9D%BC%EA%B9%8C-%EB%B6%80%EC%A0%9C-CGI-WSGI%EB%8A%94-%EB%8C%80%EC%B2%B4-%EB%AD%90%EB%83%90

