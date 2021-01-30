# HTTP 상태코드

[TOC]

모든 HTTP 응답코드는 5개의 클래스로 구분된다. 

상태 코드의 첫번재 숫자는 응답의 클래스를 정의, 나머지 두 자리는 클래스나 분류 역활 X



## 1XX : 정보성 상태 코드

상태코드가 1로 시작하는 경우는 서버가 요청을 받았으며, 서버에 연결된 클라이언트는 작업을 계속 진행하라는 의미.

 HTTP/1.1 에서 도입되어 HTTP 1.0에서 지원되지 않음

- 100 : `Continue`. 요청의 시작 부분 일부가 받아들여졌으며, 클라이언트는 나머지를 계속 이어서 보내야 함을 의미
- 101 : `Switching Protocol`.  요청자가 서버에 프로토콜 전환을 요청했으며, 서버에서 이를 승인하는 중을 의미
- 102 : `Processing`. 서버가 요청을 수신하였으며 이를 처리하고 있지만, 아직 제대로 된 응답을 알려줄 수 았음을 의미
- 103 : `Early Hints`. 주로 `Link`  헤더와 함께 사용되어, 서버가 응답을 준비하는 동안 사용자 에이전트가 사전로딩을 시작할 수 있도록 함



## 2XX : 성공 상태 코드

상태코드가 2로 시작하는 경우는 클라이언트가 요청한 동작을 서버가 수신하여 이해했고 승낙했으며 성공적으로 처리했음을 의미

- 200 : `OK `. 요청이 성공적으로 처리됨. 본문은 요청된 리소스를 포함
- 201 : `Created `. 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성됨. 이 응답은 일반적으로 POST 요청 또는 일부 PUT요청 이후에 따라옴
- 202 : `Accepted`. 요청을 수신하였지만, 그에 응하여 행동할 수 없음. 
  이 응답은 요청 처리에 대한 결과를 이후에 HTTP로 비동기 응답을 보내는 것에 대해서 명확하게 명시하지 X.
  다른 프로세스에서 처리 또는 서버가 요청을 다루고 있거나 배치 프로세스를 하고 있는 경우를 위해 만들어진 상태코드
- 203 : `Non-Authoritative Information`. 서버가 요청을 성공적으로 처리했지만, 다른 소스에서 수신된 정보를 제공하고 있음을 의미함
- 204 : `No Content`. 요청에 대해서 보내줄 수 있는 콘텐츠가 없지만, 헤더는 의미 있을 수 있음. 사용자-에이전트는 리소스가 캐시된 헤더를 새로운 것으로 업데이트 가능
- 205 : `Reset Content `. 요청을 성공적으로 처리했지만 콘텐츠 표시 X. 204 응답과 달리 이 응답은 요청자가 문서 보기를 리셋하라고 알려줌. (예시 : 새 입력을 위한 양식 비우기)
- 206 : `Partial Content `. 서버가 GET 요청의 일부만 성공적으로 처리함을 의미
- 207 : `Multi-Status `. 
- 208 : `ALREADY REPORTED`.
- 226 : `IM Used `.



## 3XX : 리다이렉션 상태 코드

상태코드가 3으로 시작하는 경우는 클라이언트는 요청을 마치기 위해, 추가 동적을 취해야 함을 의미

- 300 `Multiple Choice` : 요청에 대해 하나 이상의 응답 가능.서버가 사용자 에이전트에 따라 수행할 작업을 선택하거나, 요청자가 선택할 수 있는 작업 목록을 제공
- 301 `Moved Permanently` : 요청한 페이지를 새 위치로 영구적으로 이동. 
- 302 `Found` : 이 응답 코드는 요청한 리소스의 URI가 일시적으로 변경됨을 의미. 현재 서버가 다른 위치의 페이지로 요청에 응답하고 있지만, 요청자는 향휴 요청 시 원래 위치를 계속 사용해야 함을 알림.
- 303 `See Other` : 클라이언트가 요청한 리소스를 다른 URI에서 GET 요청을 통해 얻어야 할 때, 서버가 클라이언트로 직접 보내는 응답. HEAD 요청 이외의 모든 요청을 다른 위치로 자동으로 전달함.
- 304 `Not Modified` : 이전의 동일한 요청과 비교하여 변화가 없음을 의미 (단시간에 반복된 동일 요청에 대한 대응 코드)
- 305 `Use Proxy` : 직접적인 요청이 아니라 반드시 프락시(우회경로)를 통해 요청되어야 함을 의미
- 306 `Unused` : 이 응답 코드는 더이상 사용되지 않으며, 현재는 추후 사용을 위해 예약되어 있음
- 307 `Temporary Redirect` : 302와 동일하며, HTTP Method도 변경없이 요청하여야 함을 의미
- 308 `Permanent Redirect` : 301과 동일하며, HTTP Method도 변경없이 요청하여야 함을 의미



## 4XX : 요청 오류 상태 코드

- 400 `Bad Request` :
- 401 `Unauthorized` 
- 402 `Payment Required` 
- 403 `Forbidden` 
- 404 `Not found` 
- 405 `Method Not Allowed` 
- 406 `Not Acceptable` 
- 407 `Proxy Authentication Required` 
- 408 `Request Timeout` 
- 409 `Conflict` 
- 410 `Gone` 
- 411 `Length Required` 
- 412 `Precondition Failed` 
- 413 `Payooad Too Large` 
- 414 `URI Too Long` 
- 415 `Unsupported Media Type`  
- 416 `Requested Range Not Satisfiable`
- 417 `Expectatoin Failed`
- 418 `I'm a teapot`
- 421 `Misdirected Request`
- 422 `Unprocessable Entity`
- 423 `Locked`
- 424 `Failed Dependency`
- 426 `Upgrade Required`
- 428 `Precondition Required`
- 429 `Too Many Requests`
- 431 `Request Header Fields Too Large`
- 451 `Unavailable For Legal Reasons`



## 5XX : 서버 오류 상태 코드

서버가 유효한 요청을 명백하게 수행하지 못함을 나타냄 



## 참고자료

- https://developer.mozilla.org/ko/docs/Web/HTTP/Status
- https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C

- https://velog.io/@honeysuckle/HTTP-%EC%83%81%ED%83%9C-%EC%BD%94%EB%93%9C-HTTP-status-code-