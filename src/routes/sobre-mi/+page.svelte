<script lang="ts">
	import { goto } from '$app/navigation';
	import Construction from 'lucide-svelte/icons/construction';
	import BackToMenu from '$lib/components/BackToMenu.svelte';
	import GamePanel from '$lib/components/GamePanel.svelte';
	import { t, language } from '$lib/i18n';

	const dict = $derived(t());

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Escape') goto('/menu');
		else if (e.key.toLowerCase() === 'l') language.toggle();
	}
</script>

<svelte:head>
	<title>{dict.about.title} — Trefu</title>
	<meta name="description" content={dict.about.tagline} />
</svelte:head>

<svelte:window onkeydown={handleKey} />

<main class="about">
	<div class="about__nav">
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
	.about {
		max-width: 760px;
		margin: 0 auto;
		padding: 1.5rem;
		position: relative;
		z-index: 2;
	}

	.about__nav {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}

	.about__article {
		font-family: var(--font-display);
		font-size: 1.05rem;
		line-height: 1.7;
		color: rgba(255, 248, 232, 0.9);
		text-align: left;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		max-width: 60ch;
		margin: 0 auto;
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

	.about__lead {
		font-style: italic;
		color: rgba(255, 248, 232, 0.78);
	}

	.about__closing {
		font-style: italic;
		color: var(--color-parchment);
		text-align: center;
		padding-top: 0.5rem;
		border-top: 1px dashed rgba(244, 210, 122, 0.25);
		margin-top: 0.5rem;
	}
</style>