# MySQL 문법 : DELETE

MySQL에서는 **DELETE** 문을 사용하여 레코드 내용 삭제 가능



### DELETE

- 문법 : 

  ```mysql
  DELETE FROM 테이블이름
  (WHERE 필드이름=데이터값)
  ```
  
- 예제 :  Reservation 테이블에서 Name 필드의 값이 '홍길동'인 모든 레코드 삭제

  ```mysql
  DELETE FROM Reservation
  WHERE Name = '홍길동';
  ```
  
  ![](http://tcpschool.com/lectures/mysql_basic_delete_01.jpg)
  
- 예제 : Reservation 테이블에서 모든 레코드 삭제

  ````mysql
  DELETE FROM Reservation;
  ````
  



### 출처 

- http://tcpschool.com/mysql/mysql_basic_delete