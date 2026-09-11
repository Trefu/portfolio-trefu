<script lang="ts">
	import type { Snippet } from 'svelte';
	import MenuCursor from './MenuCursor.svelte';

	interface Props {
		selected?: boolean;
		onSelect?: () => void;
		onmouseenter?: () => void;
		hotkey?: string;
		children: Snippet;
	}

	let { selected = false, onSelect, onmouseenter, hotkey, children }: Props = $props();

	function handleClick() {
		onSelect?.();
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSelect?.();
		}
	}
</script>

<div
	class="menu-item"
	class:selected
	role="menuitem"
	tabindex="0"
	onclick={handleClick}
	onkeydown={handleKey}
	onmouseenter={onmouseenter}
>
	<MenuCursor active={selected} />
	<span class="menu-item__label">{@render children()}</span>
	{#if hotkey}
		<span class="menu-item__hotkey">{hotkey}</span>
	{/if}
</div>

<style>
	.menu-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 1.25rem;
		font-family: var(--font-rpg);
		font-size: 0.95rem;
		color: var(--color-parchment);
		background: rgba(244, 210, 122, 0.04);
		border: 1px solid transparent;
		border-radius: var(--radius-sm);
		cursor: pointer;
		user-select: none;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			transform var(--transition-fast),
			color var(--transition-fast);
		min-width: 16rem;
	}

	.menu-item:hover,
	.menu-item.selected {
		background: rgba(244, 210, 122, 0.12);
		border-color: rgba(244, 210, 122, 0.45);
		color: var(--color-gold-bright);
		transform: translateX(4px);
	}

	.menu-item.selected {
		box-shadow: var(--shadow-glow-gold);
	}

	.menu-item__label {
		flex: 1;
		letter-spacing: 0.05em;
	}

	.menu-item__hotkey {
		font-size: 0.7rem;
		color: var(--color-text-mute);
		border: 1px solid var(--color-border);
		padding: 2px 6px;
		border-radius: 4px;
	}

	.menu-item:focus-visible {
		outline: 2px solid var(--color-gold);
		outline-offset: 2px;
	}
</style>
