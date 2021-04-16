# python Magic Method

[TOC]

## Magic Method

- 클래스안에 정의할 수 있는 스페셜 메소드
- 클래스를 int, str, list등의 파이썬의 빌트인 타입(build-in type)과 같은 작동을 하게 함
- +, -. >, < 등의 operator에 대해서 각각의 데이터 타입에 맞는 메소드로 오버로딩하여 연산
- \_\_init\_\_ 이나 \_\_str\_\_ 과 같이 메소드 이름 앞뒤에 더블 언더스코어("__")를 붙임



## operator를 오버로딩하는 Magic Method

```python
# 숫자(int)의 덧셈
print(1+2)
# 매직 메소드로 덧셈
print((1).__add__(2))

# 리스트의 덧셈
print([1,2,3] + [4,5,6])
# 매직 메소드로 덧셈
print(([1,2,3]).__add__([4,5,6]))
```



### 사용자 정의 클래스에 Magic Method 적용

- \_\_init\_\_

  ```python
  # -*- coding: utf-8 -*-
  
  class Food(object):
      def __init__(self, name, price):
          self.name = name
          self.price = price
  
  food_1 = Food('아이스크림', 3000)
  
  # 인스턴스 출력
  print(food_1)
  ```

- \_\_str\_\_ : 사용자에게 유익한 정보 제공을 위해

  ```python
  # -*- coding: utf-8 -*-
  
  class Food(object):
      def __init__(self, name, price):
          self.name = name
          self.price = price
          
      def __str__(self):
          return '아이템: {}, 가격: {}'.format(self.name, self.price)
  
  food_1 = Food('아이스크림', 3000)
  
  # 인스턴스 출력
  print(food_1) # 출력 : 아이템: 아이스크림, 가격: 3000
  ```

- \_\_lt\_\_ : 크기 비교 설정

  ```python
  # -*- coding: utf-8 -*-
  
  class Food(object):
      def __init__(self, name, price):
          self.name = name
          self.price = price
          
      def __lt__(self, other):
          if self.price < other.price:
              return True
          else:
              return False
  
  food_1 = Food('아이스크림', 3000)
  food_2 = Food('햄버거', 5000)
  food_3 = Food('콜라', 2000)
  
  # food_2가 food_1보다 큰지 확인
  print(food_1 < food_2)  # 3000 < 5000 -> True
  print(food_2 < food_3)  # 5000 < 2000 -> False
  ```

- \_\_add\_\_ 

  ```python
  # -*- coding: utf-8 -*-
  
  class Food(object):
      def __init__(self, name, price):
          self.name = name
          self.price = price
          
      def __add__(self, other):
          return self.price + other.price
  
  food_1 = Food('아이스크림', 3000)
  food_2 = Food('햄버거', 5000)
  
  print(food_1 + food_2)
  ```



## Magic Method 종류

### Binary Operators

| Operator | Method                                |
| :------- | :------------------------------------ |
| +        | object.__add__(self, other)           |
| -        | object.__sub__(self, other)           |
| *        | object.__mul__(self, other)           |
| //       | object.__floordiv__(self, other)      |
| /        | object.__div__(self, other)           |
| %        | object.__mod__(self, other)           |
| **       | object.__pow__(self, other[, modulo]) |
| >>       | object.__lshift__(self, other)        |
| <<       | object.__rshift__(self, other)        |
| &        | object.__and__(self, other)           |
| ^        | object.__xor__(self, other)           |
| \|       | object.__or__(self, other)            |

### Extended Assignments

| Operator | Method                                 |
| :------- | :------------------------------------- |
| +=       | object.__iadd__(self, other)           |
| -=       | object.__isub__(self, other)           |
| *=       | object.__imul__(self, other)           |
| /=       | object.__idiv__(self, other)           |
| //=      | object.__ifloordiv__(self, other)      |
| %=       | object.__imod__(self, other)           |
| **=      | object.__ipow__(self, other[, modulo]) |
| <<=      | object.__ilshift__(self, other)        |
| >>=      | object.__irshift__(self, other)        |
| &=       | object.__iand__(self, other)           |
| ^=       | object.__ixor__(self, other)           |
| \|=      | object.__ior__(self, other)            |

### Unary Operators

| Operator  | Method                   |
| :-------- | :----------------------- |
| -         | object.__neg__(self)     |
| +         | object.__pos__(self)     |
| abs()     | object.__abs__(self)     |
| ~         | object.__invert__(self)  |
| complex() | object.__complex__(self) |
| int()     | object.__int__(self)     |
| long()    | object.__long__(self)    |
| float()   | object.__float__(self)   |
| oct()     | object.__oct__(self)     |
| hex()     | object.__hex__(self)     |

### Comparision Operators

| Operator | Method                     |
| :------- | :------------------------- |
| <        | object.__lt__(self, other) |
| <=       | object.__le__(self, other) |
| ==       | object.__eq__(self, other) |
| !=       | object.__ne__(self, other) |
| >=       | object.__ge__(self, other) |
| >        | object.__gt__(self, other) |

## 참고자료

- http://schoolofweb.net/blog/posts/%ED%8C%8C%EC%9D%B4%EC%8D%AC-oop-part-6-%EB%A7%A4%EC%A7%81-%EB%A9%94%EC%86%8C%EB%93%9C-magic-method/

