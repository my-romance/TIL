# MySQL 문법 : UPDATE

MySQL에서는 **UPDATE** 문을 사용하여 레코드 내용 수정 가능



### UPDATE

- 문법 : 

  ```mysql
  UPDATE 테이블이름
  SET 필드이름1=데이터값1, 필드이름2=데이터값2,...
  (WHERE 필드이름=데이터값)
  ```
  
- 예제 :  Reservation 테이블에서 Name 필드 값이 '홍길동'인 모든 레코드의 RoomNum 필드 값을 2002로 변경

  ```mysql
  UPDATE Reservation
  SET RoomNum = 2002
  WHERE Name = '홍길동';
  ```
  
  ![](http://tcpschool.com/lectures/mysql_basic_update_01.jpg)

- 예제 : Reservation 테이블에서 모든 레코드의 RoomNum 필드 값을 2002로 변경

  ````mysql
  UPDATE Resercation
  SET RoomNum = 2002;
  ````

  ![](http://tcpschool.com/lectures/mysql_basic_update_02.jpg)



### 출처 

- http://tcpschool.com/mysql/mysql_basic_update
