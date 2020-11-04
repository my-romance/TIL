# PyTorch 설치 중 에러 해결사항 기록

**Library not loaded: /usr/local/opt/libomp/lib/libomp.dylib 에러**

PyTorch를 가상환경에서 설치하고, 실행하려는데 `Library not loaded: /usr/local/opt/libomp/lib/libomp.dylib` 에러 메시지가 출력됨.

해결방법 : `brew install libomp`

맥에서 일어나는 오류같은데 자세한 원인을 알지 못하겠음.

참조문서 : https://github.com/pytorch/pytorch/issues/20030



