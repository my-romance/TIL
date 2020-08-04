# 이중 dict VS 단일 dict

딕셔너리에 key : value 쌍이 많을 경우, 이중 dict을 사용하면 단일 dict 보다 빨리 key값을 찾을 지에 대한 실험
```python

import time
if __name__ == '__main__':
    # 이중 dic
    str_dic = {}
    for x in range(1000, 100000):
        x = str(x)
        try: str_dic[x[0:2]][x] = x
        except : str_dic[x[0:2]] = {}; str_dic[x[0:2]][x] = x

    start_time = time.time()
    for x in range(1000, 100000):
        x = str(x)
        y = str_dic[x[0:2]][x]
    print("걸린시간 : ", time.time() - start_time)

    # 단일 dic
    str_dic = {}
    for x in range(1000, 100000):
        x = str(x)
        try: str_dic[x] = x
        except : str_dic[x] = {}; str_dic[x] = x;

    start_time = time.time()
    for x in range(1000, 100000):
        y = str_dic[str(x)]
    print("걸린시간 : ", time.time() - start_time)

```

```python
#output
걸린시간 :  0.0767066478729248
걸린시간 :  0.06880497932434082
```
결론 -> 이중 dict이 더 느리다
