---
title: "Pete's site is live!"
date: "2021-07-26"
categories: 
  - "site update"
  - "web development"
excerpt: This post details initial release of website - why it exists and how it's made.
---

Welcome to my website's initial post! This has been in the works for some time now and I'm pretty proud of it.

## The stack

This site is powered by Svelte/SvelteKit. I found an excellent starter kit published by Josh Collingsworth on his GitHub [here](https://github.com/josh-collinsworth/sveltekit-blog-starter). What really sold me on it was the meticulous documentation and Josh's [accompanying article](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) detailing how to build a static sveltekit markdown blog step-by-step, which made it easy for me (a relative newcomer to Svelte/Sveltekit) to understand the full stack.

The template provides an extremely solid base of functionality for a static blog, and leaves room for easy extension due to its elegant construction. Accordingly, I've added some specific features which are important to me.


### Given functionality

In summary, it's ... ... ...

For a full summary, you may review the [original template's readme.md](https://github.com/josh-collinsworth/sveltekit-blog-starter/blob/main/README.md).

### Modifications

#### Katex

I have added [KaTeX](https://katex.org/) to the project for simple & performant static LaTeX rendering functionality. I was specifically able to add this through the following example [here](https://svelte.dev/repl/49ff6c089825418888cf804d9dde77bc?version=4.1.0).

It's the simplest way of integrating it. It would have been nice to be able to use `$` and `$$` syntax directly in markdown (the same worfklow as in Jupyterlab) but that MDSveX doesn't support it.

Instead, you must escape to Svelte html on a new line in your `.md` file and use the `Katex` component within that context to get it to render. Having used it just a few times I can say with confidence it's still a very pleasant experience despite this workaround.

TODO: include some discussion of MDX, MDSvex, maybe the github issue where functionality is not supported. MAYBE mention the community pkg which attempt to address.

#### Drafts

Drafts are important, as I've been blogging in University I've come to rely on writing markdown as a place to organize my thinking. Being able to seamlessly include links, figures, maths, and more in one screen I've found to be an incredibly powerful tool that makes me more effective in problem solving.

Since these markdown files include Svelte HTML escapes & custom functionality, I need to have them rendered to the site. But many drafts should not be published to the static site's build directory when `npm run build` is executed. 

I would have like to just tell the Svelte compiler to ignore it, but there's not an option for that anymore. I found a discussion (TODO: Link) about this same issue, and found that unfortunately the best workflow is another workaround.

TODO: Finish. IF section goes too long, simply update & link the readme.md in drafts folder on GitHub for this repo.

