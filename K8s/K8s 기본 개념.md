# 쿠버네티스(K8s)

##  **쿠버네티스**

- 쿠버네티스 : 컨테이너화된 애플리케이션을 자동으로 배포, 스케일링 및 관리해주는 오픈소스 시스템, 즉 컨테이너 오케스트레이션 도구. 
  - 컨테이너 오케스트레이션 역활 : 여러개의 서버에 컨테이너를 배포하고 운영하면서 서비스 디스커버리(Service Discovery)같은 기능을 이용하여 서비스 간 연결을 쉽게 해줌. 
    - 서버마다 하나하나 접속하여 관리하는 것이 아니라, 여러 서버를 하나로 묶어 적당한 서버를 자동으로 선택해 어플리케이션을 배포.
    - 부하가 생기면 컨테이너를 늘림.
    -  일부 서버에 장애가 발생하면 정상 동작 중인 서버에 다시 띄워 장애를 방지함.
- 대표 장점 : 선언적 구성과 자동화의 용이성



## 쿠버네티스 특징

- 다양한 배포 방식

  <img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/workload.png" style="zoom:40%;" align = "left" />


  컨테이너와 관련된 많은 예제가 웹 애플리케이션을 다루고 있지만, 실제론 더 다양한 형태의 애플리케이션 존재. 쿠버네티스는 `Deployment`, `Stateful Sets`, `DaemonSet`, `Job`, `CronJob` 등 다양한 배포 방식 지원

  - Deployment : 새로운 버전의 애플리케이션을 다양한 전략으로 무중단 배포 가능

  - Statefule Sets : 실행 순설르 보장하고, 호스트 이름과 볼륨을 일정하게 사용할 수 있어 순서나 데이터가 중요한 경우에 사용 가능

  - DaemonSet : 로그나 모니터링 등 모든 노드에 설치가 필요한 경우 사용 가능

  - Job, CronJob : 배치성 작성이 필요할 경우 사용 가능

- Ingress 설정
  <img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/ingress.png" style="zoom:40%;" />

  다양한 웹 애플리케이션을 하나의 로드 밸런서로 서비스하기 위해 Ingress 기능 제공. 웹 어플리케이션을 배포하는 과정을 보면 외부에서 직접 접근할 수 없도록 애플리케이션을 내부망에 설치하고 외부에서 접근 가능한 `ALB`, `Nginx`, `Apache`를 프록시 서버로 활용.
  - 프록시 서버 : 클라이언트가 자신을 통해서 다른 네트워크 서비스에 간접적으로 접속할 수 있게 해주는 컴퓨터 시스템이나 응용 프로그램
  - 프록시 서버의 불편한점 : 프록시 서버는 도메인과 Path 조건에 따라 등록된 서버로 요청을 전달하는데, 서버가 바뀌거나 IP가 변경되면 매번 설정을 수정해야함
  - 쿠버네티스를 이용한 불편점 개선 : 쿠버네티스의 Ingress는 이를 자동화하여 기존 프록시 서버에서 사용한느 설정을 거의 그대로 사용 가능. 새로운 도메인을 추가하거나, 업로드 용량을 제한하기 위해 일일이 프록시 서버에 접속하여 설정할 필요 없음

- 클라우드 지원

  쿠버네티는 부하에 따라 자동으로 서버를 늘리는 기능(AutoScaling)이 있고, IP를 할당받아 로드 밸런스(LoadBalancer)로 사용 가능. 외부 스토리지를 컨테이너 내부 디렉토리에 마운트하여 사용하는 것도 일반적인데, 이를 위해서 클라우드 별로 적절한 API를 사용하는 모듈이 필요. → Cloud Controller를 이용하여 클라우드 연동을 손쉽게 확장 가능. 

  AWS, 구글 클라우드, 마이크로소프트 애저는 물론 수십 개의 클라우드 업체에서 모듈을 제공하여 관리자는 동일한 설정파일을 서로 다른 클라우드에서 동일하게 사용할 수 있음

- Namespace & Label
  <img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/namespace-label.png" style="zoom:50%;" />

  **하나의 클러스터를 논리적으로 구분하여 사용 가능**. 하나의 클러스터에 다양한 프레임워크와 애플리케이션을 설치하기 때문에 기본 (`system`,`default`) 외에 여러개의 네임스페이스를 사용하는 것이 일반적. 더 세부적인 설정으로 라벨 기능을 적극적으로 사용하여 유연하면서 확장성 있게 리소스 관리 가능.

- RBAC (Role-Based Access Control)
  <img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/rbac.png" style="zoom:50%;" />

  **접근 권한 시스템**으로, 각각의 리소스에 대해 유저별로 권한을 손쉽게 지정 가능.

  클러스터 전체에 적용하거나 특정 네임 스페이스에 적용할 수 있음.

- CRD(Custom Resource Definition) : 쿠버네티스가 제공하는 않는 기능을 기본 기능과 동일한 방식으로 적용 및 사용 가능
  
- Ex : 쿠버네티스가 기본적으로 SSL 인증서 관리 기능을 제공하지 않지만, , [cert-manager](https://github.com/jetstack/cert-manager)를 설치하고 Certificate 리소스를 이용하면 익숙한 쿠버네티스 명령어로 인증서를 관리 가능
  
- Auto Scaling : CPU, memory 사용량에 따른 확장은 기본이고, 현재 접속자 수와 같은 값을 사용하여 관리 가능. 
  - HPA(Horizontal Pod Autoscaler) : 컨테이너 개수 조정
  - VPA(Vertical Pod Autoscaler) : 컨테이너의 리소스 할댱량 조정
  - CA(Cluster Autoscaler) : 서버 개수 조정

- Federation, Multi Cluster : 클라우드에 설치한 쿠버네티스와 자체 서버에 설치한 쿠버네티스를 묶어서 하나로 사용 가능

- 이해하기 어렵 → **여러 클라우드의 관리형 서비스, Cloud Code 같은 플러그인,  helm 같은 패키지 매니저**를 사용하면 비교적으로 편리하게 설정 파일 관리 가능.



## 쿠버네티스 기본 개념

### Desired State
<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/desired-state.png" style="zoom:50%;" />

- desired state (원하는 상태) : 관리자가 바라는 환경을 의미하고, 좀 더 구체적으로는 얼마나 많은 웹서버가 떠있으면 좋은지, 몇 번 포트로 서비스하기를 원하는지 등을 의미

- 쿠버네티스는 복잡하고 다양한 작업을 하지만, 결론적으론 위 그림과 같이 **current state**를 모니터링하면서 관리자가 설정한 **desired state를 유지**하려고 내부적으로 이런저런 작업을 하는 단순한? 로직을 가짐.

- 이러한 개념때문에 관리자가 서버를 배포할 때 직접적인 동작을 명령하지 않고 상태를 선언하는 방식 사용. 

  - Ex :
    - nginx 컨테이너를 실행해줘. 그리고 80포트로 오픈해줘 → 현재 상태를 원하는 상태로 바꾸기 위한 **명령(imperative)**
    - 80 포트를 오픈한 nginx 컨테이너를 1개 유지해줘 → 원하는 상태를 **선언 (declarative)**

  - 명령어를 통한 Ex:
    - `docker run` → 명령어
    - `kubectl create` → 상태 생성

- 즉, 쿠버네티스의 핵심은 **상태**이며 쿠버네티스를 사용하려먼 어떤 상태가 있고 어떻게 상태를 선언하는 지를 알아야 함.

### Kubernetes Object

**kubernetes object** : **쿠버네티스가 상태를 관리하기 위한 대상을 오프젝트로 정의.** 기본적으로 수십가지 오브젝트를 제공하고 새로운 오브젝트를 추가하기가 매우 쉽기 때문에 확장성이 좋음. 여러 오브젝트 중 주요 오브젝트는 다음과 같음.

- Pod : **쿠버네티스에서 배포할 수 있는 가장 작은 단위**로, 한개의 이상의 컨테이너와 스토리지, 네트워크 속성을 가짐. Pod에 속한 컨테이너는 스토리지와 네트워크를 서로 공유하고 서로 localhost로 접근할 수 있음. **컨테이너를 하나만 사용하는 경우도 반드시 pod로 감싸서 관리함.**
  <img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/pod.png" style="zoom:50%;"/>

- ReplicaSet : **Pod를 여러개(한 개 이상) 복제하여 관리하는 오브젝트**. Pod를 생성하고 개수를 유지하려면 반드시 ReplicaSet을 사용해야 함. ReplicaSet은 복제할 개수, 개수를 체크할 라벨 선택자, 생성할 pod의 설정값(템플릿)등을 가짐. 직접적으로 ReplicaSet을 사용하기 보단 Deployment 등 다른 오브젝트에 의해 사용되는 경우가 많음.
  <img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/replicaset.png" style="zoom:50%;" />

- Service : **네트워크와 관련된 오브젝트**. Pod를 외부 네트워크와 연결해주고 여러개의 Pod를 바라보는 내부 로드 밸런서를 생성할 때 사용함.내부 DNS에 서비스 이름을 도메인으로 등록하기 때문에, 서비스 디스커버리 역활도 함.

- Volume : **저장소와 관련된 오브젝트.** 호스트 디렉토리를 그대로 사용할 수 있고, EBS 같은 스토리지를 동적으로 생성하여 사용 가능. 인기 있는 대부분의 저장방식을 [지원](https://kubernetes.io/docs/concepts/storage/#types-of-volumes).

- **Object Spec - YAML** : 

  ```yaml
  apiVersion: v1
  kind: Pod
  metadata:
  	name: example
  spec:
  	containers:
  	name: busybox
  		image: busybox:1.25
  ```

  - 오브젝트의 명세는 YAML 파일로 정의하고, 여기에 **오브젝트의 종류와 원하는 상태를 입력** → 이러한 명세는 생성, 조회, 삭제로 관리할 수 있기때문에 **REST API로 쉽게 노출 가능함.** 
  - 접근 권한 설정도 같은 개념을 적용하여 누가 어떤 오브젝트에 어떤 요청을 할 수 있는지 정의가능

### 쿠버네티스 배포방식

쿠버네티스는 애플리케이션을 배포하기 위해 **desired state를 다양한 object에 라벨을 붙여 정의(yaml)하고 API 서버에 전달하는 방식을 사용**



## 쿠버네티스 아키텍처

컨테이너는 아주 심플하고 우아하게 동작 ← run하면 실행되고, stop하면 멈춤.

서버-클라이언트 구조 : 컨테이너를 관리하는 에이전트를 만들고, 중앙에서 API를 이용하여 원격으로 관리.
<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/server-agent.png" style="zoom:50%;" />

쿠버네티스 구조 : 서버-클라이언트 구조와 마찬가지로 중앙(**Master**)에 API 서버와 상태 저장소를 두고, 각 서버(Node)의 에이전트(kubelet)와 통신하는 단순한 구조. 하지만 여러 모듈을 쪼개어 구현하고 다양한 오픈소스를 사용하기에 설치가 까다롭고 언뜻 구성이 복잡해 보임.

### 마스터-노드 구조

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/master-node.png" style="zoom:50%;" />

- 쿠버네티스는 전체 클러스터를 관리하는 **마스터**와 컨테이너가 배포되는 **노드**로 구성됨.

- 모든 명령은 마스터의 API 서버를 호출하고 노드는 마스터와 통신하면서 필요한 작업을 수행.
- 특정 노드의 컨테이너에 명령하거나 로그를 조회할 때도 노드에 직접 명령하는 것이 아니라, **마스터에 명령을 내리고 마스터가 노드에 접속하여 대신 결과를 응답.**

### Master

- 마스터 서버 : 다양한 모듈이 확장성을 고려하여 기능별로 쪼개져 있는 것이 특징.
- 관리자만 접속할 수 있도록 보안 설정을 해야하고, 마스터 서버가 죽으면 클러스터를 관리할 수 없기때문에 보통 3대를 구성하여 안정성을 높임. AWS나 EKS 같은 경우 마스터를 AWS에서 자체 관리하여 안정성을 높였고(마스터에 접속 불가), 개발환경이나 소규모 환경에선 마스터와 노드를 분리하지 않고 같은 서버에 구성하기도 함.

### Node

- 노드 서버 : 마스터 서버와 통신하면서 필요한 Pod를 생성하고 네트워크와 볼륨을 설정
- 실제 컨테이너들이 생성되는 곳으로, 수백~수천대로 확장 가능
- 각각의 서버에 라벨을 붙여 사용목적(GPU 특화, SSD 서버 등)으을 정의할 수 있음

### Kubectl

- API 서버는 json 또는 protobuf 형식을 이용한 http 통신을 지원하지만, 이 방식을 그대로 쓰면 불편하기에 보통 `kubectl`이라는 명령행 도구 사용. 

### Master 구성요소

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/kubernetes-master.png" style="zoom:40%;" />

- kube-apiserver (API 서버)

  API 서버 : 모든 요청을 처리하는 마스터의 핵심 모듈. 

  - kubectl의 요청뿐 아니라, 내부 모듈의 요청도 처리하며 권한을 체크하여 요청을 거부할 수 있음
  - 실제로 하는 일은 원하는 상태를 key-value 저장소에 저장하고, 저장된 상태를 조회하는 매우 단순한 작업.
  - Pod를 노드에 할당하고 상태를 체크하는 일은 다른 모듈로 분리되어 있음
  - 노드에서 실행중인 컨테이너의 로그를 보여주고, 명령을 보내는 등 디버거 역활도 수행

- etcd (분산 데이터 저장소)

  RAFT 알고리즘을 이용한 key-value 저장소. 

  - 여러 개로 분산하여 복제할 수 있기에 안정성이 높고, 속도가 빠름
  - 단순히 값을 저장하고 읽는 기능뿐 아니라 watch 기능이 있어 어떤 상태가 변경되면 바로 체크하여 로직을 실행할 수 있음
  - 클러스터의 모든 설정, 상태 데이터는 여기 저장되고 나머지 모듈은 stateless하게 동작하기 때문에 etcd만 잘 백업해두면 언제든지 클러스터 복구 가능
  - etcd는 오직 API 서버와 동작하고, 다른 모듈은 API 서버를 거쳐 etcd 데이터에 접근
  - k3s같은 초경량 쿠버네티스 배포판에서는 etcd 대신 sqlite를 사용하기도 함

- 스케줄러, 컨트롤러

  API 서버는 요청을 받으면 etcd 저장소와 통신할 뿐, **실제로 상태를 바꾸는 건 스케줄러와 컨트롤러**. 현재 상태를 모니터링하다가 원하는 상태와 다르면 각자 맡은 작업을 수행하고 상태를 갱신.

  - kube-scheduler (스케줄러) : kube-scheduler는 할당되지 않은 Pod을 여러가지 조건(필요한 자원, 라벨)에 따라 적절할 노드 서버에 할당헤주는 모듈.
  - kube-controller-manager (큐브 컨트롤러) : kube-controller-manager는 다양한 역활을 하는 모듈. 쿠버네티스에 있는 거의 모든 오브젝트의 상태를 관리. 오브젝트별로 철저하게 분업화되어 있는 Deployment는 ReplicaSet을 생성하고, ReplicaSet은 Pod을 생성하고, Pod는 스케줄러가 관리하는 식.
  - cloud-controller-manager (클라우드 컨트롤러) : cloud-controller-manager는 AWS, GCE, Azure 등 클라우드에 특화된 모듈. 노드 추가/삭제 및 로드 밸런서를 연결하거나 볼륨을 붙일 수 있음. 각 클라우드 업체에서 인터페이스에 맞춰 구현하면 되기 대문에 확장성이 좋고, 많은 곳에서 자체 모듈을 만들어 제공함.

### Node 구성 요소

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/kubernetes-node.png" style="zoom:50%;" />

- kubelet (큐블릿)

  노드에 할당된 Pod의 생명 주기를 관리

  - Pod을 생성 / Pod 내 컨테이너에 이상 유무 확인 / 마스터에 상태 전달 등의 역활을 함
  - API 서버 요청을 받아 컨테이너의 로그를 전달하거나 특정명령을 대신 수행하기도 함

- kube-proxy (프록시)

  kubelet이 Pod를 관리한다면, 프록시는 Pod로 연결되는 네트워크를 관리.

  - TCP, UDP, SCTP 스트림을 포워딩하고 여러개의 Pod을 라운드로빈 형태로 묶어 서비스를 제공할 수 있음
  - 초기에는 kube-proxy 자체가 프록시 서버로 동작하면서 실제 요청을 프록시 서버가 받고 각 Pod에 전달해주었는데
  - 현재는 iptables를 설정하는 방식으로 변경되었고, iptables에 등록된 규칙이 많아지면 느려지는 문제때문에 최근 IPVS를 지원하기 시작

### 하나의 Pod이 생성되는 과정

<img src="https://subicura.com/assets/article_images/2019-05-19-kubernetes-basic-1/create-replicaset.png" style="zoom:30%;" />

관리자가 애플리케이션을 배포하기 위해 ReplicaSet을 생성하면, 다음과 같은 과정을 거쳐 Pod를 생성.

흐름을 보면, 각 모듈을 서로 통신하지 않고 오직 API Server와 통신함. **API Server를 통해 etcd에 저장된 상태를 체크하고, 현재 상태와 원하는 상태가 다르면 필요한 작업을 수행**. 각 모듈이 하는 일은 아래와 같음

- kubectl
  ReplicaSet 명세를 yml파일로 정의하고, kubectl 도구를 이용하여 API Server에 명령을 전달

  →  그러면, API Server는 새로운 ReplicaSet Object를 etcd에 저장

- kube controller

  kube controller에 포함된 ReplicaSet Controller가 ReplicaSet을 감시하다가, ReplicaSet에 정의된 Label Selector 조건을 만족하는 Pod이 존재하는지 체크. 

  → 해당하는 Label의 Pod가 없으면, ReplicaSet의 Pod 템플릿을 보고 새로운 Pod을 생성. 생성은 역시 API Server에 전달하고 API Server는 etcd에 상태 데이터등을 저장

- scheduler

  schuduler는 할당되지 않은 Pod이 있는지 체크

  →  할당되지 않은 Pod이 있으면 조건에 맞는 Node를 찾아 해당 Pod을 할당

- kubelet

  kubelet은 자신의 Node에 할당되었지만, 아직 생성되지 않은 Pod가 있는지 체크

  →  생성되지 않은 Pod가 있으면, 명세를 보고 Pod를 생성

  →  Pod의 상태를 주기적으로 API Server에 전달

위 예제는 ReplicaSet에 대해 다뤘지만 모든 노드에 Pod을 배포하는 DaemonSet도 동일한 방식으로 동작. DaemonSet controller와 Scheduler가 전체 노드에 대해 Pod을 할당하면 kubelet이 자기 노드에 할당된 Pod을 생성하는 식.



### 참조 문서

[운영 수준의 컨테이너 오케스트레이션](https://kubernetes.io/ko/)

[쿠버네티스 시작하기 - Kubernetes란 무엇인가?](https://subicura.com/2019/05/19/kubernetes-basic-1.html)



