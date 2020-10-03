# 쿠버네티스(K8s)

### **쿠버네티스**

- 쿠버네티스 : 컨테이너화된 애플리케이션을 자동으로 배포, 스케일링 및 관리해주는 오픈소스 시스템, 즉 컨테이너 오케스트레이션 도구. 
  - 컨테이너 오케스트레이션 역활 : 여러개의 서버에 컨테이너를 배포하고 운영하면서 서비스 디스커버리(Service Discovery)같은 기능을 이용하여 서비스 간 연결을 쉽게 해줌. 
    - 서버마다 하나하나 접속하여 관리하는 것이 아니라, 여러 서버를 하나로 묶어 적당한 서버를 자동으로 선택해 어플리케이션을 배포.
    - 부하가 생기면 컨테이너를 늘림.
    -  일부 서버에 장애가 발생하면 정상 동작 중인 서버에 다시 띄워 장애를 방지함.
- 대표 장점 : 선언적 구성과 자동화의 용이성



### 쿠버네티스 특징

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





### 참조 문서

[쿠버네티스 기초 학습](http://kubernetes.io/ko/docs/tutorials/kubernetes-basics/)

[운영 수준의 컨테이너 오케스트레이션](https://kubernetes.io/ko/)

[쿠버네티스 시작하기 - Kubernetes란 무엇인가?](https://subicura.com/2019/05/19/kubernetes-basic-1.html)

[쿠버네티스 API](https://kubernetes.io/ko/docs/concepts/overview/kubernetes-api/)

