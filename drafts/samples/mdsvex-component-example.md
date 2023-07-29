---
title: "A Markdown post with a Svelte component"
date: "2021-12-01"
updated: "2021-12-01"
categories: 
  - "sveltekit"
  - "markdown"
  - "svelte"
excerpt: This post demonstrates how to include a Svelte component in a Markdown post.
---

<script>
	import Callout from '$lib/components/Callout.svelte';
  import Katex from "$lib/components/Katex.svelte"
</script>

This starter includes an `Callout.svelte` component. It's not particularly useful on its own, but here's how you might use it inside of a Markdown post, thanks to mdsvex.

<Callout>
This is an example of the Callout.svelte component! Find it in <code>src/lib/components/Callout.svelte</code>.
</Callout>

<div>
<p>This is some regular html</p>
<p>but what if I also had latex in here, through just the Katex plugin w/ the Katex.Svelte example given at https://svelte.dev/repl/49ff6c089825418888cf804d9dde77bc?version=4.1.0...
</div>

Ok, so Katex must be used explicitly inside html. Let's try again.

Let's try full width display right here...
<div>
  <Katex math={"ax^2 + bx + c = 0"} displayMode ></Katex>
</div>

<div>
<p> here's a new attempt at inline inside html  <Katex math={"ax^2 + bx + c = 0"}></Katex> and this time it worked.</p>
</div>

So the only thing you can't do is inside raw markdown, which makes sense. Also can't same-line swap md to html, also sensible.

You can inject any Svelte components you want into Markdown! Just import them in a `<script>` tag and then use them wherever you like. 

For that matter, you can inject any HTML anywhere! (Note that you cannot use Markdown _inside_ Svelte components or HTML, however. Any opened tag must be closed before returning to Markdown.)