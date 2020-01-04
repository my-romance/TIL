from sys import stdin
import operator

N = int(input())
word_dic = {}
for i in range(N):
    input = list(map(str, stdin.readline().strip())) #입력받음 : str → list
    input.reverse();    n = 0.1 # 10의 배수 (자릿수에 맞게) 계산을 위한 초기화

    for word in input:
        n = n*10    # 자릿수에 맞게 숫자 업데이트
        if word in word_dic:word_dic[word] += n #기존 dic에 word가 있으면 + 연산
        else : word_dic[word] = n #기존 dic에 word가 없었으면 추가 연산
        # word dic의 value가 커질수록 가장 큰 값을 할당받아야 함. 
        # ex : {'A':120,'B':10} → 'A'는 9를, 'B'는 8를 할당받아야 함.
sorted_word_list = sorted(word_dic.items(),key=operator.itemgetter(1),reverse = True)

n,sum_n = 9,0
for word, num in sorted_word_list:
    sum_n += num*n
    n -= 1
print(int(sum_n))
