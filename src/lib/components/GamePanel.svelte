<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		variant?: 'wood' | 'parchment' | 'crimson';
		padded?: boolean;
		decorated?: boolean;
		children: Snippet;
		actions?: Snippet;
	}

	let {
		title,
		subtitle,
		variant = 'wood',
		padded = true,
		decorated = true,
		children,
		actions
	}: Props = $props();
</script>

<section class="game-panel game-panel--{variant}" class:decorated>
	{#if title}
		<header class="game-panel__header">
			<div class="game-panel__tab">
				<div class="game-panel__tab-inner">
					<h2 class="game-panel__title">{title}</h2>
				</div>
			</div>
			{#if subtitle}
				<p class="game-panel__subtitle">{subtitle}</p>
			{/if}
			{#if actions}
				<div class="game-panel__actions">{@render actions()}</div>
			{/if}
		</header>
	{/if}
	<div class="game-panel__body" class:padded>
		{@render children()}
	</div>
	{#if decorated}
		<span class="corner corner--tl" aria-hidden="true"></span>
		<span class="corner corner--tr" aria-hidden="true"></span>
		<span class="corner corner--bl" aria-hidden="true"></span>
		<span class="corner corner--br" aria-hidden="true"></span>
	{/if}
</section>

<style>
	.game-panel {
		--wood-1: #6b3e1d;
		--wood-2: #4a2811;
		--wood-3: #2d1808;
		--gold-1: #ffd97a;
		--gold-2: #c79a3a;
		--gold-3: #7a5510;

		position: relative;
		background:
			linear-gradient(180deg, var(--wood-1) 0%, var(--wood-2) 60%, var(--wood-3) 100%),
			repeating-linear-gradient(
				90deg,
				rgba(0, 0, 0, 0.12) 0,
				rgba(0, 0, 0, 0.12) 2px,
				transparent 2px,
				transparent 8px
			);
		background-blend-mode: overlay, normal;
		border: 4px solid var(--gold-2);
		border-radius: 6px;
		box-shadow:
			0 0 0 2px var(--gold-3),
			0 0 0 4px var(--gold-2),
			0 12px 30px rgba(0, 0, 0, 0.55),
			inset 0 0 80px rgba(0, 0, 0, 0.35);
		padding: 0;
		color: var(--color-parchment);
		animation: panel-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	.game-panel--parchment {
		--wood-1: #efe2c0;
		--wood-2: #d8c8a0;
		--wood-3: #b8a880;
		--gold-2: #b8862b;
		--gold-3: #6e4a10;
		color: #3a2810;
	}

	.game-panel--crimson {
		--wood-1: #6e1a1a;
		--wood-2: #4a1010;
		--wood-3: #2a0606;
		--gold-2: #c0a060;
		--gold-3: #604510;
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: scale(0.94) translateY(10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.game-panel__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.9rem;
		padding: 1.75rem 1rem 0.5rem;
		position: relative;
	}

	.game-panel__tab {
		position: relative;
		padding: 0;
		background: linear-gradient(180deg, var(--gold-1) 0%, var(--gold-2) 100%);
		border-radius: 8px;
		border: 2px solid var(--gold-3);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.6),
			inset 0 -2px 0 rgba(0, 0, 0, 0.2),
			0 4px 0 rgba(0, 0, 0, 0.4);
		max-width: 90%;
	}

	.game-panel__tab-inner {
		padding: 0.6rem 1.6rem;
		border: 1px dashed rgba(255, 255, 255, 0.35);
		border-radius: 4px;
	}

	.game-panel__title {
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 2vw + 0.5rem, 1.7rem);
		font-weight: 700;
		color: #fff8e8;
		text-shadow:
			0 2px 0 var(--gold-3),
			0 3px 0 #3a2410,
			0 4px 8px rgba(0, 0, 0, 0.6);
		letter-spacing: 0.1em;
		text-align: center;
		text-transform: none;
		margin: 0;
		line-height: 1;
	}

	.game-panel--parchment .game-panel__title {
		color: #fff;
	}

	.game-panel__subtitle {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 0.95rem;
		color: rgba(255, 248, 232, 0.75);
		margin: 0;
		text-align: center;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
	}

	.game-panel--parchment .game-panel__subtitle {
		color: #5a3810;
	}

	.game-panel__actions {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		display: flex;
		gap: 0.4rem;
	}

	.game-panel__body {
		padding: 0;
	}
	.game-panel__body.padded {
		padding: 1.5rem 1.5rem 1.75rem;
	}

	/* Decorative corner rivets */
	.corner {
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, var(--gold-1), var(--gold-3));
		box-shadow:
			inset 0 -1px 2px rgba(0, 0, 0, 0.6),
			0 1px 2px rgba(0, 0, 0, 0.5);
		pointer-events: none;
	}
	.corner--tl {
		top: 8px;
		left: 8px;
	}
	.corner--tr {
		top: 8px;
		right: 8px;
	}
	.corner--bl {
		bottom: 8px;
		left: 8px;
	}
	.corner--br {
		bottom: 8px;
		right: 8px;
	}
</style>
