## 세수의 합

배열을 입력받아 합으로 0을 만들 수 있는 3개의 엘리먼트를 반환

```python
def my_solution(nums:list)->list:
    """
    나의 풀이 방법 :
    우선 각 2개의 숫자씩 합해서, 이를 기록해둔다.
    그리고 더해진 숫자 + 필요 숫자 = 0 -> 필요 숫자 = - 더해진 숫자이므로, 더해진 두 숫자 외 다른 숫자 중 (-더해진 숫자)가 있는지 확인
    문제는 풀었지만, 속도가 느림. O(n^3)까지가지는 않지만 근접.
    """
    memory = []
    for first_idx, first_num in enumerate(nums):

        memory.append([])
        for seconds_idx, second_num in enumerate(nums):
            if first_idx < seconds_idx:
                memory[first_idx].append(first_num+second_num)
            else:
                memory[first_idx].append(0)

    temp_results = []
    for first_idx, rows in enumerate(memory):
        for sec_idx, num in enumerate(rows):
            if first_idx >= sec_idx:
                continue
            if (-1*num) in nums[:first_idx]+nums[(first_idx+1):sec_idx]+nums[sec_idx+1:]:
                temp_results.append([nums[first_idx], nums[sec_idx], -1*num])

    # 후처리
    results = []
    for result in [sorted(result) for result in temp_results]:
        if result not in results:
            results.append(result)

    return results
```



```python
def solution(nums: list)->list:
    """
    책 풀이 : two point로 합 계산.
    우선 정렬 시행.
    그리고, 무조건 포함할 원소를 하나 정하고, 그 외 나머지 (현재 원소의 오른쪽 원소들)에서 포함될 원소의 맨 첫지점에 left, 맨 끝지점에  right를 둔다
    현재 원소 + left 원소 + right 원소가 0이라면 저장. 양수라면 right-=1, 음수라면 left+=1하여 sum이 0이 될 수 있는 지점을 찾는다
    <- 정렬이 되어 있기에 가능

    느낀점 :
    정렬을 이용한 투포인트 방식은 시간 측면에서 매력적이다.
    하지만 이 문제에선 element들의 값이 중복되지 않아야 했는데, 이를 미리 처리하기 위해 중복되는 원소에 대해 띄어넘어가는 것에 대해 예외가 있는지
    고려하는 부분이 까다로웠다. 팁이라고 하자면, 무조건 포함할 원소, left 원소, right 원소가 각각 중복될때마다 넘어가도 되는지 확인하는게 좋을거 같다.
    이 부분이 까다롭고 시간이 오래걸린다면, 중복인 경우도 모두 포함해서 나중에 중복제거를 해도 됨. 시간 측면에서 큰 문제가 없어 보인다.
    """
    results, nums = [], sorted(nums)
    for idx, num in enumerate(nums):
        left, right = idx +1, len(nums)-1

        # 중복 원소 pass
        if idx > 0 and nums[idx] == nums[idx-1]:
            continue

        while left < right:
            print(num, nums[left], nums[right])
            sum = num + nums[left] + nums[right]
            if sum == 0:
                results.append([num, nums[left], nums[right]])

                # 중복 원소 pass
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                # 중복 원소 pass
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                left += 1
                right -= 1

            elif sum < 0:
                left += 1
            else:
                right -= 1



    return results
```

