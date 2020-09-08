#list를 사용하면, 재귀함수를 쓸 때 copy.deedcopy()를 사용해야함 : 시간 많이 걸림
#재귀함수에서 list를 쓸 때는 수정이 필요없는 값들을 list로 사용할 것
'''
num1 = -20
num2 = 7
print(int(num1/num2)) : -2
print(num1//num2) : -3
'''
from sys import stdin
max_num,min_num = 'default', 'default'

def recursive_f(index, result, plus, minus, multiple, divide):
    global N, max_num, min_num
    if index == N-1:
        if (max_num == 'default') or (max_num < result) : max_num = result
        if (min_num == 'default') or (min_num > result) : min_num = result

    if plus : recursive_f(index+1, result+operand[index+1], plus-1, minus, multiple, divide)
    if minus : recursive_f(index+1, result-operand[index+1], plus, minus-1, multiple, divide)
    if multiple : recursive_f(index+1, result*operand[index+1], plus, minus, multiple-1, divide)
    if divide : recursive_f(index+1, int(result/operand[index+1]), plus, minus, multiple, divide-1)
    
N = int(input())
operand = list(map(int, stdin.readline().strip().split(' ')))
plus, minus, multiple, divide = (map(int, stdin.readline().strip().split(' ')))

recursive_f(0,operand[0],plus, minus, multiple, divide)
print(max_num,min_num)
