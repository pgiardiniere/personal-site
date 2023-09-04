import { error } from '@sveltejs/kit'

// csr is for 'client side rendering', as opposed to 'ssr' (server-side rendering).
// Allows client side routing. Necessary for page transitions and link prefetching;
// change to false if you prefer ordinary routing without JS
//
// see:
//    https://learn.svelte.dev/tutorial/csr
//    https://kit.svelte.dev/docs/page-options
//
// I don't love the way page transitions work, so to remove them just disable
// client-side js entirely. The irony of using a JS framework to ship a no-JS
// website is not lost on me :)
// 
// Link prefetching would be nice, but pages load incredibly fast anyway since
// they're all just static content.
export const csr = false

export const load = async ({ url, fetch }) => {
	try {
		return {
			path: url.pathname
		}
	}
	catch(err) {
		throw error(500, err)
	}
}
