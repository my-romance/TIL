# Elasticsearch Search DSL : Extra properties and parameters, Response

### Extra properties and parameters

- explain()

  - 어떻게 scoring이 되는가를 확인하기 위해 사용
  - To set extra properties of the search request, use the `.extra()` method. This can be used to define keys in the body that cannot be defined via a specific API method like `explain` and `search_afger` 

  example : 

  ```python
  s = Search(index=index_name).using(client).query("match", word="원피스").extra(explain=True)
  response = s.execute()
  
  for hit in response:
      print(hit.meta.explanation.description)
  ```

  ```python
  weight(word:원피스 in 0) [PerFieldSimilarity], result of:
  weight(word:원피스 in 1) [PerFieldSimilarity], result of:
  ```

- params()

  - to set query parameters, use the `.params()` method.

  example : 

  ```python
  # elasticsearch 공식홈페이지 예제
  s = s.params(routing='42')
  ```

- source()

  - if you need to limit the fields being returned by elasticsearch, use the `source()` method

  example : 

  ```python
  s = Search(index=index_name).using(client).query("match", word="원피스").source(['word','category'])
  response = s.execute()
  
  for hit in response:
  	print(hit)
  ```

  ```python
  <Hit(mywords/1): {'category': '의류', 'word': '하늘원피스'}>
  <Hit(mywords/2): {'category': '의류', 'word': '빨강원피스'}>
  ```



### Response

`.execute `함수를 사용하여 검색 실행 가능. 또한, `.execute` 함수를 통해 `Response` object를 반환.

`Response` object의 값들을 key를 이용하여 접근 가능.

- took : 검색질의 응답시간 (milliseconds)
- timed_out : boolean 값으로 검색엔진 내부에서 질의 실행에 대한 timeout 여부
- _shards : 검색 수행한 샤드
  - total : 검색 수행한 총 샤드 수
  - successful : 검색 수행을 성공한 샤드 수
  - failed : 검색 수행을 실패한 샤드 수
- hits : 검색 매칭 결과
  - total : 검색 매칭된 문서 총 수
  - max_score : 매칭된 문서 중 가장 높은 relevant score
  - hits : 매칭된 문서 결과
    - _index : 매칭된 인덱스 명
    - _type : 매칭된 타입 명
    - _id : 매칭된 문서 unique id
    - _score : 매칭된 문서 relevant score
    - _source : 출력 필드 지정을 하지 않았을 경우 리턴, 모든 필드 목록 포함
    - fields : 출력 필드 목록 포함
    - highlight : 강조 필드 목록 포함
- facets : 그룹 카운팅 결과
  - groupby : 리턴 변수명 (request 시 변수명 지정 가능)
    - _type : facet 유형
    - missing : missing field 에 대한 카운트
    - total : facet 대상 총 수
    - other : facet 대상 총 수에 포함 되지 않은 문서 카운트
    - terms facet terms
      - term : facet 대상 term
      - count : 대상 term 의 카운트

example : 

```python
s = Search(index=index_name).using(client).query("match", word="원피스")
response = s.execute()

print(response.took)
```

```python
7
```



#### 1. Hits

- To access to the hits returned by the search, access the `hits` property or just iterate over the `Response` object:

example : 

```python
s = Search(index=index_name).using(client).query("match", word="원피스")
response = s.execute()

for h in response:
	print(h.word, h.color)
```

```python
하늘원피스 빨강
빨강원피스 주황
```



####  2. Result

- The individual hits is wrapped in a convenience class that allows attribute access to the keys in the returned dictionary. All the metadata for the results are accessible via `meta` (without the leading `_`):

example : 

```python
s = Search(index=index_name).using(client).query("match", word="원피스")
response = s.execute()

for h in response:
	print('index : %s, doc_type : %s, id : %s, score : %f'%(h.meta.index,h.meta.doc_type,h.meta.id,h.meta.score))
```

```python
index : mywords, doc_type : _doc, id : 1, score : 0.726154
index : mywords, doc_type : _doc, id : 2, score : 0.726154
```



#### 3. Aggregations

- Aggregations are available through the `aggregations` property

example : 

```python
# elasticsearch 공식홈페이지 예제
for tag in response.aggregations.per_tag.buckets:
    print(tag.key, tag.max_lines.value)
```



### 출처

- https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html
- https://www.elastic.co/guide/kr/elasticsearch/reference/current/gs-search-api.html
- https://jjeong.tistory.com/870
- https://kb.objectrocket.com/elasticsearch/how-to-parse-the-elasticsearch-query-data-returned-by-the-explain-api-in-python-652
