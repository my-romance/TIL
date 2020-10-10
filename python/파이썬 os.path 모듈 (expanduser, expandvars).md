# 파이썬 os.path 모듈 (expanduser, expandvars)

### os.path.expanduser(path)

- 유닉스와 윈도우에서, `~`와 `~user`의 초기 구성요소가 해당 사용자의 홈 디렉터리로 치환된 인자를 반환함
- 유닉스에서, `~` 는 환경 변수 HOME으로 설정되어 있다면, os.path.expanduser(<directory>)에서  <directory>에 `~` 는 Home으로 치환된다는 의미.

```python
import os
print(os.path.expanduser("~/python.md"))
```

```python
# 출력결과는
# '<HOME directory>(ex:/Users/<userName>)/python.md'
```



### os.path.expandvars(path)

- 환경변수로 확장된 인자를 반환. `$<name>`이나 `${<name>}` 형식의 부분 문자열이 환경변수 <name>의 값으로 치환됨.

```python
import os
print(os.path.expandvars('$HOME\python.md'))
print(os.path.expandvars('$CONDA_EXE\python.md')
```

```python
# 출력결과는
# '<HOME directory>(ex:/Users/<username>)/python.md'
# '<CONDA_EXE directory>(ex:Users/<username>/opt/anaconda3/bin/python/python.md)/python.md'
```







### 참고문서

- https://python.flowdas.com/library/os.path.html#os.path.expanduser
- https://devanix.tistory.com/298