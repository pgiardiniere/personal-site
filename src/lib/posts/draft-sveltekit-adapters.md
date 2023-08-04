---
title: "SvelteKit Adapters"
date: "2023-08-04"
updated: "2023-08-04"
categories: 
  - "site update"
  - "web development"
excerpt: This post details some interesting Svelte/SvelteKit particulars for the website's configuration.
---

## On Adapters: Static Adapter vs. Cloudflare Adapter

I'm hosting using [Cloudflare Pages](https://developers.cloudflare.com/pages), as such I tested both starter project's default [static adapter](https://kit.svelte.dev/docs/adapter-static) and the [cloudflare adapter](https://kit.svelte.dev/docs/adapter-cloudflare). 

It's recommended to use the adapter for the platform you distribute to, which is why I gave the Cloudflare adapter a shot. The main distinguishing feature with it is that any SSR functions would be invoked using the proper Serverless functions for the host platform. *(Note that SvelteKit also distributes first-party adapters for the [Netlify](https://kit.svelte.dev/docs/adapter-netlify) & [Vercel](https://kit.svelte.dev/docs/adapter-vercel) platforms, among [others](https://kit.svelte.dev/docs/adapters)).*

I ran into issues getting the static pages to be recognized by the Cloudflare adapter's routing output. Even changing the rules it requested still resulted in failed builds.

SvelteKit allows for free mixing and matching of Server Side Rendered (SSR) and Static Site Generated (SSG) pages, the difference is essentially as follows:

* **Server Side Rendering (SSR)** pages are built dynamically upon each new request. 
* **Static Site Generation (SSG)** pages are built once and served to all requests.

Since this site is composed entirely of static content (i.e. for a given page, the exact same content is served to each client regardless of who the request comes from) it makes the most sense to pre-render all pages, as this build strategy accurately reflects the content being served & is simpler than dynamically rebuilding on-request (which SSR does).

And since the `static` adapter supports this fully out of the box, it ultimately wound up being better to just use the original `static` adapter and alter the Cloudflare config to recognize the default build folder for it, rather than use the `cloudflare` adapter and try to turn off all the SSR functionality it expects to use.

<Callout>
<b>Server Rendering Note:</b> 

You might have noticed that SSR and SSG are simply two different intervals/strategies for doing the same thing - building (i.e. server-rendering) javascript into a bundle of HTML and (less) javascript. To avoid overloading the term *rendering*, when a static generation strategy is used, you will often see term *prerendering* used instead from the Svelte/SvelteKit docs. (In contrast, NextJS uses *prerendering* in [both contexts](https://nextjs.org/learn/foundations/how-nextjs-works/rendering)).

For now, just know that they're fundamentally the same idea - reducing JS down to HTML and (less) JS _before_ you fulfill the client request.

<b><em>Why bother?</em></b> Server-rendering generally is an advancement over the old status quo of React SPAs (single page application), where shipping the entire application in JS over an effectively empty HTML mule was the norm. This strategy still has uses today, but has slow initial Time-to-Load (TTL) due to large quantity of JS being shipped, and the JS having to build the 'actual' request UI after the DOM indicates the HTML page load is in a ready state (after which hydration can finally occur). As you might guess, placing the page contents behind a JS rebuild hurts SEO, since the HTML on its own shares very little useful information about the page. There's a lot more to the discussion than this, but these are some useful starting points.
</Callout>