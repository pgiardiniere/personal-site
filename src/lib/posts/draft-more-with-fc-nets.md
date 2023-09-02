---
title: "Archive: More with fully-connected nets"
date: "2021-04-15"
updated: "2023-09-02"
categories:
  - "archives"
  - "cs231n"
  - "computer-vision"
excerpt: Expanding the PyTorch-inspired neural net programming interface to accept arbitrary model shapes and additional training optimization schemes.
---

<script>
    import Info from '$lib/components/Info.svelte'
    import Katex from '$lib/components/Katex.svelte'
</script>

<Info>

**Note:** Originally posted April 15th, 2021, this is post <Katex math="5/20"/> in the archived Deep Learning for Computer Vision series (cs231n).
* Browse the full [cs231n series](/blog/category/cs231n).
* See the source code in the [FullyConnectedNets](https://github.com/pgiardiniere/cs231n/blob/main/assignment2/FullyConnectedNets.ipynb) notebook.

New comments are found exclusively in info boxes like this one.

</Info>

## A2:Q1 Continued

In my last post, I detailed that I got all the way up to the portion of A2:Q1 (FullyConnectedNets.ipynb) where we modularize much of the code used in the 2-layer neural net made in A1:Q4 and then create a new 2-layer net which calls those new functions.

With that complete, I’m working on the FullyConnectedNet class; which allows the user to plug in an arbitrary list of <Katex math="N"/> layer widths. The class generates a model with <Katex math="N+1"/> layers, with each hidden layer width is created as given by the input list.

I'm reasonably sure that loss calculation is working as intended, but won't be able to verify until I have gradient calculations implmented.

**Up next:** Once I have the class working properly, I’ll train 3 and 5 layer models as the assignment has students do next.  Then I’ll finish the rest of the A2:Q1, which entails adding dropout and batch normalization to our FullyConnectedNets.

**Update (2021):** I have A2:Q1 finished for now. FullyConnectedNets are working as intended and I trained 3 and 5 layer models to overfit on some toy data by tweaking a few parameters. I'll need to return to it as the final question has students just train the best net that they can on CIFAR-10, but you won't be able to reach their target accuracy unless you use some combination of batch normalization or dropout, both of which are covered in dedicated notebooks which are meant to be completed first.

Just as a smoke test, I trained an fc-net without batch norm or dropout and I got validation accuracy around 35% and test accuracy of 32%. *If I had copied the configuration exactly as I had it in assignment one, we would expect the similar results, so I know I can get slightly better accuracy that way.*
