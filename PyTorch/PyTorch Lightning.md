# PyTorch Lightning

[TOC]

## Pruning

모델의 weights를 제거하여, 모델 크기를 줄이고 속도를 향상시키는 방법.

### ModelPruning

PyTorch Lighting에서는 [torch pruning](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html)을 이용하는 [ModelPruning](https://pytorch-lightning.readthedocs.io/en/latest/extensions/generated/pytorch_lightning.callbacks.ModelPruning.html#pytorch_lightning.callbacks.ModelPruning) callback을 통해 pruning 가능

PyTorch Lighting's ModelPruning은  [torch pruning](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html)를 좀 더 쉽게 사용할 수 있도록 하고, `use_lottery_ticket_hypothesis` 등 다른 기능을 추가한 것. 



### torch pruning

PyTorch Lighting's ModelPruning 사용하기 전, [torch pruning 사용법](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html)을 숙지하는 것이 좋을 듯 함.

- Create a model & Inspect a Module

  pruning 전, model 및 module 정의

  ```python
  device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
  
  class LeNet(nn.Module):
      def __init__(self):
          super(LeNet, self).__init__()
          # 1 input image channel, 6 output channels, 3x3 square conv kernel
          self.conv1 = nn.Conv2d(1, 6, 3)
          self.conv2 = nn.Conv2d(6, 16, 3)
          self.fc1 = nn.Linear(16 * 5 * 5, 120)  # 5x5 image dimension
          self.fc2 = nn.Linear(120, 84)
          self.fc3 = nn.Linear(84, 10)
  
      def forward(self, x):
          x = F.max_pool2d(F.relu(self.conv1(x)), (2, 2))
          x = F.max_pool2d(F.relu(self.conv2(x)), 2)
          x = x.view(-1, int(x.nelement() / x.shape[0]))
          x = F.relu(self.fc1(x))
          x = F.relu(self.fc2(x))
          x = self.fc3(x)
          return x
  
  model = LeNet().to(device=device)
  
  module = model.conv1
  ```

- Pruning a Module

  [torch.nn.utils.prune](https://pytorch.org/docs/stable/nn.html#utilities)을 통해 module pruning. 

  이때 l1_unstructured()함수에 name을 `'bias'` 로 설정하면 `bias`가 pruning됨

  ```python
  print(module.weight)
  """
  Parameter containing:
  tensor([[[[-0.0437, -0.1516, -0.1023],
            [-0.2931,  0.2516,  0.1652],
            [ 0.2157,  0.1425, -0.1124]]],
  
  
          [[[ 0.2966,  0.2904,  0.0415],
            [ 0.1875,  0.0479, -0.1792],
            [ 0.1070,  0.2705, -0.1865]]],
  
  
          [[[-0.3175, -0.1654, -0.0294],
            [-0.2743, -0.1461, -0.2731],
            [-0.2960,  0.0049,  0.2397]]],
  
  
          [[[-0.0395,  0.1361, -0.0530],
            [ 0.1841,  0.0829, -0.2652],
            [ 0.2285,  0.1457, -0.0356]]],
  
  
          [[[-0.1353,  0.1000, -0.1252],
            [-0.1984,  0.1969,  0.0896],
            [-0.0046, -0.0573,  0.0062]]],
  
  
          [[[ 0.2720,  0.0306,  0.1979],
            [ 0.1452, -0.0679,  0.1751],
            [-0.0360,  0.2639, -0.1129]]]], requires_grad=True)
  """
  prune.l1_unstructured(module, name="weight", amount=0.5)
  print(module.weight)
  """
  tensor([[[[-0.0000, -0.1516, -0.0000],
            [-0.2931,  0.2516,  0.1652],
            [ 0.2157,  0.0000, -0.0000]]],
  
  
          [[[ 0.2966,  0.2904,  0.0000],
            [ 0.1875,  0.0000, -0.1792],
            [ 0.0000,  0.2705, -0.1865]]],
  
  
          [[[-0.3175, -0.1654, -0.0000],
            [-0.2743, -0.1461, -0.2731],
            [-0.2960,  0.0000,  0.2397]]],
  
  
          [[[-0.0000,  0.0000, -0.0000],
            [ 0.1841,  0.0000, -0.2652],
            [ 0.2285,  0.0000, -0.0000]]],
  
  
          [[[-0.0000,  0.0000, -0.0000],
            [-0.1984,  0.1969,  0.0000],
            [-0.0000, -0.0000,  0.0000]]],
  
  
          [[[ 0.2720,  0.0000,  0.1979],
            [ 0.0000, -0.0000,  0.1751],
            [-0.0000,  0.2639, -0.0000]]]], grad_fn=<MulBackward0>)
  """
  ```

- module에 적용된 pruning확인

  아래 코드를 통해 적용된 pruning 확인 가능

  ```python
  print(module._forward_pre_hooks)
  ```

- 그 외 다양한 pruning관련 기능

  - iterative pruning : 차원을 설정하여 차원마다 해당 비율(amount)만큼 pruning

  - Remove pruning re-parametrization

    > To make the pruning permanent, remove the re-parametrization in terms of `weight_orig` and `weight_mask`, and remove the `forward_pre_hook`, we can use the `remove` functionality from `torch.nn.utils.prune`

    즉, 아래 명령어를 사용한 후 `named_buffers()` 를 확인하면 `[]` 빈 리스트가 나옴

    ```python
    prune.remove(module, 'weight')
    print(list(module.named_buffers()))
    # []
    ```

  - Pruning multiple parameters in a model

    ```python
    new_model = LeNet()
    for name, module in new_model.named_modules():
        # prune 20% of connections in all 2D-conv layers
        if isinstance(module, torch.nn.Conv2d):
            prune.l1_unstructured(module, name='weight', amount=0.2)
        # prune 40% of connections in all linear layers
        elif isinstance(module, torch.nn.Linear):
            prune.l1_unstructured(module, name='weight', amount=0.4)
    
    print(dict(new_model.named_buffers()).keys())  # to verify that all masks exist
    ```

  - Global pruning

    모듈마다 일정한 비율로 pruning하는 것이 아니라, 모델을 일정한 비율로 pruning

    ```python
    model = LeNet()
    
    parameters_to_prune = (
        (model.conv1, 'weight'),
        (model.conv2, 'weight'),
        (model.fc1, 'weight'),
        (model.fc2, 'weight'),
        (model.fc3, 'weight'),
    )
    
    prune.global_unstructured(
        parameters_to_prune,
        pruning_method=prune.L1Unstructured,
        amount=0.2,
    )
    ```

    ```python
    print(
        "Sparsity in conv1.weight: {:.2f}%".format(
            100. * float(torch.sum(model.conv1.weight == 0))
            / float(model.conv1.weight.nelement())
        )
    )
    print(
        "Sparsity in conv2.weight: {:.2f}%".format(
            100. * float(torch.sum(model.conv2.weight == 0))
            / float(model.conv2.weight.nelement())
        )
    )
    print(
        "Sparsity in fc1.weight: {:.2f}%".format(
            100. * float(torch.sum(model.fc1.weight == 0))
            / float(model.fc1.weight.nelement())
        )
    )
    print(
        "Sparsity in fc2.weight: {:.2f}%".format(
            100. * float(torch.sum(model.fc2.weight == 0))
            / float(model.fc2.weight.nelement())
        )
    )
    print(
        "Sparsity in fc3.weight: {:.2f}%".format(
            100. * float(torch.sum(model.fc3.weight == 0))
            / float(model.fc3.weight.nelement())
        )
    )
    print(
        "Global sparsity: {:.2f}%".format(
            100. * float(
                torch.sum(model.conv1.weight == 0)
                + torch.sum(model.conv2.weight == 0)
                + torch.sum(model.fc1.weight == 0)
                + torch.sum(model.fc2.weight == 0)
                + torch.sum(model.fc3.weight == 0)
            )
            / float(
                model.conv1.weight.nelement()
                + model.conv2.weight.nelement()
                + model.fc1.weight.nelement()
                + model.fc2.weight.nelement()
                + model.fc3.weight.nelement()
            )
        )
    )
    ```

    ```python
    """
    output:
    
    Sparsity in conv1.weight: 7.41%
    Sparsity in conv2.weight: 9.49%
    Sparsity in fc1.weight: 22.00%
    Sparsity in fc2.weight: 12.28%
    Sparsity in fc3.weight: 9.76%
    Global sparsity: 20.00%
    """
    ```

  - custom pruning functions



## 참조자료

- https://medium.com/pytorch/pytorch-lightning-v1-2-0-43a032ade82b

### pruning

- [PRUNING AND QUANTIZATION](https://pytorch-lightning.readthedocs.io/en/1.2.0/advanced/pruning_quantization.html)
- [pytorch_lightning.callbacks.ModelPruning](https://pytorch-lightning.readthedocs.io/en/latest/extensions/generated/pytorch_lightning.callbacks.ModelPruning.html)

- [pytorch PRUNING TUTORIAL](https://pytorch.org/tutorials/intermediate/pruning_tutorial.html)

