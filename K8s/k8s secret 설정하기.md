# k8s secret설정하기

[TOC]

## secret 



## secret 설정하기

아래처럼 kubectl 명령을 통해 sercret 생성이 가능

```shell
kubectl create secret generic <secret_name> --from-literal=<data_name_1>=<data_name_1_value> --from-literal=<data_name_2>=<data_name_2_value> --namespace <name_space_name>
```

- 예시

  ```shell
  kubectl create secret generic api-secret --from-literal=nlp-api-secret="secret1" --from-literal=img-api-secret="secret2" --namespace ai
  ```

- 결과

  아래코드를 통해 secret 수정 및 확인가능

  ```
  kubectl edit secrets <secret_name>
  ```

  위 명령어를 실행하면 아래와 같이 결과가 나옴

  ```yaml
  apiVersion: v1
  data:
    ocr-api-pw: <data_name_1_value>
    x-ocr-secret: <data_name_2_value>
  kind: Secret
  ```

  