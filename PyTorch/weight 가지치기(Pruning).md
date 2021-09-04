```python
import torch
from torch import nn
import torch.nn.utils.prune as prune
import torch.nn.functional as F

"""
pytorch weight 가지치기
참고자료 : https://pytorch.org/tutorials/intermediate/pruning_tutorial.html
"""

def show_pretty(data):
    for x in data:
        print(x)

# device 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 모델 설정
class LeNet(nn.Module):
    def __init__(self):
        super(LeNet, self).__init__()
        # 1개 채널 수의 이미지를 입력값으로 이용하여 6개 채널 수의 출력값을 계산하는 방식
        # Convolution 연산을 진행하는 커널(필터)의 크기는 3x3 을 이용
        self.conv1 = nn.Conv2d(1, 6, 3)
        self.conv2 = nn.Conv2d(6, 16, 3)
        self.fc1 = nn.Linear(16 * 5 * 5, 120)  # Convolution 연산 결과 5x5 크기의 16 채널 수의 이미지
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
        print(x.shape())
        x = F.max_pool2d(F.relu(self.conv2(x)), 2)
        print(x.shape())
        x = x.view(-1, int(x.nelement() / x.shape[0]))
        print(x.shape())
        x = F.relu(self.fc1(x))
        print(x.shape())
        x = F.relu(self.fc2(x))
        print(x.shape())
        x = self.fc3(x)
        return x

```

```python
model = LeNet().to(device=device)

module = model.conv1
# named_parameters()는 (name, parameter) 조합의 tuple iterator를 반환
show_pretty(list(module.named_parameters()))
print(list(module.named_buffers()))
print(module.weight)

```

```python
# list(module.named_parameters())
('weight', Parameter containing:
tensor([[[[ 0.2834,  0.1274, -0.0136],
          [ 0.1645, -0.2873, -0.3107],
          [-0.0911,  0.0808,  0.2139]]],


        [[[-0.2870,  0.3059,  0.1933],
          [-0.0371,  0.3095, -0.1270],
          [-0.1323, -0.1284, -0.2338]]],


        [[[ 0.0192,  0.0517,  0.1365],
          [-0.2702,  0.1637,  0.2945],
          [-0.0424,  0.0364,  0.1520]]],


        [[[-0.2977, -0.0711,  0.1274],
          [-0.1101, -0.3277, -0.2605],
          [-0.1503, -0.2181,  0.2728]]],


        [[[-0.0488,  0.0972, -0.1199],
          [-0.2226, -0.0031, -0.0087],
          [-0.1049, -0.0947,  0.0713]]],


        [[[-0.0263, -0.2017,  0.2761],
          [ 0.1755, -0.1439,  0.0951],
          [-0.1652,  0.1792,  0.0377]]]], requires_grad=True))
('bias', Parameter containing:
tensor([-0.2801, -0.2972,  0.2503,  0.0273, -0.1331,  0.0912],
       requires_grad=True))
#  list(module.named_buffers()) -> 아직 빈 list
[]
# module.weight
tensor([[[[ 0.2834,  0.1274, -0.0136],
          [ 0.1645, -0.2873, -0.3107],
          [-0.0911,  0.0808,  0.2139]]],


        [[[-0.2870,  0.3059,  0.1933],
          [-0.0371,  0.3095, -0.1270],
          [-0.1323, -0.1284, -0.2338]]],


        [[[ 0.0192,  0.0517,  0.1365],
          [-0.2702,  0.1637,  0.2945],
          [-0.0424,  0.0364,  0.1520]]],


        [[[-0.2977, -0.0711,  0.1274],
          [-0.1101, -0.3277, -0.2605],
          [-0.1503, -0.2181,  0.2728]]],


        [[[-0.0488,  0.0972, -0.1199],
          [-0.2226, -0.0031, -0.0087],
          [-0.1049, -0.0947,  0.0713]]],


        [[[-0.0263, -0.2017,  0.2761],
          [ 0.1755, -0.1439,  0.0951],
          [-0.1652,  0.1792,  0.0377]]]], requires_grad=True)
```

```python
'''
torch.nn.utils.prune 내 존재하는 가지치기 기술 적용
'''
prune.random_unstructured(module, name="weight", amount=0.3)
prune.l1_unstructured(module, name="bias", amount=3)
# pruning을 적용하면, 기존 가중치값들을 제거하고 weight_orig (즉, 초기 가중치 이름에 “_orig”을 붙인) 이라는 새로운 파라미터값으로 대체됨. 아래와 같이 weight 파라미터 이름이 weight_orig으로 바뀜
show_pretty(list(module.named_parameters()))
print(list(module.named_buffers()))
print(module.weight)
print(module.bias)
# Finally, pruning is applied prior to each forward pass using PyTorch’s forward_pre_hooks.
print(module._forward_pre_hooks)

```

```python
# list(module.named_parameters() -> weight가 weight_orig으로, bias가 bias_orig으로 바뀐것을 알 수 있음
('weight_orig', Parameter containing:
tensor([[[[-0.1364,  0.2090,  0.0701],
          [-0.2877, -0.3310,  0.2566],
          [-0.2907,  0.0229,  0.0094]]],


        [[[-0.0618,  0.2217, -0.2729],
          [ 0.1324, -0.2494,  0.2500],
          [ 0.2244,  0.2013, -0.0203]]],


        [[[ 0.2571,  0.0013, -0.1856],
          [-0.1845,  0.1739, -0.2879],
          [-0.2879,  0.2298, -0.1239]]],


        [[[-0.2867, -0.2089,  0.0958],
          [-0.2426, -0.3160,  0.0696],
          [-0.2088, -0.2583,  0.1089]]],


        [[[ 0.0736, -0.2583, -0.1087],
          [-0.0076, -0.2989,  0.2496],
          [-0.1910,  0.1556,  0.1895]]],


        [[[ 0.2131,  0.1967,  0.2765],
          [ 0.0307,  0.2153,  0.2602],
          [ 0.2509,  0.1369,  0.2685]]]], requires_grad=True))
('bias_orig', Parameter containing:
tensor([-0.2951,  0.1650, -0.0865, -0.0749,  0.2521, -0.2541],
       requires_grad=True)
 
 # list(module.named_buffers()) -> 이전(빈 list)과 달리, weight_mask와 bias_mask 값이 생김
 [('weight_mask', tensor([[[[1., 1., 0.],
          [1., 0., 1.],
          [1., 1., 1.]]],


        [[[0., 1., 1.],
          [1., 0., 1.],
          [1., 0., 1.]]],


        [[[1., 0., 1.],
          [0., 1., 1.],
          [1., 0., 1.]]],


        [[[1., 1., 0.],
          [0., 1., 1.],
          [1., 1., 1.]]],


        [[[1., 1., 1.],
          [1., 0., 1.],
          [1., 0., 1.]]],


        [[[0., 1., 0.],
          [1., 1., 1.],
          [1., 0., 0.]]]])), ('bias_mask', tensor([1., 0., 0., 0., 1., 1.]))]
 
 # module.weight -> weight_mask가 0인 경우, module.weight의 값이 0임을 알 수 있음 (즉, pruning이 적용된 module.weight)
tensor([[[[-0.1364,  0.2090,  0.0000],
          [-0.2877, -0.0000,  0.2566],
          [-0.2907,  0.0229,  0.0094]]],


        [[[-0.0000,  0.2217, -0.2729],
          [ 0.1324, -0.0000,  0.2500],
          [ 0.2244,  0.0000, -0.0203]]],


        [[[ 0.2571,  0.0000, -0.1856],
          [-0.0000,  0.1739, -0.2879],
          [-0.2879,  0.0000, -0.1239]]],


        [[[-0.2867, -0.2089,  0.0000],
          [-0.0000, -0.3160,  0.0696],
          [-0.2088, -0.2583,  0.1089]]],


        [[[ 0.0736, -0.2583, -0.1087],
          [-0.0076, -0.0000,  0.2496],
          [-0.1910,  0.0000,  0.1895]]],


        [[[ 0.0000,  0.1967,  0.0000],
          [ 0.0307,  0.2153,  0.2602],
          [ 0.2509,  0.0000,  0.0000]]]], grad_fn=<MulBackward0>)

  # module.bias -> bias_mask가 0인 경우, module.bias의 값이 0임을 알 수 있음 (즉, pruning이 적용된 module.bias)
tensor([-0.2951,  0.0000, -0.0000, -0.0000,  0.2521, -0.2541],
       grad_fn=<MulBackward0>)
 
 # module._forward_pre_hooks -> 이때까지 pruning이 2번 적용되었으므로, 2개의 값이 있는 것을 확인할 수 잇음
OrderedDict([(0, <torch.nn.utils.prune.RandomUnstructured object at 0x7fec073ff510>), (1, <torch.nn.utils.prune.L1Unstructured object at 0x7fec073ff610>)])
```



```python
'''
연속적으로 Pruning 실행 : 이전에 pruning을 적용한 mudule에 다시 pruning을 적용할 수 있다.
'''
prune.ln_structured(module, name="weight", amount=0.5, n=2, dim=0)
print(module.weight)
# 여러 Pruning이 결합된 경우의 hook은 torch.nn.utils.prune.PruningContainer 타입이 된다.
print(module._forward_pre_hooks)
# 또한 아래처럼 가중치에 적용된 이전 Pruning 이력을 저장하기에, 이를 확인할 수 있다.
for hook in module._forward_pre_hooks.values():
    if hook._tensor_name == "weight":  # select out the correct hook
        break

print(list(hook))  # pruning history in the container
```

```python
# module.weight -> 새로운 pruning이 적용됨. (0차원(dim=0)으로 pruning을 실행시켰기에 아래와 같은 결과를 확인할 수 있음)
tensor([[[[-0.0000,  0.0000,  0.0000],
          [ 0.0000,  0.0000, -0.0000],
          [ 0.0000, -0.0000,  0.0000]]],


        [[[ 0.0584, -0.0000, -0.2223],
          [-0.0452, -0.2089,  0.0000],
          [-0.2640,  0.0690, -0.2744]]],


        [[[-0.0000, -0.0000, -0.0000],
          [-0.0000, -0.0000,  0.0000],
          [-0.0000, -0.0000, -0.0000]]],


        [[[ 0.0000,  0.0000,  0.0000],
          [-0.0000,  0.0000,  0.0000],
          [-0.0000,  0.0000, -0.0000]]],


        [[[-0.0442,  0.1620,  0.0328],
          [ 0.1861,  0.0000,  0.2126],
          [ 0.2657, -0.0000,  0.2969]]],


        [[[ 0.0075,  0.3170,  0.1921],
          [ 0.0000, -0.1497,  0.0000],
          [ 0.1689,  0.3207, -0.0279]]]], grad_fn=<MulBackward0>)

# module._forward_pre_hooks -> 기존에 있던 torch.nn.utils.prune.RandomUnstructured object가 사라지고 torch.nn.utils.prune.PruningContainer object가 생긴 것을 확인할 수 있음
OrderedDict([(1, <torch.nn.utils.prune.L1Unstructured object at 0x7f8d7cfff650>), (2, <torch.nn.utils.prune.PruningContainer object at 0x7f8d7cfff810>)])

# list(hook) -> weight에 적용되었던 pruning 이력을 확인할 수 있음
[<torch.nn.utils.prune.RandomUnstructured object at 0x7f8d7cfff550>, <torch.nn.utils.prune.LnStructured object at 0x7f8d7cfff7d0>]
```



### 참고자료

- https://pytorch.org/tutorials/intermediate/pruning_tutorial.html