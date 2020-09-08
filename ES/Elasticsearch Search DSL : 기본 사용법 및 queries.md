# Elasticsearch Search DSL : 기본 사용법 및 queries

The `search` object represent the entire search request : 

- queries
- filters
- aggregations
- sort
- pagination
- additional parameters
- associated client



**특징**

The API is designed to be chainable → (with the exception of the aggregations functionality) this means that the `Search` object is immutable. All methods return a *copy* of the object, making it safe to pass to outside code.



### 기본사용법 (색인화 작업은 python에서 elasticsearch(nori analyzer) 적용 post 참고)

```python
from elasticsearch import helpers, Elasticsearch
from elasticsearch_dsl import Search

client = Elasticsearch()

if __name__ == '__main__':
    index_name = "mywords"

    s = Search(index=index_name).using(client).query("match", word="원피스")
    response = s.execute()

    print(s)
    print(response)
```

```python
<elasticsearch_dsl.search.Search object at 0x000001E3F22E4EB8>
<Response: [<Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2}>, <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3}>]>
```

```python
	for hit in s: # or for hit in response:
        print(hit)
```

``` python
<Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2}>
<Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3}>
```

For debugging purposes you can serialize the `Search` object to a `dict` explicitly

```python
	print(s.to_dict())
```

```python
{'query': {'match': {'word': '원피스'}}}
```



You can delete the documents matching a search by calling `delete` on the `Search` object instead of `execute` like this:

```python
from elasticsearch import helpers, Elasticsearch
from elasticsearch_dsl import Search

client = Elasticsearch()

if __name__ == '__main__':
    index_name = "mywords"

    s = Search(index=index_name).using(client).query("match", word="원피스")
    response = s.delete()
    client.indices.refresh(index=index_name)

    
    s = Search(index=index_name).using(client).query("match_all")
    response = s.execute()

    for hit in s:
        print(hit)
```

```python
<Hit(mywords/3): {'word': '제도샤프', 'personal_score': 4.2}>
<Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5}>
```



### 검색 score 나타내기

`hit.meta.score` 사용하기



### Queries

The library provides classes for all Elasticsearch query types.

- Q를 이용하여 multi field에서 원하는 query 검색

  - 우선 색인화 작업 (기존에서 color 필드를 추가하였음)

  ```python
  from elasticsearch import helpers, Elasticsearch
  es = Elasticsearch()
  
  def gendata():
      mywords = ['하늘원피스','빨강원피스','제도샤프','드림카카오']
      scores = [1.2,6.3,4.2,4.5]
      mycolors = ['빨강','주황','노랑','초록']
      for idx, (word,score,color) in enumerate(zip(mywords,scores,mycolors)):
          yield {
              "word" : word,
              "personal_score" : score,
              'color' : color
          }
  
  if __name__ == '__main__':
      index_name = "mywords"
      if es.indices.exists(index=index_name):
              es.indices.delete(index=index_name)
  
      # 문서 mapping 설정
      body = { 
          "settings": {
              "analysis":{
                  "tokenizer" : {
                      "nori":{
                          "type" : "nori_tokenizer",
                          "decompound_mode": "mixed"
                      }
                  },
                  "analyzer" : {
                      "nori_korean" : {
                          "type" : "custom",
                          "tokenizer" : "nori_tokenizer"
                      }
                  }
              }
          }, 
          "mappings" : {
              "properties" : {
                  "word" : {
                      "type" : "text",
                      "analyzer" : "nori_korean"
                  },
                  "personal_score" : {
                      "type" : "float"
                  },
                  "color" : {
                      "type" : "text",
                      "analyzer" : "nori_korean"
                  }
              }
          }
      }
      # 문서 mapping 적용
      es.indices.create(index=index_name, body = body)
  
      # 문서 indexing
      for i, data in enumerate(gendata()):
          res = es.index(index=index_name,body=data,id = (i+1))
      results = es.indices.refresh(index=index_name)
          
      # match를 이용하여 "원피스"와 match 되는 것이 있는 경우 문서 출력
      results = es.search(index=index_name, body={"query": {"match": {"word":"원피스"}}})
      print(results)
      for hit in results['hits']['hits']:
          print(hit['_source'])
      
  
  ```

  - Q를 이용하여 multi field에서 원하는 query 검색

  ```python
  from elasticsearch import helpers, Elasticsearch
  from elasticsearch_dsl import Search, Q
  
  client = Elasticsearch()
  
  if __name__ == '__main__':
      index_name = "mywords"
      
      q = Q("multi_match", query='빨강', fields=['word', 'color'])
      s = Search(index = index_name).using(client).query(q)
      response = s.execute()
      
      print(q)
      print(s)
      print(response)    
  ```

  ```python
  MultiMatch(fields=['word', 'color'], query='빨강')
  <elasticsearch_dsl.search.Search object at 0x0000020D521A5D68>
  <Response: [<Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}>, <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>]>
  ```

  ```python
  	for hit in s: # for hit in response:
  		print(hit,"result_score : ", hit.meta.score)
  ```

  ```python
  <Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황'}> result_score :  1.2613049
  <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}> result_score :  1.2039728
  ```



- 여러개의 query의 조합
  Query objects can be combined using logical operators : 

  1. **Q("match", field1='query1') | Q("match", field2='query2')**

  ```python
  from elasticsearch import helpers, Elasticsearch
  from elasticsearch_dsl import Search, Q
  
  client = Elasticsearch()
  
  if __name__ == '__main__':
      index_name = "mywords"
      
      q = Q("match", word='카카오') | Q("match", word='샤프')
      s = Search(index = index_name).using(client).query(q)
      response = s.execute()
  
      print(q)
      print(s)
      print(response)
  ```

  ```python
  Bool(should=[Match(word='카카오'), Match(word='샤프')])
  <elasticsearch_dsl.search.Search object at 0x000001B2CEDD5E10>
  <Response: [<Hit(mywords/3): {'word': '제도샤프', 'personal_score': 4.2, 'color': '노랑'}>, <Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5, 'color': '초록'}>]>
  ```

  ```python
  	for hit in response:
  		print(hit)
  ```

  ```python
  <Hit(mywords/3): {'word': '제도샤프', 'personal_score': 4.2, 'color': '노랑'}>
  <Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5, 'color': '초록'}>
  ```

  2. **Q("match", field1='query1') & Q("match", field2='query2')**

  ```python
      q = Q("match", word='하늘') & Q("match", word='원피스')
      s = Search(index = index_name).using(client).query(q)
      response = s.execute()
  
  	print(q,'\n',s,'\n',response)
  ```

  ```pythonpython
  Bool(must=[Match(word='하늘'), Match(word='원피스')])
  <elasticsearch_dsl.search.Search object at 0x000001ADCB105E48>
  <Response: [<Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>]>
  ```

  ```
  	for hit in response:
  		print(hit)
  ```

  ```python
  <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>
  ```

  3. **~Q("match", field='query')**

  ```python
      q = ~Q("match", word='빨강')
      s = Search(index = index_name).using(client).query(q)
      response = s.execute()
      
      print(q,'\n',s,'\n',response)
  ```

  ```python
  Bool(must_not=[Match(word='빨강')])
  <elasticsearch_dsl.search.Search object at 0x0000022229955DA0>
  <Response: [<Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>, <Hit(mywords/3): {'word': '제도샤프', 'personal_score': 4.2, 'color': '노랑'}>, <Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5, 'color': '초록'}>]>
  ```

  ```
      for hit in response:
          print(hit)
  ```

  ```python
  <Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강'}>
  <Hit(mywords/3): {'word': '제도샤프', 'personal_score': 4.2, 'color': '노랑'}>
  <Hit(mywords/4): {'word': '드림카카오', 'personal_score': 4.5, 'color': '초록'}>
  ```

  

  When you call the `.query()` method multiple times, the `&` operator will be used internally:

  ```python
  s = s.query().query()
  ```

  If you want to have precise control over the query form, use the `Q` shortcut to directly construct the combined query:

  ```python
  q = Q('bool',
      must=[Q('match', title='python')],
      should=[Q(...), Q(...)],
      minimum_should_match=1
  )
  s = Search().query(q)
  ```

  

### 참조

- https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html

  
