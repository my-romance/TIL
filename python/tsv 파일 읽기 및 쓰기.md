## tsv 파일 읽기 및 쓰기
tsv 파일 읽기 및 쓰기에 관해서는 잘 정리된 글을 많이 없어, 이를 기록하고자 한다.

<br>

### tsv 파일 읽기
````python
def read_tsvFile(src):
  fr = open(src, 'r', encoding = 'utf-8')
  rdr = csv.reader(f, delimiter = '\t')
  
  data = [x for x in rdr]
  
  fr.close()
  return data
````

### tsv 파일 쓰기
````python
def write_tsvFile(src, data):
  fw = open(src, 'w', encoding = 'utf-8')
  wrt = csv.writer(fw, delimiter = '\t')
  
  for x in data: wrt.writerow(x)
  
  fw.close()
````
