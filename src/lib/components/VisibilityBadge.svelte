<script lang="ts">
	import type { Visibility } from '$lib/data/projects';
	import { t } from '$lib/i18n';

	interface Props {
		visibility: Visibility;
	}

	let { visibility }: Props = $props();
	const dict = $derived(t());

	const isOpen = $derived(visibility === 'open');
	const label = $derived(isOpen ? dict.experience.openSource : dict.experience.closedSource);
</script>

<span class="badge" class:open={isOpen} class:closed={!isOpen}>
	<span class="dot" aria-hidden="true"></span>
	{label}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-family: var(--font-rpg);
		font-size: 0.62rem;
		letter-spacing: 0.06em;
		padding: 0.35rem 0.6rem;
		border: 1px solid;
		border-radius: var(--radius-sm);
		text-transform: uppercase;
	}

	.open {
		background: rgba(107, 212, 154, 0.12);
		color: #6bd49a;
		border-color: rgba(107, 212, 154, 0.55);
	}

	.closed {
		background: rgba(230, 162, 60, 0.12);
		color: var(--color-amber);
		border-color: rgba(230, 162, 60, 0.5);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		box-shadow: 0 0 8px currentColor;
	}
</style>
