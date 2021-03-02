# github 특정 파일 삭제

github에는 db pasword나 다른 개인정보를 올리지 않도록 한다.

하지만 실수로 올린 경우, 그 특정 파일을 github에서 history까지 삭제해주어야 하는데 이때 `branch-filter` 를 사용한다.

[TOC]

### 1. Git branch-filter를 이용한 특정 파일 history 삭제

(이때 사용하고자 하는 branch가 있다면 branch 전환부터 해준 후) 아래코드를 통해 특정 파일 history 삭제

```sh
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch file_path/file_name" --prune-empty --tag-name-filter cat -- --all
```

이때 git repository 가장 상위 폴더에서 이 명령어를 실행하고, file_path는 현재 폴더를 기준으로 하위 path를 넣어준다.

예를 들어 현재 path가 nlp이고 nlp/api/app.py를 제거하고자 한다면 `file_path/file_name` 에 `api/app.py`를 넣어준다.

- 파라미터 설명
  - `filter-branch`: 브랜치를 재작성한다.
  - `--index-filter`: 인덱스를 다시 쓰기위한 필터입이다. 트리 필터와 비슷하지만 트리를 체크아웃하지 않으므로 훨씬 빠르다. `git rm --cached --ignore-unmatch`와 같이 사용된다.
  - `filename`: 삭제할 파일이름
  - `--prune-empty`: 빈 커밋을 제거한다.
  - `--force`: git filter-branch는 강제되지 않는 한 기존의 임시 디렉토리에서 시작을 거부하거나 `refs/original/`로 시작 참조가 이미 존재하는 경우에 거부한다.
  - `--`: 필터 옵션과 리비전 옵션을 분리한다.
  - `--all`: 전체 브랜치를 대상



또한 이 때 스테이징하지 않은 변경사항(Unstaged changes)이 있다면 에러가 뜨는데, 이 경우 github에 있는 repository를 `clone` 명령어을 통해 local에 다운 받고 여기서 (이때 사용하고자 하는 branch가 있다면 branch 전환부터 해준 후) 위 명령어를 실행해준다.  그 다음 git과 관련된 변경된 파일들을 기존 local 파일로 대체해주면, 기존 local 파일에서 계속 사용할 수 있음



### 2. Git push를 이용해 변경사항 업로드

```shell
git push origin <branch 명> --force
```









### 참고자료

- [github 커밋 히스토리 삭제 방법(github commit history remove)](https://atomic0x90.github.io/github/2020/03/16/github-history-remove.html)
- [Git 특정파일 히스토리 삭제](https://blog.ddoong2.com/2020/03/24/Git-%ED%8A%B9%EC%A0%95%ED%8C%8C%EC%9D%BC-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EC%82%AD%EC%A0%9C/#)