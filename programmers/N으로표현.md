```python

def solution(N, number):
    answer = -1
    answer_list = [[N]]
    
    # 최소값은 8이어야 함. 아니면 answer = -1 할당
    for index in range(8):
        # (index+1)개의 N을 사용하여 number을 만들수 있는지 check
        if number in answer_list[index]: answer = (index+1); break; 
        
        # (next_index+1)개의 N을 사용하여 만들수 있는 모든 수 계산하여 temp_list에 저장
        # temp_list에는 우선 N을 연속으로 (next_index+1)개만큼 "나열"하여 만드는 수를 계산하여 저장
        temp_list, next_index = [int((str(N))*(next_index+1))], index+1
        for i in range((next_index+1)//2) : # N의 갯수가 4일 경우, 만들 수 있는 모든 조합은 (N 갯수:1개,3개), (N 갯수:2개,2개) 인경우
            j = next_index - (i+1)
            i_arr = answer_list[i]; j_arr = answer_list[j];
            for i_num in i_arr: 
                for j_num in j_arr:
                    #i의 갯수로 만들 수 있는 수와, j의 갯수로 만들수 있는 수를 사칙연산을 이용해 조합 ->(next_index+1)개의 N으로 만들 수 있는 수를 계산 
                    temp_list.extend([(i_num+j_num), (i_num-j_num),(j_num-i_num),(i_num*j_num), (i_num//j_num), (j_num//i_num) ])
        
        temp_list = list(set(temp_list)) # 중복제거
        if 0 in temp_list : temp_list.remove(0) # 0은 필요없음
        answer_list.append(temp_list)
    return answer
```
