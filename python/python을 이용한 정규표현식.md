# python을 이용한 정규표현식

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
  |    \d     |              모둔 숫자 의미. [0-9]              |
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



### 참고

- https://wikidocs.net/21703
- https://wikidocs.net/4308
