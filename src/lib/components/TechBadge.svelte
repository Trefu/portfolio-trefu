<script lang="ts">
	import { techStyle } from '$lib/data/techColors';

	interface Props {
		tech: string;
		size?: 'sm' | 'md';
	}

	let { tech, size = 'md' }: Props = $props();
	const style = $derived(techStyle(tech));
</script>

<span class="badge badge--{size}" style:background={style.bg} style:color={style.fg} style:border-color={style.border}>
	{tech}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-family: var(--font-rpg);
		font-size: 0.65rem;
		line-height: 1;
		letter-spacing: 0.04em;
		padding: 0.35rem 0.55rem;
		border: 1px solid;
		border-radius: var(--radius-sm);
		background-clip: padding-box;
		white-space: nowrap;
		text-transform: uppercase;
	}

	.badge--sm {
		font-size: 0.6rem;
		padding: 0.25rem 0.45rem;
	}
</style>
