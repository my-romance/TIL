# 크론잡(CronJob)으로 자동화된 작업 실행

### CronJob

- Cronjob : 반복 일정에 따라 Job을 만듦.

- 하나의 크론잡 오브젝트는 크론 텝(크론 테이블) 파일의 한 줄. 크론잡은 잡을 크론 형식으로 쓰여진 주어진 일정에 따라 주기적으로 동작시킴

- 즉, CronJob은 백업 실행 또는 이메일 전송과 같은 정기적으로 반복적인 작업을 만드는데 유용함. 또한 CronJob은 클러스터가 유휴 상태일 때 Job을 스케줄링하는 것과 같이 특정시간 동안 개별 작업을 스케줄 할 수 있음.

- 이때, 모든 크론잡 일정시간은 [kube-controller-manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/)의 시간대를 기준.

  > 컨트롤 플레인이 파드 또는 베어 컨테이너에서 kube-controller-manager를 실행하는 경우, kube-controller-manager 컨테이너에 설정된 시간대는 크론잡 컨트롤러가 사용하는 시간대로 결정한다.

- CronJob 리소스에 대한 매니페스트를 생성할 때에는, 제공하는 이름이 유효한  [DNS 서브도메인 이름](https://kubernetes.io/ko/docs/concepts/overview/working-with-objects/names/#dns-서브도메인-이름)이어야 함.

- 예시 : 이 크론잡 매니패스트 예제는 현재 시간과 hello 메시지를 1분간 출력함.

  ```yaml
  apiVersion : batch/v1beta1
  kind : CronJob
  metadata:
  	name: hello
  spec:
  	schedule: "*/1 * * * *"
  	jobTemplate:
  		spec:
  			template:
  				spec:
  					containers:
  						-name:hello
  						-image: busybox
  						args:
  						- /bin/sh
  						- -c
  						- date; echo Hello from the Kubernetes cluster
  					restarPolicy : OnFailure
  	
  ```

  



### CronJob 명세 작성

다른 쿠버네티스 구성과 마찬가지로, CronJob은 `apiVersion`, `kind` 그리고 `metadata`필드가 필요. (구성 파일 작업에 대한 일반적인 정보는 [애플리케이션 배포](https://kubernetes.io/docs/tasks/run-application/run-stateless-application-deployment/)와 [kubectl을 사용하여 리소스 관리하기](https://kubernetes.io/ko/docs/concepts/overview/working-with-objects/object-management/) 문서 참조). 또한 CronJob 구성에는 `spec` 섹션도 필요.

- 스케줄

  - `.spec.schedule`은 `.spec`의 필수 필드.

  - 해당 잡이 생성되고 실행되는 스케줄 시간으로 `0 * * * *` 또는 `@hourly`와 같이  [크론](https://ko.wikipedia.org/wiki/Cron) 형식의 문자열을 받아들임

  - 이 형식은 확장된 `vixie cron` 스텝 (step) 값도 포함됨. 즉, 시간간격을 설정가능.

    > 스텝 값은 범위(range)오 함께 사용할 수 있다. 범위 뒤에 `/< number>`를 지정하여 범위 내에서 숫자만큼의 값을 건너뛴다. 예를 들어, 시간 필드에 `0~23`/2를 사용하여 매 2시간마다 명령실행을 지정할 수 있다. 별표(asterisk) 뒤에 붙이는 스텝도 허용되며, "2시간마다"라고 지정하고 싶으면 간단히 `*/2`를 사용하면 된다.

- 잡 템플릿
  - `.spec.jobTemplate`은 잡에 대한 템플릿이며, 필수 필드.
  - `apiVersion`, `kind`가 없는 것을 제외하고 잡과 정확히 같은 스키마를 가짐.
  - 잡 `.spec` 을 작성하는 것에 대한 내용은 [잡 명세 작성하기](https://kubernetes.io/ko/docs/concepts/workloads/controllers/job/#잡-사양-작성하기)를 참고.
- 시작 기한
  - `.spec.startingDeadlineSeconds` 필드는 option 필드. 이 필드를 지정하지 않으면, 잡에 기한이 없음을 의미.
  - 어떤 이유로든 스케줄된 시간을 놓친경우, 잡의 시작 기한을 초 단위로 나타냄. 
  - 기한이 지나면, 크론 잡이 잡을 시작하지 않음.  → 이러한 방식으로 기한을 맞추지 못한 잡은 실패한 작업으로 간주됨.
    - 예를 들어,  `200`으로 값이 설정되었다면, 지난 200초 동안 누락된 스케줄이 몇 번 발생했는지 계산하고, 지난 200초 이후의 잡은 기한을 맞추지 못한 잡으로 실패한 작업으로 간주됨. 또한, 이 경우 지난 200초 동안 누락된 스케줄이 100개 넘으면 크론 잡이 더 이상 스케줄되지 않음.
- 동시성 정책
  - `.spec.concurrencyPolicy`필드도 option 필드.
  - 동시성 정첵은 크론 잡에 의해 생성된 잡의 동시 실행을 처리하는 방법을 지정함.
  - 명세는 다음의 동시성 정첵 중 하나만 지정 가능
    - **Allow**(기본값) : 크론 잡은 동시에 실행되는 잡을 허용한다.
    - **Forbid** : 크론잡은 동시 실행을 허용하지 않는다. 새로운 잡을 실행할 시간이고 이전 잡 실행이 아직 완료되지 않은 경우, 크론 잡은 새로운 잡 실행은 건너뛴다.
    - **Replace** : 새로운 잡을 실행할 시간이고 이전 잡 실행이 아직 완료되지 않은 경우, 크론 잡은 현재 실행 중인 잡 실행을 새로운 잡 실행으로 대체함.

- 일시정지

  - `.spec.suspend`필드도 option 필드. default 값은 false.

  - `true`로 설정되면, 모든 후속 실행이 일시정지 됨

  - 이 설정은 이미 시작된 실행에는 적용되지 않음.

    > **주의:** 스케줄된 시간 동안 잡이 일시 정지되어 있다면 누락된 잡으로 간주한다. [시작 기한](https://kubernetes.io/ko/docs/tasks/job/automated-tasks-with-cron-jobs/#시작-기한) 없이 기존의 크론 잡에 대해 `.spec.suspend` 가 `true` 에서 `false` 로 변경되면, 누락된 잡들이 즉시 스케줄된다.

- 잡 히스토리 한도
  -  `.spec.successfulJobsHistoryLimit` 와 `.spec.failedJobsHistoryLimit` 필드는 option 필드
  - 잡 히스토리 한도와 관련된 이 필드는 기록을 보관해야 하는 완료 및 실패한 잡의 개수를 지정함
  - 기본적으로, 각각 3과 1로 설정됨. 한도를 0으로 설정하는 것은 잡 완료 후에 해당 잡 유형의 기록을 보관하지 않는다는 것.

### 참고 문서

- https://kubernetes.io/ko/docs/concepts/workloads/controllers/cron-jobs/
- https://kubernetes.io/ko/docs/tasks/job/automated-tasks-with-cron-jobs/