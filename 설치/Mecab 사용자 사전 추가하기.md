

# Mecab 사용자 사전 추가하기

[TOC]

## 사용자 사전 

1. mecab-ko-dic 디렉토리에서 csv파일 만듦
   이때 이름은 상관없으나 사용자 사전임을 알 수 있도록 `user-dict.csv` 라 임의의로 정함

   ```shell
   vim user-dict.csv
   ```

2. 만들어진 csv파일(`user-dict.csv`) 에 사용자 단어를 추가
   자신이 추가하고 싶은 단어를 아래의 규칙을 가지고 추가

   ```
   """규칙"""
   단어,0,0,0,품사태그,의미분류,종성유무,읽기/타입,첫번째 품사,마지막 품사,원형
   ```

   ```
   """예시"""
   디지몬어드벤처,0,0,0,NNP,,T,서울,*,*,*,*
   불태워졌,0,0,0,VV+EM+VX+EP,,T,불태워졌,Infected,VV,EP,불태우/VV+어/EC+지/VX+었/EP
   ```

3. 만들어진 사용자 사전 적용

   1. 현재 경로가 mecab-ko-dic이라면 아래명령어를 실행하여, csv 파일의 내용을 컴파일 (아니라면 경로를 알맞게 써준후 add-userdic.sh 시행)

      ```shell
      ./tools/add-userdic.sh
      ```

      아래와 같은 문구가 화면에 뜬다면 잘 실행된 것 (많은 문구들이 나와 처음에 에러인가 싶었음..)

      ```shell
      done!
      echo To enable dictionary, rewrite /usr/local/etc/mecabrc as \"dicdir = /usr/local/lib/mecab/dic/mecab-ko-dic\"
      To enable dictionary, rewrite /usr/local/etc/mecabrc as "dicdir = /usr/local/lib/mecab/dic/mecab-ko-dic"
      ```

   2. Mecab에 적용

      ```shell
      make install 
      ```

      실행 결과 아래와 같은 문구가 뜸 (마찬가지로 많은 문구들이 나와 처음에 에러인가 싶었음..)

      ```shell
      make[1]: Nothing to be done for `install-exec-am'.
       ./install-sh -c -d '/usr/local/lib/mecab/dic/mecab-ko-dic'
       /usr/bin/install -c -m 644 model.bin matrix.bin char.bin sys.dic unk.dic left-id.def right-id.def rewrite.def pos-id.def dicrc '/usr/local/lib/mecab/dic/mecab-ko-dic'
      ```

      

## 사용자 사전 추가 에러 처리 

- (mac에서) 사용자 사전을 추가하기 위해 `add-userdic.sh` 을 실행했을때, `no such file for dicertory: /../dicrc`와  같은 에러가 남

  - 이와 같은 에러가 나는 이유 ([블로그](https://lsjsj92.tistory.com/585) 참조)

    - add-userdic.sh 스크립트 내에서 실행되는 readlink가 Mac OS에서 일반적인 linux와 동작이 다름
    - 따라서, 변수 경로 등이 고여서 실패한 것으로 보임

  - 해결 방법

    - coreunitls 설치

      ```shell
      brew install coreutils
      ```

    - `add-userdic.sh`  수정 (8 line)

      `    readonly PROG_DIR=$(readlink -m $(dirname $0)` →  `    readonly PROG_DIR=$(greadlink -m $(dirname $0)`

    - 다시 `./tools/add-userdic.sh` 명령어부터 실행 시킴

## 참고자료

- [Mecab(konlpy) 사용자 단어 사전 추가 방법](https://growd.tistory.com/82)
- [은전한닢(mecab) 형태소 분석기 사용자 단어 사전 추가하기](https://lsjsj92.tistory.com/520)
- [python mecab 사용자 사전 추가 에러(no such file or directory) 해결하기](https://lsjsj92.tistory.com/585)
- [ElasticSearch에서 한글 형태소 분석기(은전 한 닢)를 OS X 에서 적용해보자!](https://medium.com/@ProgrammingPearls/elasticsearch%EC%97%90%EC%84%9C-%ED%95%9C%EA%B8%80-%ED%98%95%ED%83%9C%EC%86%8C-%EB%B6%84%EC%84%9D%EA%B8%B0-%EC%9D%80%EC%A0%84-%ED%95%9C-%EB%8B%A2-%EB%A5%BC-os-x-%EC%97%90%EC%84%9C-%EC%A0%81%EC%9A%A9%ED%95%B4%EB%B3%B4%EC%9E%90-5f879962339)

