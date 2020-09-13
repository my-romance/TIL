# Poetry 명령어 정리



### Poetry 설치

```shell
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
```



### PATH 설정 (Pyenv 사용시)

brew를 사용해 설치한 패키지나, 그외에도 Pyenv로 관리되는 가상환경보다 우선하게 실행하고자 하는 명령어는 적절히 PATH의 순서를 조정

```
vi .zshrc 

# 예시 : 파일에 아래 command 추가
export PATH="$HOME/.poetry/bin:$PATH"
```



### 참고 자료

- https://blog.gyus.me/2020/introduce-poetry/
- https://lhy.kr/python-poetry
- https://python-poetry.org/docs/