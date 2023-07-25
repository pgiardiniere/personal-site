# Drafts

## The tl;dr workflow 

Any new file in `/src/posts` begins life as a `drafts-*.md` file. These draft posts do not get targeted when  `npm run build` is executed. This gives the site maintainer a convenient place to work on scratch files, choosing to workshop whichever they please to a final state. When finished, remove the `drafts-` prefix from the filename, run `npm run build` and the post will go live on the site (assuming your web server is configured properly i.e. pointed to statically serve files out of `/build`).

If you're doing it right, this `/drafts` folder will be perpetually empty in your git history, save for this readme file.

## Reasoning

The drafts folder is basically a compromise/workaround to accommodate my preferred workflow.

I publish pages to this blog of ideas that are a certain level of refined. But during day-to-day work, I find it extremely helpful to keep notes as I'm working through problems. Most of these are not worth publishing, it's just the process of writing & viewing changes in the canvas itself which is helpful.

Before, I achieved this in temporary raw text files (always in Sublime Text, my preferred editor for exclusively that use case). The format has the advantage of being dead simple to use and extremely quick. But once I got used to regularly publishing blog posts, I found it limiting - you can't integrate links smoothly in writing, and obviously there's no screenshots, graphics, or math notation of any kind.

Markdown solves these issues for us, but introduces some more friction to the process, as we specifically want to avoid publishing those scratch notes to the site.

The laziest way to achieve this would be to simply could keep an entirely separate build of the site in its own directory, but this introduces friction of maintaining/keeping in-sync with the main site (and is just plain annoying). Git branches are a better way of solving this, but introduces undue friction to the process in the form of frequent branch switching & merging.

A preferred solution would be to keep a `/drafts` folder inside `src/routes/` which we explicitly set `npm run build` to ignore, but there is no longer a good way to do that directly within SvelteKit. But as per the discussion on StackOverflow [here](https://stackoverflow.com/questions/69364069/how-do-i-exclude-files-from-svelte-kit-build), there is a simple npm workaround.

## The mechanics

In `package.json` we prepended:
* `dev` with `` and 
* `build` with ``

You'll always have the dev server up while you're composing drafts (as those markdown files will have Svelte plugin goodies mixed in). So when you're composing git commits they'll always be in the same place, maintaining a clean history on a single branch. Easy. A little hacky? Sure. But hey, that's webdev for ya.
