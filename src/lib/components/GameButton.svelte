<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { IconName } from '$lib/data/icons';
	import IconSprite from './IconSprite.svelte';

	interface Props {
		selected?: boolean;
		icon?: IconName;
		iconSize?: number;
		hotkey?: string;
		onSelect?: () => void;
		onHover?: () => void;
		fullWidth?: boolean;
		size?: 'md' | 'lg';
		variant?: 'carved' | 'gold' | 'stone';
		children: Snippet;
	}

	let {
		selected = false,
		icon,
		iconSize = 28,
		hotkey,
		onSelect,
		onHover,
		fullWidth = false,
		size = 'lg',
		variant = 'carved',
		children
	}: Props = $props();

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSelect?.();
		}
	}
</script>

<button
	class="game-btn game-btn--{variant} game-btn--{size}"
	class:selected
	class:full-width={fullWidth}
	type="button"
	onclick={() => onSelect?.()}
	onmouseenter={onHover}
	onkeydown={handleKey}
>
	<span class="game-btn__inner">
		{#if icon}
			<span class="game-btn__icon">
				<IconSprite name={icon} size={iconSize} />
			</span>
		{/if}
		<span class="game-btn__label">{@render children()}</span>
		{#if hotkey}
			<span class="game-btn__hotkey">{hotkey}</span>
		{/if}
	</span>
</button>

<style>
	.game-btn {
		--c-light: #ffb863;
		--c-mid: #ff8a3c;
		--c-dark: #c2541a;
		--c-deep: #6e2e0d;
		--c-glow: rgba(255, 200, 100, 0.5);

		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 14rem;
		padding: 0;
		background: transparent;
		border: none;
		cursor: pointer;
		font-family: var(--font-display);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--c-deep);
		-webkit-tap-highlight-color: transparent;
		transition: transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1);
		filter: drop-shadow(0 6px 0 rgba(0, 0, 0, 0.4));
	}

	.game-btn:hover {
		transform: translateY(-3px) scale(1.02);
	}

	.game-btn:active {
		transform: translateY(2px) scale(0.98);
		transition-duration: 80ms;
	}

	.game-btn__inner {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.7rem;
		min-width: 14rem;
		padding: 1rem 1.6rem;
		border-radius: 10px;
		background: linear-gradient(
			180deg,
			var(--c-light) 0%,
			var(--c-mid) 45%,
			var(--c-dark) 75%,
			#8a3a14 100%
		);
		border: 3px solid var(--c-deep);
		box-shadow:
			inset 0 2px 0 rgba(255, 255, 255, 0.45),
			inset 0 -3px 0 rgba(0, 0, 0, 0.25),
			0 0 0 1px rgba(255, 220, 160, 0.4);
		transition: box-shadow 220ms ease;
	}

	.game-btn--gold {
		--c-light: #ffe18a;
		--c-mid: #f4d27a;
		--c-dark: #b8862b;
		--c-deep: #5a3f10;
	}

	.game-btn--stone {
		--c-light: #6a7898;
		--c-mid: #4a5878;
		--c-dark: #2e3a58;
		--c-deep: #13192b;
	}

	.game-btn.full-width {
		display: flex;
		width: 100%;
	}

	.game-btn__inner::before {
		content: '';
		position: absolute;
		inset: 4px;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.18);
		pointer-events: none;
	}

	.game-btn__label {
		position: relative;
		font-size: 1.05rem;
		font-weight: 700;
		color: #fff8e8;
		text-shadow:
			0 1px 0 rgba(110, 46, 13, 0.85),
			0 2px 4px rgba(0, 0, 0, 0.4);
	}

	.game-btn__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.7rem;
		height: 1.7rem;
		filter:
			brightness(0) invert(1)
			drop-shadow(0 1px 0 rgba(0, 0, 0, 0.4))
			drop-shadow(0 0 6px rgba(255, 240, 200, 0.6));
		opacity: 0.95;
	}

	.game-btn__hotkey {
		position: absolute;
		top: -10px;
		right: -10px;
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		padding: 0.3rem 0.5rem;
		background: linear-gradient(180deg, #2a1a0a 0%, #1a0f06 100%);
		color: var(--color-gold-bright);
		border: 2px solid var(--color-gold);
		border-radius: 6px;
		box-shadow: 0 2px 0 rgba(0, 0, 0, 0.6);
		text-shadow: 0 0 6px var(--color-gold);
		pointer-events: none;
		transform: rotate(8deg);
		opacity: 0;
		transform: rotate(8deg) scale(0.5);
		transition:
			opacity 200ms ease,
			transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.game-btn.selected .game-btn__hotkey {
		opacity: 1;
		transform: rotate(8deg) scale(1);
	}

	/* Selected state: pulsing glow + slight scale */
	.game-btn.selected .game-btn__inner {
		box-shadow:
			inset 0 2px 0 rgba(255, 255, 255, 0.55),
			inset 0 -3px 0 rgba(0, 0, 0, 0.25),
			0 0 0 2px var(--c-glow),
			0 0 32px var(--c-glow),
			0 0 60px rgba(255, 180, 80, 0.4);
		animation: selected-pulse 1.4s ease-in-out infinite;
	}

	.game-btn--md .game-btn__inner {
		padding: 0.7rem 1.2rem;
		min-width: 10rem;
	}
	.game-btn--md .game-btn__label {
		font-size: 0.9rem;
	}

	@keyframes selected-pulse {
		0%,
		100% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(1.12);
		}
	}

	.game-btn:focus-visible {
		outline: none;
	}
	.game-btn:focus-visible .game-btn__inner {
		box-shadow:
			inset 0 2px 0 rgba(255, 255, 255, 0.55),
			inset 0 -3px 0 rgba(0, 0, 0, 0.25),
			0 0 0 3px var(--color-accent),
			0 0 24px rgba(109, 180, 255, 0.5);
	}
</style>
