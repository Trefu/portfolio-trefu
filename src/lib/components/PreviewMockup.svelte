<script lang="ts">
	import type { IconName } from '$lib/data/icons';
	import IconSprite from './IconSprite.svelte';

	export type MockupTheme = 'dark' | 'light' | 'warm' | 'fantasy' | 'red' | 'green';

	interface Props {
		url: string;
		title: string;
		subtitle?: string;
		theme?: MockupTheme;
		icon?: IconName;
		/** Custom slot for the body content — overrides default decoration. */
		children?: import('svelte').Snippet;
	}

	let { url, title, subtitle, theme = 'dark', icon, children }: Props = $props();

	const themes = {
		dark: { bg1: '#0f1a2e', bg2: '#070b18', text: '#e7ecf7', accent: '#6db4ff', mute: '#6c7898' },
		light: { bg1: '#fafaf6', bg2: '#e7e3d6', text: '#1a1a1a', accent: '#c79a3a', mute: '#666' },
		warm: { bg1: '#5a3810', bg2: '#2a1a0a', text: '#fff8e8', accent: '#ffd97a', mute: '#a8845a' },
		fantasy: { bg1: '#1d1233', bg2: '#0a0518', text: '#f4d27a', accent: '#f4d27a', mute: '#7a6494' },
		red: { bg1: '#3a0e0e', bg2: '#1a0606', text: '#ffb8a8', accent: '#ff6b4a', mute: '#944a4a' },
		green: { bg1: '#0e2a18', bg2: '#061a0e', text: '#a8e0b8', accent: '#6bd49a', mute: '#5a7a68' }
	} as const;

	const t = $derived(themes[theme]);

	// Build the domain shown in the URL bar from the url
	const domain = $derived(url.replace(/^https?:\/\//, '').replace(/\/$/, ''));
</script>

<svg
	class="mockup"
	viewBox="0 0 1280 720"
	preserveAspectRatio="xMidYMid slice"
	xmlns="http://www.w3.org/2000/svg"
	aria-label={`Preview of ${title}`}
>
	<defs>
		<linearGradient id="bg-{theme}" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color={t.bg1} />
			<stop offset="1" stop-color={t.bg2} />
		</linearGradient>
		<radialGradient id="glow-{theme}" cx="0.5" cy="0.45" r="0.7">
			<stop offset="0" stop-color={t.accent} stop-opacity="0.18" />
			<stop offset="1" stop-color={t.accent} stop-opacity="0" />
		</radialGradient>
	</defs>

	<!-- Window background -->
	<rect width="1280" height="720" fill="url(#bg-{theme})" />
	<rect width="1280" height="720" fill="url(#glow-{theme})" />

	<!-- Subtle grid pattern overlay -->
	<g opacity="0.06" stroke={t.accent} stroke-width="1">
		<path d="M0 180 H1280 M0 360 H1280 M0 540 H1280 M320 0 V720 M640 0 V720 M960 0 V720" />
	</g>

	<!-- Window chrome bar -->
	<g>
		<rect x="0" y="0" width="1280" height="56" fill="rgba(0,0,0,0.35)" />
		<rect x="0" y="55" width="1280" height="1" fill={t.accent} opacity="0.25" />
		<!-- Traffic lights -->
		<circle cx="28" cy="28" r="8" fill="#ff5f56" />
		<circle cx="54" cy="28" r="8" fill="#ffbd2e" />
		<circle cx="80" cy="28" r="8" fill="#27c93f" />
		<!-- URL pill -->
		<rect x="450" y="14" width="380" height="28" rx="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" />
		<circle cx="468" cy="28" r="4" fill={t.accent} opacity="0.7" />
		<text
			x="482"
			y="32"
			font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
			font-size="13"
			fill={t.text}
			opacity="0.85"
		>{domain}</text>
	</g>

	<!-- Body content -->
	{#if children}
		{@render children()}
	{:else}
		<!-- Icon disc -->
		{#if icon}
			<g transform="translate(640 280)">
				<circle r="120" fill={t.accent} opacity="0.12" />
				<circle r="90" fill={t.accent} opacity="0.2" />
				<circle r="64" fill="rgba(255,255,255,0.06)" stroke={t.accent} stroke-width="2" opacity="0.6" />
				<foreignObject x="-48" y="-48" width="96" height="96">
					<div class="mockup-icon" style:filter="brightness(0) invert(1)">
						<IconSprite name={icon} size={96} />
					</div>
				</foreignObject>
			</g>
		{/if}

		<!-- Title -->
		<text
			x="640"
			y="500"
			text-anchor="middle"
			font-family="Cinzel, Georgia, serif"
			font-size="64"
			font-weight="700"
			fill={t.text}
			letter-spacing="2"
		>{title}</text>

		<!-- Subtitle -->
		{#if subtitle}
			<text
				x="640"
				y="555"
				text-anchor="middle"
				font-family="Inter, system-ui, sans-serif"
				font-size="22"
				fill={t.mute}
			>{subtitle}</text>
		{/if}

		<!-- Decorative flourish -->
		<g opacity="0.5">
			<line x1="540" y1="600" x2="740" y2="600" stroke={t.accent} stroke-width="2" />
			<circle cx="640" cy="600" r="6" fill={t.accent} />
		</g>
	{/if}
</svg>

<style>
	.mockup {
		display: block;
		width: 100%;
		height: 100%;
	}

	.mockup-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>
