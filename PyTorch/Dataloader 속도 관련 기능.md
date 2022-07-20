# Dataloader 속도 관련 기능

### `multiprocessing` workers를 이용해, parallel하게 데이터 로드

보통 학습을 위해 이미지나 자연어처리에 따라, 또 각각의 도메인에 따라 데이터 처리가 달라지는데 이 데이터를 전처리하는데 시간이 오래 걸려 학습시간이나 실행 시간에 영향을 끼친다. 따라서 `multiprocessing` workers를 이용해 데이터를 parallel하게 로드하면서, 데이터 로드를 위해 수행하는 데이터 전처리 또한 parallel하게 처리할 수 있다.

이를 위해선 우선 CUSTOM DATASETS을 만들고, 이 CUSTOM DATASETS에서 데이터 전처리를 수행하게 하도록 하여 데이터 로드시 데이터 전처리또한 같이 일어나도록 한다. 

CUSTOM DATASETS을 만들기 위해서는 `torch.utils.data.Dataset` 클래스를 상속받고, 이를 `__len__`, `__getitem__` 함수를 오버라이드 한다. 

- `__len__` so that `len(dataset)` returns the size of the dataset.
- `__getitem__` to support the indexing such that `dataset[i]` can be used to get i*i*th sample.

아래는 커스텀 데이터셋 예제이다.

```python
class FaceLandmarksDataset(Dataset):
    """Face Landmarks dataset."""

    def __init__(self, csv_file, root_dir, transform=None):
        """
        Args:
            csv_file (string): Path to the csv file with annotations.
            root_dir (string): Directory with all the images.
            transform (callable, optional): Optional transform to be applied
                on a sample.
        """
        self.landmarks_frame = pd.read_csv(csv_file)
        self.root_dir = root_dir
        self.transform = transform

    def __len__(self):
        return len(self.landmarks_frame)

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        img_name = os.path.join(self.root_dir,
                                self.landmarks_frame.iloc[idx, 0])
        image = io.imread(img_name)
        landmarks = self.landmarks_frame.iloc[idx, 1:]
        landmarks = np.array([landmarks])
        landmarks = landmarks.astype('float').reshape(-1, 2)
        sample = {'image': image, 'landmarks': landmarks}

        if self.transform:
            sample = self.transform(sample)

        return sample
```



만들어진 데이터 셋을 `torch.utils.data.DataLoader` 의 `num_workers` 를 사용하면 parallel하게 데이터 로드할 수 있게 된다. 참고로 DataLoader에 `collate_fn` 파라미터가 존재하는데, 이는 batch를 어떻게 수행할것인지를 명시할 수 있다. 이 때 `num_workers` 는 데이터 로딩에 사용하는 subprocess개수이다. 기본값은 0으로, 이는 data가 main process로 불러오는 것을 의미한다. 각각의 worker는 한 batch를 로드하고 한 batch 데이터가 준비가 다 되었다면 이를 반환한다. (each worker loads a single batch and returns it only once it’s ready.)

  `num_workers` 는 많이 사용하는 것이 무조건 좋은 것은 아닌데, 데이터를 불러 CPU와 GPU 사이에서 많은 교류가 일어나면 오히려 병목이 생길 수 있기 때문이다. 따라서  `num_workers` 튜닝을 해야 하고, 이를 위해 고려해야 하는 것은 학습 환경의 GPU개수, CPU개수, I/O 속도, 메모리 등이 있다. I/O를 포함시킨 것은 데이터의 종류에 따라 디스크상에 존재하는 데이터를 로드하는것은 I/O에 상당히 많은 영향을 주고받을 수 있기 때문이고, 메모리는 loading된 데이터를 메모리상에 들고 있어야 하는 부담 때문에 포함된다. gpu만을 고려했을 때 평균?적으로 `num_workers` 는 gpu*4 로 설명하면 괜찮다고 한다.

```python
dataloader = DataLoader(transformed_dataset, batch_size=4, shuffle=True, num_workers=4)
```



아래는 parallel하게 데이터 로드를 하지 않는 경우를 설명한다.

![img](https://d2.naver.com/content/images/2021/01/efbe9400-5214-11eb-9c67-30fab62770ec.png)

아래는 parallel하게 데이터 로드 하는 경우를 설명한다.

![img](https://d2.naver.com/content/images/2021/01/fa792900-5214-11eb-9749-1c28542daaf2.png)

### pin_memory 사용

`torch.utils.data.DataLoader` 의 `pin_memory` 파라미터를 `True` 로 설정하면, dataloader는 Tensor를 CUDA 고정 메모리에 올린다. 

아래는 `pin_memory` 파라미터를 언제 True로 설정하면 속도가 빨라질 수 있는지에 대한 설명이다.

> If you load your samples in the `Dataset` on CPU and would like to push it during training to the GPU, you can speed up the host to device transfer by enabling `pin_memory`.
> This lets your `DataLoader` allocate the samples in page-locked memory, which speeds-up the transfer.





### 참고자료

- [WRITING CUSTOM DATASETS, DATALOADERS AND TRANSFORMS][https://pytorch.org/tutorials/beginner/data_loading_tutorial.html#iterating-through-the-dataset]

- [Data Loader, Better, Faster, Stronger](https://d2.naver.com/helloworld/3773258)
- [[Pytorch] DataLoader parameter별 용도](https://subinium.github.io/pytorch-dataloader/)
- [DataLoader num_workers에 대한 고찰](https://jybaek.tistory.com/799)

- [[When to set pin_memory to true?](https://discuss.pytorch.org/t/when-to-set-pin-memory-to-true/19723)](https://discuss.pytorch.org/t/when-to-set-pin-memory-to-true/19723)

