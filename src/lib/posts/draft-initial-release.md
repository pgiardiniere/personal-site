---
title: "We're live!"
date: "2023-07-26"
updated: "2023-07-26"
categories: 
  - "site update"
  - "web development"
excerpt: This post details initial release of website - why it exists and how it's made.
---

<script>
	import Callout from '$lib/components/Callout.svelte';

  import Katex from "$lib/components/Katex.svelte"

  const softmax = "L_i = -log{\\left( \\frac {e^{f_{y_i}}} {\\sum_j e^{f_j}} \\right)}"
</script>

Welcome to the first blog post!

## The Starter

This site is powered by Svelte/SvelteKit. I found an excellent starter kit published by Josh Collingsworth on his GitHub [here](https://github.com/josh-collinsworth/sveltekit-blog-starter). What really sold me on it was the meticulous documentation found there and Josh's [accompanying article](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) detailing how to build a static sveltekit markdown blog step-by-step, which made it easy for me (a relative newcomer to Svelte/Sveltekit) to understand the full stack.

The template provides an extremely solid base of functionality for a static blog, and leaves room for easy extension due to its elegant construction. Accordingly, I've added some specific features which are important to me.

## Modifications

-----

#### Katex

I have added [Katex](https://katex.org/) to the project for simple static Latex rendering functionality. I was specifically able to add this through given sample [here](https://svelte.dev/repl/49ff6c089825418888cf804d9dde77bc?version=4.1.0).

You can't use it directly within markdown - you must escape to Svelte markup on a new line in your `.md` file and use the `Katex` component within that context to get it to render. And to avoid escaping every single curly brace `{}` in the Latex, it's best to define your equations upfront inside a `script` tag.

It's still a pleasant experience despite the workaround. For instance, here's the function for a Softmax classifier (i.e. Multiclass Cross-Entropy classifier, if you prefer) as given [here](https://cs231n.github.io/linear-classify/#softmax-classifier) in Stanford's CNNs for Computer Vision materials.

<p><Katex displayMode math={softmax}></Katex></p>

It would have been nice to be able to use `$` and `$$` syntax directly in markdown (the same worfklow as in Jupyterlab) but MDSveX doesn't support it, and the other folks in the community I've seen attempt to integrate syntax like it haven't come up with a cleaner solution as of yet.

#### Drafts

Drafts are important to me - since I started blogging in University I've come to rely on writing markdown as a place to organize my thinking. Being able to seamlessly include links, figures, math, and more in one place I've found to be a very powerful .

Since these markdown files include Svelte HTML escapes & custom functionality, I need to have them rendered to the site for the full effect, which is easy - just an `npm run dev` command away. But those drafts must not be published to the final site when `npm run build` is executed.

I would have like to just tell the Svelte compiler to ignore it, but there's not quite an option for that anymore (not with the static adapter anyway). I found a discussion (TODO: Link) about this same issue, and found that unfortunately the best workflow is another workaround.

TODO: Finish. IF section goes too long, simply update & link the readme.md in drafts folder on GitHub for this repo.

#### Swap Static Adapter for Cloudflare Adapter

I'm hosting using [Cloudflare Pages](https://developers.cloudflare.com/pages), as such the starter project's default [static adapter](https://kit.svelte.dev/docs/adapter-static) has been swapped out for the [cloudflare adapter](https://kit.svelte.dev/docs/adapter-cloudflare). Because we're using the an adapter made specifically for the platform, any SSR functions would be invoked using the proper Serverless functions for the host platform (note that SvelteKit also distributes first-party adapters for the [Netlify](https://kit.svelte.dev/docs/adapter-netlify) & [Vercel](https://kit.svelte.dev/docs/adapter-vercel) platforms, among [others](https://kit.svelte.dev/docs/adapters)).

Despite the swap in adapters, the site is still fully static. SvelteKit allows for free mixing and matching of Server Side Rendered (SSR) and Static Site Generated (SSG) pages, the difference is essentially as follows:

* **Server Side Rendering (SSR)** pages are built dynamically upon each new request. 
* **Static Site Generation (SSG)** pages are built once, when the developer runs the `build` command.

Since this site is composed entirely of static content (i.e. for a given page, the exact same content is served to each client regardless of who the request comes from) it makes the most sense to statically pre-render all pages, as this build strategy accurately reflects the content being served & is simpler than dynamically rebuilding on-request.

So, why use SSG? It's the the build strategy which most accurately reflects the content being served. This site hosts a blog & a few other (mostly non-interactive) pages. Further, it serves the same content to every client, regardless of who the user is. So it's simpler to just prerender the whole thing once at the time new content is created and serve that to all users (as opposed to SSR which dynamically rebuilds the page upon each new client request).

<Callout>
<b>Server Rendering Note:</b> 

You might have noticed that these are just two different intervals/strategies for doing the same thing - building (i.e. server-rendering) javascript into a bundle of HTML and (less) javascript. To avoid overloading the term *rendering*, when a static generation strategy is used, you will often see term *prerendering* used instead from the Svelte/SvelteKit docs. (In contrast, NextJS uses *prerendering* in [both contexts](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)).

For now, just know that they're fundamentally the same idea - reducing JS down to HTML and (less) JS _before_ you fulfill the client request.

<b><em>Why bother?</em></b> Server-rendering generally is an advancement over the old status quo of React SPAs (single page application), where shipping the entire application in JS over an effectively empty HTML mule was the norm. This strategy still has uses today, but has slow initial Time-to-Load (TTL) due to large quantity of JS being shipped, and the JS having to build the 'actual' request UI after the DOM indicates the HTML page load is in a ready state (after which hydration can finally occur). As you might guess, placing the page contents behind a JS rebuild hurts SEO, since the HTML on its own shares very little useful information about the page. There's a lot more to the discussion than this, but these are some useful starting points.
</Callout>
