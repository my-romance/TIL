# SQLSoup & sqlalchemy  in python

### SQLSoup's advantages

- SQLSoup provides a convenient way to **access existing database tables without having declare table or mapper classes ahead of time**

- SQLSoup is built on top of the SQLAlchemy ORM and provides a super-minimalistic interface to an existing database.

- SQLSoup provides a coarse grained, alternative interface to working with the SQLAlchemy ORM, providing a "self configuring" interfave for extremely rudimental operations.

- SQLSoup is really well suited to quick one-offs, early learning of SQLAlchemy, and small scripting activites. 

  



### Note on SQLSoup

- SQLSoup provides can be used in larger applications such as web applications as well, but here you'll begin to experience diminishing returns; in a substantial web application, it might be time to just switch to  SQLAlchemy’s [*Object Relational Tutorial*](http://www.sqlalchemy.org/docs/orm/tutorial.html#ormtutorial-toplevel).



### Getting Ready to Connect

Creating a SQLSoup gateway is just like creating a SQLAlchemy engines. The urls are in the same format as those used by [`sqlalchemy.create_engine()`](http://www.sqlalchemy.org/docs/core/engines.html#sqlalchemy.create_engine):

```python
import sqlsoup
db = sqlsoup.SQLSoup('postgresql+psycopg2://{user}:{pwd}@{host}/{db}').format(
				user = "<user_name>",
				pwd = "<pwd>",
				host = "<host>",
				db = "<db_name>"
			)
```

or, you can re-use an existing engine:

```python
db = sqlsoup.SQLSoup(engine)
```



### Loading objects

When using a SQLSoup, you access attributes from it which match the name of a table in the databases. (즉, DB안에 있는 테이블과 access한다는 말) If your database has a table named `users`, you'd get to it via an attribute named `.users`.

```python
users = db.users.all()
users.sort()
print(users)
```

```python
[
    MappedUsers(name=u'Joe Student',email=u'student@example.edu',
            password=u'student',classname=None,admin=0),
    MappedUsers(name=u'Bhargan Basepair',email=u'basepair@example.edu',
            password=u'basepair',classname=None,admin=1)
]
```

**Field access** is intuitive :

```python
print(users[0].email)
```

```
u'student@example.edu'
```

An alternative to `db.users` is to use the [`SQLSoup.entity()`](https://sqlsoup.readthedocs.io/en/latest/api.html#sqlsoup.SQLSoup.entity) method, which accepts a string argument. **This is useful if the name of your table has special casing or other character considerations** :

```python
users = db.entity("users")
```

You can then refer to `users` the same way we refer to `db.users` in this tutorial.



### Basic Table Usage

The table object proxies out to the SQLAlchemy [`sqlalchemy.orm.query.Query`](http://www.sqlalchemy.org/docs/orm/query.html#sqlalchemy.orm.query.Query) object.

```python
print(db.users.order_by(db.users.name).all())
```

```python
[
    MappedUsers(name=u'Bhargan Basepair',email=u'basepair@example.edu',
        password=u'basepair',classname=None,admin=1),
    MappedUsers(name=u'Joe Student',email=u'student@example.edu',
        password=u'student',classname=None,admin=0)
]
```

Of course, you don't want to load all users very often. **Let's add a WHERE clause.**

```python
from sqlalchemy import or_, and_, desc
where = or_(db.users.name=='Bhargan Basepair', db.users.email=='student@example.edu')
print(db.users.filter(where).order_by(desc(db.users.name)).all())
```

```python
[
    MappedUsers(name=u'Joe Student',email=u'student@example.edu',
        password=u'student',classname=None,admin=0),
    MappedUsers(name=u'Bhargan Basepair',email=u'basepair@example.edu',
        password=u'basepair',classname=None,admin=1)
]
```

You can also use .first() (to retrieve only the first object from a query) or .one() (like .first when you expect exactly one user - it will raise an exception if more were returned)

```python
print(db.users.filter(db.users.name=='Bhargan Basepair').one())
```

```python
MappedUsers(name=u'Bhargan Basepair',email=u'basepair@example.edu',
        password=u'basepair',classname=None,admin=1)
```

Since name is the primary key, this is equivalent to

```
db.users.get('Bhargan Basepair')
MappedUsers(name=u'Bhargan Basepair',email=u'basepair@example.edu',
    password=u'basepair',classname=None,admin=1)

```



### Raw SQL

```python
rp = db.execute('select name, email from users where name like :name order by name', name='%Bhargan%')
for name, email in rp.fetchall():
	print name, email
```

```
Bhargan Basepair basepair+nospam@example.edu
```

or 

```python
conn = db.connection()
conn.execute("'select name, email from users where name like ? order by name'", '%Bhargan%')
```



### 참조문서

- https://sqlsoup.readthedocs.io/en/latest/tutorial.html