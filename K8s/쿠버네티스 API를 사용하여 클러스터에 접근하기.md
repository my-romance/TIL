# 쿠버네티스 API에 프로그래밍 방식으로 접근

클러스터에 접근하는 많은 방법이 있지만, 나는 파이썬을 사용하기에 python 클라이언트를 사용하여 쿠버네티스 API에 접근하는 방법만을 기록한다. Python 클라이언트를 통해 쿠버네티스 API에 접근할 수 있다. (그러면 쿠버네티스 API를 통해 클러스터에 접근가능)

### Python 클라이언트

[Python 클라이언트](https://github.com/kubernetes-client/python)를 사용하려면, 다음 명령을 실행. `pip install kubernetes` 추가 설치 옵션은 [Python Client Library 페이지](https://github.com/kubernetes-client/python)를 참고한다.

Python 클라이언트는 kubectl CLI가 API 서버를 찾아 인증하기 위해 사용하는 것과 동일한 [kubeconfig 파일](https://kubernetes.io/ko/docs/concepts/configuration/organize-cluster-access-kubeconfig/)을 사용할 수 있다. 이 [예제](https://github.com/kubernetes-client/python/blob/master/examples/out_of_cluster_config.py)를 참고한다

```python
"""
shows how to load a Kubernetes config from outside of the Cluser.
"""
from kubernetes import client, config

# Configs can be set in Configuration class directly or using helper utility.
# If no argument provided, the config will be loaded from default location.
config.load_kube_config()
v1 = client.CareApi()
print("Listing pods with their IPs : ")

ret = v1.list_pod_for_all_namespaces(watch=False)
for i in ret.items:
	print("%s\t%s\t%s" %
		(i.status.pod_ip, i.metadata.namespace, i.metadata.name))
```

















### 참고자료

- https://kubernetes.io/ko/docs/tasks/administer-cluster/access-cluster-api/

