# GitHub 기초 및 사용법

### GitHub란

소프트웨어 개발 프로젝트를 위한 소스코드 관리 서비스.

프로젝트에 대한 형상관리가 가능하며, 개인 포트폴리오를 올리고 관리할 수 있으며, 오픈소스 프로젝트에도 기여 가능



### GitHub 사용을 위한 사전 지식

1. 커밋(commit)과 푸시(push)

   - 커밋 (commit) : 파일을 추가하거나, 변경 내용을 저장소에 저장하는 작업.
   - 푸시 (push) : 파일을 추가하거나, 변경내용을 원격 저장소에 저장하는 작업.

   일반적으로 작은 작업 단위로 커밋을 하고, 어느정도 작업이 일단락했을 때 푸시를 함.
   커밋 작업이 알기 쉽게 커밋 메시지를 남겨두면 로그를 따라가는데 도음이 됨.

2. 로컬 저장소와 원격 저장소

   - 저장소 : 파일이나 디렉토리를 저장하는 장소. 변경이력을 관리하고자 하는 파일이나 디렉토리 등을 저장소의 관리하에 두는 것으로, 그 디렉토리에 있는 파일 등의 변경 내역을 기록 가능.
   - 로컬 저장소 : 사용자의 컴퓨터에 있는 저장소.
   - 원격 저장소 : 서버 등 네트워크에 있는 저장소.

   기본적으로 로컬 저장소에서 작업을 수행하고, 그 결과를 원격 저장소에 저장함.

3. 브랜치 (branch)

   - 브랜치 (branch) : 분기.

   - 브랜칭(branching) :  역사의 흐름을 분기하여 기록해 나가는 것. 즉, 하나의 저장소에서 서로 다른 버전을 동시에 작업 것.

   소프트웨어 개발은 현재 출시하고 있는 버전의 유지 보수를 하면서 **새로운 기능 추가 및 버그 수정** → 이러한 병렬로 수행되는 여러 버전 관리를 위해 GitHub는 브랜치 기능을 제공



### GitHub 사용하기

0. git 프로세스

   ![git process](https://miro.medium.com/max/1400/1*X9TKjhjwestOvFD0RsjoNQ.png)

   - Working Directory : 작업하려는 PC내의 directory
   - Staging Area : git commit 하기전에 저장되는 git 공간 (커밋 예정인 파일, 디렉터리가 모여있는 공간)
   - Local Repository : PC에 파일이 저장되는 개인용저장소
   - Remote Repository : 원격 저장소 (git hub)

1. Working Directory 생성 및 Working Directory에 들어가기

2. git config

   ```
   git config --global user.name <닉네임>
   gin config --global user.email <이메일>
   ```

3. git init

   `git init` 명령어를 통해 깃 저정소를 생성.

4. git clone

   `git clone` 명령어를 통해 저장소 가져오기. 이 명령어를 통해 git init까지 자동으로 설정됨.

   git clone \<git url\>.git

5. git remote 

   `git remote` 명령어를 통해 git url 설정

   ```
   git remote -v 															# 저장소 url 확인
   git remote add <저장소이름> <git url>.git 			# 저장소 url 추가
   git remote delete <저장소 이름> 								# 저장소 url 삭제
   git remote set-url <저장소 이름> <git url>.git # 저장소 url 수정
   ```

6. git status
   `git status` 명령어를 통해 git의 상태 확인
   ![git](https://seonkyukim.github.io/assets/images/2019-02-24-git-status/04.png)

   워킹 디렉토리의 파일은 크게 tracked, untracked 두가지 상태로 나뉨

   - tracked : 파일에 수정이 일어나면 git이 파일의 변경을 감지하여 사용자에게 알려주는 것과 같이 파일을 추적하는 상태
   - untracked : tracked 상태와는 반대로, 파일을 저장소에 저장할 필요가 없어 git이 신경쓰지 않아도 되는 상태

   파일을 새로 만들 경우 untrakced 상태 (git이 파일을 추적하지 않는 상태)가 됨 → git 저장소에 저장할 필요가 없는 파일들을 untrakced 상태로 두면 됨. 이후 `git add` 명령얼르 이용하여 파일을 add 해주면, 해당 파일은 staging area에 저장되어 tracked 상태가 됨.

   

   tracked 상태의 파일들은 크게 Unmodified, Modified, Staged 3개의 상태로 나뉨

   - Staged : staging area에 있는 파일들의 상태
   - Unmodified : staging area에 있는 파일들을 commit하면 해당 파일들은 하나의 commit으로 저장된 후, 파일의 상태는 unmodified 상태가 됨
   - Modified : Unmodified 상태의 파일들을 수정하면 Modified 상태가 됨

   이후 다시 `git add` 명령어를 이용하여 Staged 상태로 올려준 후 commit을 하는 과정을 반복하게 됨. 

   또한, tracked 상태에서 untracked 상태로 내려가기 위해선 `git rm --cached <fileName>` 명령어를 사용해야함.

   

   git status 명령어를 실행했을 때의 결과

   - Untracked : Untrakced files 명단에 있는 빨간색 파일들이 Untracked 상태 
   - Staged : Changes to be committed 명단에 있는 초록색 파일들이 Staged 상태
   - Modified : Changes not staged for commit 명단에 잇는 빨간색 파일들이 Modified 상태. ( `git commit` 명령어는 Staging Area의 파일들만 커밋하기에, 파일들은 수정한 경우 `git add` 명령어를 통해 변경 파일을 Staging Area에 올려주고 commit하기)
   - Unmodified : 성공적으로 커밋을 진행한 후, 수정하지 않은 파일들(Unmodified 상태의 파일들)은 화면에 출력되지 않음. 



### 참고 문서

https://rogerdudler.github.io/git-guide/index.ko.html

https://medium.com/webeveloper/%EA%B9%83%ED%97%88%EB%B8%8C-%EC%82%AC%EC%9A%A9%EB%B0%A9%EB%B2%95-github-tutorials-4a63f31bb6a5

https://seonkyukim.github.io/git-tutorial/git-status/#

