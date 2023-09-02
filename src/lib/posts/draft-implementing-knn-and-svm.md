---
title: "Archive: Implementing KNN and Support Vector Machine classifiers"
date: "2021-03-26"
updated: "2023-08-31"
categories:
  - "archives"
  - "cs231n"
  - "computer-vision"
excerpt: The first post in the archives - the one which began my journey on getting current with the computer vision literature.
---

<script>
    import Info from '$lib/components/Info.svelte'
    import Katex from '$lib/components/Katex.svelte'
</script>

<Info>

**Note:** Originally published March 26th, 2021, this is post <Katex math="1/20"/> in the archived Deep Learning for Computer Vision series.

* Browse the full [cs231n series](/blog/category/cs231n).
* See the source code in the [knn](https://github.com/pgiardiniere/cs231n/blob/main/assignment1/knn.ipynb) and [svm](https://github.com/pgiardiniere/cs231n/blob/main/assignment1/svm.ipynb) notebooks.

New comments are found exclusively in info boxes like this one.

</Info>


## KNN

The first assignment begins with something familiar to get acquainted with CIFAR-10 - implementing KNN. Target accuracy is ~25% per the instructions. I'm partway through implementing - I have my euclidean distances matrix argsorted and the top-k neighbors selected, so now I just need to implement the logic to count the associated labels over the k neighbors to select the max for each record and return those predictions.

<p>The assignment authors have chosen to encode CIFAR10 down from an <code>ndarray</code> from shape <Katex math="(N, 32, 32, 3)"/> to shape <Katex math="(N, 3072)"/>, where <Katex math="N"/> is the number of images in the dataset. All this means is each image has been reshaped from the original 32x32 pixel grid (where each pixel has 3 independent RGB color channels with 8-bit color depth) into an array of length <Katex math="32*32*3 = 3072" />.</p>

The assignment makes a big show of having students make 2-loop, 1-loop, and 0-loop (i.e. fully vectorized) implementations to demonstrate the performance improvement from vectorizing ops. I've done that before, and also implemented KNN before, so I'm skipping the first two and just implementing a mostly-vectorized one (I only used loops on the nearest neighbor frequency count).

My accuracies have hit the suggested targets (27.4% at k=1 and 27.8% at k=5), so I'm happy with my implementation.

## SVM

The next lab in this assignment deals with support vector machines.

Essentially, in the assignment they've shipped you code which already loads in the data, partitions it appropriately, and feeds it to a partially-implemented SVM function. The algorithm is missing:
  1. Gradient computation, and 
  2. Regularization. 

The assignment asks the student to implement naive (i.e. non-vectorized) and vectorized SVM by filling in both required pieces.

#### 1) Gradient computation w/ regularization term

In the [gradcompute notes](https://cs231n.github.io/optimization-1/#gradcompute) the authors make a distinction between so-called Analytical and Numerical gradient computation. Analytical is calculus-based (so, a 'real' gradient), where Numerical involves merely storing observed distance over a very small (but finite) interval to get direction. They give pros/cons of each, a code sample containing non-vectorized Numerical gradient, and in the assignment ask you implement Analytic gradient (to later double-check using an Numerical gradient).

I finished the SVM portion and completed all the sub-modules they have you do. I'm getting Validation accuracy ~37%, Test accuracy ~36%. Per the instructions, I could eke out another 2 percentage points by optimizing the hyperparams even further but I'm not going to spend the time. Here's the loss plotted over SGD iterations, with convergence happening around the 400-600th round:

![Training loss over time](/images/implementing-svm-loss-graph.png)
