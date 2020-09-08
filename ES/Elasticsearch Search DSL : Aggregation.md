#  Elasticsearch Search DSL : Aggregation

### Aggregation이란

- 분산되어 있는 Elasticsearch의 도큐먼트들 중 검색 조건과 일치하는 도큐먼들을 한데 모아 집계 연산(단어를 세거나 평균을 구하는 등)을 수행
- 집계 : 데이터를 그룹화하고 통계치를 얻는 기능
- Elasticsearch에서는 하나의 응답에서 검색 적중을 반환하는 검색을 실행함과 동시에 그와는 별도로 집계 결과를 반환할 수 있음
- 즉, 간결한 API를 사용하여 쿼리와 여러 집계를 실행하고 두 작업(또는 둘 중 하나)의 결과를 한꺼번에 얻어 네트워크 왕복을 피할 수 있음 

<br>

### 하위 집계 (Sub Aggregation)

- 집계한 결과를 한번 더 집계
  - example : 일자별로 집계를 수행한 뒤, 그 결과를 metric 집계를 통해 평균 일자별 평균 계산
- Elasticsearch의 강력한 기능인 반면 성능에 영향을 줄 수 있음
  - 중첩 횟수에 대한 제한은 없지만 중첩할수록 성능은 떨어짐

<br>

### 중첩 집계 

- 같은 레벨에 또 다른 집계를 정의하는 것
- 같은 레벨에 집계를 정의하는 것은 부수적인 성격의 집계만 정의 할 수 있음

<br>

### 집계 유형

- Metric Aggregation
- Bucket Aggregation
- Matrix Aggregation
- Pipeline Aggregation

<br>

### Metric Aggregation

- 검색 조건에 일치하는 도큐먼들의 수치 연산
- 최대/최소값, 평균, 합산, 표준편차 등

**색인화**

```python
from elasticsearch import helpers, Elasticsearch
es = Elasticsearch()

def gendata():
    scores = [1.2,6.3,4.2,4.5]
    categorys = ['의류', '의류', '필기구', '음식']
    for idx, (score,category) in enumerate(zip(scores,categorys)):
        yield {
            "personal_score" : score,
            'category' : category
        }

if __name__ == '__main__':
    index_name = "mywords"
    if es.indices.exists(index=index_name):
            es.indices.delete(index=index_name)

    # 문서 mapping 설정
    body = { 
        "mappings" : {
            "properties" : {
                "personal_score" : {
                    "type" : "float"
                },
                "category" : {
                    "type" : "keyword"
                }
            }
        }
    }
    # 문서 mapping 적용
    es.indices.create(index=index_name, body = body)

    # 문서 indexing
    for i, data in enumerate(gendata()):
        res = es.index(index=index_name,body=data,id = (i+1))
    es.indices.refresh(index=index_name)
```

**Metric Aggregation 중 합산**

```python
from elasticsearch import helpers, Elasticsearch
from elasticsearch_dsl import Search, A

client = Elasticsearch()
if __name__ == '__main__':
    index_name = "mywords"
    s = Search(index = index_name).using(client)
    s.aggs.metric('rate_sum', 'sum', field='personal_score')
    response = s.execute()
    print(response)

    for term in response.aggregations:
        print(term)
```

```python
<Response: [<Hit(mywords/1): {'personal_score': 1.2, 'category': '의류'}>, <Hit(mywords/2): {'personal_score': 6.3, 'category': '의류'}>, <Hit(mywords/3): {'personal_score': 4.2, 'category': '필기구'}>, <Hit(mywords/4): {'personal_score': 4.5, 'category': '음식'}>]>
{'rate_sum': {'value': 16.200000047683716}}
```

**Metric Aggregation 중 최소값**

```python
s.aggs.metric('rate_min', 'min', field='personal_score')
```

```
{'rate_min': {'value': 1.2000000476837158}}
```

<br>

### Bucket Aggregation

- 검색 조건에 일치하는 도큐먼트들을 특정 기준으로 나눈 다음 나누어진 도큐먼들의 수치를 각각 연산
- 이때, 나누어진 단위를 bucket이라고 함
- Bucket Aggregation 유형
  - 범위 집계 (Range Aggregation) 
    - 사용자가 지정한 범위 내에서 집계를 수행하는 다중 버킷 집계
    - 추출된 documents에 대해 범위에 해당하는지에 대한 검증 후 범위에 해당되는 documents에 대해서만 집계 수행
    - from, to 속성을 통해 범위 지정
    - 마지막 수는 제외
    - example : "aggs" : {"byte_range":{"range":{"field":"bytes", "ranges" : [{"from":1000,"to":2000}]}}} → bytes의 값이 1000~2000 사이인 도큐먼트들을 집계
  - 날짜 범위 집계 (Date Range Aggregation)
    - 숫자를 이용했던 범위 집계와 달리 날짜를 이용한 범위 집계
    - From, to 속성을 통해 범위 지정
    - 마지막 날짜는 제외
    - example : "aggs" : {"request_count_with_data_range" : {"data_range":{"field" : "timestamp", ranges : [{ "from" : "시작날짜", "to" : "끝나는날짜" }] }} }
  - 히스토그램 집계 (Histogram Aggregation)
    - 범위 집계와 마찬가지로 숫자의 범위를 집계
    - 범위 집계와 달리 히스토그램 집계에 지정한 수치를 범위를 산정하기 위한 간격으로 사용
    - 간격 내 속하는 도큐먼들에 대한 집계를 수행
    - example : "aggs" : {"bytes_histogram" : {"histogram" : { "field" : "bytes", "interval" : 10000 }} } → 10000 byte 단위로 집계 수행 (0~10000, 10000~20000 )
  - 날짜 히스토그램 집계  (Date Histogram Aggregation)
    - 히스토그램 집계와 유사하지만 숫자가 아닌 날짜를 대상으로 집계
    - 분 단위, 시간 단위, 일 단위 등
    - example : "aggs" : { "daily_request_count" : { "date_histogram" : {"field" : "timestamp", "interval" : "minute"} } } → 분 단위로 집계 수행 (hour : 시간 단위, day : 일 단위)
  - 텀즈 집계 (terms Aggregation)
    - 문서에서 각 단어의 빈도를 계산할 때 사용

**Bucket Aggregation 중 텀즈 집계**

```python
if __name__ == '__main__':
    index_name = "mywords"
    s = Search(index = index_name).using(client)
    a = A('terms', field='category')
    s.aggs.bucket('category_terms', a)
    response = s.execute()

    for item in response.aggregations.category_terms:
        print(item)
```

```
{'key': '의류', 'doc_count': 2}
{'key': '음식', 'doc_count': 1}
{'key': '필기구', 'doc_count': 1}
```

**Bucket Aggregation  중 히스토그램 집계**

```python
if __name__ == '__main__':
    index_name = "mywords"
    s = Search(index = index_name).using(client)
    a = A('histogram', field='personal_score', interval=1)
    s.aggs.bucket('score_histogram', a)
    response = s.execute()

    for item in response.aggregations.score_histogram:
        print(item)
```

```python
{'key': 1.0, 'doc_count': 1}
{'key': 2.0, 'doc_count': 0}
{'key': 3.0, 'doc_count': 0}
{'key': 4.0, 'doc_count': 2}
{'key': 5.0, 'doc_count': 0}
{'key': 6.0, 'doc_count': 1}
```

**bucket 집계(텀즈)와 metric(합산) 집계 (하위)**

```python
if __name__ == '__main__':
    index_name = "mywords"
    s = Search(index = index_name).using(client)
    s.aggs.bucket('per_category','terms',field="category")
    s.aggs['per_category'].metric('score_per_category', 'sum', field='personal_score')
    response = s.execute()

    for item in response.aggregations.per_category:
        print(item,item['score_per_category'])
```

```python
{'key': '의류', 'doc_count': 2, 'score_per_category': {'value'...} {'value': 7.500000238418579}
{'key': '음식', 'doc_count': 1, 'score_per_category': {'value'...} {'value': 4.5}
{'key': '필기구', 'doc_count': 1, 'score_per_category': {'value'...} {'value': 4.199999809265137}
```

<br>

### Matrix Aggregation

- 버킷 대상이 되는 도큐먼드의 여러 필드에서 추출한 값을 행렬 연산 함
- Matrix 집계는 bucket 집계와 달리 스크립팅을 지원하지 않음

<br>

### Pipeline Aggregation

- 다른 집계나 관련된 metrix 연산의 결과를 집계

<br>

### 출처

- https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html
- https://www.elastic.co/guide/kr/elasticsearch/reference/current/gs-executing-aggregations.html
- https://www.slideshare.net/ssuser4889dc/elasticsearch-aggregation-2018
- https://stackoverflow.com/questions/34403211/how-to-get-aggs-in-elasticsearch-dsl-py
- https://github.com/elastic/elasticsearch-dsl-py/tree/master/elasticsearch_dsl
