# poetry 에러 대응 정리

[TOC]

### 패키지 설치시 다른 패키지지만 패키지 경로가 겹쳐, 하나의 패키지만 실행됨

- 경로가 꼬인 것으로 \_\_init\_\_.py와 파일명을 조심해야 함. 

- 각 패키지에서 \_\_init\_\_.py 를 포함하는 가장 상위 폴더의 한단계 더 상위 폴더들이 이름이 같으면 경로가 꼬여짐

  -  \_\_init\_\_.py은 실행할 python 코드가 있는 해당 level 폴더에 있어야 함
  - \_\_init\_\_.py 를 포함하는 가장 상위 폴더의 한단계 더 상위 폴더들은 패키지 명이 달라야 함. 그 이전, 그 이후 폴더명은 달라도 됨

- 예시

  - 아래와 같이 경로가 구성되는 경우, **경로 꼬임**

    패키지1

    - [ ] oksusu

      - [ ] ai

        - [ ] nlp

          - [ ] test1

            → \_\_init\_\_.py

            → code.py

    패키지2

    - [ ] oksusu

      - [ ] ai

        - [ ] nlp

          - [ ] test2

            → \_\_init\_\_.py

            → code.py

  - 아래와 같이 경로가 구성되는 경우, **경로 꼬이지 않음**

    패키지1

    - [ ] oksusu

      - [ ] ai

        - [ ] nlp1

          - [ ] test1

            → \_\_init\_\_.py

            → code.py

    패키지2

    - [ ] oksusu

      - [ ] ai

        - [ ] nlp2

          - [ ] test2

            → \_\_init\_\_.py

            → code.py

  - 아래와 같이 경로가 구성되는 경우, **경로 꼬임**

    패키지1

    - [ ] oksusu

      - [ ] ai

        - [ ] nlp

          → \_\_init\_\_.py

          - [ ] test1

            → \_\_init\_\_.py

            → code.py

    패키지2

    - [ ] oksusu
      - [ ] ai

        - [ ] nlp

          - [ ] Test2

            → \_\_init\_\_.py

            → code.py

    ​	

### poetry로 패키지 설치시 같은 이름의 경로, 파일이 존재하는 경우 덮어쓰여질 수 있음


### poetry로 패키지 설치시, <패키지명> does not contain any element 에러
- pyproject.toml 문서내 packages가 설정되어 있지만, 설정된 packages의 폴더나 파일이 없는 경우.
- pyproject.toml 문서내 packages 설정 예시
  ```
  packages = [
	{ include = "oksusu" }
   ]
  ```
  

  
