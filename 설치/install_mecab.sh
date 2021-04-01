mkdir mecab_files
cd ./mecab_files

wget https://bitbucket.org/eunjeon/mecab-ko/downloads/mecab-0.996-ko-0.9.2.tar.gz
tar -zxvf mecab-*-ko-*.tar.gz
cd ./mecab-0.996-ko-0.9.2
./configure
make && make check && make install
ldconfig
cd ../

# mecab-ko-dic installation
wget https://bitbucket.org/eunjeon/mecab-ko-dic/downloads/mecab-ko-dic-2.1.1-20180720.tar.gz
tar -zxvf mecab-ko-dic-2.1.1-20180720.tar.gz
cd ./mecab-ko-dic-2.1.1-20180720
./configure
make
make install
cd ../

# mecab-ko-dic installation
git clone https://bitbucket.org/eunjeon/mecab-python-0.996.git
cd ./mecab-python-0.996
python setup.py build
python setup.py install
cd ../

