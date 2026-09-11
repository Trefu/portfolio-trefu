<script lang="ts">
	import { ICONS, ICON_COLS, ICON_ROWS, type IconName } from '$lib/data/icons';

	interface Props {
		name: IconName;
		size?: number;
		color?: string;
		alt?: string;
		title?: string;
	}

	let { name, size = 32, color = 'currentColor', alt, title }: Props = $props();

	const pos = $derived(ICONS[name]);
	const bgSize = $derived(`${ICON_COLS * size}px ${ICON_ROWS * size}px`);
	const bgPos = $derived(`${-pos.c * size}px ${-pos.r * size}px`);
</script>

<span
	class="sprite"
	role={alt ? 'img' : 'presentation'}
	aria-label={alt}
	aria-hidden={alt ? undefined : 'true'}
	style:width="{size}px"
	style:height="{size}px"
	style:background-image="url('/icons.png')"
	style:background-size={bgSize}
	style:background-position={bgPos}
	style:filter={color !== 'currentColor' ? `drop-shadow(0 1px 0 rgba(0,0,0,0.5))` : undefined}
>
	{#if title}<span class="visually-hidden">{title}</span>{/if}
</span>

<style>
	.sprite {
		display: inline-block;
		vertical-align: middle;
		background-repeat: no-repeat;
		image-rendering: -webkit-optimize-contrast;
		image-rendering: crisp-edges;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
