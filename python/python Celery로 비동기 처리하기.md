# python Celery로 비동기 처리하기

[TOC]



## Celery 

### Celery 란

- Flask는 프로세스를 동기적(Synchronous)으로 처리하기에 데이터 업로드와 같이 오래 걸리는 작업이나 무거운 연산 같은 경우 이를 처리할때까지 기다린다
- 따라서 비동기 작업 큐 라이브러리를 통해 이를 비동기로 처리하면 더욱 효울적인 프로그램이 됨
- 여기서 비동기 작업 큐 라이브러리 중에 하나가 Celery이다.



### Celery 구성

![celery 구성](https://miro.medium.com/max/1400/1*8sAxRHQpG6OKsijf7q7mpw.png)

1. **Celery Client**
   - 백그라운드 작업을 요청하는데 사용됨. 예를 들어 Flask framework에 celery를 적용한다면 Flask가 Celery Clinet가 됨
2. **Celery Workers** 
   - 작업을 처리함

3. **Message Broker**

   - 클라이언트는 메시지 쿠를 통해 worker와 통신하며 Celery는 이러한 큐를 구현하는 여러 방법을 지원. 

     가장 일반적으로 사용되는 브로커는 RabbitMQ 및 Redis.

     



## 브로커 및 Celery 설치

### 브로커 설치

브로커로 redis를 설치

```shell
docker run -d -p 6379:6379 redis
```

### Celery 설치

```shell
pip install celery
```



## Celery로 비동기 처리하기

### Celery 인스턴스 생성

```python
# test.py

from celery import Celery

app = Celery('tasks', backend='redis://localhost:6379', broker='redis://localhost:6379')

@app.task
def add(x, y):
    return x + y
```

Celery 인스턴스 생성을 위한 인자

- 위 예제의 첫번째 인자인 현재 모듈의 이름('tasks')  # `app.main`  -> `tasks`
- backend
  - task의 상태를 추적하기 위해서는 그 상태를 어딘가로 보내거나 저장함
  - 이를 위해 `SQLAlchemy`나 `Django ORM`, `Memcached`, `Redis`, `RPC(RabbitMQ/AMQP)` 정도의 result backend 선택지들이 있고 자체적으로 정의 하여 사용 가능
  - 즉, 일시적으로 메시지를 통해 상태를 보내기 위해 result backend 사용
- broker
  - 브로커 주소



### Celery 워커 서버 실행

`worker` 인자를 넣어 워커가 위에서 작성한 프로그램을 실행할 수 있도록 한다.

```shell
celery -A test worker --loglevel=INFO --autoscale=3,10
```

위 명령어의 결과가 정상적으로 실행된다면 아래와 같이 Celery가 준비가 되었다고 뜸

```shell
[config]
.> app:         tasks:0x7fba139527b8
.> transport:   redis://localhost:6379//
.> results:     redis://localhost:6379/
.> concurrency: {min=3, max=10} (prefork)
.> task events: OFF (enable -E to monitor tasks in this worker)

[queues]
.> celery           exchange=celery(direct) key=celery

[tasks]
  . test.add

[2021-06-05 16:31:38,262: INFO/MainProcess] Connected to redis://localhost:6379//
[2021-06-05 16:31:38,276: INFO/MainProcess] mingle: searching for neighbors
[2021-06-05 16:31:39,318: INFO/MainProcess] mingle: all alone
[2021-06-05 16:31:39,352: INFO/MainProcess] celery@MacBook-Pro ready.
```



### task 호출

task 호출은 `delay()` 나 `apply_async()` 를 통해 가능하다

https://heodolf.tistory.com/63

아래 코드 처럼 `delay()` 를 통해 task 호출

```python
>>> from test import add
>>> add.delay(4, 4)
<AsyncResult: 941a4782-c6f8-4a80-8de8-950c818a007c>
```

task를 호출하면 아래와 같이 워커 콘솔에 출력됨

```shell
[2021-06-05 16:37:03,478: INFO/MainProcess] Task test.add[941a4782-c6f8-4a80-8de8-950c818a007c] received
[2021-06-05 16:37:03,494: INFO/ForkPoolWorker-2] Task test.add[941a4782-c6f8-4a80-8de8-950c818a007c] succeeded in 0.013811257999805093s: 3
```



아래 코드처럼 `ready()` 를 통해 호출된 task의 작업이 완료되었는지 확인 가능.

```python
>>> from test import add
>>> result = add.delay(4, 4)
>>> result.ready()
True
```



아래 코드처럼 `get()` 를 통해 task로 처리된 값을 얻을 수 있음

```python
>>> from test import add
>>> result = add.delay(4, 4)
>>> result.get()
8
```



또한 아래 코드처럼 task가 예외가 발생했다면 `traceback`  변수를 통해 확인 가능. (하지만 예외가 발생하지 않아서인지 아무것도 출력이 되지 않았음)

```python
>>> from test import add
>>> result = add.delay(4, 4)
>>> result.traceback
```



> 주의: Backend는 리소스를 사용하여 결과를 전송하고 저장함. 리소스를 해제하려면 task 호출이후 리턴된 모든 `AsyncResult` 인스턴스에 `get()` 또는 `forget()` 메소드를 사용해야 한다.

- get 활용 방법 좀 더 알아보기 (timeout=1) 등등
- dealy방법과 apply_async 방법의 차이 작성하기

## 참고자료

- https://velog.io/@yvvyoon/celery-first-step-1
- https://velog.io/@yvvyoon/celery-first-step-2

- https://medium.com/sunhyoups-story/celery-b96eb337b9cf
- https://heodolf.tistory.com/63
- https://flask.palletsprojects.com/en/1.1.x/patterns/celery/#an-example-task