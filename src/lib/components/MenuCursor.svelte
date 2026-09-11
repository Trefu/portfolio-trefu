<script lang="ts">
	interface Props {
		active?: boolean;
		color?: string;
	}

	let { active = true, color = 'var(--color-gold)' }: Props = $props();
</script>

<span class="cursor" class:active style="--c: {color}">▶</span>

<style>
	.cursor {
		display: inline-block;
		color: var(--c);
		font-family: var(--font-rpg);
		font-size: 0.85em;
		line-height: 1;
		opacity: 0;
		transform: translateX(-4px);
		transition:
			opacity var(--transition-fast),
			transform var(--transition-fast);
	}

	.cursor.active {
		opacity: 1;
		transform: translateX(0);
		animation: blink 900ms steps(2, end) infinite;
	}

	@keyframes blink {
		0%,
		60% {
			opacity: 1;
		}
		60.01%,
		100% {
			opacity: 0.25;
		}
	}
</style>
