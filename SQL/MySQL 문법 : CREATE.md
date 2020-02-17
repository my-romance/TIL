# MySQL 문법 : CREATE

MySQL에서는 아래와 같이 **CREATE** 문을 사용하여 데이터베이스와 테이블을 만들 수 있음

1. **CREATE DATABASE : DATABASE 생성**
2. **CREATE TABLE : TABLE 생성**



### DATABASE 생성

- 문법

  ```mysql
  CREATE DATABASE 데이터베이스이름
  ```

- EXAMPLE

  ```mysql
  CREATE DATABASE Hotel;
  ```

- 생성된 데이터베이스 목록은 **SHOW DATABASES** 구문을 통해 확인 가능



### DATABASE의 선택

- 데이터베이스 생성 후, 해당 DATABASE를사용하기 위해서는 우선 데이터 DATABASE를 선택해야 함

- 문법

  ```mysql
  USE 데이터베이스이름
  ```

- EXAMPLE

  ```mysql
  USE Hotel;
  ```



### TABLE 생성

- DATABASE는 하나 이상의 테이블로 구성되며, 이러한 테이블에 데이터를 저장 및 관리 가능

- 문법 : 테이블 이름, 필드 목록과 각 필드의 타입을 명시해야 함

  ```mysql
  CREATE TABLE 테이블이름
  (
  	필드이름1 필드타입1,
  	필드이름2 필드타입2,
  	...
  );
  ```

- 예제

  ```mysql
  CREATE TABLE Test
  (
  	ID INT,
  	Name VARCHAR(30),
  	ReserveDate DATE,
  	RoomNum INT
  );
  ```

  

### 제약조건(constraint)

- 제약조건 : 데이터의 **무결성**을 지키기 위해 **데이터를 입력 받을 때 실행되는 검사 규칙**
  - CREATE 문으로 테이블을 생성할 때 사용 가능
  - ALTER 문으로 필드를 추가할 때 설정 가능
- 제약조건 문법
  1. NOT NULL : 해당 필드는 NULL 값을 저장할 수 없음
  2. UNIQUE : 해당 필드는 서로 다른 값을 가져야만 함
  3. PRIMARY KEY : 해당 필드가 NOT NULL과 UNIQUE을 만족해야 함
  4. FOREIGN KEY : 하나의 테이블을 다른 테이블에 의존하게 만듦
  5. DEFAULT : 해당 필드의 기본값을 설정
  6. AUTO_INCREMENT : 해당 필드의 값을 1부터 시작하여 새로운 레코드가 추가될 때마다 1씩 증가된 값을 저장. AUTO_INCREMENT  키워드 다음에 대입 연산자(=)를 사용하여 시작값을 변경할 수 있음

### 출처 

- http://tcpschool.com/mysql/mysql_basic_create
