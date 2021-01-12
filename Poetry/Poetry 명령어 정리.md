# Poetry 명령어 정리



### Poetry 설치

스크립트를 이용한 설치

```shell
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
```

pip로 설치

```
pip install poetry
```



### PATH 설정 (Pyenv 사용시)

brew를 사용해 설치한 패키지나, 그외에도 Pyenv로 관리되는 가상환경보다 우선하게 실행하고자 하는 명령어는 적절히 PATH의 순서를 조정

```
vi .zshrc 

# 예시 : 파일에 아래 command 추가
export PATH="$HOME/.poetry/bin:$PATH"
```



### 프로젝트 생성 (new)

`new` 명령어를 통해 새로운 프로젝트를 만듦

```
poetry new <project name>
```

위 명령어를 통해 아래와 같은 구조의 프로젝트가 생성.

```
project tree
.
├── README.rst
├── my_project
│   └── __init__.py
├── pyproject.toml
└── tests
    ├── __init__.py
    └── test_my_project.py
```


또한, 위 명령어를 통해 생기는 **pyproject.toml 파일(의존성을 관리하는 파일)**의 결과.

```
[tool.poetry]
name = "<project name>"
version = "0.1.0"
description = ""
authors = [""]

[tool.poetry.dependencies]
python = "^3.7"

[tool.poetry.dev-dependencies]
pytest = "^5.2"

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

의존성은  [tool.poetry.dependencies] 와 [tool.poetry.dev-dependencies] 에서 관리.



### 의존성 추가 (add)

Pyproject.toml에 의존성을 추가하고 싶다면, `add` 명령어 사용

```
# 의존성 추가
poetry add tqdm

# 특정 버전을 지정하여 의존성 추가
poetry add transformers==2.7.0
```

위 명령어 실행 뒤 pyproject.toml 파일 결과 중 [tool.poetry.dependencies]

```
...
[tool.poetry.dependencies]
python = "^3.7"
tqdm = "^4.49.0"
transformers = "2.7.0"
...
```

여기서  tqdm 의존성 설정은 transformers와 달리 `^`가 붙어있는데, 여기서 `^` 의 의미는 (>=4.49.0, < 5.0.0)의 의미. 즉 4.49.0 ~ 5.0.0 버전까지도 설치가 된다는 의미. 이런 제약사항은 [의존성 제약사항 관련 문서](https://python-poetry.org/docs/dependency-specification/) 참조.



###  의존성 삭제 (remove)

아래와 같이, `remove` 명령어를 통해 의존성 삭제 가능

```shell
poetry remove <지우고자 하는 패키지명>

# 예제
poetry remove falsk
```



### 의존성 최신으로 업데이트 (update)

아래 명령어를 사용하면 의존성을 최신으로 업데이트하고 poetry.lock 파일 업데이트. (이 명령어는 poetry.lock 파일을 삭제한 후, `poetry install` 하는것과 동일)

```
# 패키지 버전 업데이트
poetry update

# 패키지 하나씩 지정해서 업데이트
poetry update requests toml

# 업데이트는 하지 않고, poetry.lock만 업데이트
poetry update --lock
```



### 의존성 패키지 설치 (install)

`install` 명령어는 현재 프로젝트의 `pyproject.toml` 파일을 읽어서 의존성 패키지 설치.

poetry.lock 파일이 없으면 만들어주고, 있으면 해당파일을 사용

```
# 의존성 설치
poetry install

# 개발환경의 의존성은 빼고 설치
poetry install --no-dev

# -E 또는 --extras로 추가 의존성 설정 가능
poetry install --extras "mysql redis"
poetry install -E mysql -E redis
```



### 패키징

poetry를 사용해서 **tarball** **wheel** 같은 배포가 가능한 파일로 빌드.

```
poetry build
```

 위 명령어를 실행하면 아래와 같은 결과가 나옴

```
Building <project-name> (0.1.0)
 - Building sdist
 - Built <project-name>-0.1.0.tar.gz

 - Building wheel
 - Built <project-name>-0.1.0-py3-none-any.whl
```

실행 후, dist 디렉토리에 들어가면 아래와 같이 압축된 파일들 존재

```
<project-name>-0.1.0.tar.gz
<project-name>-0.1.0-py3-none-any.whl
```



 

### 참고 자료

- https://blog.gyus.me/2020/introduce-poetry/
- https://lhy.kr/python-poetry
- https://python-poetry.org/docs/