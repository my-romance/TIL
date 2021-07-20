# FlashText

[TOC]

## FlashText

-  Aho-Corasick와 Trie 데이터구조을 이용하여 더욱 빠르게 keyword 키워드 검색 및 치환 하는 파이썬 모듈
  ![](https://miro.medium.com/max/1400/1*6EMLfsgfIuWeXf4MhM4yoQ.png)
- 정규표현식은 Query 키워드 갯수가 증가할 수록 속도가 점점 느려짐
- 따라서 FlashText를 Query 키워드 갯수가 500개 이상일 때 사용하면, 속도측면에서 정규표현식보다 효율적
  ![](https://miro.medium.com/max/1400/1*uun3MrHjf1iwe-kbYFOMXA.png)
- 하지만, 정규표현식처럼 특수문자를 검색할 수 없음
- 자세한 알고리즘은 [이 논문](https://arxiv.org/pdf/1711.00046.pdf) 참조



## Example

### Extract keywords







## 참고 문헌

- https://github.com/vi3k6i5/flashtext
- https://medium.com/@jwyeom63/%EB%B2%88%EC%97%AD-%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D%EC%9C%BC%EB%A1%9C-5%EC%9D%BC-%EA%B1%B8%EB%A6%AC%EB%8A%94-%EC%9E%91%EC%97%85-15%EB%B6%84%EB%A7%8C%EC%97%90-%EB%81%9D%EB%82%B4%EA%B8%B0-2e615a907048