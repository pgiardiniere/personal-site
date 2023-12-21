/**
 * All of these values are used throughout the site – for example, 
 * in the <meta> tags, in the footer, and in the RSS feed.
 * 
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/ 

export const siteTitle = 'Pete Giardiniere'
export const siteDescription = 'A Personal Site Built with the SvelteKit Static Blog Starter'
export const siteURL = 'petegiardiniere.com'
export const siteLink = 'https://petegiardinere.com'
export const siteAuthor = 'Pete Giardiniere'

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Projects',
		route: '/projects'
	}, {
		title: 'Blog',
		route: '/blog'
	}, {
		title: 'Contact',
		route: '/contact' 
	},
]