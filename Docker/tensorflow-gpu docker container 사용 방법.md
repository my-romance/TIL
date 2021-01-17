# tensorflow-gpu docker container 사용 방법

```shell
nvidia-docker run -it --name=<container name> -v <호스트 dir>:<컨테이너 dir> -p <호스트 포트>:<컨테이너 포트> tensorflow/tensorflow:1.8.0-gpu-py3 /bin/bash
```

이때 `tensorflow/tensorflow:1.8.0-gpu-py3` 이미지를 사용하면 경랑화된 리눅스 os를 사용하는데, 이 때  `vim` 과 같은 툴을 사용하기 위해선 `apt-get update` 명령어를 시행후, `apt-get install vim` 과 같은 명령어로 설치하고자 하는 툴을 설치하면 됨