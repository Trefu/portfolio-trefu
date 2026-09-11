<script lang="ts">
	import { t, language } from '$lib/i18n';

	const dict = $derived(t());
</script>

<a href="/menu" class="back">
	<span class="back__icon" aria-hidden="true">⟵</span>
	<span class="back__label">{dict.common.back}</span>
	<span class="back__lang">{language.value.toUpperCase()}</span>
</a>

<style>
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.55rem 1rem;
		background: rgba(244, 210, 122, 0.06);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-parchment);
		font-family: var(--font-rpg);
		font-size: 0.7rem;
		text-decoration: none;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			transform var(--transition-fast),
			color var(--transition-fast);
	}

	.back:hover {
		background: rgba(244, 210, 122, 0.14);
		border-color: var(--color-gold);
		color: var(--color-gold-bright);
		transform: translateX(-3px);
	}

	.back__icon {
		font-size: 1.1rem;
		line-height: 1;
	}

	.back__label {
		letter-spacing: 0.05em;
	}

	.back__lang {
		font-size: 0.6rem;
		color: var(--color-text-mute);
		border-left: 1px solid var(--color-border-soft);
		padding-left: 0.6rem;
	}
</style>
