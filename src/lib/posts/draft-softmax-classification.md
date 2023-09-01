---
title: "Softmax classification"
date: "2021-04-01"
updated: "2023-09-01"
categories:
  - "archives"
  - "cs231n"
  - "Computer Vision"
excerpt: On writing a softmax classifier on CIFAR-10 using numpy.
---

<script>
    import Info from '$lib/components/Info.svelte'
    import Katex from '$lib/components/Katex.svelte'

    const softmaxLoss = "L_i = -log{\\left( \\frac {e^{f_{y_i}}} {\\sum_j e^{f_j}} \\right)}"
</script>

<Info>

**Note:** This is an archived post from April 1st, 2021.
</Info>

The third part of A1 has students write a softmax classifier. cs231n has [softmax notes](https://cs231n.github.io/linear-classify/#softmax), but I found [this article](https://eli.thegreenplace.net/2016/the-softmax-function-and-its-derivative/) to be generally more approachable and more in-depth.

Softmax is a little weird in that 'softmax loss' isn't really meaningful in and of itself. The output of the Softmax function can be interpreted probabilistically. So by applying the [cross-entropy](https://en.wikipedia.org/wiki/Cross-entropy#Cross-entropy_minimization) function to Softmax's output, we get either a [MLE](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation) or [MAP](https://en.wikipedia.org/wiki/Maximum_a_posteriori_estimation) estimation of the underlying distribution (MLE if no regularization, MAP if so).  I'm not versed in either probability or information theory enough to get any more detailed than that (hand-waving) description though.

<p>So the cross-entropy loss <Katex math="L" /> at sample <Katex math="i" /> as given by cs231n notes is:</p>

<Katex displayMode math={softmaxLoss} />
