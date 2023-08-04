---
title: "Draft csr ssr"
date: "2023-07-26"
updated: "2023-07-26"
categories: 
  - "site update"
  - "web development"
excerpt: A mixup to avoid on SSG/SSR and csr/ssr in SvelteKit
---

<script>
  import Callout from '$lib/components/Callout.svelte';
</script>

... after some discussion on SSR and SSG (server-side rendering and Static Site Generation, respectively) ...
... being this section on csr vs ssr in svelte/sveltekit ...
... I got tripped up on it, but SSR/SSG refers to a build strategy / build interval, where csr/ssr in app config just refers to whether you will utilize javascript rendering client-side, server-side, or both. Both is default, and the best way to go...

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
