# MySQL 문법 : DROP

MySQL에서는 아래와 같이 **DROP** 문을 사용하여 데이터베이스와 테이블을 삭제할 수 있음

1. **DROP DATABASE : DATABASE 삭제**
2. **DROP TABLE : TABLE 삭제**



### DATABASE 삭제

-  DATABASE를 삭제하면 **해당 데이터베이스의 모든 테이블과 데이터도 다 같이 삭제**됨

- 문법 :

  ```mysql
  DROP DATABASE 데이터베이스이름;
  ```

- 예제 : 

  ```mysql
  DROP DATABASE Hotel;
  ```



### TABLE 삭제

- TABLE을 삭제하면 **해당 TABLE의 모든 데이터도 다 같이 삭제**됨

- 문법 : 

  ```mysql
  CREATE TABLE 테이블이름;
  ```
  
- 예제 : 

  ```mysql
  DROP TABLE Reservation;
  ```



### TABLE 내 데이터 삭제

- 테이블 자체가 아닌 테이블의 데이터만을 지우고 싶은 경우, TRUNCATE TABLE 문을 사용
- 즉, 테이블 자체는 남기지만 해당 테이블에 저장된 데이터는 모두 삭제

- 문법 : 

  ```mysql
  TRUNCATE TABLE 테이블이름
  ```

- 예제 : 

  ```mysql
  TRUNCATE TABLE Reservation;
  ```

  

### IF EXISTS문을 이용한 error 방지

- DROP DATABASE 문이나 DROP TABLE 문을 사용하여 데이터베이스나 테이블을 삭제하려고 할 때, **삭제할 이름의 데이터베이스나 테이블이 존재하지 않으면 에러 발생** → IF EXISTS 절 사용

- 문법 :

  ```mysql
  -- FOR DROP DATABASE
  DROP DATABASE IF EXISTS 데이터베이스이름;
  -- FOR DROP TABLE
  DROP TABLE IF EXISTS 테이블이름;
  ```

  

### 출처 

- http://tcpschool.com/mysql/mysql_basic_drop