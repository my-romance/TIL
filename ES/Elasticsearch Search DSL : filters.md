# Elasticsearch Search DSL : filters

### filters

- While the full text queries will analyze the query string before executing, the **term-level queries** operate on the **exact terms** that are stored in the inverted index
- Filter queries are usally used for structured data like **numbers, dates, and enums rather than full text fields**

- elasticsearch에서 query와 filter의 차이점

  - query : elasticsearch에서 조건을 만족하는 문서를 찾는 개념을 넘어 가장 적합하고 유사성 높은 결과를 찾는 것
  - filter : RDBMS와 비교했을 때, WHERE 절 구문에 해당. 필터링은 검색된 문서들에 대한 **score** 계산을 하지 않기에 query 검색 보다는 빠름. 활용방식에 따라 검색 성능을 높일 수 있음

  - query와 filter 비교

    | Query      | Filter      |
    | ---------- | ----------- |
    | Relevance  | Yes or No   |
    | Full text  | Exact value |
    | Not cached | Cached      |
    | Scoring    | No Scoring  |


- term query : find documents which contain the exact term specified in the field specified

  ```python
  s = Search(index = index_name).using(client).filter('term',word="빨강")
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}>
  # inverted index 중에서 빨강과 매치되는 doc 반환
  ```

- terms query : find documents which contain any of the exact terms specified in the field specified

  ```python
  s = Search(index = index_name).using(client).filter('terms',word=["빨강","카카오"])
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}>
  <Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5, 'color': '초록'}>
  # inverted index 중에서 빨강과 카카오와 매치되는 doc 반환
  ```

- range query : find documents where the field specified contains values (dates, numbers, or string) in the range specified

  ```
  s = Search(index = index_name).using(client).filter('range',personal_score={"gte":0,"lte":5})
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>
  <Hit(mywords/3): {'word': '제도샤프', 'personal_score': 4.2, 'color': '노랑'}>
  <Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5, 'color': '초록'}>
  # personal_score 필드 값이 0~5인 doc 반환
  ```

- exists query : find documents where the field specified contains any non-null value

  ```python
  s = Search(index = index_name).using(client).filter('exists',field="color")
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  # color 필드의 값이 하나라도 null이 아닌 doc 반환
  ```

  ```python
  <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>
  <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}>
  <Hit(mywords/3): {'word': '제도샤프', 'personal_score': 4.2, 'color': '노랑'}>
  <Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5, 'color': '초록'}>
  ```

- prefix query : find documents where the field specified contains terms which being with the exact prefix specified

  ```python
  s = Search(index = index_name).using(client).filter('prefix',word="빨")
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}>
  # inverted index 중에서 앞글자가 빨과 매치되는 doc 반환
  ```

- wildcard query : find documents where the field specified contains terms which match the pattern specified, **where the pattern supports single character wildcard (?) and multi-character wildcard (*)**

  ```python
  s = Search(index = index_name).using(client).filter('wildcard',word="?피스")
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>
  <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}>
  # inverted index 중에서 어떤 한 글자 + "피스"와 매치되는 doc 반환
  ```

  ```python
  s = Search(index = index_name).using(client).filter('wildcard',word="?스") 
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  # 출력되는 것이 없음
  # inverted index 중에서 어떤 한 글자 + "스"와 매치되는 doc 반환
  ```

  ```python
  s = Search(index = index_name).using(client).filter('wildcard',word="*스") 
  response = s.execute()
  for hit in s:
  	print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>
  <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}>
  # inverted index 중에서 뒤 부분이 "스"인 doc 반환
  ```

-  regexp query : find documents where the field specified contains terms which match the **regular expression** specified
- fuzzy query : find documents where the field specified contains therms which are fuzzily similar to the specified term
- type query : find documents of the specified type
- ids query : find documents with the specified type and IDs

### 출처

- https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html
- [https://bakyeono.net/post/2016-08-20-elasticsearch-querydsl-basic.html#exists-%ED%95%84%ED%84%B0](https://bakyeono.net/post/2016-08-20-elasticsearch-querydsl-basic.html#exists-필터)
- https://m.blog.naver.com/tmondev/220292262363
- https://www.elastic.co/guide/en/elasticsearch/reference/2.0/term-level-queries.html
