### mecab-ko 설치

[mecab-ko (bitbucket)](https://bitbucket.org/eunjeon/mecab-ko/downloads/) 에서 최신 버전을 다운

```shell
tar -zxvf mecab-*-ko-*.tar.gz # 압축 풀기
cd mecab-0.996-ko-0.9.2 # 폴더 이동
./configure
make
make check
sudo make install
# ldconfig
mecab --version # 설치 버전 확인
```



### mecab 한국어 사전 설치

[mecab 한국어 사전 (bitbucket)](https://bitbucket.org/eunjeon/mecab-ko-dic/downloads/) 에서 최신 버전을 다운 

```shell
tar -zxvf mecab-ko-dic-2.1.1-20180720.tar.gz
cd mecab-ko-dic-2.1.1-20180720
./configure
make
sudo make install
```

- 이때 cent os 등에서 `make` 명령을 실행할 때, `syntax error near unexpected token 'mecab-ko-dic'` 에러(gcc와 autotools 버전이 낮아서 생기는 문제같다고 해당 [링크](http://eunjeon.blogspot.com/2013/02/cent-os-59-mecab-mecab-ko-dic.html)에서 설명)가 발생하는 경우에는 `./configure` 명령 실행전에 `autoreconf -vi` 명령 실행하기

  ```shell
  tar -zxvf mecab-ko-dic-2.1.1-20180720.tar.gz
  cd mecab-ko-dic-2.1.1-20180720
  autoreconf -vi
  ./configure
  make
  sudo make install
  ```

  

테스트 명령어

```
mecab -d /usr/local/lib/mecab/dic/mecab-ko-dic

한글로 문장입력 해보자

한글	NNG,*,T,한글,*,*,*,*
로	JKB,*,F,로,*,*,*,*
문장	NNG,*,T,문장,*,*,*,*
입력	NNG,행위,T,입력,*,*,*,*
해	XSV+EC,*,F,해,Inflect,XSV,EC,하/XSV/*+아/EC/*s
보	VX,*,F,보,*,*,*,*
자	EC,*,F,자,*,*,*,*
EOS
```



### mecab-python 설치

1. ```
   pip3 install mecab-python3
   ```

   위 명령어로 설치가 가능하다고 했지만, 나는 잘 되지 않아 두번째 방법을 사용하였음.

2. ```
   git clone https://bitbucket.org/eunjeon/mecab-python-0.996.git
   cd mecab-python-0.996
   python setup.py build
   python setup.py install
   ```

   c++ 라이브러리 관련 문제가 있을 때는 아래 명령어 참조

   ```
   MACOSX_DEPLOYMENT_TARGET=10.9 python3 setup.py build
   MACOSX_DEPLOYMENT_TARGET=10.9 python3 setup.py install
   ```

테스트 명령어

```
python # 파이썬 실행
import MeCab
m = MeCab.Tagger()
result = m.parse('한글로 문장입력 해보자')
print(result)
```

```
한글	NNG,*,T,한글,*,*,*,*
로	JKB,*,F,로,*,*,*,*
문장	NNG,*,T,문장,*,*,*,*
입력	NNG,행위,T,입력,*,*,*,*
해	XSV+EC,*,F,해,Inflect,XSV,EC,하/XSV/*+아/EC/*
보	VX,*,F,보,*,*,*,*
자	EC,*,F,자,*,*,*,*
```



### google colab에서 Mecab-ko-dic 쉽게 사용하기

1. 이 [링크](https://github.com/SOMJANG/Mecab-ko-for-Google-Colab) 로 들어가서, Clone or download 버튼을 눌러 주소 복사

2. `! git clone https://github.com/SOMJANG/Mecab-ko-for-Google-Colab.git` 명령어를 통해 저장소 clone

3. `%cd Mecab-ko-for-Google-Colab` 명령어를 통해, 해당 폴더로 이동

4. `! bash install_mecab-ko_on_colab190912.sh` 명령어 실행

5. ```
   from konlpy.tag import Mecab
   mecab = Mecab()
   text = u"한글로 문장을 입력해보자"
   result = mecab.parse(text)
   print(result)
   ```

   



### 참조 문서

- https://provia.tistory.com/57
- https://lemontia.tistory.com/891
- http://siteda.co.kr/bbs/board.php?bo_table=python&wr_id=2

- https://somjang.tistory.com/entry/Google-Colab%EC%97%90%EC%84%9C-Mecab-koMecab-ko-dic-%EC%89%BD%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0



### 참고하면 좋을 문서

- https://velog.io/@kjyggg/%ED%98%95%ED%83%9C%EC%86%8C-%EB%B6%84%EC%84%9D%EA%B8%B0-Mecab-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-A-to-Z%EC%84%A4%EC%B9%98%EB%B6%80%ED%84%B0-%EB%8B%A8%EC%96%B4-%EC%9A%B0%EC%84%A0%EC%88%9C%EC%9C%84-%EB%93%B1%EB%A1%9D%EA%B9%8C%EC%A7%80
- https://pypi.org/project/python-mecab-ko/
- https://bitbucket.org/eunjeon/mecab-ko-dic/src/master/