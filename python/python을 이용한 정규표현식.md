# python을 이용한 정규표현식

## 정규표현식 기본

### 정규 표현식 문법과 모듈 함수

- 정규 표현식 문법

  |    특수문자    |                             설명                             |
  | :------------: | :----------------------------------------------------------: |
  |       .        |         한 개의 임의의 문자. 줄바꿈 문자인 \n는 제외         |
  |       ?        |                     문자가 0개 또는 1개                      |
  |       *        |                       문자가 0개 이상                        |
  |       +        |                       문자가 1개 이상                        |
  |       ^        |                   뒤의 문자로 문자열 시작                    |
  |       $        |                   앞의 문자로 문자열 끝남                    |
  |     {숫자}     |                        숫자만큼 반복                         |
  | {숫자1, 숫자2} |               숫자1 이상 숫자2 이하 만큼 반복                |
  |    {숫자,}     |                      숫자 이상만큼 반복                      |
  |       []       | 대괄호 안의 문자들 중 한 개의 문자와 매치.<br />example : [amk] → "a 또는 m 또는 k 중 하나라도 존재하면 매치"<br />[a-zA-Z]와 같이 범위 지정 가능.알파벳 전체를 의미하는 범위이며, 문자열에 알파벳이 존재하면 매치 |
  |    [^문자]     |                 해당 문자를 제외한 문자 매치                 |
  |       \|       |           A\|B와 같이 쓰이며, A 또는 B 의미를 가짐           |

- 역슬래시를 이용한 문자 규칙

  | 문자 규칙 |                      설명                       |
  | :-------: | :---------------------------------------------: |
  |   \\\\    |            역 슬래쉬 문자 자체 의미             |
  |    \d     |              모든 숫자 의미. [0-9]              |
  |    \D     |        숫자를 제외한 모든 문자. \[^0-9\]        |
  |    \s     |            공백 의미. [ \t\n\r\f\v]             |
  |    \S     |      공백을 제외한 문자. \[^ \t\n\r\f\v\]       |
  |    \w     |        문자 또는 숫자 의미. [a-zA-Z0-9]         |
  |    \W     | 문자 또는 숫자가 아닌 문자 의미. \[^a-zA-Z0-9\] |

- 정규표현식 모듈 함수

  | 모듈 함수     |                             설명                             |
  | :------------ | :----------------------------------------------------------: |
  | re.compile()  | **정규표현식을 컴파일하는 함수**. 찾고자 하는 패턴이 빈번한 경우 미리 컴파일 해놓고 사용하면 속도와 편의성면에서 유리 |
  | re.search()   |      문자열 전체에 대해서 정규표현식과 매치되는지 검색       |
  | re.match()    |         문자열의 처음이 정규표현식과 매치되는지 검색         |
  | re.split()    |    정규표현식을 기준으로 문자열을 분리하여 리스트로 리턴     |
  | re.findall()  | 문자열에서 정규표현식과 매치되는 모든 경우의 문자열을 찾아 리스트로 리턴. 만약, 매치되는 문자열이 없다면 빈 리스트 리턴 |
  | re.finditer() | 문자열에서 정규표현식과 매치되는 모둔 경우의 문자열에 대한 이터레이터 객체를 리턴 |
  | re.sub()      | 문자열에서 정규 표현식과 일치하는 부분을 다른 문자열로 대체  |

  

### 정규표현식 실습

- . 기호
  Example : 정규 표현식 a.c → a와 c 사이에 어떤 1개의 문자가 있는 문자열 (akc, azc, avc, a5c, a!c 등등)

  ```python
  import re
  r=re.compile("a.c")
  r.search("kkk") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("abc")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 3), match='abc'>  
  ```

- ? 기호
  Example : 정규표현식 ab?c → b는 있다고 취급할 수 도 있고, 없다고 취급할 수도 있음 (abc, ac )

  ```python
  import re
  r=re.compile("ab?c")
  r.search("abbc") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("abc")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 3), match='abc'>  
  ```

  ```python
  r.search("ac")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 2), match='ac'>  
  ```

- \* 기호
  Example : 정규표현식 ab*c  → b는 존재하지 않을 수도 있으며, 또는 여러개일 수도 있음 (ac, abc, abbc, abbbc)

  ```python
  import re
  r=re.compile("ab*c")
  r.search("a") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("ac")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 2), match='ac'>  
  ```

  ```python
  r.search("abc") 
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 3), match='abc'> 
  ```

  ```python
  r.search("abbbbc") 
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 6), match='abbbbc'> 
  ```

- \+ 기호
   Example : 정규표현식 ab+c  → b는 최소 1개 이상 (abc, abbc, abbbc)

  ```python
  import re
  r=re.compile("ab+c")
  r.search("ac") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("abc") 
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 3), match='abc'>   
  ```

  ```python
  r.search("abbbbc") 
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 6), match='abbbbc'>  
  ```

- \^ 기호
  Example : 정규표현식 ^a → a로 시작되는 문자열

  ```python
  import re
  r=re.compile("^a")
  r.search("bbc") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("ab")     
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 1), match='a'>  
  ```

- {숫자} 기호
  Example : 정규표현식 ab{2}c → a와 c사이에 b가 존재하면서, b가 2개인 문자열 (abbc)

  ```python
  import re
  r=re.compile("ab{2}c")
  r.search("ac") # 아무런 결과도 출력되지 않는다.
  r.search("abc") # 아무런 결과도 출력되지 않는다.
  r.search("abbbbbc") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("abbc")
  ```

  ````python
  <_sre.SRE_Match object; span=(0, 4), match='abbc'>
  ````

- {숫자1, 숫자2} 기호
  Example : 정규표현식 ab{2,8}c→ a와 c 사이에 b가 존재하면서 b는 2개 이상 8개 이하인 문자열 (abbc, abbbbc)

  ```python
  import re
  r=re.compile("ab{2,8}c")
  r.search("ac") # 아무런 결과도 출력되지 않는다.
  r.search("abc") # 아무런 결과도 출력되지 않는다.
  r.search("abbbbbbbbbc") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("abbc")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 4), match='abbc'>
  ```

  ```python
  r.search("abbbbbbbbc")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 10), match='abbbbbbbbc'>
  ```

- {숫자,} 기호
  Example : 정규표현식 a{2,}bc→ 뒤에 bc가 붙으면서 a의 갯수가 2개 이상인 문자열 (aabc, aaabc)

  ```python
  import re
  r=re.compile("a{2,}bc")
  r.search("bc") # 아무런 결과도 출력되지 않는다.
  r.search("aa") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("aabc")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 4), match='aabc'>
  ```

  ```python
  r.search("aaaaaaaabc")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 10), match='aaaaaaaabc'> 
  ```

- \[\] 기호
  Example : 정규표현식 [abc] → a 또는 b 또는 c, 정규표현식 [a-zA-Z] → 알파벳 하나

  ```python
  import re
  r=re.compile("[abc]") # [abc]는 [a-c]와 같다.
  r.search("zzz") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("a")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 1), match='a'> 
  ```

  ```python
  r.search("aaaaaaa")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 1), match='a'> 
  ```

  ```python
  r.search("baac") 
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 1), match='b'>
  ```

- [^문자]기호
  Example : 정규표현식 \[^abc\] → a 또는 b 또는 c가 들어간 문자열을 제외한 모든 문자열

  ```python
  import re
  r=re.compile("[^abc]")
  r.search("a") # 아무런 결과도 출력되지 않는다.
  r.search("ab") # 아무런 결과도 출력되지 않는다.
  r.search("b") # 아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.search("d")
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 1), match='d'> 
  ```

  ```python
  r.search("1")     
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 1), match='1'> 
  ```



### 정규 표현식 모듈 함수 예제

- re.match()와 re.search()의 차이

  - search() : **정규 표현식 전체**에 대해서 문자열이 매치하는지를 봄. 이때, **매치되는 문자열이 두개 이상인 경우 맨 앞의 문자열을 매치**시킴
  - match() : **문자열의 첫 부분부터** 정규 표현식과 매치하는지를 확인

  즉, 문자열 중간에 찾을 패턴이 있다고 하더라도, match 함수는 문자열의 시작에서 패턴이 일치하지 않으면 매치하지 않지만 search 함수는 매치함

  ```python
  import re
  r=re.compile("ab.")
  ```

  ```python
  r.search("kkkabc")  
  ```

  ```python
  <_sre.SRE_Match object; span=(3, 6), match='abc'>   
  ```

  ```python
  r.match("kkkabc")  #아무런 결과도 출력되지 않는다.
  ```

  ```python
  r.match("abckkk")  
  ```

  ```python
  <_sre.SRE_Match object; span=(0, 3), match='abc'> 
  ```

- re.split()
  **정규표현식을 기준으로 문자열을 분리하여 리스트로 리턴**, 토큰화에 유용하게 쓰임

  ```python
  import re
  text="사과 딸기 수박 메론 바나나"
  re.split(" ",text)
  ```

  ```python
  ['사과', '딸기', '수박', '메론', '바나나']
  ```

  ```python
  import re
  text="사과+딸기+수박+메론+바나나"
  re.split("\+",text)
  ```

  ```python
  ['사과', '딸기', '수박', '메론', '바나나']  
  ```

- re.findall()
  **문자열에서 정규표현식과 매치되는 모든 경우의 문자열을 찾아 리스트로 리턴**. 단, 매치되는 문자열이 없다면 빈 리스트 리턴

  ```python
  import re
  text="이름 : 김철수
  전화번호 : 010 - 1234 - 1234
  나이 : 30
  성별 : 남"""  
  re.findall("\d+",text)
  ```

  ```python
  ['010', '1234', '1234', '30']
  ```

  ```python
  re.findall("\d+", "문자열입니다.")
  ```

  ```python
  [] # 빈 리스트를 리턴
  ```

- re.sub()
  **문자열에서 정규 표현식과 일치하는 부분을 다른 문자열로 대체**. 자연어처리를 위한 특수문자 제거 등에 유용하게 사용됨.

  ```python
  import re
  text="Regular expression : A regular expression, regex or regexp[1] (sometimes called a rational expression)[2][3] is, in theoretical computer science and formal language theory, a sequence of characters that define a search pattern."
  re.sub('[^a-zA-Z]',' ',text)
  ```

  ```python
  'Regular expression   A regular expression  regex or regexp     sometimes called a rational expression        is  in theoretical computer science and formal language theory  a sequence of characters that define a search pattern '  
  ```

- re.finditer()

  **문자열에서 정규표현식과 매치되는 모둔 경우의 문자열에 대한 이터레이터 객체를 리턴**

  ```python
  import re
  
  r = re.compile('a.c')
  a = r.finditer("adc abb aec abc")
  for x in a:
      print(x)
  ```

  ```python
  <re.Match object; span=(0, 3), match='adc'>
  <re.Match object; span=(8, 11), match='aec'>
  <re.Match object; span=(12, 15), match='abc'>
  ```

 

### match 객체의 메서드

| method  |                      설명                       |
| :------ | :---------------------------------------------: |
| group() |               매치된 문자열 리턴                |
| start() |         매치된 문자열의 시작 위치 리턴          |
| end()   |          매치된 문자열의 끝 위치 리턴           |
| span()  | 매치된 문자열의 (시작, 끝)에 해당하는 튜플 리턴 |

```python
import re

r = re.compile('a.c')
a = r.finditer("adc abb aec abc")
for x in a:
    print(x.group(), x.start(), x.end(), x.span())
```

```python
adc 0 3 (0, 3)
aec 8 11 (8, 11)
abc 12 15 (12, 15)
```



## 정규표현식 고급

### 그룹핑

- 보통 반복되는 문자열을 찾을 때 그룹을 사용함

  ```python
  >>> p = re.compile('(ABC)+')
  >>> m = p.search('ABCABCABC OK?')
  >>> print(m)
  <re.Match object; span=(0, 9), match='ABCABCABC'>
  >>> print(m.group())
  ABCABCABC
  ```

- **하지만 매칭된 문자열 중에서 특정 부분의 문자열만 뽑아내기 위해서 사용가능**

  ```python
  >>> p = re.compile(r"(\w+)\s+\d+[-]\d+[-]\d+")
  >>> m = p.search("park 010-1234-1234")
  >>> print(m.group(1))
  park
  ```

  - group 메서드의 인덱스는 n번째 그룹에 해당되는 문자열을 의미

    - **group(0) : 매칭된 전체 문자열**
    - group(1) : 첫번째 그룹에 해당되는 문자열
    - group()2 : n번째 그룹에 해당되는 문자열

  - 이때  `(\w+)\s+((\d+)[-]\d+[-]\d+)`처럼 그룹핑이 중첩되는 경우, index 순서는 `(` 가 나온 순서

    ```python
    >>> p = re.compile(r"(\w+)\s+((\d+)[-]\d+[-]\d+)")
    >>> m = p.search("park 010-1234-1234")
    >>> print(m.group(3))
    010
    ```

- 그룹핑된 문자열 재참조

  - 정규식  `(\b\w+)\s+\1`은 `(그룹) + " " + 그룹과 동일한 단어`와 매치됨을 의미. 

    ```python
    >>> p = re.compile(r'(\b\w+)\s+\1')
    >>> p.search('Paris in the the spring').group()
    'the the'
    ```

  - 즉 동일한 그룹을 여러번 사용할 때 유용

  -  `\1`은 정규식의 그룹 중 첫 번째 그룹,  `\2`은 정규식의 그룹 중 두 번째 그룹,  `\n`은 정규식의 그룹 중 n 번째 그룹을 가리키는 메타 문자이다.

- 그룹핑된 문자열에 이름 붙이기

  - 그룹핑된 문자열에 이름을 붙여 특정 부분의 문자열만 뽑아낼 수 있음. 그룹핑 index의 혼란이 오는 경우 이름을 붙여 사용하면 유용하다. 또한 그룹 이름도 문자열 재참조가 가능

    - 기존 `(<그룹 정규표현식>)` 을  `(?P<name><그룹 정규표현식>)` 형태로 사용하면 <그룹 정규표현식>에 해당하는 문자열에 \<name\> 이라는 이름을 부여함
      - 예시 : `(\w+)` --> `(?P<name>\w+)` 

  - 예시 1 : 그룹 이름으로 특정 부분의 문자열만 뽑아내기

    ```python
    >>> p = re.compile(r"(?P<name>\w+)\s+((\d+)[-]\d+[-]\d+)")
    >>> m = p.search("park 010-1234-1234")
    >>> print(m.group("name"))
    park
    ```

  - 예시 2 : 그룹 이름으로 문자열 재참조하기

    ```python
    >>> p = re.compile(r'(?P<word>\b\w+)\s+(?P=word)')
    >>> p.search('Paris in the the spring').group()
    'the the'
    ```



### 전방 탐색

- 전방 탐색 종류

  - 긍정형 전방 탐색(`(?=...)`) :  `...` 에 해당되는 정규식과 매치되어야 하며, 조건이 통과되어도 문자열이 소비되지 않음
  - 부정형 전방 탐색(`(?!...)`) : `...`에 해당되는 정규식과 매치되지 않아야 하며, 조건이 통과되어도 문자열이 소비되지 않는다. → 매칭되지 않아야 하므로, `...`에 해당되는 문자열이 소비되지 않는 것이 당연한 것..
  - 즉, 매칭된 문자열의 앞을 의미함.

- 긍정형 전방 탐색

  - 아래 코드는 정규식 중 `:`에 해당하는 부분에 긍정형 전방 탐색 기법을 적용하여 `(?=:)`으로 변경한 코드 → 기존 정규식과 같이 검색에서는 동일한 효과를 발휘하지만 `:`에 해당하는 문자열이 정규식 엔진에 의해 소비되지 않아 검색 결과에서는 `:` 이 제거된 문자열을 반환함

    ```python
    >>> p = re.compile(".+(?=:)")
    >>> m = p.search("http://google.com")
    >>> print(m)
    <re.Match object; span=(0, 4), match='http'>
    
    >>> m = p.search("http//google.com")
    None
    ```

- 부정형 전방 탐색

  - 아래 코드는 정규식 `.*[.].*$` 에 부정형 전방 탐색 기법을 적용하여 "bat인 파일은 제외해야 한다"는 조건을 추가한 정규표현식. 즉, 부정형 전방 탐색은 정규식에 매칭되지 말야야 하는 탐색을 할때 유리. 

    ```python
    >>> p = re.compile('.*[.](?!bat$).*$')
    >>> print(p.search('autoexec.bat'))
    None
    
    >>> print(p.search('autoexec.bar'))
    <re.Match object; span=(0, 12), match='autoexec.bar'>
    
    >>> p = re.compile('.*[.].+$(?!bat$)') #하지만 '(?!bat$)' 순서를 뒤로 빼면 bat가 매칭됨을 유의. (순서 유의해서 사용)
    >>> print(p.search('autoexec.bat'))
    <re.Match object; span=(0, 12), match='autoexec.bat'>
    
    >>> p = re.compile('.*[.](?!bat).*$')
    >>> print(p.search('autoexec.bat'))
    None
    
    >>> p = re.compile('.*[.](?!bat$).*')
    >>> print(p.search('autoexec.bat'))
    None
    
    >>> print(p.search('autoexec.bataaa'))
    <re.Match object; span=(0, 15), match='autoexec.bataaa'>

    >>> print(p.search('autoexec.bar'))
  <re.Match object; span=(0, 12), match='autoexec.bar'>
    ```

  - "bat"뿐만이 아니라 "exe" 확장자명을 가지는 파일을 추출하지 않을때는 아래 코드와 같이 표현 가능

    ```python
    p = re.compile('.*[.](?!bat$|exe$).*$')
    print(p.search('autoexec.exe'))
    None

  - **다른 예시**

    ```python
    p = re.compile('^((?!Dae).)*$')
    print(p.search('seokDeajin'))
    None
    
    ### 참고로 아래와 같이 (?:를 붙혀주면 참조 가능한 상태로 유지하는 것을 없애기에 메모리 효율성을 얻을 수 있다고 함
    p = re.compile('^(?:(?!Dae).)*$')
    print(p.search('seokDeajin'))
    None
    ```

    

### 후방탐색

- 후방 탐색 종류
  - 긍정형 후방 탐색(`(?<=...)`) :  `...` 에 해당되는 정규식과 매치되어야 하며, 조건이 통과되어도 문자열이 소비되지 않음
  - 부정형 전방 탐색(`(?<!...)`) : `...`에 해당되는 정규식과 매치되지 않아야 하며, 조건이 통과되어도 문자열이 소비되지 않는다.
  - 즉, 매칭된 문자열의 뒤를 의미함.

- 전방 탐색 VS 후방 탐색 비교

  - 전방탐색

    ```python
    p = re.compile('.(?=Dae)')
    p.search('seokDaejin')
    >>> <re.Match object; span=(3, 4), match='k'>
    
    p = re.compile('(?=Dae).')
    p.search('seokDaejin')
    >>> <re.Match object; span=(4, 5), match='D'>
    ```

  - 후방탐색

    ```python
    p = re.compile('.(?<=Dae)')
    p.search('seokDaejin')
    >>> <re.Match object; span=(6, 7), match='e'>
    
    p = re.compile('(?<=Dae).')
    p.search('seokDaejin')
    >>> <re.Match object; span=(7, 8), match='j'>
    ```

    

### re.sub()

- sub 메서드를 사용하면 정규식과 매치되는 부분을 다른 문자로 쉽게 바꿀 수 있음

  ```python
  >>> p = re.compile('(blue|white|red)')
  >>> p.sub('colour', 'blue socks and red shoes')
  'colour socks and colour shoes
  
  >>> p.sub('colour', 'blue socks and red shoes', count=1) # 또한 `count` 파라미터를 통해 바꿀 횟수 제한가능
  'colour socks and red shoes'
  
  >>> p.subn( 'colour', 'blue socks and red shoes') # subn 메서드는 바꿔진 횟수 또한 반환
  ('colour socks and colour shoes', 2)
  ```

- sub 메서드 사용 시 참조 구문 사용하기

  - 아래 코드는 참조 구문을 활용하여 `이름 + 전화번호` 문자열을 `전화번호 + 이름` 으로 바꾸는 코드. sub의 바꿀 문자열 부분에 `\g<그룹이름>` 을 사용하면 정규식의 그룹이름을 참조할 수 있음

    ```python
    >>> p = re.compile(r"(?P<name>\w+)\s+(?P<phone>(\d+)[-]\d+[-]\d+)")
    >>> print(p.sub("\g<phone> \g<name>", "park 010-1234-1234"))
    010-1234-1234 park
    ```

  - 그룹 이름대신 참조번호를 통해 참조 구문사용 가능

    ```python
    >>> p = re.compile(r"(?P<name>\w+)\s+(?P<phone>(\d+)[-]\d+[-]\d+)")
    >>> print(p.sub("\g<2> \g<1>", "park 010-1234-1234"))
    010-1234-1234 park
    ```

- sub 메서드의 매개변수로 함수 넣기

  - sub 메서드의 `repl` 에 해당하는 매개변수로 함수를 넣을 수 있음

    ```python
    >>> def hexrepl(match): # match객체의 group()을 16진수로 반환하는 함수
    ...     value = int(match.group())
    ...     return hex(value)
    ...
    >>> p = re.compile(r'\d+')
    >>> p.sub(hexrepl, 'Call 65490 for printing, 49152 for user code.')
    'Call 0xffd2 for printing, 0xc000 for user code.'
    ```

  - sub의  `repl` 에 해당하는 매개변수로 함수를 사용할 경우, 해당 함수의 첫 번째 매개변수에는 정규식과 매치된 match 객체가 입력된다. 그리고 매치되는 문자열은 함수의 반환 값으로 바뀌게 된다.



### Greedy VS Non-Greedy

- 정규표현식을 최대한의 문자열을 매칭 (Greedy) 하는데, 이를 제한하기 위해 non-greedy문자인 `?` 을 사용

  - Greedy 예제

    ```
    >>> s = '<html><head><title>Title</title>'
    >>> print(re.match('<.*>', s).group())
    <html><head><title>Title</title>
    ```

  - Non-Greedy 예제

    ```
    >>> s = '<html><head><title>Title</title>'
    >>> print(re.match('<.*?>', s).group())
    <html>
    ```

- non-greedy 문자인 `?`는 `*?`, `+?`, `??`, `{m,n}?`와 같이 사용할 가능 → 가능한 한 가장 최소한의 반복을 수행하도록 도와주는 역할



### 참고

- https://wikidocs.net/21703
- https://wikidocs.net/4308
- https://wikidocs.net/4309
- https://brunch.co.kr/@daejin/11
