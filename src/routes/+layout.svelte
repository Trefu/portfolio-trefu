<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
</svelte:head>

<div class="app-root">
	{@render children()}
</div>

<style>
	.app-root {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
