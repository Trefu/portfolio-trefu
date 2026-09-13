<script lang="ts">
	import { goto } from '$app/navigation';
	import BackToMenu from '$lib/components/BackToMenu.svelte';
	import GameButton from '$lib/components/GameButton.svelte';
	import GamePanel from '$lib/components/GamePanel.svelte';
	import IconSprite from '$lib/components/IconSprite.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import TechBadge from '$lib/components/TechBadge.svelte';
	import { projects, type ProjectCategory } from '$lib/data/projects';
	import { techColors } from '$lib/data/techColors';
	import { t, language } from '$lib/i18n';
	import { playHover, playSelect, isAudioEnabled, toggleAudio } from '$lib/utils/sfx.svelte';

	const visibleProjects = projects.filter((p) => !p.hidden);

	const dict = $derived(t());

	type FilterCat = ProjectCategory | 'all';

	let activeCategory = $state<FilterCat>('all');
	let activeTechs = $state<string[]>([]);

	const categories = $derived<{ id: FilterCat; label: string }[]>([
		{ id: 'all', label: dict.experience.filterAll },
		{ id: 'web', label: dict.experience.filterWeb },
		{ id: 'game', label: dict.experience.filterGame },
		{ id: 'backend', label: dict.experience.filterBackend },
		{ id: 'tools', label: dict.experience.filterTools }
	]);

	const allTechs = $derived.by(() => {
		const set = new Set<string>();
		for (const p of visibleProjects) for (const tech of p.techs) set.add(tech);
		return Array.from(set).sort((a, b) => a.localeCompare(b));
	});

	const filtered = $derived(
		visibleProjects.filter((p) => {
			if (activeCategory !== 'all' && p.category !== activeCategory) return false;
			if (activeTechs.length > 0) {
				const hasAll = activeTechs.every((t) => p.techs.includes(t));
				if (!hasAll) return false;
			}
			return true;
		})
	);

	const featured = $derived(filtered.filter((p) => p.featured));
	const rest = $derived(filtered.filter((p) => !p.featured));

	function toggleCategory(cat: FilterCat) {
		activeCategory = cat;
		playHover();
	}

	function toggleTech(tech: string) {
		if (activeTechs.includes(tech)) {
			activeTechs = activeTechs.filter((t) => t !== tech);
		} else {
			activeTechs = [...activeTechs, tech];
		}
		playHover();
	}

	function clearFilters() {
		activeCategory = 'all';
		activeTechs = [];
		playSelect();
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			playSelect();
			goto('/menu');
		} else if (e.key.toLowerCase() === 'l') {
			language.toggle();
		} else if (e.key.toLowerCase() === 'm') {
			toggleAudio();
		}
	}
</script>

<svelte:head>
	<title>{dict.experience.title} — Trefu</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<svelte:window onkeydown={handleKey} />

<main class="experience">
	<div class="experience__nav">
		<BackToMenu />
		<button class="hud-btn" onclick={() => toggleAudio()} aria-label={dict.a11y.toggleAudio} title={dict.a11y.muteTooltip}>
			{isAudioEnabled() ? '🔊' : '🔇'}
		</button>
	</div>

	<GamePanel title={dict.experience.title} subtitle={dict.experience.subtitle}>
		<p class="experience__intro">{dict.experience.intro}</p>

		<section class="filters">
			<div class="filters__row">
				{#each categories as cat (cat.id)}
					<button
						class="chip"
						class:active={activeCategory === cat.id}
						onclick={() => toggleCategory(cat.id)}
					>
						{cat.label}
						{#if cat.id !== 'all'}
							<span class="chip__count">
								{visibleProjects.filter((p) => p.category === cat.id).length}
							</span>
						{/if}
					</button>
				{/each}
			</div>

			<details class="filters__tech">
				<summary>
					<span>{dict.experience.filterByTech}</span>
					{#if activeTechs.length > 0}
						<span class="filters__count">{activeTechs.length}</span>
					{/if}
				</summary>
				<div class="filters__tech-grid">
					{#each allTechs as tech (tech)}
						{#if techColors[tech]}
							<button
								class="tech-chip"
								class:active={activeTechs.includes(tech)}
								onclick={() => toggleTech(tech)}
								aria-pressed={activeTechs.includes(tech)}
							>
								<TechBadge {tech} size="sm" />
							</button>
						{/if}
					{/each}
				</div>
				{#if activeTechs.length > 0 || activeCategory !== 'all'}
					<button class="filters__clear" onclick={clearFilters}>
						{dict.experience.clearFilter}
					</button>
				{/if}
			</details>
		</section>

		{#if filtered.length === 0}
			<div class="empty">
				<IconSprite name="compass" size={72} />
				<p>{dict.experience.noResults}</p>
				<GameButton
					selected={true}
					icon="sword"
					variant="gold"
					size="md"
					onSelect={clearFilters}
				>
					{dict.experience.clearFilter}
				</GameButton>
			</div>
		{:else}
			<section class="grid">
				{#each featured as project (project.id)}
					<ProjectCard {project} />
				{/each}
				{#each rest as project (project.id)}
					<ProjectCard {project} />
				{/each}
			</section>
		{/if}
	</GamePanel>
</main>

<style>
	.experience {
		max-width: 1280px;
		margin: 0 auto;
		padding: 1.5rem;
		position: relative;
		z-index: 2;
	}

	.experience__nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.experience :global(.game-panel) {
		max-width: none;
	}

	.experience__intro {
		margin: 0 0 1.5rem;
		color: rgba(255, 248, 232, 0.85);
		font-style: italic;
		line-height: 1.6;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
		text-align: center;
		padding: 0 1rem;
	}

	.filters {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 1.75rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px dashed rgba(244, 210, 122, 0.25);
	}

	.filters__row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.5rem 0.9rem;
		background: linear-gradient(180deg, rgba(40, 28, 16, 0.85) 0%, rgba(28, 18, 8, 0.9) 100%);
		border: 2px solid var(--gold-3, #7a5510);
		border-radius: 6px;
		color: #fff8e8;
		font-family: var(--font-rpg);
		font-size: 0.65rem;
		letter-spacing: 0.04em;
		cursor: pointer;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
		box-shadow:
			inset 0 1px 0 rgba(255, 220, 160, 0.25),
			inset 0 -2px 0 rgba(0, 0, 0, 0.35),
			0 3px 0 rgba(0, 0, 0, 0.4);
		transition:
			transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
			border-color 180ms ease,
			box-shadow 180ms ease;
	}

	.chip:hover {
		transform: translateY(-2px);
		border-color: #ffd97a;
	}

	.chip.active {
		background: linear-gradient(180deg, #5a3810 0%, #3a2010 100%);
		border-color: #ffd97a;
		box-shadow:
			inset 0 1px 0 rgba(255, 220, 160, 0.45),
			inset 0 -2px 0 rgba(0, 0, 0, 0.35),
			0 3px 0 rgba(0, 0, 0, 0.4),
			0 0 16px rgba(244, 210, 122, 0.45);
	}

	.chip__count {
		font-size: 0.55rem;
		opacity: 0.7;
	}

	.filters__tech {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		align-items: center;
	}

	.filters__tech > summary {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		font-family: var(--font-rpg);
		font-size: 0.65rem;
		color: #fff8e8;
		padding: 0.5rem 0.9rem;
		background: linear-gradient(180deg, rgba(40, 28, 16, 0.85) 0%, rgba(28, 18, 8, 0.9) 100%);
		border: 2px solid var(--gold-3, #7a5510);
		border-radius: 6px;
		user-select: none;
		list-style: none;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
	}

	.filters__tech > summary::-webkit-details-marker {
		display: none;
	}

	.filters__tech > summary::before {
		content: '▸';
		display: inline-block;
		transition: transform var(--transition-fast);
		color: #ffd97a;
	}

	.filters__tech[open] > summary::before {
		transform: rotate(90deg);
	}

	.filters__count {
		font-size: 0.55rem;
		background: #ffd97a;
		color: #2a1a0a;
		padding: 1px 6px;
		border-radius: 8px;
	}

	.filters__tech-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		padding: 0.25rem 0;
		justify-content: center;
	}

	.tech-chip {
		padding: 0;
		background: transparent;
		border: 0;
		cursor: pointer;
		border-radius: var(--radius-sm);
		opacity: 0.55;
		transition:
			opacity var(--transition-fast),
			transform var(--transition-fast);
	}

	.tech-chip:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	.tech-chip.active {
		opacity: 1;
		box-shadow: 0 0 16px rgba(244, 210, 122, 0.6);
	}

	.filters__clear {
		align-self: center;
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		padding: 0.45rem 0.85rem;
		background: transparent;
		border: 1px dashed rgba(244, 210, 122, 0.4);
		color: rgba(255, 248, 232, 0.75);
		border-radius: 6px;
		cursor: pointer;
		margin-top: 0.25rem;
		transition:
			border-color var(--transition-fast),
			color var(--transition-fast);
	}

	.filters__clear:hover {
		border-color: #ffd97a;
		color: #ffd97a;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.25rem;
	}

	.empty {
		text-align: center;
		padding: 3rem 1rem;
		color: rgba(255, 248, 232, 0.85);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
	}

	.empty :global(.sprite) {
		filter: brightness(0) invert(1) opacity(0.5);
		opacity: 0.5;
	}

	.hud-btn {
		font-family: var(--font-rpg);
		font-size: 0.65rem;
		padding: 0.4rem 0.65rem;
		background: linear-gradient(180deg, #2a1a0a 0%, #1a0f06 100%);
		border: 1px solid var(--gold-3, #7a5510);
		border-radius: 4px;
		color: #ffd97a;
		cursor: pointer;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 2px 0 rgba(0, 0, 0, 0.5);
	}
</style>
