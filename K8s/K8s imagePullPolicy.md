# K8s image

K8s document의 이미지에 대한 글을 정리하고자 한다.

컨테이너 이미지는 애플리케이션과 모든 소프트웨어 의존성을 캡슐화하는 바이너리 데이터로, 일반적으로 파드에서 참조하기 전에 애플리케이션의 컨테이너 이미지를 생성해서 레지스트리로 푸시한다.



### 이미지 이름

**이미지 이름**

컨테이너 이미지의 이름은 레지스트리 호스트 이름과 포트 번호를 포함할 수 있음

에시 : `fictional.registry.example:10443/imagename` 

**이미지 태그**

이미지 이름 부분 다음에 tag를 추가할 수 있고, 태그를 지정하지 않으면 쿠버네티스는 tag `latest` 를 의미한다고 가정 → 프로덕션에서 컨테이너를 배포할때는 `latest` 태그를 사용하지 말아야 한다. 실행 중인 이미지 버전을 추적하기가 어렵고, 이전에 잘 동작하던 버전으로 롤백하기가 더 어려움 



### 이미지 업데이트

기본 pull 정책은 `IfNotPresent` 이며, 이것은 kubelet이 이미 존재하는 이미지에 대한 풀을 생략하게 한다.

imagePullPolicy의 각 value와 특성은 아래를 참고

- `imagePullPolicy: IfNotPresent` : 이미지가 로컬에 이미 존재하지 않으면 이미지가 pull 된다
- `imagePullPolicy: Always` : kubelet이 컨테이너를 시작할때마다, kubelet은 컨테이너 이미지 레지스트리를 쿼리해서 이름을 이미지 다이제스트로 확인. 
  - 정확한 다이제스트가 저장된 컨테이너 이미지가 kubelet 로컬에 캐시된 경우, 캐시된 이미지 사용
  - 그렇지 않다면, 이미지를 다운로드(pull)하고, 해당 이미지를 사용해서 컨테이너를 시작
- `imagePullPolicy : Never ` : 이미지가 로컬에 존재한다고 가정. 이미지 pull 시도 X
  
- `imagePullPolicy`가 생략되어 있고, 이미지 태그가 `:latest`이거나 생략되어 있다면 `Always`가 적용됨
- `imagePullPolicy`가 생략되어 있고, 이미지 태그가 존재하지만 `:latest`가 아니라면 `IfNotPresent`가 적용됨



### 프라이빗 레지스트리 사용

프라이빗 레지스트리는 해당 레지스트리에서 이미지를 읽을 수 있는 키 요구 → 자격 증명 필요

- 프라이빗 레지스트리에 대한 인증을 위한 노드 구성
  - 모든 파드는 구성된 프라이빗 레지스트리를 읽을 수 있음
  - 클러스터 관리자에 의한 노드 구성 필요
- 미리 내려받은 이미지
  - 모든 파드는 노드에 캐시된 모든 이미지를 사용가능
  - 셋업을 위해 모든 노드에 대해서 root 접근 필요
- 파드에 ImagePullSecrests을 명시
  - 자신의 키를 제공하는 파드만 프라이빗 레지스트리에 접근 가능
- 공급 업체별 또는 로컬 확장
  - 사용자 정의 노드 구성을 사용하는 경우, 사용자(또는 클라우드 제공자)가 컨테이너 레지스트리에 대한 노드 인증 매커니즘 구현 가능



프라이빗 레지스트리 사용방법의 구체적 설명과 use case에 따른 방법은 아래 참조 자료 확인



### 참고자료

- https://kubernetes.io/ko/docs/concepts/containers/images/#%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8
- https://kubernetes.io/ko/docs/concepts/configuration/overview/#%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%EC%9D%B4%EB%AF%B8%EC%A7%80