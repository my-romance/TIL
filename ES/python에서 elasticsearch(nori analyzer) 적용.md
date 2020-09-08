# python에서 elasticsearch(nori analyzer) 적용하기

### nori analyzer를 사용하지 않을 때
```python
from elasticsearch import helpers, Elasticsearch
es = Elasticsearch()

def gendata():
    mywords = ['하늘원피스','빨강원피스','제도샤프','드림카카오']
    scores = [1.2,6.3,4.2,4.5]
    for idx, (word,score) in enumerate(zip(mywords,scores)):
        yield {
            "word" : word,
            "personal_score" : score
        }

if __name__ == '__main__':
    index_name = "mywords"
    if es.indices.exists(index=index_name):
            es.indices.delete(index=index_name)

    # 문서 mapping 설정
    body = { 
        "mappings" : {
            "properties" : {
                "word" : {
                    "type" : "text"
                },
                "personal_score" : {
                    "type" : "float"
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
```python
```
'원피스'를 query로 날렸을 때 하늘원피스, 빨강원피스 단어와 match가 되지 않음
한글은 다른 언어와 달리 조사나 어미의 접미사가 명사,동사 등과 결합하기 때문에 기본 형태소분석기로는 분석하기 쉽지 않다. 그렇기 때문에 검색엔진을 한글에 적용하기 위해서 별도의 한글 형태소 분석기가 필요하다.
→ nori analyzer 사용 

<br>

### nori analyzer를 사용했을 때
```python
from elasticsearch import helpers, Elasticsearch
es = Elasticsearch()

def gendata():
    mywords = ['하늘원피스','빨강원피스','제도샤프','드림카카오']
    scores = [1.2,6.3,4.2,4.5]
    for idx, (word,score) in enumerate(zip(mywords,scores)):
        yield {
            "word" : word,
            "personal_score" : score
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
```python
{'word': '하늘원피스', 'personal_score': 1.2}
{'word': '빨강원피스', 'personal_score': 6.3}
```

### 출처
- https://coding-start.tistory.com/167

