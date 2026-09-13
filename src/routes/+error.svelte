<script lang="ts">
	import { page } from '$app/state';
	import Dices from 'lucide-svelte/icons/dices';
	import RPGFrame from '$lib/components/RPGFrame.svelte';
	import { t } from '$lib/i18n';

	const dict = $derived(t());
</script>

<svelte:head>
	<title>404 — Trefu</title>
</svelte:head>

<main class="error">
	<RPGFrame variant="crimson" title="404 · {dict.common.back}" padded={false}>
		<div class="error__content">
			<span class="error__d20" aria-hidden="true">
				<Dices size={64} strokeWidth={1.5} />
			</span>
			<p class="error__msg">"{page.error?.message ?? 'Page not found'}"</p>
			<a class="error__link" href="/menu">← {dict.common.back}</a>
		</div>
	</RPGFrame>
</main>

<style>
	.error {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1.5rem;
	}

	.error :global(.frame) {
		max-width: 480px;
		width: 100%;
	}

	.error__content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem 1rem;
		text-align: center;
	}

	.error__d20 {
		display: inline-flex;
		color: var(--color-amber);
		opacity: 0.7;
	}

	.error__msg {
		font-family: var(--font-display);
		font-style: italic;
		color: var(--color-text-soft);
		margin: 0;
	}

	.error__link {
		margin-top: 0.5rem;
		font-family: var(--font-rpg);
		font-size: 0.7rem;
		padding: 0.65rem 1.1rem;
		background: rgba(244, 210, 122, 0.08);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-parchment);
		text-decoration: none;
	}

	.error__link:hover {
		background: rgba(244, 210, 122, 0.16);
		color: var(--color-gold-bright);
	}
</style>
