# asyncio

비동기 프로그램을 위한 모듈이며, CPU 작업과 I/O를 병렬적으로 처리하게 해줌

## Coroutines & Tasks

### 코루틴

- async/await 문법으로 선언된 코루틴은 asyncio 응용프로그램을 작성하는 기본 방법

### 코루틴 3가지 실행방법

1. asyncio.run() 활용 : 최상위 진입점 함수를 실행

   ```python
   >>> import asyncio
   
   >>> async def main():
   ...     print('hello')
   ...     await asyncio.sleep(1)
   ...     print('world')
   
   >>> asyncio.run(main())
   hello
   world
   
   >>> main() # 단지 코루틴을 호출하는 것이 이를 실행되도록 예약하는 것 X.
   <coroutine object main at 0x1053bb7c8>
   ```

2. await 활용

    ```python
    import asyncio
    import time
    
    async def say_after(delay, what):
        await asyncio.sleep(delay)
        print(what)
    
    async def main():
        print(f"started at {time.strftime('%X')}")
    
        await say_after(1, 'hello')
        await say_after(2, 'world')
    
        print(f"finished at {time.strftime('%X')}")
    
    asyncio.run(main())
    ```

   ```python
   started at 17:13:52
   hello
   world
   finished at 17:13:55
   ```

3. asyncio.create_task() 활용 : task를 미리 만든 후, 이를 실행시킬 수 있음. 하나씩 만들고 실행시키는 것보다, 미리 만들어두고 이를 한번에 실행시키는 것이 총 코루틴을 실행시키는 시간에 대해 상대적으로 짧다

   ```python
   async def main():
       task1 = asyncio.create_task(
           say_after(1, 'hello'))
   
       task2 = asyncio.create_task(
           say_after(2, 'world'))
   
       print(f"started at {time.strftime('%X')}")
   
       # Wait until both tasks are completed (should take
       # around 2 seconds.)
       await task1
       await task2
   
       print(f"finished at {time.strftime('%X')}")
   ```

   ```python
   started at 17:14:32
   hello
   world
   finished at 17:14:34
   ```

### Awaitables

객체가 'await' 표현식에 사용될때, await able 객체라 부른다. awaitable 객체는 총 3가지이다.

- Coroutine : python Coroutine are awaitbles and therefore can be awaited from other coroutines. 

  ```python
  import asyncio
  
  async def nested():
      return 42
  
  async def main():
      # Nothing happens if we just call "nested()".
      # A coroutine object is created but not awaited,
      # so it *won't run at all*.
      nested()
  
      # Let's do it differently now and await it:
      print(await nested())  # will print "42".
  
  asyncio.run(main())
  
  ```

  <주의> 여기서 coroutine이라는 용어는 2가지 콘셉으로 볼 수 있다. 

  1. coroutine function : async def function
  2. coroutine object : object returned by calling a coroutine function

- Tasks : task는 coroutine을 동시에 스케줄링하는데 사용된다. asyncio.create_task() 와 같은 함수를 통해 하나의 coroutine이 task가 되어 해당 coroutine이 run가 동시에 자동으로 스케줄링되도록 한다

  ```Python
  import asyncio
  
  async def nested():
      return 42
  
  async def main():
      # Schedule nested() to run soon concurrently
      # with "main()".
      task = asyncio.create_task(nested())
  
      # "task" can now be used to cancel "nested()", or
      # can simply be awaited to wait until it is complete:
      await task
  
  asyncio.run(main())
  ```

- Futures : future은 special low level awaitable object로, 비동기 연산의 최종 결과를 나타낸다. async/ await와 함께 콜백 기반 코드를 사용하려면 asyncio의 future object가 필요하지만, 일반적인 응용 프로그램 수준 코드에서 Furture 객체를 직접 만들 필요는 없다.

  ```python
  async def main():
      await function_that_returns_a_future_object()
  
      # this is also valid:
      await asyncio.gather(
          function_that_returns_a_future_object(),
          some_python_coroutine()
      )
  ```

### asyncio 프로그램 실행하기

- asyncio.run(coro, *, debug=False) : 코루틴을 실행시키고, 결과를 반환. 또한 asyncio event loop, finalizing asynchronous generators, closing the threadpool 관리. 항상 새 이벤트 루프를 만들고 끝에 이벤트 루프를 닫음. asyncio 프로그램의 메인 진입 지점으로 사용해야 하며 (이때  main()함수를 호출한다는 의미 X. 메인 전입지점으로 사용하고자 하는 함수이면 됨), 이상적으로는 한번만 호출해야 함

  ```python
  async def preprocess_reviews():
    ...
  
  def convert_input_to_dataset(self, review_sens, pad_token_label_id):
          
      preprocessed_reviews = asyncio.run(preprocess_reviews(review_sens, self.spacing))
      ...
  ```

  다른 asyncio 이벤트 루프가 같은 스레드에서 실행중일때 , 이 함수를 호출할 수 X

### Creating Tasks

- asyncio.create_task(coro, *, name=None) : 코루틴을 task로 감싸고, 실행 예약. Task     객체 반환

### Sleeping

- asyncio.sleep(delay, result=None)

### Running tasks Concurrently

- Asyncio.gather(*aws, return_exceptions=False) : aws 시퀀스에 있는 어웨이터블 객체를 동시에 실행. 모든 어웨이터블 객체들이 성공적으로 완료되면, 결과는 반환된 값들이 합쳐진 리스트를 반환. 이때 결과값이 들어있는 순서는 aws에 있는 어웨이터블 객체의 순서와 일치.

  

  return_exceptions가 False이면 예외가 발생하면 즉시 에러를 발생시킴. return_exceptions가 True이면 예외가 발생하더라도 에러를 발생시키지 않고, 결과 리스트에 에러 정보를 담아 다른 크루틴 함수 결과들과 함께 반환. 

  ```python
  # return_exceptions=False
  async def factorial(name, number):
      f = 1
      if number == 4:
          raise ValueError('에러')
      for i in range(2, number + 1):
          print(f"Task {name}: Compute factorial({i})...")
          await asyncio.sleep(1)
          f *= i
      print(f"Task {name}: factorial({number}) = {f}")
      return f
  
  async def main():
      # 동시에 3개를 예약
      result = await asyncio.gather(
          factorial("A", 2),
          factorial("B", 3),
          factorial("C", 4),
          return_exceptions=False
      )
  
      print(result)
  
  asyncio.run(main())
  
  # 결과
  >>> ValueError: 에러
  ```

  ```python
  # return_exceptions=True
  async def main():
      # 동시에 3개를 예약
      result = await asyncio.gather(
          factorial("A", 2),
          factorial("B", 3),
          factorial("C", 4),
          return_exceptions=True
      )
  
      print(result)
  
  asyncio.run(main())
  
  # 결과
  >>> Task A: Compute factorial(2)...
  >>> Task B: Compute factorial(2)...
  >>> Task A: factorial(2) = 2
  >>> Task B: Compute factorial(3)...
  >>> Task B: factorial(3) = 6
  >>> [2, 6, ValueError('에러')]
  ```

  `gather()`가 *취소되면*, 모든 제출된 (아직 완료되지 않은) 어웨이터블도 *취소됩니다*.

  *aws* 시퀀스의 Task나 Future가 취소되면,  [`CancelledError`](https://docs.python.org/ko/3/library/asyncio-exceptions.html#asyncio.CancelledError)를 일으킨 것처럼 처리됨. 이때 gather() 호출은 취소되지 않음.





## 참고자료

- [코루틴과 테스크](https://docs.python.org/ko/3/library/asyncio-task.html#running-an-asyncio-program)

- [[Python\] asyncio 파헤치기](https://brownbears.tistory.com/540)