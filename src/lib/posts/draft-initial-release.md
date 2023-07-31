---
title: "The site is live!"
date: "2023-07-26"
categories: 
  - "site update"
  - "web development"
excerpt: This post details initial release of website - why it exists and how it's made.
---

Welcome to my website's initial post! This has been in the works for some time now and I'm pretty proud of it.

## The Starter

This site is powered by Svelte/SvelteKit. I found an excellent starter kit published by Josh Collingsworth on his GitHub [here](https://github.com/josh-collinsworth/sveltekit-blog-starter). What really sold me on it was the meticulous documentation found there and Josh's [accompanying article](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) detailing how to build a static sveltekit markdown blog step-by-step, which made it easy for me (a relative newcomer to Svelte/Sveltekit) to understand the full stack.

The template provides an extremely solid base of functionality for a static blog, and leaves room for easy extension due to its elegant construction. Accordingly, I've added some specific features which are important to me.

## Modifications

### Katex

I have added [KaTeX](https://katex.org/) to the project for simple & performant static LaTeX rendering functionality. I was specifically able to add this through the following example [here](https://svelte.dev/repl/49ff6c089825418888cf804d9dde77bc?version=4.1.0).

To use it in a post, you escape to Svelte markup on a new line in your `.md` file and use the `Katex` component within that context to get it to render. Having used it a few times, it's still a very pleasant experience despite the workaround.

That's the simplest way of integrating it. It would have been nice to be able to use `$` and `$$` syntax directly in markdown (the same worfklow as in Jupyterlab) but MDSveX doesn't support it, and the other folks in the community I've seen attempt it haven't come up with a cleaner solution as of yet.


### Drafts

Drafts are important to me - since I started blogging in University I've come to rely on writing markdown as a place to organize my thinking. Being able to seamlessly include links, figures, math, and more in one place I've found to be a very powerful .

Since these markdown files include Svelte HTML escapes & custom functionality, I need to have them rendered to the site for the full effect, which is easy - just an `npm run dev` command away. But those drafts must not be published to the final site when `npm run build` is executed.

I would have like to just tell the Svelte compiler to ignore it, but there's not quite an option for that anymore with the static adapter. I found a discussion (TODO: Link) about this same issue, and found that unfortunately the best workflow is another workaround.

TODO: Finish. IF section goes too long, simply update & link the readme.md in drafts folder on GitHub for this repo.

