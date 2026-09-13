import type { IconName } from './icons';
import type { MockupTheme } from '$lib/components/PreviewMockup.svelte';

export type ProjectCategory = 'web' | 'game' | 'backend' | 'tools' | 'other';
export type Visibility = 'open' | 'closed';

export interface MockupSpec {
	theme: MockupTheme;
	icon?: IconName;
	subtitle?: { es: string; en: string };
}

export interface Project {
	id: string;
	name: string;
	description: { es: string; en: string };
	techs: string[];
	category: ProjectCategory;
	githubUrl?: string;
	liveUrl?: string;
	previewImage?: string;
	mockup?: MockupSpec;
	visibility: Visibility;
	featured?: boolean;
	year?: number;
	hidden?: boolean;
}

export const projects: Project[] = [
	// === Top: live demo projects interleaved with private company work (Paradox-Lab) ===
	{
		id: '-rpg-js',
		name: 'RPG JS',
		description: {
			es: 'RPG de combate con sistema de QTE para bloqueos, animaciones improvisadas en PNG para efectos y lógica simplificada para un RPG dinámico.',
			en: 'Combat RPG with a QTE system for blocks, improvised PNG animations for effects and simplified logic for a dynamic RPG.'
		},
		techs: ['Vue', 'Vite', 'JavaScript'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/-rpg-js',
		liveUrl: 'https://criticalfu.trefu.ar',
		previewImage: '/previews/rpg-js.png',
		mockup: { theme: 'fantasy', icon: 'sword3', subtitle: { es: 'QTE, animaciones y combate', en: 'QTE, animations and combat' } },
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'bioleft',
		name: 'Bioleft',
		description: {
			es: 'Lo hice end-to-end con comunicación directa con el cliente: plataforma agrícola con API Laravel 10 y frontend Nuxt 3, mapas interactivos (Leaflet), generación de PDFs, gráficos y catálogo geo-referenciado de cultivares.',
			en: 'I built it end-to-end with direct client communication: an agriculture platform with a Laravel 10 API and a Nuxt 3 frontend, interactive maps (Leaflet), PDF generation, charts and a geo-referenced cultivar catalog.'
		},
		techs: ['PHP', 'Laravel', 'Nuxt 3', 'Vue 3', 'Vuetify', 'Leaflet', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/bioleft.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},
	{
		id: 'landingpage',
		name: 'Acoustic Guitars · Landing',
		description: {
			es: 'Landing page de guitarras acústicas refactorizada en Vue 3 + Tailwind. Proyecto del certificado de freeCodeCamp.',
			en: 'Acoustic guitars landing page refactored in Vue 3 + Tailwind. freeCodeCamp certification project.'
		},
		techs: ['Vue', 'Tailwind', 'Vite'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/LandingPage',
		liveUrl: 'https://trebleandwood.trefu.ar',
		previewImage: '/previews/landingpage.png',
		mockup: { theme: 'warm', icon: 'hand', subtitle: { es: 'Guitarras acústicas, maderas y tonos', en: 'Acoustic guitars, woods and tones' } },
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'dbpm',
		name: 'DBPM',
		description: {
			es: 'Plataforma de evaluación de competencias con API Laravel y frontend Nuxt 3: tests cronometrados, dashboards con ApexCharts y módulo de reportes.',
			en: 'Competency-assessment platform with a Laravel API and Nuxt 3 frontend: timed tests, ApexCharts dashboards and a reporting module.'
		},
		techs: ['PHP', 'Laravel', 'Nuxt 3', 'Vue 3', 'Vuetify', 'ApexCharts', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/dbpm.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},
	{
		id: 'random-quotes-generator',
		name: 'Random Quotes Generator',
		description: {
			es: 'Generador de frases aleatorias hecho con React 17. Proyecto del certificado de freeCodeCamp.',
			en: 'Random quotes generator built with React 17. freeCodeCamp certification project.'
		},
		techs: ['React', 'JavaScript', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/random-quotes-generator',
		liveUrl: 'https://quotient.trefu.ar',
		previewImage: '/previews/random-quotes-generator.png',
		mockup: { theme: 'light', icon: 'scroll', subtitle: { es: 'Citas aleatorias para inspirarte', en: 'Random quotes to spark you' } },
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'edison',
		name: 'Edison',
		description: {
			es: 'Plataforma Yii2 + Nuxt 3 para retail/distribución con checkout MercadoPago, módulo de pedidos en Vue 3, panel admin y exportes a Excel.',
			en: 'Yii2 + Nuxt 3 retail/distribution platform with MercadoPago checkout, a Vue 3 orders module, admin panel and Excel exports.'
		},
		techs: ['PHP', 'Yii2', 'Nuxt 3', 'Vue 3', 'Vuetify', 'MercadoPago', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/edison.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},
	{
		id: 'drum-machine',
		name: 'Drum Machine',
		description: {
			es: 'Drum machine con samples y pads en Svelte. Proyecto del certificado de freeCodeCamp.',
			en: 'Drum machine with samples and pads in Svelte. freeCodeCamp certification project.'
		},
		techs: ['Svelte', 'JavaScript', 'HTML5'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/drum-machine',
		liveUrl: 'https://trefudrum.trefu.ar',
		previewImage: '/previews/drum-machine.png',
		mockup: { theme: 'dark', icon: 'hand', subtitle: { es: 'Pads, samples y ritmos', en: 'Pads, samples and beats' } },
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'pomodoro-timer',
		name: 'Pomodoro Timer',
		description: {
			es: 'Temporizador Pomodoro configurable. Proyecto del certificado de freeCodeCamp.',
			en: 'Configurable Pomodoro timer. freeCodeCamp certification project.'
		},
		techs: ['JavaScript', 'HTML5', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/pomodoro-timer',
		liveUrl: 'https://pomodoro.trefu.ar',
		previewImage: '/previews/pomodoro-timer.png',
		mockup: { theme: 'red', icon: 'fire2', subtitle: { es: 'Foco y descansos en ciclos', en: 'Focus and breaks on cycles' } },
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'feli',
		name: 'Feli · Multi-Module',
		description: {
			es: 'Ecosistema monolítico multi-módulo para un distribuidor industrial: sitio público con MercadoPago, dashboard de distribuidores (cobranzas, garantías, pedidos) y ~11 módulos Vue 3 independientes.',
			en: 'Multi-module monolith for an industrial distributor: public site with MercadoPago, dealer dashboard (collections, warranties, orders) and ~11 standalone Vue 3 modules.'
		},
		techs: ['PHP', 'Yii2', 'Vue 3', 'Vite', 'Tailwind', 'MercadoPago', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/feli.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},
	{
		id: 'calculator',
		name: 'Calculator',
		description: {
			es: 'Calculadora clásica con operaciones básicas. Proyecto del certificado de freeCodeCamp.',
			en: 'Classic calculator with basic operations. freeCodeCamp certification project.'
		},
		techs: ['JavaScript', 'HTML5', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/calculator',
		liveUrl: 'https://calculator.trefu.ar',
		previewImage: '/previews/calculator.png',
		mockup: { theme: 'light', icon: 'compass', subtitle: { es: 'Calculadora clásica', en: 'Classic calculator' } },
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'ohwear',
		name: 'OhWear',
		description: {
			es: 'App móvil/web para marca de óptica con API Laravel + Nuxt 3 SSR: autenticación Sanctum, catálogo de gafas y reportes en Excel.',
			en: 'Mobile/web app for an eyewear brand with a Laravel API + Nuxt 3 SSR: Sanctum auth, eyewear catalog and Excel reports.'
		},
		techs: ['PHP', 'Laravel', 'Nuxt 3', 'Vue 3', 'Vuetify', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/ohwear.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},
	{
		id: 'markdown-previewer',
		name: 'Markdown Previewer',
		description: {
			es: 'Editor de Markdown con preview en vivo. Proyecto del certificado de freeCodeCamp.',
			en: 'Markdown editor with live preview. freeCodeCamp certification project.'
		},
		techs: ['JavaScript', 'HTML5', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/markdown-previewer',
		liveUrl: 'https://markdown.trefu.ar',
		previewImage: '/previews/markdown-previewer.png',
		mockup: { theme: 'light', icon: 'scroll', subtitle: { es: 'Editor de Markdown con preview', en: 'Markdown editor with preview' } },
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'rumbo',
		name: 'Rumbo · Distributor Ecosystem',
		description: {
			es: 'Ecosistema Yii2 + Vue 3 de gran escala para mayorista: portal B2B/B2C/B2G con MercadoPago, integración con ERP Bejerman, panel de vendedores, WebSockets y 8+ módulos Vue 3.',
			en: 'Large-scale Yii2 + Vue 3 ecosystem for a wholesaler: B2B/B2C/B2G portal with MercadoPago, Bejerman ERP integration, vendor panel, WebSockets and 8+ Vue 3 modules.'
		},
		techs: ['PHP', 'Yii2', 'Vue 3', 'Vite', 'Tailwind', 'MercadoPago', 'WebSockets', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/rumbo.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},
	{
		id: 'varteco',
		name: 'Varteco & Reagens',
		description: {
			es: 'Plataforma multi-producto Laravel + Nuxt 3 para dos empresas hermanas: admin unificado deployable a dos targets, módulo de exports con video player (Bitmovin) y Google Maps, más tests E2E en Cypress.',
			en: 'Laravel + Nuxt 3 multi-product platform for two sister companies: unified admin deployable to two targets, exports module with Bitmovin video player and Google Maps, plus Cypress E2E tests.'
		},
		techs: ['PHP', 'Laravel', 'Nuxt 3', 'Vue 3', 'Vuetify', 'Cypress', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/varteco.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},
	{
		id: 'wegolf',
		name: 'WeGolf · Golf Travel',
		description: {
			es: 'Plataforma Yii2 + Nuxt 3 + Vue 3 para operador de viajes de golf: sitio público con paquetes a resorts y clubes, panel de socios, encuestas, reportes y facturación electrónica AFIP.',
			en: 'Yii2 + Nuxt 3 + Vue 3 platform for a golf-travel operator: public site with resort and club packages, members panel, surveys, reports and AFIP electronic invoicing.'
		},
		techs: ['PHP', 'Yii2', 'Nuxt 3', 'Vue 3', 'Tailwind', 'AFIP', 'MariaDB'],
		category: 'web',
		previewImage: '/previews/wegolf.png',
		visibility: 'closed',
		featured: true,
		year: 2025
	},

	// === Featured non-Godot without live demo ===
	{
		id: 'e-commerce-react',
		name: 'Let It Rip · Beyblade Store',
		description: {
			es: 'E-commerce completo de Beyblades con Vue 3, Pinia y animaciones 3D. Catálogo, wishlist, checkout en 3 pasos y orden animada.',
			en: 'Full Beyblade e-commerce with Vue 3, Pinia and 3D animations. Catalog, wishlist, 3-step checkout and animated order timeline.'
		},
		techs: ['Vue', 'Pinia', 'Tailwind', 'Vite', 'HTML5', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/e-commerce-react',
		visibility: 'open',
		featured: true,
		year: 2026
	},
	{
		id: 'saas-gastro',
		name: 'SaaS Gastronómico',
		description: {
			es: 'Plataforma multi-tenant para restaurantes con carta QR, pedidos online y notificaciones. Laravel 11 + Inertia + Vue 3 + PostgreSQL, dockerizado.',
			en: 'Multi-tenant platform for restaurants: QR menu, online orders and notifications. Laravel 11 + Inertia + Vue 3 + PostgreSQL, fully dockerized.'
		},
		techs: ['Laravel', 'PHP', 'Vue', 'Inertia', 'Tailwind', 'PostgreSQL', 'Docker'],
		category: 'backend',
		visibility: 'closed',
		featured: true,
		year: 2026
	},

	// === Other web / backend / tools (no live demo, no Godot) ===
	{
		id: 'formulario-fcc',
		name: 'StarCraft 2 Tournament Form',
		description: {
			es: 'Formulario de registro para torneos de StarCraft 2 hecho en Vue 3 + TypeScript + Tailwind con tests.',
			en: 'Sign-up form for StarCraft 2 tournaments built in Vue 3 + TypeScript + Tailwind, with tests.'
		},
		techs: ['Vue', 'TypeScript', 'Tailwind', 'Vitest'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/Formulario-Freecodecamp',
		visibility: 'open',
		hidden: true,
		year: 2026
	},
	{
		id: 'tribute-web',
		name: 'Tribute Web',
		description: {
			es: 'Página tributo responsive. Proyecto del certificado de freeCodeCamp.',
			en: 'Responsive tribute page. freeCodeCamp certification project.'
		},
		techs: ['HTML5', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/Tribute-web',
		visibility: 'open',
		hidden: true,
		year: 2021
	},
	{
		id: 'tecnical-doc-page',
		name: 'Technical Documentation Page',
		description: {
			es: 'Página de documentación técnica responsive. Proyecto del certificado de freeCodeCamp.',
			en: 'Responsive technical documentation page. freeCodeCamp certification project.'
		},
		techs: ['HTML5', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/tecnical-doc-page',
		visibility: 'open',
		hidden: true,
		year: 2021
	},
	{
		id: 'react-js_ecommerce',
		name: 'React E-commerce (Coderhouse)',
		description: {
			es: 'E-commerce construido durante el curso de React JS de Coderhouse.',
			en: 'E-commerce built during the React JS course at Coderhouse.'
		},
		techs: ['React', 'JavaScript', 'CSS'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/react-js_ecommerce',
		visibility: 'open',
		year: 2021
	},
	{
		id: 'fcc-requestparser',
		name: 'Request Header Parser',
		description: {
			es: 'Microservicio que parsea headers HTTP y devuelve IP, lenguaje y software. Proyecto FCC.',
			en: 'Microservice that parses HTTP headers and returns IP, language and software. FCC project.'
		},
		techs: ['Node.js', 'Express', 'JavaScript'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/fcc-requestparser',
		visibility: 'open',
		year: 2026
	},
	{
		id: 'fcc-exercise-tracker',
		name: 'Exercise Tracker',
		description: {
			es: 'API REST para registrar ejercicios con usuarios y logs. Express + MongoDB + Mongoose.',
			en: 'REST API to log exercises with users and logs. Express + MongoDB + Mongoose.'
		},
		techs: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/fcc-exercise-tracker',
		visibility: 'open',
		year: 2021
	},
	{
		id: 'fcc-shortener',
		name: 'URL Shortener',
		description: {
			es: 'Acortador de URLs con Express + MongoDB. Proyecto del certificado de freeCodeCamp.',
			en: 'URL shortener with Express + MongoDB. freeCodeCamp certification project.'
		},
		techs: ['Node.js', 'Express', 'MongoDB', 'Mongoose'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/fcc-shortener',
		visibility: 'open',
		year: 2021
	},
	{
		id: 'fcc-timestamp-microservice',
		name: 'Timestamp Microservice',
		description: {
			es: 'Microservicio que convierte fechas a UNIX timestamp y viceversa. Proyecto FCC.',
			en: 'Microservice that converts dates to UNIX timestamps and back. FCC project.'
		},
		techs: ['Node.js', 'Express', 'JavaScript'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/fcc-timestamp-microservice',
		visibility: 'open',
		year: 2021
	},
	{
		id: 'file-metadata',
		name: 'File Metadata',
		description: {
			es: 'Microservicio que recibe archivos vía form-data y devuelve metadatos (tipo, tamaño). Proyecto FCC.',
			en: 'Microservice that receives files via form-data and returns metadata (type, size). FCC project.'
		},
		techs: ['HTML', 'Node.js', 'Express'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/file-metadata',
		visibility: 'open',
		year: 2026
	},
	{
		id: 'node-js-api',
		name: 'Node.js API',
		description: {
			es: 'API REST genérica en Node.js — punto de partida para microservicios.',
			en: 'Generic REST API in Node.js — a starting point for microservices.'
		},
		techs: ['Node.js', 'JavaScript'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/node-js-api',
		visibility: 'open',
		year: 2022
	},
	{
		id: 'wsp-bot',
		name: 'WhatsApp Bot',
		description: {
			es: 'Bot para WhatsApp con respuestas automatizadas y comandos básicos.',
			en: 'WhatsApp bot with automated replies and basic commands.'
		},
		techs: ['Node.js', 'JavaScript'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/wsp-bot',
		visibility: 'open',
		year: 2021
	},
	{
		id: 'todo-yii',
		name: 'Todo (Yii)',
		description: {
			es: 'App de tareas hecha con el framework Yii en PHP.',
			en: 'Todo app built with the Yii framework in PHP.'
		},
		techs: ['PHP', 'Yii'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/todo-yii',
		visibility: 'open',
		year: 2021
	},
	{
		id: 'test-paradox',
		name: 'Paradox Test',
		description: {
			es: 'Proyecto de prueba en PHP — experimento con el stack Paradox.',
			en: 'Test project in PHP — experiment with the Paradox stack.'
		},
		techs: ['PHP'],
		category: 'backend',
		githubUrl: 'https://github.com/Trefu/test-paradox',
		visibility: 'open',
		hidden: true,
		year: 2021
	},
	{
		id: 'fantasy-statblocks',
		name: 'Fantasy Statblocks (Obsidian)',
		description: {
			es: 'Fork del plugin de Obsidian para crear statblocks de D&D. Le agregué tooltips a los hechizos de D&D 5e para usarlos desde el Initiative Tracker.',
			en: 'Fork of the Obsidian plugin to create D&D statblocks. I added tooltips to D&D 5e spells so they can be used from the Initiative Tracker.'
		},
		techs: ['TypeScript', 'Obsidian'],
		category: 'tools',
		githubUrl: 'https://github.com/Trefu/fantasy-statblocks',
		visibility: 'open',
		year: 2026
	},
	{
		id: 'portfolio-trefu',
		name: 'portfolio-trefu',
		description: {
			es: 'Mi portfolio personal — SvelteKit + TypeScript. Estás aquí ahora mismo.',
			en: 'My personal portfolio — SvelteKit + TypeScript. You are here right now.'
		},
		techs: ['SvelteKit', 'TypeScript', 'Vite'],
		category: 'web',
		githubUrl: 'https://github.com/Trefu/portfolio-trefu',
		visibility: 'open',
		year: 2026
	},

	// === Bottom: all Godot projects (deprioritized) ===
	{
		id: 'morrewna',
		name: 'Morrewna',
		description: {
			es: 'Videojuego en desarrollo con Godot 4.7. Tengo varias versiones del proyecto probando distintas mecánicas.',
			en: 'Video game in development with Godot 4.7. I keep several versions of the project exploring different mechanics.'
		},
		techs: ['Godot', 'GDScript'],
		category: 'game',
		visibility: 'closed',
		year: 2026
	},
	{
		id: 'efepemanso',
		name: 'EfePeManso',
		description: {
			es: 'FPS en Godot 4 que hicimos con un amigo para un proyecto de la facultad. Mecánicas de disparo, enemigos y niveles básicos.',
			en: 'FPS in Godot 4 I built with a friend for a university project. Shooting mechanics, enemies and basic levels.'
		},
		techs: ['Godot', 'GDScript'],
		category: 'game',
		githubUrl: 'https://github.com/Trefu/EfePeManso',
		visibility: 'open',
		year: 2026
	},
	{
		id: 'doomlike',
		name: 'Doomlike',
		description: {
			es: 'FPS retro inspirado en Doom. Enemigos con vida, mapeado propio y un menú básico.',
			en: 'Retro FPS inspired by Doom. Enemies with health, custom maps and a basic menu.'
		},
		techs: ['Godot', 'GDScript'],
		category: 'game',
		visibility: 'closed',
		year: 2026
	},
	{
		id: 'godot-third-person-combat',
		name: 'Third-Person Combat Prototype',
		description: {
			es: 'Base para combate en tercera persona con IA (behavior trees), navmesh, FSM jerárquica y blend trees.',
			en: 'Third-person combat base with AI (behavior trees), navmesh, hierarchical FSM and blend trees.'
		},
		techs: ['Godot', 'GDScript', 'Blender'],
		category: 'game',
		visibility: 'closed',
		year: 2026
	},
	{
		id: 'legion-games-fps',
		name: 'Legion Games · FPS',
		description: {
			es: 'Shooter en primera persona ambientado en un universo de legiones. Proyecto privado en desarrollo.',
			en: 'First-person shooter set in a legion-themed universe. Private project in development.'
		},
		techs: ['Godot', 'GDScript'],
		category: 'game',
		visibility: 'closed',
		hidden: true,
		year: 2026
	}
];

export const categories: { id: ProjectCategory | 'all'; key: 'all' | 'web' | 'game' | 'backend' | 'tools' }[] = [
	{ id: 'all', key: 'all' },
	{ id: 'web', key: 'web' },
	{ id: 'game', key: 'game' },
	{ id: 'backend', key: 'backend' },
	{ id: 'tools', key: 'tools' }
];
