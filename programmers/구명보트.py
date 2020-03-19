# remove(), pop()보다는 인덱스값으로 접근한 뒤 지나가는 게 시간 효율에 좋음
def solution(people, limit):
    answer,in_index, de_index = 0, 0, (len(people)-1)
    people.sort(reverse=True)
    size = len(people)
    
    while(True):
        max_num = people[in_index]; in_index += 1; answer += 1;
        # 최대 2명이 탈 수 있기에 그저 가장 몸무게가 큰 사람과 작은 사람의 합이 무게제한을
        # 넘지 않는다면 태워 보낸다.
        if (len(people) > 0) and ((max_num + people[de_index]) <= limit): 
            de_index -= 1
        if in_index > de_index: break
    return answer
