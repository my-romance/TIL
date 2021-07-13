# gunicorn 설정

[TOC]

## gunicorn limit_request_line 파라미터 설정

flask + gunicorn를 통해 api를 사용하고 있는 도중, HTTP request의 길이가 4094가 넘어 에러가 발생함. 이를 해결하기위해 limit_request_line 파라미터 설정을 바꿔줘야하는 것을 알게됨

### limit_request_line

- byte 단위로 HTTP request의 최대 사이즈를 설정하는 파라미터.

- command line : `--limit-request-line INT` 

- Default value는 4094이고, HTTP request의 사이즈를 풀고 싶다면 0으로 설정하면 됨

- 자세한 설명

  > This parameter is used to limit the allowed size of a client’s HTTP request-line. Since the request-line consists of the HTTP method, URI, and protocol version, this directive places a restriction on the length of a request-URI allowed for a request on the server. A server needs this value to be large enough to hold any of its resource names, including any information that might be passed in the query part of a GET request. Value is a number from 0 (unlimited) to 8190.
  >
  > This parameter can be used to prevent any DDOS attack.





### 참고자료

- [gunicorn 공식문서](https://docs.gunicorn.org/en/stable/settings.html#settings)

