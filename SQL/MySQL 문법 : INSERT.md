# MySQL 문법 : INSERT

MySQL에서는 **INSERT INTO** 문을 사용하여 테이블에 새로운 레코드 추가 가능



### TABLE에 레코드 추가

-  **INSET INTO** 문과 함께 VALUES 절을 사용하여 해당 테이블에 새로운 레코드 추가

- 문법 :

  ```mysql
  -- 방법1
  INSERT INTO 테이블이름(필드이름1, 필드이름2, 필드이름3,...)
  VALUES (데이터값1, 데이터값2, 데이터값3,...)
  
  -- 방법2 : 필드의 이름 생략 가능. 단, 데이터베이스의 스키미와 같은 순서대로 값을 넣어야함
  INSERT INTO 테이블이름
  VALUES (데이터값1, 데이터값2, 데이터값3,...)
  ```

- 예제 : 

  ```mysql
  INSERT INTO Reservation(ID, Name, ReserveData, RoomNum)
  VALUES (5,'홍길동','2016-01-16',1108);
  ```



### 레코드를 추가할 때 생략가능한 필드

1. NULL을 저장할 수 있도록 설정된 필드

2. DEFAULT 제약조건이 설정된 필드

3. AUTO_INCREMENT 키워드가 설정된 필드

   

### 출처 

- http://tcpschool.com/mysql/mysql_basic_insert
