# K8s 및 GCP를 이용한 HorizontalPodAutoscaler 사용하기

[TOC]

## 기존 HorizontalPodAutoscaler 설정

- GKE 수평 자동 확장을 위해 아래와 같이 메니페스트 문서를 작성함

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: my-romance-api
    name: my-romance-api
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: my-romance-api
    strategy:
      rollingUpdate:
        maxSurge: 25%
        maxUnavailable: 25%
      type: RollingUpdate
    template:
      metadata:
        labels:
          app: my-romance-api
      spec:
        containers:
        - args:
          - -b
          - 0.0.0.0:80
          - my-romance.api.app:create_app()
          - --access-logfile
          - '-'
          - --timeout
          - "600"
          command:
          - gunicorn
          image: <image name>/<tag>
          lifecycle:
            preStop:
              exec:
                command:
                - sleep
                - "5"
          readinessProbe:
            httpGet:
              path: /
              port: 80
          name: my-romance-api-container
        serviceAccountName: my-romance
  
  ---
  
  apiVersion: autoscaling/v1
  kind: HorizontalPodAutoscaler
  metadata:
    name: my-romance-api
    namespace: my-romance
  spec:
    maxReplicas: 5
    minReplicas: 1
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: my-romance-api
    targetCPUUtilizationPercentage: 80
  ```

- 에러 발생

  - 하지만 아래와 같이 에러가 뜸

    <img src="/Users/aiden/Library/Application Support/typora-user-images/image-20210311221130093.png" alt="image-20210311221130093" style="zoom:50%;" />

  - `kubectl get all -n ulibretto -n nlp`  명령어를 입력하면 아래와 같이 상태가 뜸

    ```shell
    NAME                                             			REFERENCE               			TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
    
    horizontalpodautoscaler.autoscaling/my-romance-api     Deployment/my-romance-api     <unknown>/80%         1         10         3          14d
    ```



## HorizontalPodAutoscaler 설정 수정

- **알고보니 cpu 사용률(상대값)에 따른 autoscale을 위해서는 CPU requests를 명시해주어야 했었음.** CPU requests를 명시하지 않는다면, cpu 사용량(절대값)에 따른 autoscale만이 가능함

  따라서 다음과 같이 `resource requests` 를 명시한다

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      app: my-romance-api
    name: my-romance-api
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: my-romance-api
    strategy:
      rollingUpdate:
        maxSurge: 25%
        maxUnavailable: 25%
      type: RollingUpdate
    template:
      metadata:
        labels:
          app: my-romance-api
      spec:
        containers:
        - args:
          - -b
          - 0.0.0.0:80
          - my-romance.api.app:create_app()
          - --access-logfile
          - '-'
          - --timeout
          - "600"
          command:
          - gunicorn
          image: <image name>/<tag>
          lifecycle:
            preStop:
              exec:
                command:
                - sleep
                - "5"
          readinessProbe:
            httpGet:
              path: /
              port: 80
          name: my-romance-api-container
          resources:
          	# You must specify requests for CPU to autoscale
        		# based on CPU utilization
            requests:
            	cpu: "250m"
              # cpu: "1"
        serviceAccountName: my-romance
  
  ---
  
  apiVersion: autoscaling/v1
  kind: HorizontalPodAutoscaler
  metadata:
    name: my-romance-api
    namespace: my-romance
  spec:
    maxReplicas: 5
    minReplicas: 1
    scaleTargetRef:
      apiVersion: apps/v1
      kind: Deployment
      name: my-romance-api
    targetCPUUtilizationPercentage: 80
  ```

- 결과 

  <img src="/Users/aiden/Library/Application Support/typora-user-images/image-20210311222515745.png" alt="image-20210311222515745" style="zoom:50%;" />

  - `kubectl get all -n ulibretto -n nlp`  명령어 결과

    ```
    NAME                                             REFERENCE               TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
    horizontalpodautoscaler.autoscaling/ml-nlp-api   Deployment/ml-nlp-api   <unknown>/80%   1         10        3          5h37m
    horizontalpodautoscaler.autoscaling/nlp-api      Deployment/nlp-api      83%/80%         1         5         1          14d
    ```

    **위 상태처럼 cpu 사용률이 80%를 넘어 83%가 되니, 이후에 아래 상태처럼 REPLICASET이 하나 더 증가하여 2가 되었고 CPU 사용률은 48%가 된 것을 알 수 있음**

    ```
    NAME                                             				REFERENCE               TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
    horizontalpodautoscaler.autoscaling/my-romance-api      Deployment/my-romance-api      48%/80%         1         5         2          14d
    ```

    

## 참고 문서

- [stack overflow : HPA cannot read metric value (CPU utilization) on GKE](https://stackoverflow.com/questions/62721059/hpa-cannot-read-metric-value-cpu-utilization-on-gke)

- [Configuring horizontal Pod autoscaling 영어 버전](https://cloud.google.com/kubernetes-engine/docs/how-to/horizontal-pod-autoscaling?hl=en#create_the_example_deployment)

- [Configuring horizontal Pod autoscaling 한국 버전](https://cloud.google.com/kubernetes-engine/docs/how-to/horizontal-pod-autoscaling?hl=ko#create_the_example_deployment)