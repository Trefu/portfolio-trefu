<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		variant?: 'gold' | 'parchment' | 'crimson';
		padded?: boolean;
		children: Snippet;
		actions?: Snippet;
	}

	let { title, subtitle, variant = 'gold', padded = true, children, actions }: Props = $props();
</script>

<section class="frame frame--{variant}" class:frame--padded={padded}>
	{#if title || actions}
		<header class="frame__header">
			<div class="frame__titles">
				{#if title}<h2 class="frame__title">{title}</h2>{/if}
				{#if subtitle}<p class="frame__subtitle">{subtitle}</p>{/if}
			</div>
			{#if actions}
				<div class="frame__actions">{@render actions()}</div>
			{/if}
		</header>
	{/if}
	<div class="frame__body">
		{@render children()}
	</div>
</section>

<style>
	.frame {
		--c-border: var(--color-gold);
		--c-glow: rgba(244, 210, 122, 0.4);
		position: relative;
		background: linear-gradient(180deg, var(--color-panel) 0%, var(--color-panel-2) 100%);
		border: 2px solid var(--c-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-panel), 0 0 0 1px rgba(244, 210, 122, 0.08);
		overflow: hidden;
	}

	.frame::before,
	.frame::after {
		content: '';
		position: absolute;
		width: 14px;
		height: 14px;
		border: 2px solid var(--c-border);
		pointer-events: none;
	}

	.frame::before {
		top: -2px;
		left: -2px;
		border-right: none;
		border-bottom: none;
		border-top-left-radius: var(--radius-md);
	}

	.frame::after {
		bottom: -2px;
		right: -2px;
		border-left: none;
		border-top: none;
		border-bottom-right-radius: var(--radius-md);
	}

	.frame--gold {
		--c-border: var(--color-gold);
	}

	.frame--parchment {
		--c-border: var(--color-parchment-deep);
	}

	.frame--crimson {
		--c-border: #b54a4a;
	}

	.frame--padded {
		padding: 1.5rem;
	}

	.frame__header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 1rem;
		margin-bottom: 1.25rem;
		border-bottom: 1px dashed rgba(244, 210, 122, 0.25);
	}

	.frame__title {
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 2vw + 0.5rem, 1.85rem);
		color: var(--color-parchment);
		margin: 0;
		letter-spacing: 0.04em;
	}

	.frame__subtitle {
		margin: 0.35rem 0 0;
		font-size: 0.9rem;
		color: var(--color-text-soft);
		font-style: italic;
	}

	.frame__actions {
		display: flex;
		gap: 0.5rem;
	}

	.frame__body {
		position: relative;
	}
</style>
