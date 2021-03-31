# 쿠버네티스 evicted pods 삭제

[TOC]

## evicted pods 삭제

### 전체 namespace의 evicted pods 삭제

```shell
kubectl get pods --all-namespaces -o json | jq '.items[] | select(.status.reason!=null) | select(.status.reason | contains("Evicted")) | "kubectl delete pods \(.metadata.name) -n \(.metadata.namespace)"' | xargs -n 1 bash -c
```

### 특정 namespace의 evicted pods 삭제

```shell
kubectl get pods -n <특정 namespace 명> -o json | jq '.items[] | select(.status.reason!=null) | select(.status.reason | contains("Evicted")) | "kubectl delete pods \(.metadata.name) -n \(.metadata.namespace)"' | xargs -n 1 bash -c
```



## 참조사항

### jq 설치 in mac

위 명령어를 실행할때 jq가 설치되어있지 않다면, `zsh: command not found: jq` 에러 발생

아래 mac에서 jq를 설치해야하는 경우 아래 명령어를 통해 설치하면 됨.

```sh
brew install JQ
```



## 참고자료

- [HOW TO REMOVE EVICTED PODS IN KUBERNETES/OPENSHIFT](https://sachsenhofer.io/how-to-remove-evicted-pods-in-kubernetes-openshift/)

- https://intellipaat.com/community/2992/how-to-install-jq-on-mac-by-command-line

