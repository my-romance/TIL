#  [EquiLeader](https://app.codility.com/programmers/lessons/8-leader/equi_leader/)

```python
def solution(A):
    heap_list = []
    for a in A:
        if len(heap_list) == 0: 
            heap_list.append(a)
            continue
        if heap_list[-1] == a : heap_list.append(a)
        else: heap_list.pop()
    
    if len(heap_list) == 0: return 0
    leader_no = heap_list.pop()
    
    left_leader_num, right_leader_num = 0, A.count(leader_no)
    left_arr_num, right_arr_num = 0, len(A)
    answer = 0
    for index,a in enumerate(A):
        left_arr_num +=1 ; right_arr_num -= 1
        if right_arr_num == 0: break
    
        if a == leader_no :
            left_leader_num += 1; right_leader_num -= 1
        if (((left_arr_num/2) < left_leader_num) and ((right_arr_num/2) < right_leader_num)): answer += 1
        
    return answer 
```

1. 전체배열의 leader를 찾는다. # 이때 전체배열의 leader가 없을 수 있음(생각하지 못한 부분) . 이때는 index 기준의 왼쪽 배열과 오른쪽 배열의 leader가 일치할 수 가 없으므로 0을 return
2. 배열의 index를 오른쪽으로 이동하면서 {index를 기준으로 왼쪽 원소값들과 index 원소값} 중 leader(leader_no)의 갯수(left_leader_num)를 파악하면서 동시에 index 기준으로 오른쪽 원소값들 중 leader의 갯수(right_leader_num)을 파악한다. 이를 통해 index 기준 왼쪽 배열과 오른쪽 배열의 leader가 일치하는지 확인한다.
