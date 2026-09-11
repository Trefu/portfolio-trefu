<script lang="ts">
	import { goto } from '$app/navigation';
	import GameButton from '$lib/components/GameButton.svelte';
	import GamePanel from '$lib/components/GamePanel.svelte';
	import IconSprite from '$lib/components/IconSprite.svelte';
	import Sparkles from '$lib/components/Sparkles.svelte';
	import { t, language } from '$lib/i18n';
	import { playHover, playSelect, playSwitch, isAudioEnabled, toggleAudio } from '$lib/utils/sfx.svelte';

	const dict = $derived(t());

	interface MenuEntry {
		id: 'experiencia' | 'sobre-mi' | 'github';
		label: string;
		href: string;
		hotkey: string;
		icon: 'sword' | 'shield' | 'book';
		description: string;
	}

	const entries = $derived<MenuEntry[]>([
		{
			id: 'experiencia',
			label: dict.menu.options.experience,
			href: '/experiencia',
			hotkey: 'E',
			icon: 'sword',
			description: dict.menu.descriptions.experience
		},
		{
			id: 'sobre-mi',
			label: dict.menu.options.about,
			href: '/sobre-mi',
			hotkey: 'A',
			icon: 'shield',
			description: dict.menu.descriptions.about
		},
		{
			id: 'github',
			label: dict.menu.options.github,
			href: '/github',
			hotkey: 'G',
			icon: 'book',
			description: dict.menu.descriptions.github
		}
	]);

	let selected = $state(0);
	let prevSelected = $state(0);

	function move(delta: number) {
		const next = (selected + delta + entries.length) % entries.length;
		if (next !== selected) {
			prevSelected = selected;
			selected = next;
			playHover();
		}
	}

	function activate(i: number) {
		selected = i;
		playSelect();
		setTimeout(() => goto(entries[i].href), 120);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'j') {
			e.preventDefault();
			move(1);
		} else if (e.key === 'ArrowUp' || e.key === 'k') {
			e.preventDefault();
			move(-1);
		} else if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			activate(selected);
		} else if (e.key === '1') {
			activate(0);
		} else if (e.key === '2') {
			activate(1);
		} else if (e.key === '3') {
			activate(2);
		} else if (e.key.toLowerCase() === 'l') {
			language.toggle();
			playSwitch();
		} else if (e.key.toLowerCase() === 'm') {
			toggleAudio();
		}
	}
</script>

<svelte:head>
	<title>{dict.menu.title} — Trefu</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<svelte:window onkeydown={handleKey} />

<Sparkles />

<div class="menu-bg">
	<div class="menu-bg__vignette"></div>
	<div class="menu-bg__stars"></div>
</div>

<main class="menu-screen">
	<GamePanel title={dict.menu.title}>
		{#snippet actions()}
			<button
				class="hud-btn"
				onclick={() => {
					language.toggle();
					playSwitch();
				}}
				aria-label="Toggle language"
				title="L · Language"
			>
				🌐 {language.value.toUpperCase()}
			</button>
			<button
				class="hud-btn hud-btn--mute"
				onclick={() => toggleAudio()}
				aria-label="Toggle audio"
				title="M · Mute"
			>
				{isAudioEnabled() ? '🔊' : '🔇'}
			</button>
		{/snippet}

		<div class="menu-list">
			{#each entries as entry, i (entry.id)}
				<div class="menu-slot" class:active={selected === i} style:--i={i}>
					<GameButton
						selected={selected === i}
						icon={entry.icon}
						iconSize={32}
						hotkey={entry.hotkey}
						onSelect={() => activate(i)}
						onHover={() => {
							if (selected !== i) {
								prevSelected = selected;
								selected = i;
								playHover();
							}
						}}
						variant={i === 0 ? 'carved' : i === 1 ? 'gold' : 'stone'}
					>
						{entry.label}
					</GameButton>
					<div class="menu-slot__desc">{entry.description}</div>
				</div>
			{/each}
		</div>

		<footer class="menu-screen__footer">
			<span class="menu-screen__hint">{dict.menu.hint}</span>
			<span class="menu-screen__credits">{dict.menu.footer}</span>
		</footer>
	</GamePanel>

	<div class="menu-side menu-side--left" aria-hidden="true">
		<div class="rune" style:--rot="-8deg" style:--y="0px">
			<IconSprite name="sword3" size={64} />
		</div>
		<div class="rune" style:--rot="6deg" style:--y="120px">
			<IconSprite name="treasure" size={48} />
		</div>
	</div>
	<div class="menu-side menu-side--right" aria-hidden="true">
		<div class="rune" style:--rot="12deg" style:--y="40px">
			<IconSprite name="scroll" size={56} />
		</div>
		<div class="rune" style:--rot="-4deg" style:--y="180px">
			<IconSprite name="helmet" size={52} />
		</div>
	</div>
</main>

<style>
	.menu-screen {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3rem 1.5rem;
		position: relative;
		z-index: 2;
	}

	.menu-bg {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
	}

	.menu-bg__vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			ellipse at center,
			transparent 0%,
			transparent 40%,
			rgba(0, 0, 0, 0.65) 100%
		);
	}

	.menu-bg__stars {
		position: absolute;
		inset: 0;
		background-image:
			radial-gradient(2px 2px at 20% 30%, rgba(244, 210, 122, 0.4), transparent 50%),
			radial-gradient(2px 2px at 70% 20%, rgba(244, 210, 122, 0.3), transparent 50%),
			radial-gradient(2px 2px at 40% 70%, rgba(109, 180, 255, 0.3), transparent 50%),
			radial-gradient(2px 2px at 80% 60%, rgba(244, 210, 122, 0.4), transparent 50%),
			radial-gradient(2px 2px at 90% 90%, rgba(244, 210, 122, 0.3), transparent 50%),
			radial-gradient(2px 2px at 10% 80%, rgba(109, 180, 255, 0.3), transparent 50%);
		animation: stars-drift 80s linear infinite;
	}

	@keyframes stars-drift {
		from {
			transform: translate(0, 0);
		}
		to {
			transform: translate(-30px, 30px);
		}
	}

	.menu-screen :global(.game-panel) {
		max-width: 560px;
		width: 100%;
	}

	.menu-list {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
		padding: 1.5rem 0 0.5rem;
	}

	.menu-slot {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.45rem;
		animation: slot-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
		animation-delay: calc(200ms + var(--i, 0) * 90ms);
		opacity: 0;
	}

	.menu-slot__desc {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 0.85rem;
		color: rgba(255, 248, 232, 0.65);
		text-align: center;
		max-width: 24rem;
		min-height: 1.2em;
		transition: color 240ms ease;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
	}

	.menu-slot.active .menu-slot__desc {
		color: #fff8e8;
	}

	@keyframes slot-in {
		from {
			opacity: 0;
			transform: translateX(-30px) scale(0.85);
		}
		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	.menu-screen__footer {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 2rem;
		padding-top: 1rem;
		border-top: 1px dashed rgba(244, 210, 122, 0.25);
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		color: rgba(255, 248, 232, 0.7);
		letter-spacing: 0.05em;
		flex-wrap: wrap;
	}

	.menu-screen__hint {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
	}

	.menu-screen__credits {
		text-align: right;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
	}

	.hud-btn {
		font-family: var(--font-rpg);
		font-size: 0.6rem;
		padding: 0.35rem 0.65rem;
		background: linear-gradient(180deg, #2a1a0a 0%, #1a0f06 100%);
		border: 1px solid var(--color-gold);
		border-radius: 4px;
		color: var(--color-gold-bright);
		cursor: pointer;
		letter-spacing: 0.05em;
		text-shadow: 0 0 4px rgba(244, 210, 122, 0.6);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.1),
			0 2px 0 rgba(0, 0, 0, 0.5);
		transition:
			background var(--transition-fast),
			transform var(--transition-fast);
	}

	.hud-btn:hover {
		background: linear-gradient(180deg, #3a2510 0%, #25150a 100%);
		transform: translateY(-1px);
	}

	.hud-btn:active {
		transform: translateY(1px);
	}

	.menu-side {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		pointer-events: none;
		z-index: 1;
	}

	.menu-side--left {
		left: 3vw;
	}
	.menu-side--right {
		right: 3vw;
	}

	.rune {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		filter:
			brightness(0) invert(1)
			drop-shadow(0 6px 12px rgba(0, 0, 0, 0.6))
			drop-shadow(0 0 24px rgba(244, 210, 122, 0.45));
		opacity: 0.9;
		animation: rune-float 6s ease-in-out infinite;
		transform: rotate(var(--rot, 0deg)) translateY(0);
	}

	.rune:nth-child(2) {
		animation-delay: -3s;
	}

	@keyframes rune-float {
		0%,
		100% {
			transform: rotate(var(--rot, 0deg)) translateY(0);
		}
		50% {
			transform: rotate(var(--rot, 0deg)) translateY(-12px);
		}
	}

	@media (max-width: 900px) {
		.menu-side {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.menu-screen__footer {
			flex-direction: column;
			align-items: flex-start;
		}
		.menu-screen__credits {
			text-align: left;
		}
	}
</style>
