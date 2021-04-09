# python 정적메소드 (classmethod, staticmethod)

[TOC]

## classmethod와 staticmethod

- 정적 메소드 : 클래스의 인스턴스로 접근하는 것이 아닌, 클래스에서 직접 접근할 수 있는 메소드

- 파이썬에는 staticmedthod와 classmethod가 이에 해당. 사실 정확하게 구분한다면, staticmethod가 정적메소드이고, classmethod가 클래스메소드.

- 다른 언어와 다르게 파이썬에서는 정적메소드(classmethod, staticmethod)임에도 불구하고 인스턴스에서도 접근 가능.

- 예시

  ```python
  class CustomClass:
  
      # instance method -> 첫번째 인자로 객체 자신 "self"을 입력
      def add_instance_method(self, a,b):
          return a + b
  
      # classmethod -> 첫번째 인자로 클래스를 입력
      @classmethod
      def add_class_method(cls, a, b):
          return a + b
  
      # staticmethod -> 특별히 추가되는 인자 X
      @staticmethod
      def add_static_method(a, b):
          return a + b
  ```



## staticmethod

- `@staticmethod` 데코레이터 사용해줌

- 위에서 설명했듯이, 클래스의 인스턴스로 접근하는 것이 아닌 클래스에 직접 접근하는 메소드.

- 예시

  ```python
  class Simple:
  	count = 0
  	def __init__(self):
      Simple.count += 1
     
    @staticmethod
    def sm_get_count():
      print('static method!')
      return Simple.count
    
  def main():
    print(Simple.sm_get_count())  # 0. staticmethod는 인스턴스 없이 클래스에 점근가능
    
    s1 = Simple()
    s2 = Simple()
    s3 = Simple()
    s4 = Simple()
    
    print(Simple.sm_get_count()) # static method!, 4
    print(s1.sm_get_count())  # static method!, 4. staticmethod는 instance로도 접근 가능
  
  
  main()
  ```

  

## classmethod

- `@classmethod` 데코레이터 사용해줌
- **첫번째 매개변수로 클래스 인스턴스가 아닌 클래스 자체가 넘어오게 됨.**

- 예시

  ```python
  class Simple:
  	num = 5
  	
  	@staticmethod
    def sm(i):
      print('static : 5 + {0} = {1}'.format(i, Simple.num + i))
      
    @classmethod
    def cm(cls, i):
      print('class : 5 + {0} = {1}'.format(i, Simple.num + i))
      
  def main():
    Simple.sm(3)	# class : 5 + 3 = 8
    Simple.cm(3)	# class : 5 + 3 = 8
    
    s = Simple()
    s.sm(4)  # class : 5 + 4 = 9
    s.cm(4)  # class : 5 + 4 = 9
    
  main()
  ```

- `cls` 에 전달되는 것이 클래스이므로, 이를 기반으로 객체 생성 가능

  ```python
  class Natural
  	def __init__(self, n):
    	self.n = n
    def get_n(self):
      return self.n
    
    @classmethod
    def add(cls, n1, n2):
      return cls(n1.get_n() + n2.get_n())  # Natural(n) 객체 생성 후 반환
    
  def main():
    n1 = Natural(10)
    n2 = Natural(20)
    n3 = Natural.add(n1, n2)  # classmethod 호출 -> 반환되는 Natural(n) 객체를 n3에 저장
    
    print(n1.get_n())  # 10
    print(n2.get_n())  # 20
    print(n3.get_n())  # 30
  
  main()
  ```

  ```python
  class Date:
  	def __init__(self, y, n, d):
  		self.year = y
      self.month = m
      self.day = d
     
    def show(self):
      print('{0}. {1}. {2}'.format(self.year, self.month, self.day))
     
    @classmethod
    def next_day(cls, today):
      return cls(today.year, today.month, today.day+1)
    
  def main():
    d1 = Date(2020, 4, 5)
    d1.show()  # 2020. 04. 05
    d2 = Date.next_day(d1)
    d2.show()  # 2020. 04. 06. 
  ```

- 오버로딩(overloading) 지원

  ```python
  class User:
      def __init__(self, email, password):
          self.email = email
          self.password = password
  
      @classmethod
      def fromTuple(cls, tup):
          return cls(tup[0], tup[1])
  
      @classmethod
      def fromDictionary(cls, dic):
          return cls(dic["email"], dic["password"])
  ```

  ```python
  # 기본 생성자로 객체 생성
  >>> user = User("user@test.com", "1234")
  >>> user.email, user.password
  ('user@test.com', '1234')
  ```

  ```python
  # 클래스 메소드 tuple로부터 객체 생성
  >>> user = User.fromTuple(("user@test.com", "1234"))
  >>> user.email, user.password
  ('user@test.com', '1234')
  ```

  ```python
  # 클래스 메소드 dic로부터 객체 생성
  >>> user = User.fromDictionary({"email": "user@test.com", "password": "1234"})
  >>> user.email, user.password
  ('user@test.com', '1234')
  ```

  



## classmethod와 staticmethod의 차이

- classmethod는 `cls` 인 클래스 자체를 반환

  ```python
  class Animal:
  	language = '울음소리'
    
    def __init__(self):
      self.sound = '동물 울음소리 : ' + self.language
     
    @classmethod
    def cls_language(cls):
      return cls()
    
    @staticmethod
    def stc_language():
      return Animal()
  
    def show(self):
      print(self.sound)
  
  class Dog(Animal):
    language = '멍멍'
    
  def main():
    a = Animal.cls_language()
    b = Animal.stc_language()
    print(a.show())  # 동물 울음소리 : 울음소리. 부모클래스의 속성값
    print(b.show())  # 동물 울음소리 : 울음소리. 부모클래스의 속성값
    
    c = Dog.cls_language()
    d = Dog.stc_language()
    print(c.show())  # 동물 울음소리 : 멍멍. cls 클래스의 속성값
    print(d.show())  # 동물 울음소리 : 울음소리. 부모클래스의 속성값
      
  ```

- 클래스 변수 접근 방법

  - staticmethod : 정적변수를 통한 접근

    ```python
    #staticmethod
    class hello:
        num = 10
    
        @staticmethod
        def calc(x):
            return x + 10 + hello.num
    
    print(hello.calc(10))
    #결과
    30
    ```

  - classmethod : cls를 통한 접근

    ```python
    #classmethod
    class hello:
        num = 10
    
        @classmethod
        def calc(cls, x):
            return x + 10 + cls.num
    
    print(hello.calc(10))
    #결과
    30
    ```

- 상속에서의 차이점

  - staticmethod : 부모 클래스의 클래스 속성값을 가져옴

  -  classmethod : cls인자를 활용하여 cls 클래스 속성값을 가져옴

  - 예시 

    ```python
    # language.py
    class Language:
        default_language = "English"
    
        def __init__(self):
            self.show = '나의 언어는' + self.default_language
    
        @classmethod
        def class_my_language(cls):
            return cls()
    
        @staticmethod
        def static_my_language():
            return Language()
    
        def print_language(self):
            print(self.show)
    
    class KoreanLanguage(Language):
        default_language = "한국어"
    ```

    ```python
    >>> from language import *
    >>> a = KoreanLanguage.static_my_language()
    >>> b = KoreanLanguage.class_my_language()
    >>> a.print_language()
    나의 언어는English
    >>> b.print_language()
    나의 언어는한국어
    ```





## 참고자료

- https://wikidocs.net/21054
- https://goodthings4me.tistory.com/66
- https://wikidocs.net/16074
- https://www.daleseo.com/python-class-methods-vs-static-methods/





