# Python을 이용한 Memoization

[TOC]

## Memoization

- 이전에 계산한 값을 메모리에 저장함으로써, 동일한 계산의 반복 수행을 제거 → 프로그램 실행 속도를 빠르게 함
- 즉, 동일한 input에 대해 동일한 output이 나오도록 함
- 동적 계획법의 핵심이 되는 기술



## lru_cache를 이용한 Memoization

```python
@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

>>> [fib(n) for n in range(16)]
[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]

>>> fib.cache_info()
CacheInfo(hits=28, misses=16, maxsize=None, currsize=16)
```

- `lru_cache`  파라미터
  - maxsize : 저장할 호출 수
    - `None`  :  크기제한이 없음
    - `default` 값은 128
  - typed 
    - true : 다른 형의 함수 인자가 별도로 캐시. 예를 들어`f(3)`과 `f(3.0)`은 별개의 결과를 가진 별개의 호출로 취급됨
    - false : 다른 형의 함수 인자가 별도로 캐시되지 않음

- 다른 참조 예시

  ```python
  import time
  from functools import lru_cache
    
  @lru_cache()
  def expensive_fn(a, b):
      time.sleep(3)
      return a + b
  
  before = time.time()
  print(expensive_fn(1, 2))
  print('First called : {}'.format(time.time() - before))
  # First called : 3.004196882247925
  
  before = time.time()
  print(expensive_fn(1, 2))
  print('Second called : {}'.format(time.time() - before))
  # Second called : 0.0011920928955078125
  ```

## 참고자료

- https://planbs.tistory.com/entry/Python-memoize
- https://docs.python.org/ko/3/library/functools.html
- https://ddanggle.gitbooks.io/interpy-kr/content/ch23-Function-caching.html

