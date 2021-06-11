# k8s secret 생성하기

[TOC]

## secret 

- k8s secret을 사용하면 비밀번호, OAuth 토큰, ssh 키와 같은 민감한 정보를 저장하고 관리 가능

- 컨테이너 이미지 내 또는 매니페스트파일 내에 그대로 두는 것보다 유연하고 안전

- 암호화되지 않은 base 64 인코딩 문자열로 저장되기에 시크릿을 안전하게 사용하려면 다음과 같이 하는 것이 좋음

  1. 시크릿에 대한 [암호화 활성화](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/).

  2. 시크릿 읽기 및 쓰기를 제한하는 [RBAC 규칙 활성화 또는 구성](https://kubernetes.io/docs/reference/access-authn-authz/authorization/). 파드를 만들 권한이 있는 모든 사용자는 시크릿을 암묵적으로 얻을 수 있다.

### secret type

시크릿 타입은 시크릿 데이터의 programmic processing을 촉진시키기 위해 사용됨

- Opaque : 임의의 사용자 정의 데이터
- kubernetes.io/service-account-token : 서비스 어카운트 토큰
- kubernetes.io/dockercfg : 직렬화 된(serialized) `~/.dockercfg` 파일
- kubernetes.io/dockerconfigjson : 직렬화 된 `~/.docker/config.json` 파일
- kubernetes.io/basic-auth : 기본 인증을 위한 자격 증명(credential)
- kubernetes.io/ssh-auth : SSH를 위한 자격 증명
- kubernetes.io/tls : TLS 클라이언트나 서버를 위한 데이터
- bootstrap.kubernetes.io/token : 부트스트랩 토큰 데이터



## secret 생성하기

시크릿을 생성하는 총 3가지 방법

- [kubectl 명령을 사용하여 시크릿 생성하기](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/)

  아래처럼 kubectl 명령을 통해 (Opaque type의) sercret 생성이 가능

  ```shell
  kubectl create secret generic <secret_name> --from-literal=<data_name_1>=<data_name_1_value> --from-literal=<data_name_2>=<data_name_2_value> --namespace <name_space_name>
  ```

  - 예시

    ```shell
    kubectl create secret generic api-secret --from-literal=nlp-api-secret="secret1" --from-literal=img-api-secret="secret2" --namespace ai
    ```


- [구성 파일로 시크릿 생성하기](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-config-file/)
- [kustomize를 사용하여 시크릿 생성하기](https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kustomize/)



## secret 편집하기

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



## secret 사용하기

secret을 사용하는 방법 3가지

- 하나 이상의 컨테이너에 마운트된 [볼륨](https://kubernetes.io/ko/docs/concepts/storage/volumes/) 내의 [파일](https://kubernetes.io/ko/docs/concepts/configuration/secret/#시크릿을-파드의-파일로-사용하기)로써 사용.
- [컨테이너 환경 변수](https://kubernetes.io/ko/docs/concepts/configuration/secret/#시크릿을-환경-변수로-사용하기)로써 사용 → 현재 사용하고 있는 방법
  - [이 링크](https://kubernetes.io/ko/docs/concepts/configuration/secret/#%EC%8B%9C%ED%81%AC%EB%A6%BF%EC%9D%84-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98%EB%A1%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0) 참조
- 파드의 [이미지를 가져올 때 kubelet](https://kubernetes.io/ko/docs/concepts/configuration/secret/#imagepullsecrets-사용하기)에 의해 사용.



### 사용사례

사용사례는 [이 링크](https://kubernetes.io/ko/docs/concepts/configuration/secret/#%EC%82%AC%EC%9A%A9-%EC%82%AC%EB%A0%88)  참조



## 참고자료

- https://kubernetes.io/ko/docs/concepts/configuration/secret/#%EC%82%AC%EC%9A%A9-%EC%82%AC%EB%A0%88

