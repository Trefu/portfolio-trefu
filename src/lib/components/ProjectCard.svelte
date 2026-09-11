<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { pickLocalized, t } from '$lib/i18n';
	import PreviewMockup from './PreviewMockup.svelte';
	import TechBadge from './TechBadge.svelte';
	import VisibilityBadge from './VisibilityBadge.svelte';

	interface Props {
		project: Project;
	}

	let { project }: Props = $props();
	const dict = $derived(t());
	const description = $derived(pickLocalized(project.description));
	const categoryLabel = $derived(dict.experience.category[project.category]);
	const mockupSubtitle = $derived(project.mockup?.subtitle ? pickLocalized(project.mockup.subtitle) : undefined);
</script>

<article class="card" data-featured={project.featured}>
	<div class="card__preview">
		{#if project.liveUrl}
			<a
				class="card__preview-linkwrap"
				href={project.liveUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`Open ${project.name} live`}
			>
				{#if project.previewImage}
					<img
						class="card__preview-img"
						src={project.previewImage}
						alt={`Screenshot of ${project.name}`}
						loading="lazy"
						decoding="async"
						width="1280"
						height="720"
					/>
				{:else if project.mockup}
					<PreviewMockup
						url={project.liveUrl}
						title={project.name}
						subtitle={mockupSubtitle}
						theme={project.mockup.theme}
						icon={project.mockup.icon}
					/>
				{:else}
					<PreviewMockup
						url={project.liveUrl}
						title={project.name}
						subtitle={dict.experience.noLive}
						theme="dark"
					/>
				{/if}
			</a>
			<div class="card__preview-overlay">
				<span class="card__preview-link">{dict.experience.viewLive} ↗</span>
			</div>
		{:else}
			<div class="card__placeholder">
				<svg
					class="card__placeholder-grid"
					viewBox="0 0 320 180"
					aria-hidden="true"
					preserveAspectRatio="none"
				>
					<defs>
						<pattern id="grid-{project.id}" width="20" height="20" patternUnits="userSpaceOnUse">
							<path
								d="M 20 0 L 0 0 0 20"
								fill="none"
								stroke="rgba(244, 210, 122, 0.18)"
								stroke-width="1"
							/>
						</pattern>
					</defs>
					<rect width="320" height="180" fill="rgba(15, 26, 46, 0.85)" />
					<rect width="320" height="180" fill="url(#grid-{project.id})" />
					<path
						d="M40 140 Q80 80 140 120 T260 70"
						fill="none"
						stroke="rgba(244, 210, 122, 0.35)"
						stroke-width="1.5"
						stroke-dasharray="4 4"
					/>
					<circle cx="40" cy="140" r="4" fill="#f4d27a" />
					<circle cx="260" cy="70" r="4" fill="#f4d27a" />
				</svg>
				<div class="card__placeholder-text">
					<span class="card__placeholder-emoji" aria-hidden="true">🗺️</span>
					<span class="card__placeholder-label">{dict.experience.noLive}</span>
				</div>
			</div>
		{/if}
	</div>

	<div class="card__content">
		<div class="card__badges-top">
			<VisibilityBadge visibility={project.visibility} />
			<span class="card__category">{categoryLabel}</span>
		</div>

		<h3 class="card__title">{project.name}</h3>
		<p class="card__description">{description}</p>

		<div class="card__techs">
			{#each project.techs.slice(0, 6) as tech (tech)}
				<TechBadge {tech} size="sm" />
			{/each}
			{#if project.techs.length > 6}
				<span class="card__more">+{project.techs.length - 6}</span>
			{/if}
		</div>

		<div class="card__actions">
			{#if project.githubUrl}
				<a
					class="btn btn--ghost"
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					<span aria-hidden="true">📜</span>
					{dict.experience.viewRepo}
				</a>
			{/if}
			{#if project.liveUrl}
				<a
					class="btn btn--gold"
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
				>
					{dict.experience.viewLive} ↗
				</a>
			{/if}
		</div>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		background: linear-gradient(180deg, var(--color-panel) 0%, var(--color-panel-2) 100%);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		transition:
			transform var(--transition-med),
			border-color var(--transition-med),
			box-shadow var(--transition-med);
	}

	.card:hover {
		transform: translateY(-4px);
		border-color: var(--color-gold-deep);
		box-shadow: 0 16px 36px rgba(0, 0, 0, 0.55), 0 0 24px rgba(244, 210, 122, 0.15);
	}

	.card[data-featured='true'] {
		border-color: rgba(244, 210, 122, 0.5);
	}

	.card__preview {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 9;
		background: var(--color-bg-deep);
		border-bottom: 1px solid var(--color-border);
		overflow: hidden;
	}

	.card__preview-linkwrap {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
	}

	.card__preview-linkwrap :global(svg.mockup),
	.card__preview-img {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
		object-position: top center;
		transition: transform 380ms ease;
	}

	.card:hover .card__preview-linkwrap :global(svg.mockup),
	.card:hover .card__preview-img {
		transform: scale(1.04);
	}

	.card__preview-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		padding: 0.5rem;
		background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.55) 100%);
		opacity: 0;
		transition: opacity var(--transition-fast);
		pointer-events: none;
	}

	.card:hover .card__preview-overlay {
		opacity: 1;
	}

	.card__preview-link {
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		color: var(--color-bg-deep);
		background: var(--color-gold-bright);
		padding: 0.35rem 0.65rem;
		border-radius: var(--radius-sm);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
	}

	.card__placeholder {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card__placeholder-grid {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.card__placeholder-text {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
		color: var(--color-parchment);
		font-family: var(--font-rpg);
		font-size: 0.7rem;
		letter-spacing: 0.05em;
	}

	.card__placeholder-emoji {
		font-size: 1.5rem;
	}

	.card__content {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		padding: 1.1rem 1.2rem 1.3rem;
		flex: 1;
	}

	.card__badges-top {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.card__category {
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		text-transform: uppercase;
		color: var(--color-text-soft);
		letter-spacing: 0.06em;
		padding: 0.35rem 0.55rem;
		border: 1px dashed rgba(244, 210, 122, 0.3);
		border-radius: var(--radius-sm);
	}

	.card__title {
		font-family: var(--font-display);
		font-size: 1.2rem;
		color: var(--color-parchment);
		margin: 0;
		line-height: 1.25;
	}

	.card__description {
		margin: 0;
		font-size: 0.92rem;
		color: var(--color-text-soft);
		line-height: 1.55;
		flex: 1;
	}

	.card__techs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		align-items: center;
	}

	.card__more {
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		color: var(--color-text-mute);
	}

	.card__actions {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-top: auto;
		padding-top: 0.5rem;
		border-top: 1px dashed rgba(244, 210, 122, 0.18);
	}

	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.55rem 0.85rem;
		border-radius: var(--radius-sm);
		font-family: var(--font-rpg);
		font-size: 0.65rem;
		text-decoration: none;
		letter-spacing: 0.05em;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			transform var(--transition-fast),
			color var(--transition-fast);
	}

	.btn--ghost {
		background: transparent;
		border: 1px solid var(--color-border);
		color: var(--color-parchment);
	}

	.btn--ghost:hover {
		background: rgba(244, 210, 122, 0.1);
		border-color: var(--color-gold);
		color: var(--color-gold-bright);
		transform: translateY(-1px);
	}

	.btn--gold {
		background: linear-gradient(180deg, var(--color-gold-bright) 0%, var(--color-gold-deep) 100%);
		border: 1px solid var(--color-gold-deep);
		color: var(--color-bg-deep);
	}

	.btn--gold:hover {
		filter: brightness(1.1);
		transform: translateY(-1px);
	}
</style>
