export const es = {
	meta: {
		title: 'Trefu — Fullstack Dev',
		description: 'Portfolio de Lucas Leonel Lopez (Trefu) — desarrollador fullstack.'
	},
	lang: {
		chooseTitle: 'Elige tu lengua',
		chooseSubtitle: 'Selecciona tu idioma',
		spanish: 'Español',
		english: 'English',
		continue: 'Continuar',
		hint: 'Presiona 1 / 2 o haz clic'
	},
	menu: {
		title: 'Trefu · Fullstack',
		options: {
			experience: 'Experiencia',
			about: 'Sobre mí',
			github: 'GitHub'
		},
		descriptions: {
			experience: 'Proyectos en los que trabajé.',
			about: 'Un poco sobre mí.',
			github: 'Mi GitHub, repos y estrellas.'
		},
		hint: '↑ ↓ Enter · 1 2 3 · L idioma · M sonido',
		footer: '© Lucas Leonel Lopez · Trefu · Argentina'
	},
	experience: {
		title: 'Experiencia',
		subtitle: 'Proyectos y cosas en las que trabajé',
		intro:
			'Una selección de los proyectos en los que trabajé. Los de código abierto están en mi GitHub; los demás son privados.',
		filterAll: 'Todas',
		filterWeb: 'Web',
		filterGame: 'Juegos',
		filterBackend: 'Backend',
		filterTools: 'Herramientas',
		filterByTech: 'Filtrar por tecnología',
		clearFilter: 'Limpiar filtros',
		noResults: 'Ningún proyecto coincide con tu búsqueda.',
		openSource: 'Open Source',
		closedSource: 'Privado',
		viewRepo: 'Ver repo',
		viewLive: 'Ver demo',
		noLive: 'Sin demo pública',
		category: {
			web: 'Web',
			game: 'Juego',
			backend: 'Backend',
			tools: 'Herramienta',
			other: 'Otro'
		}
	},
	about: {
		title: 'Sobre mí',
		coming: 'Sección en construcción',
		soon: 'Volveré pronto con más detalles.'
	},
	github: {
		title: 'GitHub',
		coming: 'Sección en construcción',
		soon: 'Próximamente verás aquí stats y contribuciones.'
	},
	common: {
		back: 'Volver al menú',
		backShort: '← Volver',
		loading: 'Cargando…'
	},
	a11y: {
		toggleAudio: 'Activar/Desactivar audio',
		muteTooltip: 'M · Silenciar',
		toggleLanguage: 'Cambiar idioma',
		languageTooltip: 'L · Idioma'
	},
	error: {
		title: '404 — Trefu',
		notFound: 'Página no encontrada'
	}
};

export type Translations = typeof es;
