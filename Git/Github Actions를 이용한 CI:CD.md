# Github Actions를 이용한 CI/CD

### CI/CD

- CI : 개발자를 위한 자동화 프로세스인 **지속적인 통합(Continuous Integration)**을 의미
  CI를 성공적으로 구현할 경우, 애플리케이션에 대한 새로운 코드 변경 사항이 정기적으로 빌드 및 테스트되어 공유 리포지토리에 통합되므로 여러명의 개발자가 동시에 애플리케이션 개발과 관련된 코드 작업을 할 경우 서로 충동할 수 있는 문제 해결 가능.
- CD : **지속적인 서비스 제공 (Continuous Delivery)** 및 **지속적인 배포 (Continuous Deployment)** 을 의미
  - 지속적인 서비스 제공 : 개발자들이 애플리케이션에 적용한 변경사항이 버그 테스트를 거쳐 리포지토리에 자동으로 업로드되는 것을 뜻하며, 운영팀은 이 리포지토리에서 애플리케이션을 실시간으로 프로덕션환경으로 배포할 수 있음. 지속적인 서비스 제공은 최소한의 노력으로 새로운 코드를 배포하는 것을 목표로 함.
  - 지속적인 배포 : 개발자의 변경 사항을 리포지토리에서 고객이 사용 가능한 프로덕션 환경까지 자동으로 릴리스하는 것을 의미. 이는 애플리케이션 제공 속도를 저해하는 수동 프로세스로 인한 운영팀의 프로세스 과부하 문제를 해결. 지속적인 배포는 파이프라인의 다음단계를 자동화함으로써 지속적인 제공이 가진 장점을 활용함.

<img src="https://www.redhat.com/cms/managed-files/ci-cd-flow-mobile_0.png" alt="ci-cd-flow-mobile_0" style="zoom:80%;" />

### GitHub Actions로 할 수 있는 일

- npm에 패키지 배포
- Docker Hub에 이미지 배포
- AWS에 서비스 배포
- GCP에 서비스 배포



### Workflow syntax for GitHub Actions

해당 설정 파일은 레파지토리에 등록한 프로젝트 폴더의 최상위에 .github/workflow/*.yml 로 위치시킨다

```yaml
name: Node CI
on: [push]
jobs: ## job 들을 명시
  build: ## job id
    runs-on: ubuntu-latest ## 해당 job의 구동 환경을 정의
    strategy:
      matrix:
        node-version: [8.x, 10.x, 12.x]
    steps:
    - uses: actions/checkout@v1
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: Npm Install, build and test
      run: |
        npm ci
        npm run build --if-present
        npm test
      env:
        CI: true
```

- `name` : workflow의 이름. 자신의 레퍼지토리의 actions page에서 각 name에 해당되는 workflow를 보여줌

- `on` : workflow의 event를 명시.
  a single event `string`, `array` of events, `array` of event `types`, or an event configuration `map`으로 이벤트 명시가능. 다른 가능한 이벤트 명시는  "[Events that trigger workflows](https://docs.github.com/en/free-pro-team@latest/articles/events-that-trigger-workflows)" 참조 

  - Example using a single event

    ```yaml
    # Triggered when code is pushed to any branch in a repository
    on: push
    ```

  - Example using a list of events

    ```yaml
    # Triggers the workflow on push or pull request events
    on: [push, pull_request]
    ```

  - Example using multiple events with activity types or configuration

    ```yaml
    on:
      # Trigger the workflow on push or pull request,
      # but only for the main branch
      push:
        branches:
          - main
      pull_request:
        branches:
          - main
      # Also trigger on page_build, as well as release created events
      page_build:
      release:
        types: # This configuration does not affect the page_build event above
          - created
    ```

  cron 문법으로 시간을 설정할 수도 있고, push/pull-request 등 깃헙 이벤트를 구독할 수도 있고, 실행할 브랜치를 제한할수도 있음. 
  추가적으로, `paths` 로 특정 패턴을 설정하여 해당 패턴에 일치하는 파일이 변경되었을 때 워크플로가 실행될 수 있도록 설정할 수 있음.

  또한 `paths` 와 반대로 `paths-ignore` 로 무시할 패턴을 설정할 수도 있다. (paths의 값 앞에 `!` 를 붙이면 `paths-ignore` 로 설정됨)

  하나의 깃헙 저장소에서 여러프로젝트를 관리하는 상황이나, 특정 파일의 변경에 따라 빌드를 트리거하거나 하지 않고 싶을때 유용하게 사용 가능

  ```yaml
  # 10분마다 실행 workflow
  on:
    schedule:
      - cron: '*/10 * * * *'
  
  # master, dev 브랜치에 push 된 경우에 실행
  on:
    push:
      branches: [master, dev]
  
  # master, dev 브랜치에 push 되었고,
  # js파일의 변경이 있을 때에만 트리거,
  # doc 디렉토리의 변경에는 트리거 하지 않게 하고싶은 경우
  on:
    push:
      branches: [master, dev]
      paths:
        - "**.js"
      paths-ignore:
  ```

- jobs : jobs에 등록된 job들은 기본적으로 병렬로 실행됨. Job_id를 키값으로 하여 생성할 수 있음

  ```yaml
  jobs:
    some-job-id:
      ...
    some-job-id-2:
      ...
  ```

  - `jobs.<job_id>.runs-on`  : required 되는 key로, 해당 job을 실행할 컴퓨팅 자원(runner)를 명시. `ubuntu-latest`, `ubuntu-18.04`, `ubuntu-16.04`, `macos-latest`, `windows-latest` 등으로 설정가능

  - `jobs.<job_id>.env`  : 해당 job의 컴퓨팅 자원에 설정할 환경변수를 key=value의 형태로 명시함

  - `Jobs.<job_id>.strategy` : strategy는 jobs가 여러 환경에서의 테스트/배포 등을 위해 build matrix를 설정할 수 있게 한다. 다른 환경들을 명시해 여러 환경에서의 같은 jobs를 동시에 실행할 수 있음

  - `jobs.<job_id>.steps` : job이 가질 수 있는 순차적인 동작 나열. 명령어를 실행하거나, setup 하거나, 깃헙 코드를 checkout하거나, github marketplace에 있는 action을 가져와 실행하거나, 도커 이미지로 생성하거나, 도커 이미지를 배포하거나, aws/gcp 등에 서비스를 배포하는 작업들 설정 가능. 각각의 step은 job의 컴퓨팅 자원에서 독립적인 프로세스로 동작하고, job의 runner의 파일 시스템에 접근할 수 있다.

    - `jobs.<job_id>.steps.name` : 각  step의 이름 명시. github actions 페이지에서 workflow구동 로그를 확인할 때 보여짐

    - `jobs.<job_id>.steps.uses`  : 해당 스텝에서 사용할 action을 선택. github marketplace에 선구자들이 올려 둔 많은 action들이 있다. 공신력있는 기관에서 생성한 github에 의해 공식적으로 확인된 action들도 있다. github 에서는 action을 사용 시, version을 명시하여 사용하는 것이 좋다. `{owner}/{repo}@{ref|version}` 의 형태를 지닌다. 각 action 는 필수적으로 document가 필요하다. 사용하고자 하는 action이 있다면 해당 레파지토리를 확인해보면 사용 방법과 같은 내용을 적어두었을 것이다. 해당 방법들을 확인한 후 사용하기를 권장한다.

    - `jobs.<job_id>.steps.run` job에 할당된 컴퓨팅자원의 shell을 이용하여 command line program을 구동한다. nodejs 프로젝트의 경우, 이 과정에 npm package의 scripts를 구동하는 경우가 가장 대표적일 것이다.

      ```yaml
      jobs:
        some-job:
          steps:
            - name: My First Step
              run: | ## 명령어를 여러 줄 사용하기 위해서는 다음과 같이 한다.
                npm install
                npm test
                npm build
      ```

### 참조문서

- https://www.redhat.com/ko/topics/devops/what-is-ci-cd
- https://hwasurr.io/git-github/github-actions/
- github actions workflow 공식문서 : https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions#jobsjob_idcontainerimage