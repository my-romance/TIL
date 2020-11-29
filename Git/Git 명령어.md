# Git 명령어 정리

### git config (계정 확인 및 변경)

```shell
# git 계정 확인
git config user.name # git 현재 사용자 이름 확인
git config user.email # git 현재 이메일 확인
```

```shell
# git 계정 변경
git config --global user.name <user name>
git config --global user.email <user.email>
```



### git pull reqeust 

1. remote 설정 및 변경

   아래는 git 원격 저장소 설정 현황을 확인하는 명령어

   ```shell
   git remote -v
   ```

2. branch 생성 및 설정

   ```shell
   git checkout {전환할 branch 이름} # 전환할 branch 설정
   git checkout -b {셍성할 branch 이름} # -b 옵션을 넣으면 brach 생성 및 설정(checkout)
   ```

   아래 코드를 통해 git branch 설정 현황 확인 가능

   ```shell
   git branch
   ```

3. 수정 작업 후 add, commit, push

   push 할때는 아래 명령어와 같이 전환된 branch의 수정내역을 origin으로 push한다.

   ```shell
   git push origin {전환된 branch 이름}
   ```

4. Pull Request 생성

   push 완료 후, 자신의 github 저장소에서 `Compare & pull request` 버튼이 활성화 되어 있는 것을 확인할 수 있음

   버튼을 선택해 pull request 생성

5. Merge Pull Request
   PR을 받은 관리자는 코드 변경내역을 확인하고 Merge 여부를 결정

6. Merge 이후 동기화 및 branch 삭제

   Merge가 완료되면 로컬 코드와 원본 코드를 병합하고, 최신의 상태를 유지하기 위해 동기화





### git reset (이전 commit으로 돌아가기)

예시를 위한 commit history

```
commit 9190a3ac (HEAD)
commit 32edd1ed
commit 7f4d2367
commit b61f5f6e
```

**reset** 

```shell
git reset {돌아갈 commit}
```

그냥 reset을 이용한 경우, reset으로 돌아온 커밋 이후의 변경사항은 모두 unstaged 영역에 남는다. 즉 reset을 통해 아래와 같이 `32edd1ed` commit으로 돌아간 경우, `9190a3ac`에서 변경했던 코드들이 unstaged 영역에 남게 됨.

여기서 기존 코드들을 `git add`, `git commit` 을 해주면 다시 기존 상태(`9190a3ac`)로 돌아오게 된다.

```
commit 9190a3ac
commit 32edd1ed (HEAD)
commit 7f4d2367
commit b61f5f6e
```

**soft reset**

```shell
git reset --soft {돌아갈 commit}
```

그냥 reset이 변경사항을 unstaged 영역에 남겼다면, soft reset은 staged 영역에 남긴다. 

즉, soft reset을 통해 `9190a3ac` 에서 `32edd1ed` 으로 돌아갔다면 `git commit` 을 통해 기존 상태(`9190a3ac`)로 돌아오게 된다.

**hard reset**

```
git reset --hard {돌아갈 commit}
```

변경 사항을 모두 제거한다. 

즉, hard reset을 통해 `9190a3ac` 에서 `32edd1ed` 으로 돌아갔다면 변경사항은 로컬에서 모두 사라진다. (만약 `9190a3ac` 변경사항이 origin에도 올라가있지 않다면 그 코드는 다시 찾을 수 없음)

**돌아갈 commit**

돌아갈 commit을 표기하는 방법은 두가지

1. N번째 뒤 commit으로 가주세요

   ```shell
   git reset HEAD~{N}
   ```

   이때 HEAD뒤에 있는 N이 1이라면, 현재 로컬 브랜치 위치(HEAD)에서 하나 뒤에 있는 commit으로 돌아가달라는 의미.

   ```shell
   # 예시
   git reset HEAD~1
   git reset --soft HEAD~1
   git reset --hard HEAD~1
   ```

2. 정확히 이 commit으로 가주세요

   ```shell
   git reset {commit id}
   ```

   현재 로컬 브렌치 위치가 어떠하든, 표기한 commit id로 돌아가달라는 의미.

   ```shell
   # 예시
   git reset 32edd1ed
   git reset --soft 32edd1ed
   git reset --hard 32edd1ed
   ```

**만약 특정 commit에 변경사항을 추가하고 싶은 의도라면, reset보다는 rebase를 추천**



### git mv (파일이나 폴더이름 변경)

파일 이동 명령어인 mv를 사용하면 변경 사항을 추적할 수 있음

```shell
git mv oldName newNane
```

*n( --dry-run)* 옵션을 사용하면 적용전에 어떻게 변경되는지 테스트 가능



또한, 파일 이름이나 폴더 이름의 일부를 대소문자로 변경할 때 invalid argument 에러가 발생할 수 있으므로 아래와 같이 임시폴더를 만들어 명 바꾸기

```shell
git mv sprint tmpDir
git mv tmpDir Sprint
```



### git rm (파일 및 폴더 삭제)

로컬과 원격 저장소에서 특정 파일 및 폴더를 지우고자 할때는 `git rm -rf` 명령어를, 

원격 저장소에서만 특정 파일 및 폴더를 지우고자 할때는 `git rm -r --cached` 명령어를 사용

```shell
git rm -rf {지우고자 하는 폴더명 or 파일명} # 로컬과 원격 저장소에서 지움
git rm -f --cached {지우고자 하는 폴더명 or 파일명} # 원격 저장소에서 지움
# 이후에 git commit을 통해 변경된 내용을 commit해야함
git commit rm {지운 하는 폴더명 or 파일명}
git push origin {branch name}
```



### 참고 문서

- https://rogerdudler.github.io/git-guide/index.ko.html

- https://medium.com/webeveloper/%EA%B9%83%ED%97%88%EB%B8%8C-%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95-github-tutorials-4a63f31bb6a5


- https://medium.com/@kwoncharles/git-%EC%9D%B4%EC%A0%84-commit%EC%9C%BC%EB%A1%9C-%EB%8F%8C%EC%95%84%EA%B0%80%EA%B8%B0-cf6caed43ed5

- https://www.lesstif.com/gitbook/git-git-rename-file-or-folder-54952878.html

- https://hoho325.tistory.com/46

- https://velog.io/@zansol/Pull-Request-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0

  