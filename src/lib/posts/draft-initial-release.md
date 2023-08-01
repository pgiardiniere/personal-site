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
</script>

Welcome to the first blog post!

## The Starter

This site is powered by Svelte/SvelteKit. I found an excellent starter kit published by Josh Collingsworth on his GitHub [here](https://github.com/josh-collinsworth/sveltekit-blog-starter). What really sold me on it was the meticulous documentation found there and Josh's [accompanying article](https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog) detailing how to build a static sveltekit markdown blog step-by-step, which made it easy for me (a relative newcomer to Svelte/Sveltekit) to understand the full stack.

The template provides an extremely solid base of functionality for a static blog, and leaves room for easy extension due to its elegant construction. Accordingly, I've added some specific features which are important to me.

## Modifications

-----

#### Katex

I have added [KaTeX](https://katex.org/) to the project for simple & performant static LaTeX rendering functionality. I was specifically able to add this through the following example [here](https://svelte.dev/repl/49ff6c089825418888cf804d9dde77bc?version=4.1.0).

To use it in a post, you escape to Svelte markup on a new line in your `.md` file and use the `Katex` component within that context to get it to render. Having used it a few times, it's still a very pleasant experience despite the workaround.

That's the simplest way of integrating it. It would have been nice to be able to use `$` and `$$` syntax directly in markdown (the same worfklow as in Jupyterlab) but MDSveX doesn't support it, and the other folks in the community I've seen attempt syntax like it haven't come up with a cleaner solution as of yet.

#### Drafts

Drafts are important to me - since I started blogging in University I've come to rely on writing markdown as a place to organize my thinking. Being able to seamlessly include links, figures, math, and more in one place I've found to be a very powerful .

Since these markdown files include Svelte HTML escapes & custom functionality, I need to have them rendered to the site for the full effect, which is easy - just an `npm run dev` command away. But those drafts must not be published to the final site when `npm run build` is executed.

I would have like to just tell the Svelte compiler to ignore it, but there's not quite an option for that anymore (not with the static adapter anyway). I found a discussion (TODO: Link) about this same issue, and found that unfortunately the best workflow is another workaround.

TODO: Finish. IF section goes too long, simply update & link the readme.md in drafts folder on GitHub for this repo.

#### Swap Static Adapter for Cloudflare Adapter

I'm hosting using [Cloudflare Pages](https://developers.cloudflare.com/pages), as such the starter project's default [static adapter](https://kit.svelte.dev/docs/adapter-static) has been swapped out for the [cloudflare adapter](https://kit.svelte.dev/docs/adapter-cloudflare). Because we're using the an adapter made specifically for the platform, these SSR functions are invoked using the proper Serverless functions for the host platform (note that SvelteKit also distributes first-party adapters for the [Netlify](https://kit.svelte.dev/docs/adapter-netlify) & [Vercel](https://kit.svelte.dev/docs/adapter-vercel) platforms, among [others](https://kit.svelte.dev/docs/adapters)).

Since we swapped adapters, it means we're no longer opting-in to full Static Site Generation (SSG) - we have the option of using Server Side Rendering (SSR) functionality. If you check more closely though, you'll note we're still building a fully-static site. Specifically, see the adapter config in `svelte.config.js` that relates to [prerendered routes](https://kit.svelte.dev/docs/page-options#prerender). And just to be really sure, we also have a `layout.server.js` at the top-level of `\routes` (i.e. all child routes will inherit) which exports `prerender=true`. 

Why? The reason is simple enough: This is just a blog. Serving the same content to every user. It's simpler to just build the whole thing once whenever new content is created and serve that to all users - not dynamically rebuild the page on each new request. So static site generation is the build strategy which most accurately reflects the content being served.

In fact, we could go even further and disable client-side rendering (javascript) altogether by setting csr to false, and the only differences would be: 

1. Client-side routing falls back to traditional server-side routing, and 
2. Page transition animations get disabled.

This all highlights what I really like about the stack: How dead simple it is. Sure, there's a lot of frontend config & jargon to get through up front, but when you stop and look at what it's doing, it's very minimal.

<Callout>
<b>Note:</b>

A potential point of confusion: [csr](https://kit.svelte.dev/docs/page-options#csr) and [ssr](https://kit.svelte.dev/docs/page-options#ssr) are not 'opposites' like you would expect. In fact, even for this static site, both `ssr` and `csr` are used. The terms are just overloaded a bit.

<ul>
  <li> Static Site Generation (SSG) is server-rendered one time for all requests - at the time the developer invokes the build function. </li>
  <li>Server Side Rendering (SSR) is server-rendered dynamically - each time a client requests a resource, the server builds (i.e. renders) the page and responds to the request with the newly-built content.</li>
</ul>

TODO: edit this - this is not entirely correct.

See the [page-options](https://kit.svelte.dev/docs/page-options) first sentence and the relevant linked glossary page on [prerendering](https://kit.svelte.dev/docs/glossary#prerendering).

If your build strategy is SSG: then it's "prerendering"

If your build strategy is SSR: then it's just "rendering"

**So in the context of SvelteKit:** When you see `csr` and `ssr` used together, generally folks are referring to where the javascript is running (on the client vs on the server). In contrast, SSG and SSR refer to different build intervals/strategies for distributing server-side rendered content.
</Callout>
