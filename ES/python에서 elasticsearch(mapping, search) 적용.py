from elasticsearch import helpers, Elasticsearch
es = Elasticsearch()

def gendata():
    mywords = ['안녕하세요','물 만난 물고기','물고기 불고기','탕수육 대자 하나']
    scores = [1.2,6.3,4.2,4.5]
    for idx, (word,score) in enumerate(zip(mywords,scores)):
        yield {
            "word" : word,
            "personal_score" : score
        }

if __name__ == '__main__':
    index_name = "mywords"
    if es.indices.exists(index=index_name):
            es.indices.delete(index=index_name)

    # 문서 mapping 설정
    body = {
        "mappings" : {
            "properties" : {
                "word" : {
                    "type" : "text"
                },
                "personal_score" : {
                    "type" : "float"
                }
            }
        }
    }
    # 문서 mapping 적용
    es.indices.create(index=index_name, body = body)

    # 문서 indexing
    for i, data in enumerate(gendata()):
        res = es.index(index=index_name,body=data,id = (i+1))
    results = es.indices.refresh(index=index_name)
    
    # match_all을 이용하여 모든 문서 출력
    results = es.search(index=index_name, body={"query": {"match_all": {}}})
    for hit in results['hits']['hits']:
        print(hit['_source'])
    '''
    {'word': '안녕하세요', 'personal_score': 1.2}
    {'word': '물 만난 물고기', 'personal_score': 6.3}
    {'word': '물고기 불고기', 'personal_score': 4.2}
    {'word': '탕수육 대자 하나', 'personal_score': 4.5}
    '''
    
    # match를 이용하여 "물고기"와 match 되는 것이 있는 문서 출력
    results = es.search(index=index_name, body={"query": {"match": {"word":"물고기"}}})
    for hit in results['hits']['hits']:
        print(hit['_source'])
    '''
    {'word': '물고기 불고기', 'personal_score': 4.2}
    {'word': '물 만난 물고기', 'personal_score': 6.3}
    '''
    
