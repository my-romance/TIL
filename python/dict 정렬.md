## 딕셔너리 정렬

<br>

### key를 이용한 정렬

<b>순정렬</b>

````python
dict = {'d':1, 'c':2, 'b':3, 'a':4}
sortedDict = sorted(dict.items())
# items() 함수는 key-value 쌍이 tuple로 구성된 리스트를 리턴
````

````python
# 결과 : [('a', 4), ('b', 3), ('c', 2), ('d', 1)]

````

<b>역정렬</b>

````python
dict = {'d':1, 'c':2, 'b':3, 'a':4}
sortedDict = sorted(dict.items(), reverse=True)
````

````python
# 결과 : [('d', 1), ('c', 2), ('b', 3), ('a', 4)]
````

### value를 이용한 정렬

<b>순정렬</b>

````python
sortedDict = sorted(dict.items(), key = lambda item : item[1])
````

````python
# 결과 : [('d', 1), ('c', 2), ('b', 3), ('a', 4)]
````

<b>역정렬</b>

````python
sortedDict = sorted(dict.items(), key = lambda item : item[1], reverse=True)
````

````python
# 결과 : [('a', 4), ('b', 3), ('c', 2), ('d', 1)]
````

즉, 사용용도에 따라 key와 reverse 파라미터 값만 설정해주면 됨


### 출처

- https://rfriend.tistory.com/473
- https://kkamikoon.tistory.com/138
