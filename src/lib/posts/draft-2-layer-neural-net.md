---
title: "Archive: Two layer neural net"
date: "2021-04-07"
updated: "2023-09-01"
categories:
  - "archives"
  - "cs231n"
  - "computer-vision"
excerpt: None
---

<script>
    import Info from '$lib/components/Info.svelte'
    import Katex from '$lib/components/Katex.svelte'
</script>

<Info>

**Note:** Originally posted April 7th, 2021, this is post <Katex math="3/20"/> in the archived Deep Learning for Computer Vision series (cs231n).

* Browse the full [cs231n series](/blog/category/cs231n).
* See the source code in the [two layer net](https://github.com/pgiardiniere/cs231n/blob/main/assignment1/softmax.ipynb) notebook.

New comments are found exclusively in info boxes like this one.

</Info>

I referenced the following course notes to complete this assignment: [optimization-2](https://cs231n.github.io/optimization-2/), [neural-networks-1](https://cs231n.github.io/neural-networks-1/), and [neural-networks-2](https://cs231n.github.io/neural-networks-2/).

In a slightly confusing move, they have you increase dimensionality between layers in the toy example in this assignment. This is consistent with their discussion in [this neural-networks-1 section](https://cs231n.github.io/neural-networks-1/#nn), but it goes against the samples [here in neural-networks-2](https://cs231n.github.io/neural-networks-2/#reg) and the visuals in [Wikipedia's CNN article](https://en.wikipedia.org/wiki/Convolutional_neural_network). All of which supports my preconceived notion that increasing dimensionality isn't productive. I guess the point at this early stage is that it's a technically valid way to construct layers in a neural network (though prone to overfitting).

At this point, I have implemented the code which calculates scores, loss, and gradients properly. Next up is defining the training logic again and what appears to be some hyperparameter tuning at the end. As before, now that the gradients (with backpropagation) are handled, I should be through the hard part.

<Info>
<b>Note:</b> Some time passes here, probably a day or two.
</Info>

**Update:** Assignment is complete - with a 2-layer fully-connected neural net I get validation accuracy of 52% and test accuracy of 51.7%. These both meet suggested targets ('good' accuracies are >48%, with instructor's best classifier hitting >52% validation accuracy).

I've begun the higher-level features notebook (A1Q5). When that's done I'll move straight into assignment 2.
