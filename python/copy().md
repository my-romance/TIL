# copy() 함수 사용하기

```python
dic = {1:[2], 3:[4], 5:[6]}
temp_dic = dic
dic[1] = [6]
print(dic,'\n',temp_dic)
{1: [6], 3: [4], 5: [6]} <br>
{1: [6], 3: [4], 5: [6]}
```
위 코드와 같이 temp_dic = dic와 같은 코드를 넣으면 dic의 값이 temp_dic에 복사되는 것이 아니라, 같은 메모리를 참조하게 된다.
그래서 dic[1]의 값을 [6]으로 바꾸면 temp_dic[1]의 값도 [6]으로 바뀌게 된다. <br>
이를 해결하는 방법은 **copy()**함수를 사용하는 것이다.

- dict copy하기

```python
dic = {1:[2], 3:[4], 5:[6]}
temp_dic = dic.copy()
dic[1] = [6]
print(dic,'\n',temp_dic)
```
{1: [6], 3: [4], 5: [6]} <br>
{1: [2], 3: [4], 5: [6]} # copy 함수를 사용하지 않고 temp_dic = dic 코드를 썼다면 {1: [6], 3: [4], 5: [6]}


- list copy하기
```python
arr = [1,2,3,4,5]
temp_arr = arr.copy()
arr[2] = 5
print(arr,'\n', temp_arr)
```
[1, 2, 5, 4, 5] <br>
[1, 2, 3, 4, 5] # copy 함수를 사용하지 않고 temp_arr= arr코드를 썼다면 [1, 2, 5, 4, 5]
