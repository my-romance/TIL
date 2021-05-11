# get 메소드 query에 \# 기호 포함하기

아래 코드처럼 `urlparse` 함수를 통해 URL을 6개의 구성 요소로 구문 분석한 결과를 확인할 수 있다

```python
from urllib.parse import urlparse
url = "http://internet.com/extract-brand?prdName=삼성 갤럭시 노트 10 절찬판매"
url_parse_result = urlparse(url)
```

```python
# url_parse_result
ParseResult(scheme='http', netloc='internet.com', path='/extract-brand', params='', query='prdName=삼성 갤럭시 노트 10 절찬판매', fragment='')
```



위에 경우 query가 잘 들어간 것을 확인할 수 있지만, API method 중 get method에 query로 # 기호를 넣게 되면 아래와 같이 '#'  이후 문자열은 fragment 요소로 들어가는 것을 알 수 있다.

```python
from urllib.parse import urlparse
url = "http://internet.com/extract-brand?prdName=삼성 갤럭시 노트 #10 절찬판매"
url_parse_result = urlparse(url)
```

```python
# url_parse_result
ParseResult(scheme='http', netloc='internet.com', path='/extract-brand', params='', query='prdName=삼성 갤럭시 노트 ', fragment='10 절찬판매')
```



이를 해결하기 위해선, `urlencode` 를 통해 해결하는 방법과 단순하게 `requests.get(url)` 형식으로 요청하지 않고 파라미터 값을 dict 형태로 넣어주는 방법이 있다.

```python
# urlencode를 통해 해결하는 방법
from urllib import parse

url = "http://internet.com/extract-brand?"
param = {"prdName" : "삼성 갤럭시 노트 #10 절찬판매"}

param = parse.urlencode(param, encoding='UTF-8', doseq=True)
url += param
response = requests.get(url)

url_parse_result = urlparse(url)
# url_parse_result
ParseResult(scheme='http', netloc='internet.com', path='/extract-brand', params='', query='prdName=%EC%82%BC%EC%84%B1+%EA%B0%A4%EB%9F%AD%EC%8B%9C+%EB%85%B8%ED%8A%B8+%2310+%EC%A0%88%EC%B0%AC%ED%8C%90%EB%A7%A4', fragment='')
```

 ```python
# 파라미터 값을 dict 형태로 넣어 요청하는 방법
headers = {
    'accept': 'application/json',
}
url = "http://internet.com/extract-brand?"
param = {"prdName" : "삼성 갤럭시 노트 #10 절찬판매"}
response = requests.get(url, headers=headers, params=params)
 ```



### 참고자료

- https://docs.python.org/ko/3/library/urllib.parse.html
- https://docs.python-requests.org/en/master/user/quickstart/