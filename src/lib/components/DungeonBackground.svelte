<script lang="ts">
	import { onMount } from 'svelte';
	import { generateDungeon } from '$lib/dungeon/generator';
	import type { TileType } from '$lib/dungeon/types';

	const TILE = 48; // px per tile in the SVG viewBox
	const BLEED = 1; // px overlap on each side to hide tile seams
	const SHADOW = 6; // px width of the soft shadow strip on a floor edge facing a wall

	let dungeon = $state(
		generateDungeon(undefined, {
			width: 36,
			height: 24,
			minRooms: 7,
			maxRooms: 11,
			minRoomSize: 3,
			maxRoomSize: 6
		})
	);
	let cells = $state<RenderedCell[]>([]);

	interface RenderedCell {
		x: number;
		y: number;
		base: string;
		shadowN: boolean;
		shadowS: boolean;
		shadowE: boolean;
		shadowW: boolean;
		overlay?: string;
	}

	const FLOOR_VARIANTS = [
		'Tiles/floor-plain.png',
		'Tiles/floor-plain.png',
		'Tiles/floor-plain.png',
		'Tiles/floor-plain.png',
		'Tiles/floor-plain.png',
		'Tiles/floor-plain.png',
		'Tiles/floor-dotted.png',
		'Tiles/floor-dot-deco.png',
		'Tiles/floor-corner-deco.png',
		'Tiles/floor-cracked-1.png',
		'Tiles/floor-cracked-2.png',
		'Tiles/floor-cracked-3.png',
		'Tiles/floor-grid.png'
	];

	const WALL_VARIANTS = [
		'Tiles/wall-brick-1.png',
		'Tiles/wall-brick-2.png',
		'Tiles/wall-brick-3.png',
		'Tiles/wall-brick-1.png',
		'Tiles/wall-brick-4.png',
		'Tiles/wall-brick-5.png'
	];

	const FLOOR_PROPS = [
		'Tiles/door-wood.png',
		'Tiles/chest-gold.png',
		'Tiles/crate.png',
		'Tiles/barrel.png'
	];

	function mulberry32(seed: number) {
		let a = seed >>> 0;
		return function () {
			a |= 0;
			a = (a + 0x6d2b79f5) | 0;
			let t = a;
			t = Math.imul(t ^ (t >>> 15), t | 1);
			t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
			return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
		};
	}

	function pick<T>(rng: () => number, arr: T[]): T {
		return arr[Math.floor(rng() * arr.length)];
	}

	function inBounds(x: number, y: number) {
		return x >= 0 && x < dungeon.width && y >= 0 && y < dungeon.height;
	}

	function isWall(x: number, y: number): boolean {
		return inBounds(x, y) && dungeon.tiles[y][x] === 'wall';
	}

	function build(): RenderedCell[] {
		const seed = (dungeon.rooms.length * 7919 + dungeon.width * 31 + dungeon.height) >>> 0;
		const rng = mulberry32(seed);
		const out: RenderedCell[] = [];

		for (let y = 0; y < dungeon.height; y++) {
			for (let x = 0; x < dungeon.width; x++) {
				const type: TileType = dungeon.tiles[y][x];
				const cell: RenderedCell = {
					x,
					y,
					base: '',
					shadowN: false,
					shadowS: false,
					shadowE: false,
					shadowW: false
				};
				if (type === 'floor') {
					cell.base = pick(rng, FLOOR_VARIANTS);
					cell.shadowN = isWall(x, y - 1) || y === 0;
					cell.shadowS = isWall(x, y + 1) || y === dungeon.height - 1;
					cell.shadowE = isWall(x + 1, y) || x === dungeon.width - 1;
					cell.shadowW = isWall(x - 1, y) || x === 0;
					if (
						rng() < 0.035 &&
						!cell.shadowN &&
						!cell.shadowS &&
						!cell.shadowE &&
						!cell.shadowW
					) {
						cell.overlay = pick(rng, FLOOR_PROPS);
					}
				} else {
					cell.base = pick(rng, WALL_VARIANTS);
				}
				out.push(cell);
			}
		}

		return out;
	}

	function regenerate() {
		dungeon = generateDungeon(undefined, {
			width: 36,
			height: 24,
			minRooms: 7,
			maxRooms: 11,
			minRoomSize: 3,
			maxRoomSize: 6
		});
		cells = build();
	}

	onMount(() => {
		cells = build();
	});

	export function reroll() {
		regenerate();
	}
</script>

<div class="dungeon-bg" aria-hidden="true">
	<svg
		class="dungeon-bg__svg"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 {dungeon.width * TILE} {dungeon.height * TILE}"
		preserveAspectRatio="xMidYMid slice"
	>
		<defs>
			<linearGradient id="shadow-h" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#000" stop-opacity="0.55" />
				<stop offset="100%" stop-color="#000" stop-opacity="0" />
			</linearGradient>
			<linearGradient id="shadow-h-flip" x1="0" y1="1" x2="0" y2="0">
				<stop offset="0%" stop-color="#000" stop-opacity="0.55" />
				<stop offset="100%" stop-color="#000" stop-opacity="0" />
			</linearGradient>
			<linearGradient id="shadow-v" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stop-color="#000" stop-opacity="0.55" />
				<stop offset="100%" stop-color="#000" stop-opacity="0" />
			</linearGradient>
			<linearGradient id="shadow-v-flip" x1="1" y1="0" x2="0" y2="0">
				<stop offset="0%" stop-color="#000" stop-opacity="0.55" />
				<stop offset="100%" stop-color="#000" stop-opacity="0" />
			</linearGradient>
		</defs>

		{#each cells as cell (cell.x + ',' + cell.y)}
			<image
				class="tile"
				href="/dungeon/{cell.base}"
				x={cell.x * TILE - BLEED}
				y={cell.y * TILE - BLEED}
				width={TILE + BLEED * 2}
				height={TILE + BLEED * 2}
				preserveAspectRatio="none"
			/>

			{#if cell.shadowN}
				<rect
					x={cell.x * TILE}
					y={cell.y * TILE}
					width={TILE}
					height={SHADOW}
					fill="url(#shadow-h)"
					pointer-events="none"
				/>
			{/if}
			{#if cell.shadowS}
				<rect
					x={cell.x * TILE}
					y={cell.y * TILE + TILE - SHADOW}
					width={TILE}
					height={SHADOW}
					fill="url(#shadow-h-flip)"
					pointer-events="none"
				/>
			{/if}
			{#if cell.shadowE}
				<rect
					x={cell.x * TILE + TILE - SHADOW}
					y={cell.y * TILE}
					width={SHADOW}
					height={TILE}
					fill="url(#shadow-v-flip)"
					pointer-events="none"
				/>
			{/if}
			{#if cell.shadowW}
				<rect
					x={cell.x * TILE}
					y={cell.y * TILE}
					width={SHADOW}
					height={TILE}
					fill="url(#shadow-v)"
					pointer-events="none"
				/>
			{/if}

			{#if cell.overlay}
				<image
					class="tile"
					href="/dungeon/{cell.overlay}"
					x={cell.x * TILE}
					y={cell.y * TILE}
					width={TILE}
					height={TILE}
					preserveAspectRatio="xMidYMid meet"
				/>
			{/if}
		{/each}
	</svg>
</div>

<style>
	.dungeon-bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.dungeon-bg__svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0.65;
		image-rendering: pixelated;
	}

	.tile {
		shape-rendering: crispEdges;
	}
</style>
