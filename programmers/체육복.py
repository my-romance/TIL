def solution(n, lost, reserve):
    answer = 0
    arr = [1 for _ in range(n)]
    for x in lost : arr[(x-1)] -= 1
    for x in reserve : arr[(x-1)] += 1
    for idx,x in enumerate(arr):
        f_num = (idx - 1); b_num = (idx+1)
        if not(x == 0) : continue
            
        # 도난 당한 학생들만 처리
        if (not(f_num == -1)) and (arr[f_num]==2) :  # 앞 학생이 빌려줄 수 있음 -> 앞 학생한테 먼저 빌린다. 뒤에 도낭 당한 학생들을 배려하기 위해. 앞학생 체육복은 안 쓰면 버려지기 때문
            arr[f_num] -= 1 ; arr[idx] += 1;
        elif (not(b_num == n )) and (arr[b_num]==2) : # 뒤 학생이 빌려줄 수 있음
            arr[b_num] -= 1; arr[idx] += 1;
    
    for x in arr:
        if not(x == 0) : answer += 1
    return answer
