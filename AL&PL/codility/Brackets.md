# [Brackets](https://app.codility.com/programmers/lessons/7-stacks_and_queues/brackets/)

```python
#heap 사용
def solution(S):
    # write your code in Python 3.6
    open_char = ['(','{','[']
    closed_char = [')','}',']']
    
    heap_list = []
    for s in S:
        if s in open_char: heap_list.append(s)
        elif s in closed_char:
            match_open_char = open_char[closed_char.index(s)]
            
            # not nested한 경우
            if (len(heap_list)==0) or not(heap_list[-1] == match_open_char): return 0
            # nested 일수도 있는 경우 
            heap_list.pop()
    if len(heap_list) == 0: return 1
    else : return 0
```

전형적인 heap을 사용하여 푸는 문제 closed_char가 나오면 heap_list의  top이 closed_char가 매치되는 open_char이어야 한다. 아니면 0을 반환. 그리고 **closed_char이 처음에 나올 수도 있으므로, closed_char이 나올때 heap_list의 크기가 0인지 아닌지도 확인해주어야 함.**

string인 S의 모든 문자들을 거친 뒤, heap_list에 어떤 문자들도 남지 않는다면 nested한 경우이고, 아니면 not nested한 경우이다.
