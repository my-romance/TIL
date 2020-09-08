import copy
def solution(name):
    answer = 0
    name = [ord(x) for x in name]
    
    # 상,하 조이스틱 고려
    #A(65)~N(78)은 A의 오른쪽 방향으로, O(79)~Z(90)는 A의 왼쪽 방향으로 
    for x in name :
        if x <= 78: answer += (x-ord('A')) # 오른쪽으로
        else : answer += ((ord('Z')-x)+1) # 왼쪽으로
    
    # 좌우 조이스틱 고려
    idxs = [0 if x == ord('A') else 1 for x in name ]
    current_idx = 0; idxs[current_idx] = 0
    cal_num = idxs.count(1)
    while(True):
        if cal_num == 0 :break
            
        right_arr = idxs[current_idx+1:] + idxs[:current_idx]
        reverse_idxs = idxs.copy(); reverse_idxs.reverse(); reverse_idx = (len(idxs)-1-current_idx)
        left_arr = reverse_idxs[reverse_idx+1:] + reverse_idxs[:reverse_idx]
        
        right_len = right_arr.index(1) + 1 # 현재 위치에서 오른쪽으로 갈 경우의 거리
        left_len = left_arr.index(1) + 1 # 현재 위치에서 왼쪽으로 갈 경우의 거리
         
        if right_len <= left_len :  # 커서를 오른쪽으로 이동
            answer += right_len; current_idx += right_len
            if current_idx >= len(idxs): current_idx -= len(idxs)
        else : #커서를 왼쪽을 이동
            answer += left_len; current_idx -= left_len
            if current_idx < 0 : current_idx += len(idxs)
        idxs[current_idx] = 0
        
        cal_num -= 1
    return answer
