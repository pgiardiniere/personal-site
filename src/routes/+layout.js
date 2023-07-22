import { error } from '@sveltejs/kit'

// csr is for 'client side rendering', as opposed to 'ssr' (server-side rendering).
// Allows client side routing. Necessary for page transitions and link prefetching;
// change to false if you prefer ordinary routing without JS
//
// see:
//    https://learn.svelte.dev/tutorial/csr
//    https://kit.svelte.dev/docs/page-options 
export const csr = true

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
