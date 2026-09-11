<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import DungeonBackground from '$lib/components/DungeonBackground.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
</svelte:head>

<DungeonBackground />

<div class="app-root">
	{@render children()}
</div>

<style>
	.app-root {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 1;
	}
</style>
