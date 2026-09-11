<script lang="ts">
	import { t, language } from '$lib/i18n';

	interface Props {
		onSelect: (lang: 'es' | 'en') => void;
	}

	let { onSelect }: Props = $props();

	const dict = $derived(t());

	function pick(l: 'es' | 'en') {
		language.set(l);
		onSelect(l);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === '1') pick('es');
		else if (e.key === '2') pick('en');
	}
</script>

<svelte:window onkeydown={handleKey} />

<div class="lang-selector">
	<div class="lang-selector__title">{dict.lang.chooseTitle}</div>
	<div class="lang-selector__subtitle">{dict.lang.chooseSubtitle}</div>

	<div class="lang-selector__options">
		<button class="lang-card" onclick={() => pick('es')} class:active={language.value === 'es'}>
			<span class="lang-card__flag">🇪🇸</span>
			<span class="lang-card__name">{dict.lang.spanish}</span>
			<span class="lang-card__key">1</span>
		</button>

		<button class="lang-card" onclick={() => pick('en')} class:active={language.value === 'en'}>
			<span class="lang-card__flag">🇬🇧</span>
			<span class="lang-card__name">{dict.lang.english}</span>
			<span class="lang-card__key">2</span>
		</button>
	</div>

	<p class="lang-selector__hint">{dict.lang.hint}</p>
</div>

<style>
	.lang-selector {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
		padding: 1rem;
	}

	.lang-selector__title {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		color: var(--color-gold-bright);
		text-shadow: 0 0 18px rgba(244, 210, 122, 0.35);
		letter-spacing: 0.05em;
	}

	.lang-selector__subtitle {
		font-family: var(--font-display);
		font-size: 1rem;
		color: var(--color-text-soft);
		font-style: italic;
		opacity: 0.7;
	}

	.lang-selector__options {
		display: grid;
		grid-template-columns: repeat(2, minmax(180px, 1fr));
		gap: 1.25rem;
		margin-top: 0.5rem;
	}

	.lang-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1.5rem 2rem;
		background: linear-gradient(180deg, var(--color-panel) 0%, var(--color-panel-2) 100%);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-parchment);
		font-family: var(--font-rpg);
		font-size: 0.85rem;
		cursor: pointer;
		transition:
			transform var(--transition-fast),
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			background var(--transition-fast);
		position: relative;
		min-width: 180px;
	}

	.lang-card:hover,
	.lang-card:focus-visible {
		border-color: var(--color-gold);
		box-shadow: var(--shadow-glow-gold);
		transform: translateY(-4px);
		outline: none;
	}

	.lang-card.active {
		border-color: var(--color-gold-bright);
		box-shadow: var(--shadow-glow-gold);
	}

	.lang-card__flag {
		font-size: 2.5rem;
		line-height: 1;
	}

	.lang-card__name {
		font-family: var(--font-rpg);
		font-size: 0.9rem;
		letter-spacing: 0.05em;
	}

	.lang-card__key {
		position: absolute;
		top: 8px;
		right: 10px;
		font-size: 0.65rem;
		color: var(--color-text-mute);
		border: 1px solid var(--color-border);
		padding: 1px 6px;
		border-radius: 4px;
	}

	.lang-selector__hint {
		font-size: 0.8rem;
		color: var(--color-text-mute);
		font-style: italic;
	}
</style>
