---
title: "Archive: First steps with  PyTorch"
date: "2021-05-05"
updated: "2023-09-03"
categories:
  - "archives"
  - "cs231n"
  - "computer-vision"
excerpt: Getting up and running with PyTorch, and training some increasing our evaluation performance with more advanced CNNs. 
---

<script>
    import Info from '$lib/components/Info.svelte'
    import Katex from '$lib/components/Katex.svelte'
</script>

<!-- Table styling -->
<style>
  td, th {
    border: 1px solid var(--darker);
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<Info>

**Note:** Originally posted May 5th, 2021, this is post <Katex math="8"/> in the archived Deep Learning for Computer Vision series (cs231n). 
* Browse the full [cs231n series](/blog/category/cs231n).
* See the source code in the [PyTorch](https://github.com/pgiardiniere/cs231n/blob/main/assignment2/PyTorch.ipynb) notebook.

New comments are found exclusively in info boxes like this one.

</Info>

Still working through the Pytorch notebook - the last post dealt with Cython extensions portion of the assignment, now I'm in the PyTorch-proper section for GPU workflows.

## Impressions:

Installing was a bit painful. The local-install instructions in the notebook would have you install to a new conda env. But using given commands doesn't work on my machine. And anyway, it's bad practice to use two virtual environments for the same project. So I was able to overcome by using both the pytorch.org install tool's [previous versions](https://pytorch.org/get-started/previous-versions/) page to find 1.4.0 specific suggestions (and still had to alter it slightly).

<Info>

I did this as self-study in 2021, but I used the 2020 course materials since it was the last year that [local development](https://cs231n.github.io/assignments2020/assignment1/#option-b-local-development) was supported. 

Everything afterwards is all in Google Colab. Colab is undeniably a great tool for teaching, but there's also great value in learning to manage your own Python environments and computing on hardware you own!
</Info>

Post-install, I took a look around to figure out any differences the "numpy-like" torch interface has with np. Specifically with regards to matrix multiplication, there are a few things to note:

* Broadcasting in PyTorch mirrors np broadcasting behavior. This is partly why they default to the <Katex math="(N \times C \times H \times W)" /> format for tensors.
* Specific matrix multiply functions:
  * `np.dot()` allows matrix multiplication by using broadcasting, but `torch.dot()` doesn't.
  * `np.matmul()` and `torch.matmul()` both perform matrix multiplication with broadcasting, and can be called with the [@ operator](https://peps.python.org/pep-0465/).
  * PyTorch additionally has `torch.mm()` which does matrix multiplication *without* broadcasting.

I really like these changes - the `.dot()` shorthand being disallowed encourages people to use the more pythonic `@` operator instead, and the stricter `mm()` method without broadcasting makes it easy to tell whether you've set up your dimensions the correct way.

## Barebones PyTorch:

More or less the idea with this section is to just get used to the Tensor object, and few of the `nn.functional` methods. Also, your first exposure to the `with torch.no_grad()` control block, which temporarily disables auto-grad engine on our tensors, very important to remember use this for any operations which *should not* be differentiated (i.e. anything that's not part of optimization function).

The section demonstrates this functionality with a 2-layer FC-net, and then has students replicate it by making 3-layer CNNs themselves - I've got this completed.

## Constructing your models:

Constructing your neural net class by sub-classing the `torch.nn.modules.Module` grants you more quality-of-life features than working directly on tensors. All you need to do get a usable model out of it is implement the `init` method (initialize your weights according to some scheme) and the `forward` method (define how the layers connect to each other).

If you don't require much customization, you would instead use the `torch.nn.Modules.container.Sequential` constructor. Layers are initialized and added to the model in the order you pass them in. And if you want to refer to layers by names, you can pass an ordered dictionary instead of a list of layers, where the keys are your layer names and values are layers.

<Info>
  This has been refactored in more recent PyTorch builds, see 
  <a href="https://pytorch.org/docs/stable/generated/torch.nn.Sequential.html">torch.nn.Sequential</a> 
</Info>

## Open-ended cifar10 training

The assignment ends with a simple goal - get >=70% validation accuracy on cifar10 using the tools available in PyTorch.

The first network I built is simple enough, and yields 64% validation accuracy (59% in Test). It's an 8 layer net, where the first 5 layers are convolutional and the last 3 are fully-connected. It uses Spatial batch norm after convolutional layers 1, 3, 5 and 'regular' batch norm after the first 2 fully-connected layers. (See the full code below for additional implementation details)


| Model        | Feature Type            | Target Accuracy | Observed Accuracy |
| :----------- | :---------------------- | :-------------: | :---------------: |
| SVM          | Raw Pixels              | 39%*            | 37%*              |
| SVM          | Extracted               | 44%             | 40.4%             |
| 2-Layer net  | Raw Pixels              | 48%             | 51.7%             |
| 2-Layer net  | Extracted               | 55%             | 56.8%             |


| conv layers     | 5             | 5              | 5                |
| :-----------        |  :-------:    | :-------------: | :---------------: |
| **conv channels**   | **8→16→32** | **16→32→64** | **32→64→128** |
| Validation Accuracy | 75.90%        | 80.20%         | *82.40%*           |
| Test Accuracy       | 75.82%        | 75.71%         | *79.25%*           |

It seems like the more-channels approach trends well on cifar-10, where evaluation performance increases with the number of channels used.

Another important part of the VGGNet architecture is depth of the network in terms of layers, so I added more convolutional layers (with batchnorm and max-pooling following the same pattern as before) and ran the following trials:

| conv layers       | 7          | 7             | 9             |  9          | 
| :-----------      |  :-------: | :-------:     | :-----------: | :---------: |
| **conv channels** | **8 ... 64** | **16 ... 512** | **32 ... 512** | **64 ... 1024** |
| Test Accuracy     | 75.43%     | *83.62%*  | 81.92%        | 83.04%      |

While an increase in performance is observed at 7 conv layers with lots of convolutional channels, after that point we see a slight accuracy decrease in Test (along with the obvious slowdown in compute time), apparently hitting a point of diminishing returns with the CIFAR10 dataset in particular.
