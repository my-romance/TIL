# python SQLAlchemy를 이용한 ORM

[TOC]

## ORM(Object-Relational Mapping)이란?

- ORM : 객체 지향 프로그래밍의 객체(**O**bject)와 관계형 데이터베이스(**R**elational Database)의 데이터를 **M**apping하는 기술

- 객체 지향 프로그램에서 사용할 수있는 가상의 객체 지향 데이터 베이스를 만들어 프로그래밍 코드와 데이터 연결
- 즉, **SQL을 사용하지 않고도 DB의 데이터를 쉽게 객체로 만들어 주는 것.**
- SQL 코드를 직접 입력하지 않고, 선언문이나 할당같은 부수적인 코드가 생략되기 때문에 직관적이고 간단하게 데이터 조작 가능
- ORM 프레임워크는 ORM의 구조와 구현을 위해 필요한 여러 기능 제공



## SQLAlchemy를 이용한 ORM

### Connection

```python
ENGINE = create_engine(
    'postgresql+psycopg2://{user}:{pwd}@{host}/{db}'.format(
        user=<user>,
        pwd=<pwd>,
        host=<host>,
        db='postgres'
    ),
    convert_unicode=False,
    max_overflow=max_overflow, pool_size=8, pool_recycle=3600, pool_timeout=10,
    connect_args={'sslmode': 'require'},
    echo=False
)
```

 

### Declare a Mapping

 [Declarative](https://docs.sqlalchemy.org/en/13/orm/extensions/declarative/index.html) 인 시스템을 통해, 매핑될 실제 DB와의 (매핑) 관계에 대해 서술하는 클래스를 만든다.

Declaritive 시스템을 사용하여 매핑된 클래스는 base 클래스 관점으로 정의됨.

- base 클래스 
  - 해당 base와 관련된 테이블과 클래스 카탈로그를 유지시킴
  - 이를 `declarative base class` 라고 함
  -  [`declarative_base()`](https://docs.sqlalchemy.org/en/13/orm/extensions/declarative/api.html#sqlalchemy.ext.declarative.declarative_base) 를 통해 base 클래스 생성

```python
from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base() # base 클래스 생성


class User(Base):  # base 클래스를 통해 DB table과 매핑할(매핑관계를 서술하는) 클래스를 만듦
    __tablename__ = <테이블 명>
    __table_args__ = {'schema': <스키마 명>}

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    fullname = Column(String(50))
    nickname = Column(String(50))

    def __repr__(self):
        return "<User(name='%s', fullname='%s', nickname='%s')>" % (
            self.name, self.fullname, self.nickname)
```



### Create a Schema

[`MetaData.create_all()`](https://docs.sqlalchemy.org/en/13/core/metadata.html#sqlalchemy.schema.MetaData.create_all) method를 통해 스키마 및 테이블 생성

```python
User.__dict__  # 헤당 클래스의 정보 확인 가능

Base.metadata.create_all(engine)  # MetaData.create_all() method를 통해 스키명.테이블 생성
```



### Create an Instance of the Mapped Class

User Class의 Instance를 생성해본다

```python
ed_user = User(name='ed', fullname='Ed Jones', nickname='edsnickname')
ed_user.name # 출력 : 'ed'
ed_user.nickname # 출력 : 'edsnickname'
ed_user.id # 출력 : None. DB table에 없는 필드라도 AttributeError 에러가 뜨지 않고 None 반환
str(ed_user.id) # 출력 : 'None'

```



### Creating a Session

database에 대한 ORM의 핸들은  [`Session`](https://docs.sqlalchemy.org/en/13/orm/session_api.html#sqlalchemy.orm.session.Session). create_engine() 문과 동일한 level에서, Session 클래스 정의

```python
Session = scoped_session(sessionmaker(bind=ENGINE, autocommit=False))
```

- 참고 : `autocommit=False`

  `autocommit=False` 인 경우, 이름에서 알 수 있듯이 commit을 자동으로 하지 않는다는 의미.

  즉, db에 반영하기 위해서는 `session.commit()` 을 실행해 주어야 함

  `autocommit=False` 를 설정하여, 다음과 같이 에러가 난 경우 db에 반영하지 않는 식으로 사용 가능

  ```python
  # method_a starts a transaction and calls method_b
  def method_a(session):
      session.begin(subtransactions=True)
      try:
          method_b(session)
          session.commit()  # transaction is committed here
      except:
          session.rollback() # rolls back the transaction
          raise
  
  # method_b also starts a transaction, but when
  # called from method_a participates in the ongoing
  # transaction.
  def method_b(session):
      session.begin(subtransactions=True)
      try:
          session.add(SomeObject('bat', 'lala'))
          session.commit()  # transaction is not committed yet. 즉, 위 코드에서 에러가 난 경우 commit을 하지 않게 됨
      except:
          session.rollback() # rolls back the transaction, in this case
                             # the one that was initiated in method_a().
          raise
  
  # create a Session and call method_a
  session = Session(autocommit=True)
  method_a(session)
  session.close()
  ```

  

### Adding and Updating Objects





## 참고자료

- https://docs.sqlalchemy.org/en/13/orm/tutorial.html
- https://docs.sqlalchemy.org/en/13/orm/session_transaction.html
- https://rosypark.tistory.com/296