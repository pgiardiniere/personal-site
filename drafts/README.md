# Drafts

## The tl;dr workflow 

Any new file in `/src/posts` begins life as a `drafts-*.md` file. These draft posts do not get targeted when  `npm run build` is executed. This gives the site maintainer a convenient place to work on scratch files, choosing to workshop whichever they please to a final state. When finished, remove the `drafts-` prefix from the filename, run `npm run build` and the post will go live on the site (assuming your web server is configured properly i.e. pointed to statically serve files out of `/build`).

If you're doing it right, this `/drafts` folder will be perpetually empty in your git history, save for this readme file.

## Reasoning

The drafts folder is a workaround compromise to enable my preferred workflow.

I only publish pages that have been edited past a certain level of quality. Many potential posts which begin the draft process never make it to publishing, as I find the process of taking notes an end unto itself. Writing & viewing changes in the canvas helps me solve difficult problems more quickly, but often doesn't contain novel information or unique perspectives.

The laziest way to achieve this would be to simply could keep an entirely separate build of the site in its own directory, but this introduces friction of maintaining/keeping in-sync with the main site (and is just plain annoying). Git branches are a better way of solving this, but introduces undue friction to the process in the form of frequent branch switching & merging.

A preferred solution would be to keep a `drafts-*.md` files inside `src/routes/posts` which we explicitly set `npm run build` to ignore, but there is no good way to do that directly within SvelteKit, as per the full discussion on StackOverflow comments [here](https://stackoverflow.com/a/69457826). There appears to be a one-liner bash workaround in the comments there, but it is not applicable for this use case, as using a raw `mv` in `package.json` when there are potentially 0, 1, or >1 files matching the pattern `drafts-*` means `mv` can error out (if 0 files are found to move). The first thought to work around this while sticking to native bash is to conditionally apply `mv` if file matches are found, but there's not a super elegant to handle this as a 1-liner in bash that I was aware of, due to having glob pattern matching with square brackets (single `[]` and double `[[]]`) being problematic for different reasons.

Since this is just complex complex enough that it would requires a small bash script, we might as well just write it in javascript instead and run it with `node` to keep the project code in a consistent language. So I drafted up the `moveDrafts.cjs` file, and call it before the npm `dev` and `build` scripts execute their default commands in `package.json` to ensure the repo remains in the desired state for development & production builds, respectively.
