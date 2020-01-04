## 파이선 리스트 전치(transpose)
#### code
```
a = [[1,1,1],[2,2,2],[3,3,3]]
b = [list(x) for x in zip(*A)] #without map
c = list(map(list,zip(*A))) #with map

print(b) #[[1, 2, 3], [1, 2, 3], [1, 2, 3]]
```
#### 참조
내부 리스트들의 크기가 다르면 가작 작은 len()을 가지는 리스트를 기준으로 전치된 결과가 에러없이 나오기에 유의해야 한다.
```
a = [[1,1,1],[2,2],[3]]
b = [list(x) for x in zip(*A)] #without map
print(b) #[[1, 2, 3]]

a = [[1,1,1],[2,2],[3,3]]
b = [list(x) for x in zip(*A)] #without map
print(b) #[[1, 2, 3], [1, 2, 3]]
'''

참조 사이트 : http://blog.naver.com/PostView.nhn?blogId=cjh226&logNo=221328286730&parentCategoryNo=&categoryNo=17&viewDate=&isShowPopularPosts=false&from=section
