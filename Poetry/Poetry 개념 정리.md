# Poetry 기본 개념

기존에는 하나의 파이썬 프로젝트를 관리하기 위해 서로 설정을 공유할 수 없는 여러가지 툴들을 사용해야 했음.

하지만 Poetry는 pyproject.toml이란 파일을 통해 의존성, 패키지, 프로젝트를 한 곳에서 관리함.

- `poetry install` : 패키지 설치하는 명령어
- `poetry build` : wheel과 sdist를 만들어 내는 명령어
-  `poetry publish` : pypi든 사설패키지 저장소든 상관없이 업로드 하는 명령어



### 의존성이란

정의 : 코드에서 두 모듈간의 연결. 하나의 모듈이 바뀌면 의존하고 있는 다른 모듈까지 변경이 이루어져 수정이 필요.

의존성 관리의 중요성 : A API와 B API 등을 조합해 C 앱을 만든다고 할때, **만약 모듈을 직접 포함하면 버그가 있을 가능성, 혹은 구버전일 가능성** 을 확인하지 못하고 배포할 수 있음. 의존성 관리자는 개발자가 일일이 모듈을 추가하고 관리하는 것이 아니라, 개발자가 사용하고 있는 모듈을 일괄적으로 처리해줌으로써 API가 최신인지 확인하고 버그가 없는지 등을 확인하는 역활을 함.



### Poetry VS pip 

1. 의존성 해결 : Poetry는 버전 관련 정보를 하고 특정 버전 이상이 아닐 경우에는 아예 설치가 되지 않지만, pip는 설치됨
2. 의존성 잠금 : pip은 lock 파일은 없고, 직접 requirements.txt를 작성해야함. 반면 poetry는 lock 파일과 pyproject.toml (requirements.txt와 같이 설치한 패키지를 리스팅해놓은 파일)을 자동으로 생성 및 업데이트 해줌
3. 가상환경 : pip는 전역에 패키지를 설치하기에 해당 설치 툴로는 다른 환경에서의 버전 관리가 불가능 하지만, poetry는 가상 환경 여부를 확인하고, 기존 환경 혹은 새로 만들어 설치하는 등 자동으로 관리해줌



### Poetry 기본 개념

**project setup**

`poetry new <프로젝트 이름>` 명령어를 입력하면 poetry가 tests 파일을 포함한 project 디렉토리 구조를 세팅.

```
poetry new test_poetry_demo 예시

test_poetry_demo
├── pyproject.toml
├── README.rst
├── poetry_demo
│   └── __init__.py
└── tests
    ├── __init__.py
    └── test_poetry_demo.py
```

- Pyproject.toml 

  프로젝트와 의존성을 조율해주는 가장 중요한 파일.
  파일을 아래와 같이 생겼으며, **만약 의존성을 프로젝트에 추가하고 싶다면 tool.poetry,dependencies에 지정**

  poetry는 이 정보를 repositories에서 패키지를 찾을 때 사용하는데, tool.poetry.repositories(=패키지를 찾는 곳)는 기본적으로 PyPI.

  ```
  name = "poetry-demo"
  version = "0.1.0"
  description = ""
  authors = ["author1"]
  
  [tool.poetry.dependencies]
  python = "*"
  
  [tool.poetry.dev-dependencies]
  pytest = "^3.4"
  ```

  또한 pryproject.toml 파일을 변경할 필요 없이 아래 명령어를 통해 수정이 가능. requirements.txt는 개발자가 계속 업데이트 해주어야 하지만 poetry는 알아서 add 해주는 것이 장점.

  ```
  poetry add <사용할 의존성 ex : django>
  ```

- poetry.lock
  프로젝트에 정의된 의존성 파일들을 설치하기 위해 아래 명령어를 사용

  ```
  poetry install
  ```

  Install을 했을 때, 둘중 하나의 상황이 생길 수 있음

  1. Installing without poetry.lock
     poetry.lock 파일이 없는 상태에서 install 명령어를 시행하면, poetry는 pyproject.toml에 있는 패키지들이 모든 의존성을 해결하고 가장 최신 버전으로 다운로드 함.
     설치가 끝나면 패키지의 정확한 버전을 명시해 특정 버전에 프로젝트를 locking. lock 파일은 프로젝트 레포에 commit 해야 모든 구성원들이 같은 버전의 의존성을 가질 수 있음.
  2. installing with poetry.lock 
     이미 poetry.lock 파일이 있다면 이전에 install 명령어를 시행한 이력이 있는 것. 
     이 때 일관성 유지를 하기 위해 install 명령어를 시행하더라도 최신버전을 설치하는 것이 아니라, 새로운 버전이 Released 됐더라도 lock 설정에 맞는 파일을 다운받게 됨. 
     만약 최신 버전으로 업데이트 하고 싶으면 update 명령어 사용하기.









### 출처 자료

- https://seonghyeon.dev/python-package-development-with-poetry-and-action
- https://lhy.kr/python-poetry