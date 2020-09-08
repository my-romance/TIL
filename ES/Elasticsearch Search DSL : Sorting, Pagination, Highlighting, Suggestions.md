# Elasticsearch Search DSL : Sorting, Pagination, Highlighting

### Sorting

sort 쿼리를 이용하여 특정 필드에 대한 정렬 가능

```python
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
client = Elasticsearch()

if __name__ == '__main__':
    index_name = "mywords"
    s = Search(index = index_name).using(client).sort({'personal_score':{"order":"desc"}})
    response = s.execute()

    for hit in s:
        print(hit)
```

```python
<Hit(mywords/2): {'personal_score': 6.3, 'category': '의류'}>
<Hit(mywords/4): {'personal_score': 4.5, 'category': '음식'}>
<Hit(mywords/3): {'personal_score': 4.2, 'category': '필기구'}>
<Hit(mywords/1): {'personal_score': 1.2, 'category': '의류'}>
```

personal_score을 내림차순으로 정렬한 결과가 반환됨

<br>

### Pagination

from, size parameter를 설정하기 위해서는 python slicing을 사용하면 된다.

```python
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
client = Elasticsearch()

if __name__ == '__main__':
    index_name = "mywords"
    s = Search(index = index_name).using(client)[0:2]
    response = s.execute()

    for hit in s:
        print(hit)
```

```python
<Hit(mywords/1): {'personal_score': 1.2, 'category': '의류'}>
<Hit(mywords/2): {'personal_score': 6.3, 'category': '의류'}>
```

query와 매치되는 모든 documents를 반환하고 싶을 때는 scan 또는 scroll을 이용할 수 있음.

```python
for hit in s.scroll():
	print(hit)
```

```python 
<Hit(mywords/1): {'personal_score': 1.2, 'category': '의류'}>
<Hit(mywords/2): {'personal_score': 6.3, 'category': '의류'}>
<Hit(mywords/3): {'personal_score': 4.2, 'category': '필기구'}>
<Hit(mywords/4): {'personal_score': 4.5, 'category': '음식'}>
```

하지만 이 경우의 결과값은 정렬되지 않는다고 함

<br>

### Highlighting

highlight를 이용하여 match된 단어를 강조 가능. query가 어느 필드에 어느 단어에 매칭되어 있는지 분석하기 위해 사용할 수 있음.

```python
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search
client = Elasticsearch()

if __name__ == '__main__':
    index_name = "mywords"
    s = Search(index = index_name).using(client).query('match',word="원피스").highlight('word',pre_tags='<em>',post_tags='</em>')

    response = s.execute()

    for hit in response:
        print(hit)
        for fragment in hit.meta.highlight.word:
            print(fragment)
```

```python
<Hit(mywords/1): {'word': '하늘원피스', 'personal_score': 1.2, 'color': '빨강', 'cat...}>
하늘<em>원피스</em>
<Hit(mywords/2): {'word': '빨강원피스', 'personal_score': 6.3, 'color': '주황', 'cat...}>
빨강<em>원피스</em>
```

\<em\>과 \</em\>을 이용하여 매치된 단어를 구분함. 매치된 단어는 'hit.meta.highlight.해당필드이름'을 통해 확인 가능. 또한, 아래와 같은 코드를 이용하여 score 점수대로 정렬 가능.

```python
s = s.highlight_options(order='score')
```

<br>


### 출처

- https://elasticsearch-dsl.readthedocs.io/en/latest/search_dsl.html

