<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		count?: number;
		minSize?: number;
		maxSize?: number;
		minDuration?: number;
		maxDuration?: number;
	}

	let {
		count = 35,
		minSize = 2,
		maxSize = 5,
		minDuration = 6,
		maxDuration = 14
	}: Props = $props();

	type Sparkle = {
		left: number;
		top: number;
		size: number;
		delay: number;
		duration: number;
		drift: number;
	};

	function makeSparkles(n: number): Sparkle[] {
		const arr: Sparkle[] = [];
		for (let i = 0; i < n; i++) {
			arr.push({
				left: Math.random() * 100,
				top: Math.random() * 100,
				size: minSize + Math.random() * (maxSize - minSize),
				delay: Math.random() * 8,
				duration: minDuration + Math.random() * (maxDuration - minDuration),
				drift: (Math.random() - 0.5) * 80
			});
		}
		return arr;
	}

	let sparkles = $state<Sparkle[]>([]);

	onMount(() => {
		sparkles = makeSparkles(count);
	});
</script>

<div class="sparkles" aria-hidden="true">
	{#each sparkles as s, i (i)}
		<span
			class="sparkle"
			style:left="{s.left}%"
			style:top="{s.top}%"
			style:width="{s.size}px"
			style:height="{s.size}px"
			style:animation-delay="-{s.delay}s"
			style:animation-duration="{s.duration}s"
			style:--drift="{s.drift}px"
		></span>
	{/each}
</div>

<style>
	.sparkles {
		position: fixed;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		z-index: 0;
	}

	.sparkle {
		position: absolute;
		display: block;
		border-radius: 50%;
		background: radial-gradient(
			circle at center,
			rgba(255, 240, 180, 1) 0%,
			rgba(244, 210, 122, 0.6) 35%,
			rgba(244, 210, 122, 0) 70%
		);
		box-shadow: 0 0 8px rgba(244, 210, 122, 0.6);
		opacity: 0;
		animation:
			float linear infinite,
			twinkle ease-in-out infinite;
	}

	@keyframes float {
		from {
			transform: translate(0, 0) scale(0.8);
		}
		to {
			transform: translate(var(--drift), -110vh) scale(0.8);
		}
	}

	@keyframes twinkle {
		0%,
		100% {
			opacity: 0;
		}
		10%,
		40% {
			opacity: 0.9;
		}
		70% {
			opacity: 0.3;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sparkle {
			animation: none;
			opacity: 0.4;
		}
	}
</style>
