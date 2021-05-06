# locust를 이용한 부하테스트

[TOC]

## locust 설치 방법

```shell
pip install locust
```



## locust를 이용한 부하테스트

### 부하테스트를 위한 코드 작성

아래 코드에 대한 설명은 [locust 문서](https://docs.locust.io/en/stable/quickstart.html#example-locustfile-py)에 잘 나와있음

```python
# example locustfile
import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2.5)

    @task
    def hello_world(self):
        self.client.get("/hello")
        self.client.get("/world")

    @task(3)
    def view_items(self):
        for item_id in range(10):
            self.client.get(f"/item?id={item_id}", name="/item")
            time.sleep(1)

    def on_start(self):
        self.client.post("/login", json={"username":"foo", "password":"bar"})
```

- 하나의 부하테스트 task에 해당하는 함수에 @task 데코레이터 사용
  - 이때 예제에서는 task, task(3)을 사용했는데 괄호안에 숫자가 호출 비율을 의미.
  - 즉,  view_items() 함수 호출 비율이 hello_world() 함수 호출 비율보다 3배 많음
- between(a, b) : user의 대기시간을 a에서 b사이로 설정함
  - between(1, 2.5) - `When a task has finished executing, the User will then sleep during it’s wait time (in this case between 1 and 2.5 seconds)` 
- on_start() : 부하테스트 시작할 때 시행
- on_stop() : 부하테스트 끝날 대 시행

### locust 부하 테스트 시행

**1.1** 해당 파일이 현재 directory에 있는 경우

```shell
locust
```

**1.2** 해당 파일이 현재 directory에 없는 경우

```shell
locust -f 해당 폴더/해당 파일
```

**2.** locust 브라우저 열기

**3.** user수, Spawn rate, host 설정 후 `start swarming` 시행

![1*wZUc_UqvKKGKXgqRgvblWw](https://ichi.pro/assets/images/max/724/1*wZUc_UqvKKGKXgqRgvblWw.png)

**4.**  `statistics ` 결과 확인

- **# Requests** : 지금까지 이루어진 총 요청 수

- **# Fails** : 실패한 요청 수
- **Median (ms)** : 50 백분위 수에 대한 응답 속도 (ms)
- **90%ile (ms)** : 90 백분위 수에 대한 응답 속도 (ms)
- **Average (ms)** : 평균 응답 속도 (ms)
- **Min (ms)** : 최소 응답 속도 (ms)
- **Max (ms)** : 최대 응답 속도 (ms)
- **Average size (bytes)** : 평균 응답 크기 (바이트)
- **Current RPS** : 현재 초당 요청
- **Current Failure/s** : 초당 총 실패 수

**5.**  `charts ` 결과 확인

## 참고자료

- [locust 문서](https://docs.locust.io/en/stable/quickstart.html#example-locustfile-py)
- https://ichi.pro/ko/locust-sogae-python-ui-opeun-soseu-buha-teseuteu-dogu-2967430144511