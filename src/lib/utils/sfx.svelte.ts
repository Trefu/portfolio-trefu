import { browser } from '$app/environment';

// Lazy Web Audio context (no autoplay until first user gesture).
let ctx: AudioContext | null = null;
let enabled = $state(true);

function ensure(): AudioContext | null {
	if (!browser) return null;
	if (!ctx) {
		const AC: typeof AudioContext =
			window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
		if (!AC) return null;
		ctx = new AC();
	}
	if (ctx.state === 'suspended') void ctx.resume();
	return ctx;
}

/** Quick ascending arpeggio when hovering / moving between items. */
export function playHover() {
	if (!enabled) return;
	const ac = ensure();
	if (!ac) return;
	const now = ac.currentTime;
	const o = ac.createOscillator();
	const g = ac.createGain();
	o.type = 'triangle';
	o.frequency.setValueAtTime(520, now);
	o.frequency.exponentialRampToValueAtTime(880, now + 0.08);
	g.gain.setValueAtTime(0.0001, now);
	g.gain.exponentialRampToValueAtTime(0.07, now + 0.01);
	g.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
	o.connect(g).connect(ac.destination);
	o.start(now);
	o.stop(now + 0.1);
}

/** Heavier "select" sound: coin-style chime. */
export function playSelect() {
	if (!enabled) return;
	const ac = ensure();
	if (!ac) return;
	const now = ac.currentTime;
	const notes = [660, 880, 1320];
	notes.forEach((freq, i) => {
		const o = ac.createOscillator();
		const g = ac.createGain();
		o.type = 'triangle';
		o.frequency.setValueAtTime(freq, now + i * 0.04);
		g.gain.setValueAtTime(0.0001, now + i * 0.04);
		g.gain.exponentialRampToValueAtTime(0.09, now + i * 0.04 + 0.01);
		g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.04 + 0.18);
		o.connect(g).connect(ac.destination);
		o.start(now + i * 0.04);
		o.stop(now + i * 0.04 + 0.2);
	});
}

/** Soft thud when navigating "back" / dismissing. */
export function playBack() {
	if (!enabled) return;
	const ac = ensure();
	if (!ac) return;
	const now = ac.currentTime;
	const o = ac.createOscillator();
	const g = ac.createGain();
	o.type = 'sine';
	o.frequency.setValueAtTime(330, now);
	o.frequency.exponentialRampToValueAtTime(180, now + 0.12);
	g.gain.setValueAtTime(0.0001, now);
	g.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
	g.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
	o.connect(g).connect(ac.destination);
	o.start(now);
	o.stop(now + 0.18);
}

/** Little tink when toggling language. */
export function playSwitch() {
	if (!enabled) return;
	const ac = ensure();
	if (!ac) return;
	const now = ac.currentTime;
	const o = ac.createOscillator();
	const g = ac.createGain();
	o.type = 'square';
	o.frequency.setValueAtTime(420, now);
	o.frequency.exponentialRampToValueAtTime(720, now + 0.06);
	o.frequency.exponentialRampToValueAtTime(560, now + 0.1);
	g.gain.setValueAtTime(0.0001, now);
	g.gain.exponentialRampToValueAtTime(0.04, now + 0.005);
	g.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
	o.connect(g).connect(ac.destination);
	o.start(now);
	o.stop(now + 0.15);
}

export function setAudioEnabled(v: boolean) {
	enabled = v;
	if (browser) localStorage.setItem('portfolio-audio', v ? '1' : '0');
}
export function isAudioEnabled() {
	return enabled;
}
export function toggleAudio() {
	setAudioEnabled(!enabled);
}
