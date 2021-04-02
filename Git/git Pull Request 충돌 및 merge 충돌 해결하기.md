# git Pull Request 충돌 및 merge 충돌 해결하기

[TOC]

## PR 충돌 발단 이유

너무 오래동안 한 브랜치에서 작업한 후 master에 merge를 하지 않아, 작업한 branch와 master branch가 완전히 다르다며 PR이 되지 않았음.

따라서 master branch와 병합 및 PR이 가능하도록 하고자 한다.

## 해결하기

### git pull

master branch와 merge 및 PR이 되도록, master branch를 다시 pull 받도록 함

```shell
git pull origin master
```

 하지만 `fatal: 관계 없는 커밋 내역의 병합을 거부합니다` 메시지가 나오면서 `git pull`이 거절 될 수도 있음. 그럴땐 아래와 같은 명령어를 통해 해결한다

```shell
git pull origin master --allow-unrelated-histories
```

### 충돌 요소 제거

`git pull` 명령어를 실행시키면 아래와 같이 충돌 요소를 가진 파일을 알 수 있다.

```
CONFLICT (add/add): Merge conflict in update_dict.py
자동 병합: update_dict.py
CONFLICT (add/add): Merge conflict in pyproject.toml
자동 병합: pyproject.toml
CONFLICT (add/add): Merge conflict in job-build-dict.yaml
자동 병합: job-build-dict.yaml
```

각 코드를 확인하면 아래와 같이 충돌이 일어나는 부분을 확인할 수 있고, 알맞게 수정해준다.

```
<<<<<<<< HEAD : 밑으로 현재 브랜치 코드 나옴
>>>>>>>> about2 : 합치려는 다른 브랜치 코드 나옴
======= : 구분자

예) about.html 파일안의 conflict 내역
<<<<<<<< HEAD
XXX
=======
YYY
>>>>>>>> about2
```

### 충돌 요소 제거 반영

충돌이 일어나는 부분을 알맞게 수정해주었다면, `git add` 명령어를 통해 해당 코드 파일을 반영해준다.

충돌요소를 가진 모든 파일을 `git add` 해주었다면 이를 `staged` 상태로 반영하기 위해 `git commit` 해준 후 `git push origin <현재 branch (이 상황을 기준으로는 master branch x)>` 한다.

이후 merge나 PR이 잘 될 것이다.



## 참고자료

- [\[Git\] Merge 종류와 충돌 해결하기](https://mobicon.tistory.com/106)