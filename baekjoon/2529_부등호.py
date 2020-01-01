from sys import stdin

N = 2
input =  ['<', '<', '<', '>', '<', '<' ,'>' ,'<' ,'>']
num = len(input)+1

max_input,min_input = [9-x for x in range(num)], [x for x in range(num)]
min_list,max_list = [],[]

i = 0
while(i!=num-1):
    num_to_process = 0
    while(i<num-2 and (input[i]==input[i+1])): 
        i+=1
        num_to_process +=1
    if input[i] == '>':
        #max_num처리를 위한 code
        max_list.extend(max_input[:num_to_process+1])
        max_input = max_input[num_to_process+1:]
        
        #min_num처리를 위한 code
        min_list.extend(list(reversed(min_input[1:num_to_process+2])))
        min_input = min_input[0:1]+min_input[num_to_process+2:]
    else :
        #max_num 처리를 위한 code
        max_list.extend(list(reversed(max_input[1:num_to_process+2])))
        max_input = max_input[0:1]+max_input[num_to_process+2:]

        #min_num 처리를 위한 code
        min_list.extend(min_input[:num_to_process+1])
        min_input = min_input[num_to_process+1:]
    i += 1
max_list.extend(max_input)
min_list.extend(min_input)
max_num = (''.join(str(x) for x in max_list))
min_num = (''.join(str(x) for x in min_list))
print(max_num+'\n'+min_num)
