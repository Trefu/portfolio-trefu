<script lang="ts">
	import { goto } from '$app/navigation';
	import GameButton from '$lib/components/GameButton.svelte';
	import GamePanel from '$lib/components/GamePanel.svelte';
	import IconSprite from '$lib/components/IconSprite.svelte';
	import Sparkles from '$lib/components/Sparkles.svelte';
	import { t, language } from '$lib/i18n';
	import { playSelect, isAudioEnabled, toggleAudio } from '$lib/utils/sfx.svelte';

	const dict = $derived(t());

	let selected = $state<'es' | 'en'>(language.value);

	function pick(l: 'es' | 'en') {
		selected = l;
		language.set(l);
		playSelect();
		setTimeout(() => goto('/menu'), 250);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === '1') pick('es');
		else if (e.key === '2') pick('en');
		else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			pick(selected);
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			selected = selected === 'es' ? 'en' : 'es';
		}
	}
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<svelte:window onkeydown={handleKey} />

<Sparkles />

<div class="lang-bg" aria-hidden="true">
	<div class="lang-bg__vignette"></div>
</div>

<main class="lang-screen">
	<div class="lang-rune lang-rune--left" style:--rot="-12deg" style:--y="-60px">
		<IconSprite name="wizardHat" size={80} />
	</div>
	<div class="lang-rune lang-rune--right" style:--rot="8deg" style:--y="40px">
		<IconSprite name="compass" size={70} />
	</div>

	<GamePanel title={dict.lang.chooseTitle} subtitle={dict.lang.chooseSubtitle} padded={false}>
		{#snippet actions()}
			<button
				class="hud-btn"
				onclick={() => toggleAudio()}
				aria-label="Toggle audio"
				title="M · Mute"
			>
				{isAudioEnabled() ? '🔊' : '🔇'}
			</button>
		{/snippet}

		<div class="lang-options">
			<button
				class="lang-card"
				class:active={selected === 'es'}
				onclick={() => pick('es')}
				aria-pressed={selected === 'es'}
			>
				<span class="lang-card__flag">🇪🇸</span>
				<span class="lang-card__name">{dict.lang.spanish}</span>
				<span class="lang-card__key">1</span>
			</button>

			<button
				class="lang-card"
				class:active={selected === 'en'}
				onclick={() => pick('en')}
				aria-pressed={selected === 'en'}
			>
				<span class="lang-card__flag">🇬🇧</span>
				<span class="lang-card__name">{dict.lang.english}</span>
				<span class="lang-card__key">2</span>
			</button>
		</div>

		<div class="lang-actions">
			<GameButton
				selected={true}
				icon="sword"
				iconSize={24}
				onSelect={() => pick(selected)}
				variant="carved"
			>
				{dict.lang.continue}
			</GameButton>
		</div>

		<p class="lang-hint">{dict.lang.hint}</p>
	</GamePanel>
</main>

<style>
	.lang-screen {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem 1.5rem;
		position: relative;
		z-index: 2;
	}

	.lang-screen :global(.game-panel) {
		max-width: 520px;
		width: 100%;
	}

	.lang-bg {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
	}

	.lang-bg__vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at center,
			transparent 0%,
			transparent 35%,
			rgba(0, 0, 0, 0.7) 100%
		);
	}

	.lang-options {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
		padding: 1rem 1.5rem 0.5rem;
	}

	.lang-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.4rem 1rem;
		background: linear-gradient(180deg, rgba(40, 28, 16, 0.85) 0%, rgba(28, 18, 8, 0.9) 100%);
		border: 3px solid var(--gold-3, #7a5510);
		border-radius: 8px;
		color: #fff8e8;
		font-family: var(--font-display);
		cursor: pointer;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
		box-shadow:
			inset 0 1px 0 rgba(255, 220, 160, 0.25),
			inset 0 -2px 0 rgba(0, 0, 0, 0.35),
			0 4px 0 rgba(0, 0, 0, 0.4);
		transition:
			transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1),
			box-shadow 220ms ease,
			border-color 220ms ease;
	}

	.lang-card:hover,
	.lang-card:focus-visible {
		transform: translateY(-4px) scale(1.03);
		outline: none;
		border-color: #ffd97a;
		box-shadow:
			inset 0 1px 0 rgba(255, 220, 160, 0.4),
			inset 0 -2px 0 rgba(0, 0, 0, 0.35),
			0 6px 0 rgba(0, 0, 0, 0.4),
			0 0 24px rgba(244, 210, 122, 0.4);
	}

	.lang-card.active {
		border-color: #ffd97a;
		box-shadow:
			inset 0 1px 0 rgba(255, 220, 160, 0.45),
			inset 0 -2px 0 rgba(0, 0, 0, 0.35),
			0 4px 0 rgba(0, 0, 0, 0.4),
			0 0 28px rgba(244, 210, 122, 0.55);
		animation: card-pulse 1.6s ease-in-out infinite;
	}

	@keyframes card-pulse {
		0%,
		100% {
			transform: translateY(-2px) scale(1.02);
		}
		50% {
			transform: translateY(-4px) scale(1.04);
		}
	}

	.lang-card__flag {
		font-size: 2.6rem;
		line-height: 1;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
	}

	.lang-card__name {
		font-family: var(--font-rpg);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.lang-card__key {
		position: absolute;
		top: 6px;
		right: 8px;
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		padding: 2px 8px;
		background: linear-gradient(180deg, #2a1a0a 0%, #1a0f06 100%);
		color: #ffd97a;
		border: 1px solid #c79a3a;
		border-radius: 4px;
		box-shadow: 0 2px 0 rgba(0, 0, 0, 0.6);
	}

	.lang-actions {
		display: flex;
		justify-content: center;
		padding: 1rem 1.5rem;
	}

	.lang-hint {
		font-family: var(--font-rpg);
		font-size: 0.65rem;
		color: rgba(255, 248, 232, 0.6);
		text-align: center;
		padding: 0 1.5rem 1.5rem;
		margin: 0;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
	}

	.lang-rune {
		position: absolute;
		filter:
			brightness(0) invert(1)
			drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6))
			drop-shadow(0 0 24px rgba(244, 210, 122, 0.45));
		opacity: 0.8;
		animation: rune-float 8s ease-in-out infinite;
		transform: rotate(var(--rot, 0deg)) translateY(var(--y, 0));
		z-index: 1;
	}

	.lang-rune--left {
		left: 6vw;
		top: 30%;
	}
	.lang-rune--right {
		right: 6vw;
		top: 50%;
		animation-delay: -4s;
	}

	@keyframes rune-float {
		0%,
		100% {
			transform: rotate(var(--rot, 0deg)) translateY(var(--y, 0));
		}
		50% {
			transform: rotate(var(--rot, 0deg)) translateY(calc(var(--y, 0) - 12px));
		}
	}

	.hud-btn {
		font-family: var(--font-rpg);
		font-size: 0.65rem;
		padding: 0.4rem 0.65rem;
		background: linear-gradient(180deg, #2a1a0a 0%, #1a0f06 100%);
		border: 1px solid var(--gold-3, #7a5510);
		border-radius: 4px;
		color: #ffd97a;
		cursor: pointer;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 2px 0 rgba(0, 0, 0, 0.5);
	}

	@media (max-width: 700px) {
		.lang-rune {
			display: none;
		}
	}
</style>
