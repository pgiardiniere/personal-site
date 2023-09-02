---
title: "Archive: Softmax classifier"
date: "2021-04-01"
updated: "2023-09-01"
categories:
  - "archives"
  - "cs231n"
  - "computer-vision"
excerpt: How I derived and developed a linear softmax classifier on the CIFAR-10 dataset.
---

<script>
    import Info from '$lib/components/Info.svelte'
    import Katex from '$lib/components/Katex.svelte'

    const softmaxLoss = "L_i = -log{\\left( \\frac {e^{f_{y_i}}} {\\sum_j e^{f_j}} \\right)}"

    const numerator = "f_{y_i}"
    const numerator_full = "e^{f_{y_i}}"
    const denominator = "\\sum_j e^{f_j} "
</script>

<Info>

**Note:** Originally posted April 1st, 2021, this is post <Katex math="2/20"/> in the archived Deep Learning for Computer Vision series (cs231n).

* Browse the full [cs231n series](/blog/category/cs231n).
* See the source code in the [softmax](https://github.com/pgiardiniere/cs231n/blob/main/assignment1/softmax.ipynb) notebook.

New comments are found exclusively in info boxes like this one.

</Info>

The third part of A1 has students write a linear softmax classifier. cs231n has [softmax notes](https://cs231n.github.io/linear-classify/#softmax), but I found [this article](https://eli.thegreenplace.net/2016/the-softmax-function-and-its-derivative/) to be generally more approachable and more in-depth.

The term Softmax loss is a little weird in that softmax loss isn't really meaningful in and of itself - it's actually cross-entropy loss applied to softmax output. The output of the Softmax function can be interpreted probabilistically, so in applying the [cross-entropy](https://en.wikipedia.org/wiki/Cross-entropy#Cross-entropy_minimization) function to Softmax's output, we get either a [MLE](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation) or [MAP](https://en.wikipedia.org/wiki/Maximum_a_posteriori_estimation) estimation of the underlying distribution (MLE if no regularization, MAP if so).  I'm not versed in either probability or information theory enough to get any more detailed than that (hand-wavey) description though.

<p>As given by the cs231n notes, the loss <Katex math="L" /> at sample <Katex math="i" /> is:</p>

<Katex displayMode math={softmaxLoss} />

<Info>

**Note:** At the time, I didn't do a great job here defining my terms, so let's make up for that now:


<Katex math={numerator}/> denotes your model's score at the ground-truth label's index. 

<Katex math={numerator_full}/> is just that score, exponentiated.

<p></p>
<Katex math={denominator} /> denotes the exponentiated sum of <em>all</em> <Katex math="j \in K" /> classes (10, for CIFAR-10) at sample <Katex math="i"/>. That naturally includes the target index, i.e. where <Katex math="j=y_i" />.

It's shorthand, and a slight abuse of notation. The kind which you grow to get used to (eventually).
</Info>

We need an applicable gradient, but this time the cs231n notes aren't giving me one. While the notes and sources below each use different notation, you can find gradient derivations on two of the pages mentioned before ([1](https://eli.thegreenplace.net/2016/the-softmax-function-and-its-derivative/), [2](https://en.wikipedia.org/wiki/Cross-entropy#Cross-entropy_loss_function_and_logistic_regression)). The important insight is: 

> ... the gradient of the cross-entropy loss for logistic regression is the same as the gradient of the squared error loss for Linear regression.

Hence they each simplify down to familiar-ish results. From to Eli's Blog:

<img src="/images/softmax-classification-1.png" 
alt="Gradient derivation math" style="width:65%; display:block; margin:auto;">

Where <Katex math="S_i"/> denotes the Softmax vector, and

<img src="/images/softmax-classification-2.png" 
alt="partial derivative notation" style="width:40%; display:block; margin:auto;">

Once you implement this in code, the rest of the exercise is effectively identical to the SVM one, so I won't repeat myself covering the steps to complete it.

<Info>
<b>Note:</b> That implementation can be found in <a href="https://github.com/pgiardiniere/cs231n/blob/main/assignment1/cs231n/classifiers/softmax.py">softmax.py</a>.
</Info>

## Results

On the validation set, I get accuracy of 34.4%, which is consistent with the assignment's assertion that if you look for more optimal hyperparameters you can achieve validation accuracy just above 35%.

This is comparable to (though marginally worse than) the SVM classifier, which yielded validation accuracy of 36.5% using the same hyperparameters.
