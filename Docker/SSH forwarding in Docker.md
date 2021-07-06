# SSH forwarding in Docker

[TOC]

## SSH forwarding in Docker

host에서 docker로 ssh forwarding을 하기위해서는 dockerfile에 아래와 같은 코드를 추가한 후, 그 다음 command를 입력하면 ssh forwarding이 된다.

```dockerfile
# download public key for github.com
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
# clone our private repository
RUN --mount=type=ssh git clone git@github.com:myorg/myproject.git myproject
# clone our private repository using poetry
RUN --mount=type=ssh python -m poetry install -n -v
```

```shell
docker build --ssh default .
```

- `docker build --ssh default .` : docker 빌드 시, SSH agent connection 또는 key를 forwarding할 수 있게 하는 코드.
- `RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts` :  docker conatiner 빌드 시, container 내부에 ssh public key가 존재하지 않기 때문에 컨테이너 안에서 ssh public key가 유효한지 아닌지 확인 불가능. 따라서 host에 존재하는 ssh key가 container 내에 존재해야 하므로 public key를 다운 받는 코드.
- `RUN --mount=type=ssh git clone git@github.com:myorg/myproject.git myproject` : `type=ssh` mount를 설정해주어야, docker 빌드 시  SSH 접근이 가능함



## git actions에서의 SSH forwarding in Docker

.github/workflows 폴더에 존재하는 ci/cd yaml 파일에 아래 코드를 docker build하기 전에 수행하여, github actions에서 사용하는 머신에게 해당 repo에 권한이 있는 ssh key를 부여한다.

```yaml
- name: set ssh key
uses: webfactory/ssh-agent@v0.4.1
with:
ssh-private-key: ${{ secrets.PRIVATE_SSH_KEY }}
```

- 참고로 secrets.PRIVATE_SSH_KEY은 secret key를 의미함

- secrets.PRIVATE_SSH_KEY은 해당 private repo에 권한이 있는 ssh key여야 한다.

  - private repo에 권한을 주기 위해서는 git repo의 deploy keys를 통해 권한을 주는 방법(정확하지는 않음)과 계정에 ssh key를 등록하여 권한을 부여하는 방법이 있다.

- 만약 저 위 코드를 통해 github actions에서 사용하는 머신에 ssh key를 부여하지 않는다면 아래와 같은 에러문 발생

  ```shell
  Could not parse ssh: [default]: invalid empty ssh-agent socket, make sure SSH_AUTH_SOCK is set
  ```

  > 이 오류는 SSH 승인과 관련된 문제를 나타냅니다. 일반적인 예시로는 Cloud Build로 비공개 GitHub 저장소에 액세스할 때 발생하는 SSH 승인 오류입니다. GitHub용 SSH를 설정하는 방법은 [비공개 GitHub 저장소 액세스](https://cloud.google.com/build/docs/access-private-github-repos?hl=ko)를 참조하세요.
  >
  > [해당 인용구 링크](https://cloud.google.com/build/docs/troubleshooting?hl=ko#builds_fail_due_to_invalid_ssh_authorization)

  

## 참고자료

- https://medium.com/@tonistiigi/build-secrets-and-ssh-forwarding-in-docker-18-09-ae8161d066
- https://cloud.google.com/build/docs/troubleshooting?hl=ko