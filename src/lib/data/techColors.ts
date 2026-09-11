// Color palette per technology — used by TechBadge.svelte
export const techColors: Record<string, { bg: string; fg: string; border: string }> = {
	Vue: { bg: '#35495e', fg: '#42b883', border: '#42b883' },
	React: { bg: '#1a2333', fg: '#61dafb', border: '#61dafb' },
	Svelte: { bg: '#2b1d3a', fg: '#ff3e00', border: '#ff3e00' },
	SvelteKit: { bg: '#2b1d3a', fg: '#ff3e00', border: '#ff3e00' },
	TypeScript: { bg: '#1a2e44', fg: '#3178c6', border: '#3178c6' },
	JavaScript: { bg: '#3b2f10', fg: '#f7df1e', border: '#f7df1e' },
	PHP: { bg: '#1a1a2e', fg: '#777bb4', border: '#777bb4' },
	Yii: { bg: '#1a1a2e', fg: '#80b2ff', border: '#80b2ff' },
	'Node.js': { bg: '#1d2a1d', fg: '#83cd29', border: '#83cd29' },
	Express: { bg: '#2a2a2a', fg: '#cccccc', border: '#888888' },
	MongoDB: { bg: '#1d3320', fg: '#4caf50', border: '#4caf50' },
	Mongoose: { bg: '#1d3320', fg: '#880000', border: '#880000' },
	Laravel: { bg: '#2a1010', fg: '#ff2d20', border: '#ff2d20' },
	Inertia: { bg: '#1a1a1a', fg: '#9561e2', border: '#9561e2' },
	PostgreSQL: { bg: '#0f1f2e', fg: '#336791', border: '#336791' },
	Docker: { bg: '#0c2236', fg: '#2496ed', border: '#2496ed' },
	Tailwind: { bg: '#0f1f2e', fg: '#38bdf8', border: '#38bdf8' },
	HTML5: { bg: '#3a2010', fg: '#e34c26', border: '#e34c26' },
	HTML: { bg: '#3a2010', fg: '#e34c26', border: '#e34c26' },
	CSS: { bg: '#1d2a3a', fg: '#2965f1', border: '#2965f1' },
	Pinia: { bg: '#1a1a1a', fg: '#ffd859', border: '#ffd859' },
	Vite: { bg: '#1a1a1a', fg: '#646cff', border: '#646cff' },
	Vitest: { bg: '#1d2a1d', fg: '#6da33f', border: '#6da33f' },
	Godot: { bg: '#1a2333', fg: '#478cbf', border: '#478cbf' },
	GDScript: { bg: '#1a2333', fg: '#6cb3ff', border: '#6cb3ff' },
	Blender: { bg: '#2a1f0e', fg: '#f5792a', border: '#f5792a' },
	Obsidian: { bg: '#1a1a2e', fg: '#7c3aed', border: '#7c3aed' }
};

export function techStyle(tech: string) {
	return (
		techColors[tech] ?? {
			bg: 'rgba(244, 210, 122, 0.08)',
			fg: '#f4d27a',
			border: 'rgba(244, 210, 122, 0.35)'
		}
	);
}
