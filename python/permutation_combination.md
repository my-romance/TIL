# 파이썬에서 순열, 조합 구하기

### 순열

- list안에 중복되는 원소가 없을 경우
```python
import itertools

elements = ['A','B','C']
per_list = list(itertools.permutations(elements)) # tuple로 나타냄
per_list = list(itertools.permutations(elements,2)) # tuple로 나타냄. 매개변수 '2' : 원소 2개로 이루어진 순열을 구함
per_list = (list(map(''.join, itertools.permutations(elements)))) # str로 나타냄.
```

[('A', 'B', 'C'), ('A', 'C', 'B'), ('B', 'A', 'C'), ('B', 'C', 'A'), ('C', 'A', 'B'), ('C', 'B', 'A')]

[('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']

- list안에 중복되는 원소가 있는 경우


```python
import itertools

elements = ['A','B','B','C']
per_list = (list(map(''.join, itertools.permutations(elements)))) 
per_list = (list(map(''.join, itertools.permutations(elements,2))))
```

['ABBC', 'ABCB', 'ABBC', 'ABCB', 'ACBB', 'ACBB', 'BABC', 'BACB', 'BBAC', 'BBCA', 'BCAB', 'BCBA', 'BABC', 'BACB', 'BBAC', 'BBCA', 'BCAB', 'BCBA', 'CABB', 'CABB', 'CBAB', 'CBBA', 'CBAB', 'CBBA']

['AB', 'AB', 'AC', 'BA', 'BB', 'BC', 'BA', 'BB', 'BC', 'CA', 'CB', 'CB']

### 조합

- list안에 중복되는 원소가 없을 경우. 조합은 순열과는 다르게, 몇 개의 원소로 구성할 것이지를 의미하는매개변수를 꼭 넣어야 함.

```python
import itertools

elements = ['A','B','C']
con_list = list(itertools.combinations(elements,3)) # tuple로 나타냄.
con_list = list(itertools.combinations(elements,2)) # tuple로 나타냄. 매개변수 '2' : 원소 2개로 이루어진 순열을 구함
con_list = (list(map(''.join, itertools.combinations(elements,3)))) # str로 나타냄.
```

[('A', 'B', 'C')]

[('A', 'B'), ('A', 'C'), ('B', 'C')]

['ABC']

- list안에 중복되는 원소가 있는 경우.
```python
import itertools

elements = ['A','B','B','C'] # 중복되는 원소가 있을 경우
con_list = (list(map(''.join, itertools.combinations(elements,3)))) 
print(con_list)
con_list = (list(map(''.join, itertools.combinations(elements,2))))
print(con_list)
```

['ABB', 'ABC', 'ABC', 'BBC']

['AB', 'AB', 'AC', 'BB', 'BC', 'BC']

