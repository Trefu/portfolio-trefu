<script lang="ts">
	import { goto } from '$app/navigation';
	import Construction from 'lucide-svelte/icons/construction';
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
	<title>{dict.about.title} — Trefu</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<svelte:window onkeydown={handleKey} />

<main class="todo-view">
	<div class="todo-view__nav">
		<BackToMenu />
	</div>

	<RPGFrame variant="crimson" title={dict.about.title}>
		<div class="todo-view__content">
			<span class="todo-view__icon" aria-hidden="true">
				<Construction size={48} strokeWidth={1.5} />
			</span>
			<h3 class="todo-view__heading">{dict.about.coming}</h3>

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
		opacity: 0.6;
		color: #b54a4a;
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

	.todo-view__cta {
		margin-top: 1rem;
		font-family: var(--font-rpg);
		font-size: 0.7rem;
		padding: 0.65rem 1.1rem;
		background: rgba(244, 210, 122, 0.08);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-parchment);
		text-decoration: none;
		letter-spacing: 0.05em;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			color var(--transition-fast);
	}

	.todo-view__cta:hover {
		background: rgba(244, 210, 122, 0.16);
		border-color: var(--color-gold);
		color: var(--color-gold-bright);
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
