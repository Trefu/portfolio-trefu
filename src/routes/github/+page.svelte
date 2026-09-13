<script lang="ts">
	import { goto } from '$app/navigation';
	import GitBranch from 'lucide-svelte/icons/git-branch';
	import BackToMenu from '$lib/components/BackToMenu.svelte';
	import RPGFrame from '$lib/components/RPGFrame.svelte';
	import { t, language } from '$lib/i18n';

	const dict = $derived(t());

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') goto('/menu');
		else if (e.key.toLowerCase() === 'l') language.toggle();
	}
</script>

<svelte:head>
	<title>{dict.github.title} — Trefu</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<svelte:window onkeydown={handleKey} />

<main class="todo-view">
	<div class="todo-view__nav">
		<BackToMenu />
	</div>

	<RPGFrame variant="parchment" title={dict.github.title}>
		<div class="todo-view__content">
			<span class="todo-view__icon" aria-hidden="true">
				<GitBranch size={48} strokeWidth={1.5} />
			</span>
			<h3 class="todo-view__heading">{dict.github.coming}</h3>
			<p class="todo-view__sub">"{dict.github.soon}"</p>
			<div class="todo-view__links">
				<a class="todo-view__cta" href="https://github.com/Trefu" target="_blank" rel="noopener noreferrer">
					<GitBranch size={16} /> GitHub
				</a>
				<a class="todo-view__cta todo-view__cta--ghost" href="/menu">
					← {dict.common.back}
				</a>
			</div>
		</div>
	</RPGFrame>
</main>

<style>
	.todo-view {
		max-width: 640px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		animation: fade-in 500ms ease both;
	}

	.todo-view__nav {
		margin-bottom: 1.25rem;
	}

	.todo-view__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem 1rem;
		text-align: center;
	}

	.todo-view__icon {
		display: inline-flex;
		opacity: 0.7;
		color: var(--color-parchment-deep);
	}

	.todo-view__heading {
		font-family: var(--font-display);
		font-size: 1.25rem;
		color: var(--color-parchment);
		margin: 0;
	}

	.todo-view__sub {
		font-family: var(--font-display);
		font-style: italic;
		color: var(--color-text-soft);
		margin: 0;
		font-size: 1rem;
	}

	.todo-view__links {
		display: flex;
		gap: 0.6rem;
		margin-top: 0.75rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.todo-view__cta {
		font-family: var(--font-rpg);
		font-size: 0.7rem;
		padding: 0.65rem 1.1rem;
		background: linear-gradient(180deg, var(--color-gold-bright) 0%, var(--color-gold-deep) 100%);
		border: 1px solid var(--color-gold-deep);
		border-radius: var(--radius-sm);
		color: var(--color-bg-deep);
		text-decoration: none;
		letter-spacing: 0.05em;
		transition: filter var(--transition-fast);
	}

	.todo-view__cta:hover {
		filter: brightness(1.12);
	}

	.todo-view__cta--ghost {
		background: rgba(244, 210, 122, 0.08);
		border-color: var(--color-border);
		color: var(--color-parchment);
	}

	.todo-view__cta--ghost:hover {
		background: rgba(244, 210, 122, 0.16);
		color: var(--color-gold-bright);
		filter: none;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
