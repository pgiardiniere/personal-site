---
title: "We're live!"
date: "2023-08-04"
updated: "2023-08-11"
categories: 
  - "site update"
  - "web development"
excerpt: This post details initial release of website - why it exists and how it's made.
---

<script>
	import Info from '$lib/components/Info.svelte';

  import Katex from "$lib/components/Katex.svelte"

  const softmax = "L_i = -log{\\left( \\frac {e^{f_{y_i}}} {\\sum_j e^{f_j}} \\right)}"
</script>

Welcome to the first post! This is a tech blog where you can find all manner of details about the projects I've worked on, both past and present. Most recently, I've had a lot of fun putting this site together, so let's get right into it and cover how it's made.

#### The Starter

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

Drafts are important to me - since I started blogging in University I've come to rely on writing markdown as a place to organize my thinking. Being able to seamlessly include links, figures, math, and more in one place I've found to be very powerful.

Since these markdown files include Svelte markup escapes & custom functionality, I need to have them rendered to the site for the full effect, which is easy - just spin up the dev server. But those drafts must not be published to the final site when a build is executed.

Since SvelteKit 1.0's release, you [cannot configure the compiler to ignore routes](https://stackoverflow.com/a/69457826), so ultimately I wrote a solution outside the framework just utilizing nodejs to move the files around before builds and hooked it straight into my package.json to ensure it doesn't require additional thought. You can read more about the implementation [here](https://github.com/pgiardiniere/personal-site/blob/main/drafts/README.md) if you're interested.

<Info>

**Hosting Provider Note**: If you're using [Cloudflare Pages](https://developers.cloudflare.com/pages) or another similar hosting provider (Netlify, Vercel, etc.) then you might already have something similar to this functionality provided for you. For cloudflare, it's referred to as [preview deployments](https://developers.cloudflare.com/pages/platform/preview-deployments/) and it integrates directly with your Git workflow.

Ultimately, I just don't find this workflow to be as ergonomic as the one I've made - branch switching for drafts and managing PRs increases cognitive overhead, which decreases the occasions I'll use to write.

Your hosting provder likely integrates with git master channel, where new commits to master trigger the provider to run a new `build` command. Since we've extended `build` with the draft movement script, we can be sure that Cloudflare does not publish unfinished pages for us. I haven't tested with other providers, so your mileage may vary.
</Info>

## Publishing to Cloudflare Pages

---

I'm hosting using [Cloudflare Pages](https://developers.cloudflare.com/pages) for its ease of use and because I like supporting Cloudflare. They have a good reputation for a reason!

I tested deploying using SvelteKit's [static adapter](https://kit.svelte.dev/docs/adapter-static) (which the starter project uses by default) and the [cloudflare adapter](https://kit.svelte.dev/docs/adapter-cloudflare), utlimately keeping the original static adapter.

It's recommended to use the adapter for the platform you distribute to, which is why I gave the Cloudflare adapter a shot. The main distinguishing feature with it is that any server-side rendering (SSR) requests would be invoked using the proper Serverless functions for the host platform. *(Note that SvelteKit also distributes first-party adapters for the [Netlify](https://kit.svelte.dev/docs/adapter-netlify) & [Vercel](https://kit.svelte.dev/docs/adapter-vercel) platforms, among [others](https://kit.svelte.dev/docs/adapters)).*

But what is SSR? How does it differ from other forms of prerendering?

* **Server Side Rendering (SSR)** pages are built dynamically upon each new request. 
* **Static Site Generation (SSG)** pages are built once and served to all requests.

Since this site is composed entirely of static content (i.e. for a given page, the exact same content is served to each client regardless of who the request comes from) it makes the most sense to pre-render all pages, as this build strategy accurately reflects the content being served & is simpler than dynamically rebuilding on-request.

And since the `static` adapter supports this fully out of the box, it ultimately wound up being better to just use it and configure Cloudflare to recognize it, rather than use the `cloudflare` adapter and configure Svelte to turn off all SSR functionality.

<Info>

**Note:** You might have noticed that SSR and SSG are simply two different intervals/strategies for doing the same thing - building (i.e. server-rendering) javascript into a bundle of HTML and (less) javascript. To avoid overloading the term *rendering*, when a static generation strategy is used, you will often see term *prerendering* used instead from the Svelte/SvelteKit docs. (In contrast, NextJS uses *prerendering* in [both contexts](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)).

For now, just know that they're fundamentally the same idea - reducing JS down to HTML and (less) JS _before_ you fulfill the client request.

<b><em>Why bother?</em></b> Server-rendering generally is an advancement over the old status quo of React SPAs (single page application), where shipping the entire application in JS over an effectively empty HTML mule was the norm. This strategy still has uses today, but has slow initial Time-to-Load (TTL) due to large quantity of JS being shipped, and the JS having to build the 'actual' request UI after the DOM indicates the HTML page load is in a ready state (after which hydration can finally occur). As you might guess, placing the page contents behind a JS rebuild hurts SEO, since the HTML on its own shares very little useful information about the page. There's a lot more to the discussion than this, but these are some useful starting points.
</Info>

## Up Next

---

That does it for this post - expect to see all-new blog content soon, as well as updates to the site itself.
