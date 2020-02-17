# MySQL 문법 : ALTER

MySQL에서는 아래와 같은 **ALTER** 문을 사용하여 DATABASE와 TABLE의 내용 수정

1. **ALTER DATABASE** : DATABASE 수정
2. **ALTER TABLE** : TABLE 수정



###  DATABASE 수정

- DATABASE의 전체적인 특성 수정 

  → DATABASE의 문자 집합이나 콜레이션을 변경할 수 있음

- 문법 

  ```mysql
  ALTER DATABASE 데이터베이스이름 CHARACTER SET = 문자집합이름 -- 문자집합 변경
  ALTER DATABASE 데이터베이스이름 COLLATE = 콜레이션이름 -- 콜레이션 변경
  ```

- 예제

  ```mysql
  ALTER DATABASE Hotel CHARACTER SET=euckr_bin COLLATE=euckr_korean_ci;
  ```

- 대표적인  CHARACTER SET

  1.  utf8 : UTF-8 유니코드를 지원하는 문자셋 (1~3바이트)

  2.  euckr : 한글을 지원하는 문자셋 (1~2바이트)

- 대표적인  COLLATE

  1. utf8_bin

  2. utf8_general_ci (기본 설정)

  3. euckr_bin

  4. euckr_korean_ci



### TABLE 수정

ALTER TABLE 문을 통해 테이블에 **필드를 추가(ADD)**, **삭제(DROP)**하거나 **필드의 타입을 변경(MODIFY COLUMN)** 가능

예제에 사용되는 Reservation 기존 테이블

![](http://tcpschool.com/lectures/mysql_basic_create_01.jpg)

- 새로운 필드 추가 (ADD)

  - 문법

    ```mysql
    ALTER TABLE 테이블이름 ADD 필드이름 필드타입
    ```

  - 예제

    ```mysql
    ALTER TABLE Reservation ADD Phone INT;
    ```

    ![](http://tcpschool.com/lectures/mysql_basic_alter_01.jpg)

- 기존 필드의 삭제 (DROP)

  - 문법

    ```mysql
    ALTER TABLE 테이블이름 DROP 필드이름
    ```

  - 예제

    ```mysql
    ALTER TABLE Reservation DROP RoomNum;
    ```

    ![](http://tcpschool.com/lectures/mysql_basic_alter_02.jpg)

- 필드 타입 변경 (MODIFY COLUMN)

  - 문법 

    ```mysql
    ALTER TABLE 테이블이름 MODIFY COLUMN 필드이름 필드타입
    ```

  - 예제

    ```mysql
    ALTER TABLE Reservation	
    MODIFY COLUMN ReserveData VARCHAR(20);
    ```

    ![](http://tcpschool.com/lectures/mysql_basic_alter_03.jpg)

### 출처

- http://tcpschool.com/mysql/mysql_basic_alter
