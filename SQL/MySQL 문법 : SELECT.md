# MySQL 문법 : SELECT

MySQL에서는 **SELECT** 문을 사용하여 레코드 선택



### SELECT

- **SELECT 키워드** 바로 뒤 : 해당 테이블에서 선택하고 싶은 필드 이름 명시
- **FROM 키워드** 바로 뒤 : 레코드를 선택할 테이블 이름 명시
- **WHERE** 절을 이용해 선택할 레코드의 조건을 상세히 설정 가능

- 문법 : 

  ```mysql
  SELECT 필드이름
  FROM 테이블이름
  (WHERE 조건)
  ```
  



### 테이블의 모든 필드 선택

- 문법 :

  ```mysql
  SELECT *
  FROM 테이블이름
  ```

- 예제 :

  ```mysql
  SELECT *
  FROM Reservation;
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_01.jpg)

### 특정 조건의 레코드 선택

- **SELECT 문과 WHERE 절을 함께 사용**하여, 특정 조건의 레코드 선택

- 문법 :

  ```mysql
  SELECT *
  FROM 테이블이름
  WHERE 조건
  ```

- 예제 :

  ```mysql
  SELECT *
  FROM Reservation
  WHERE Name = '홍길동';
  ```

  

![](http://tcpschool.com/lectures/mysql_basic_select_02.jpg)

- 예제 :

  ```mysql
  SELECT *
  FROM Reservation
  WHERE ID <= 3 AND ReserveDate > '2016-02-01';
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_03.jpg)

### 특정 필드만을 선택

- SELECT 키워드 다음에 필드이름을 명시하면, 해당 테이블의 특정 필드만을 불러옴

- 문법 : 

  ```mysql
  SELECT 선택할필드이름1, 선택할필드이름2,...
  FROM 테이블이름
  ```

- 예제 : 

  ```mysql
  SELECT Name, RoomNum
  FROM Reservation;
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_04.jpg)

- 예제 : WHERE 문과 함께 사용

  ```mysql
  SELECT Name, ReserveDate
  FROM Reservation
  WHERE ID <= 3 AND ReserveDate > '2016-02-01';
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_06.jpg)



### 중복되는 값 제거

- 만약 같은 필드에 중복되는 값을 가지는 레코드가 있다면, **DISTINCT 키워드**를 사용하면 그 값이 한번만 선택되도록 설정 가능

- 문법 : 

  ```MYSQL
  SELECT DISTINCT 선택할필드이름1, 선택할필드이름2,...
  FROM 테이블
  ```

- 예제 : 

  ```mysql
  SELECT DISTINCT Name
  FROM Reservation;
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_05.jpg)

### 선택한 결과의 정렬

- SELECT 문으로 선택한 결과를 **ORDER BY 절**을 사용하여 정렬  가능

- **ASC : 오름차순, DESC : 내림차순. 기본 DEFAULT VALUE는 ASC**

- 필드를 정렬할 때 기본적으로 대소문자를 구분하진 않지만, 구분하고 싶을 땐 **ORDER BY BINARY 절**을 사용하는 방법이 있음 

- 문법 : 

  ```mysql
  SELECT 선택할필드이름1, 선택할필드이름2,...
  FROM 테이블이름
  ORDER BY 정렬의기준이되는필드이름1, 정렬순1,...
  ```

- 예제 : 

  ```mysql
  SELECT *
  FROM Reservation
  ORDER BY ReserveDate;
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_07.jpg)

- 예제 : 

  ```mysql
  SELECT *
  FROM Reservation
  ORDER BY ReserveDate DESC;
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_08.jpg)

- 예제 : 

  ```mysql
  SELECT *
  FROM Reservation
  ORDER BY ReserveDate DESC, RoomNum ASC;
  ```

  ![](http://tcpschool.com/lectures/mysql_basic_select_09.jpg)

### 별칭(alias)을 이용할 처리

- 복잡한 테이블 이름이나 필드의 이름을 좀 더 읽기 쉽게 하기 이해 별칭(alias) 사용가능

- 문법 : 

  ```mysql
  -- 방법1
  SELECT 필드이름 AS 별칭
  FROM 테이블이름
  
  -- 방법2
  SELECT 필드이름
  FROM 테이블 이름 AS 별칭
  ```

- 예제 :

  ```mysql
  SELECT ReserveDate, CONCAT(RoomNum, " : ",Name) AS ReserveInfo
  FROM Reservation
  ```

  - CONCAT() 함수는 인수로 전달받은 문자열을 모두 결합하여 하나의 문자열로 반환하는 함수

    ![](http://tcpschool.com/lectures/mysql_basic_select_10.jpg)

### 출처 

- http://tcpschool.com/mysql/mysql_basic_select
