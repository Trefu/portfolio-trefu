import type { Translations } from './es';

export const en: Translations = {
	meta: {
		title: 'Trefu — Fullstack Dev',
		description: 'Portfolio of Lucas Leonel Lopez (Trefu) — fullstack developer.'
	},
	lang: {
		chooseTitle: 'Choose your language',
		chooseSubtitle: 'Elige tu idioma',
		spanish: 'Español',
		english: 'English',
		continue: 'Continue',
		hint: 'Press 1 / 2 or click'
	},
	menu: {
		title: 'Trefu · Fullstack',
		options: {
			experience: 'Experience',
			about: 'About me',
			github: 'GitHub'
		},
		descriptions: {
			experience: 'Projects I have worked on.',
			about: 'A bit about me.',
			github: 'My GitHub — repos and stars.'
		},
		hint: '↑ ↓ Enter · 1 2 3 · L language · M sound',
		footer: '© Lucas Leonel Lopez · Trefu · Argentina'
	},
	experience: {
		title: 'Experience',
		subtitle: 'Projects and things I have worked on',
		intro:
			'A selection of projects I have worked on. The open source ones live on my GitHub; the rest are private.',
		filterAll: 'All',
		filterWeb: 'Web',
		filterGame: 'Games',
		filterBackend: 'Backend',
		filterTools: 'Tools',
		filterByTech: 'Filter by technology',
		clearFilter: 'Clear filters',
		noResults: 'No projects match your search.',
		openSource: 'Open Source',
		closedSource: 'Private',
		viewRepo: 'Open repo',
		viewLive: 'Live demo',
		noLive: 'No public demo',
		category: {
			web: 'Web',
			game: 'Game',
			backend: 'Backend',
			tools: 'Tool',
			other: 'Other'
		}
	},
	about: {
		title: 'About me',
		tagline: 'Fullstack dev and Dungeon Master.',
		intro:
			'I began as a frontend developer, self-taught. The freeCodeCamp certification gave me the foundation — small projects, done with care. With that I joined Paradox SRL as a React dev, but they sent me straight to PHP and Yii2. At first it was a leap into the void, but I adapted, and over time I opened up to Laravel, Nuxt 3, Vue 3, Docker and the whole stack you see in Experience.',
		body:
			'Programming and being a Dungeon Master are the same thing to me: building systems where people can do interesting things — a Laravel module, a campaign where players break your script, a story that becomes real when someone plays it for real.',
		closing: 'As long as I have something to build, I\'m in.',
		coming: 'Section under construction',
		soon: 'I will be back soon with more details.'
	},
	github: {
		title: 'GitHub',
		coming: 'Section under construction',
		soon: 'Soon you will find stats and contributions here.'
	},
	common: {
		back: 'Back to menu',
		backShort: '← Back',
		loading: 'Loading…'
	},
	a11y: {
		toggleAudio: 'Toggle audio',
		muteTooltip: 'M · Mute',
		toggleLanguage: 'Toggle language',
		languageTooltip: 'L · Language'
	},
	error: {
		title: '404 — Trefu',
		notFound: 'Page not found'
	}
};
