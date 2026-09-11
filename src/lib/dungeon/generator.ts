import type { Dungeon, DungeonConfig, Room, TileType } from './types';

const DEFAULTS: DungeonConfig = {
	width: 48,
	height: 36,
	minRooms: 4,
	maxRooms: 6,
	minRoomSize: 6,
	maxRoomSize: 11,
	enemyHp: 2,
	playerHp: 6
};

/** Tiny seedable RNG (mulberry32) so we can re-use the seed in the URL. */
function mulberry32(seed: number): () => number {
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

function rngInt(rng: () => number, min: number, max: number): number {
	return Math.floor(rng() * (max - min + 1)) + min;
}

function rngPick<T>(rng: () => number, arr: T[]): T {
	return arr[Math.floor(rng() * arr.length)];
}

function roomsOverlap(a: Room, b: Room, padding = 1): boolean {
	return (
		a.x - padding < b.x + b.w &&
		a.x + a.w + padding > b.x &&
		a.y - padding < b.y + b.h &&
		a.y + a.h + padding > b.y
	);
}

function carveRoom(grid: TileType[][], room: Room): void {
	for (let y = room.y; y < room.y + room.h; y++) {
		for (let x = room.x; x < room.x + room.w; x++) {
			if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
				grid[y][x] = 'floor';
			}
		}
	}
}

function carveCorridor(
	grid: TileType[][],
	from: { x: number; y: number },
	to: { x: number; y: number },
	horizontalFirst: boolean,
	rng: () => number
): void {
	if (horizontalFirst) {
		// horizontal then vertical, with a random corner offset for variety
		const cornerX = rngPick(rng, [from.x, to.x]);
		drawHTunnel(grid, from.x, cornerX, from.y);
		drawVTunnel(grid, from.y, to.y, cornerX);
		drawHTunnel(grid, cornerX, to.x, to.y);
	} else {
		const cornerY = rngPick(rng, [from.y, to.y]);
		drawVTunnel(grid, from.y, cornerY, from.x);
		drawHTunnel(grid, from.x, to.x, cornerY);
		drawVTunnel(grid, cornerY, to.y, to.x);
	}
}

function drawHTunnel(grid: TileType[][], x1: number, x2: number, y: number): void {
	const [a, b] = x1 <= x2 ? [x1, x2] : [x2, x1];
	for (let x = a; x <= b; x++) {
		if (y > 0 && y < grid.length - 1 && x > 0 && x < grid[0].length - 1) {
			grid[y][x] = 'floor';
		}
	}
}

function drawVTunnel(grid: TileType[][], y1: number, y2: number, x: number): void {
	const [a, b] = y1 <= y2 ? [y1, y2] : [y2, y1];
	for (let y = a; y <= b; y++) {
		if (y > 0 && y < grid.length - 1 && x > 0 && x < grid[0].length - 1) {
			grid[y][x] = 'floor';
		}
	}
}

function center(room: Room): { x: number; y: number } {
	return { x: Math.floor(room.x + room.w / 2), y: Math.floor(room.y + room.h / 2) };
}

export function generateDungeon(seed?: number, config: Partial<DungeonConfig> = {}): Dungeon {
	const cfg = { ...DEFAULTS, ...config };
	const rng = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 31));

	// Init grid all walls
	const grid: TileType[][] = Array.from({ length: cfg.height }, () =>
		Array.from({ length: cfg.width }, () => 'wall' as TileType)
	);

	const rooms: Room[] = [];
	const target = rngInt(rng, cfg.minRooms, cfg.maxRooms);

	let attempts = 0;
	while (rooms.length < target && attempts < 200) {
		attempts++;
		const w = rngInt(rng, cfg.minRoomSize, cfg.maxRoomSize);
		const h = rngInt(rng, cfg.minRoomSize, cfg.maxRoomSize);
		const x = rngInt(rng, 1, cfg.width - w - 2);
		const y = rngInt(rng, 1, cfg.height - h - 2);
		const room: Room = { x, y, w, h };

		if (rooms.some((r) => roomsOverlap(r, room, 1))) continue;

		rooms.push(room);
		carveRoom(grid, room);
	}

	// Connect rooms with L-corridors
	for (let i = 1; i < rooms.length; i++) {
		const a = center(rooms[i - 1]);
		const b = center(rooms[i]);
		carveCorridor(grid, a, b, i % 2 === 0, rng);
	}

	// Player starts at the first room
	const playerStart = center(rooms[0]);

	// Enemies: 1-2 per room (skip the player's room)
	const enemySpawns: { x: number; y: number }[] = [];
	for (let i = 1; i < rooms.length; i++) {
		const room = rooms[i];
		const count = rngInt(rng, 1, 2);
		for (let n = 0; n < count; n++) {
			enemySpawns.push({
				x: rngInt(rng, room.x, room.x + room.w - 1),
				y: rngInt(rng, room.y, room.y + room.h - 1)
			});
		}
	}

	return {
		tiles: grid,
		width: cfg.width,
		height: cfg.height,
		rooms,
		playerStart,
		enemySpawns
	};
}

/**
 * Field-of-view. Returns a 2D visibility grid where:
 *   0 = unseen (black)
 *   1 = explored but not visible (dim)
 *   2 = currently visible (full bright)
 *
 * Simple implementation: BFS within `radius` tiles, stopping at walls.
 */
export function computeFOV(
	tiles: TileType[][],
	origin: { x: number; y: number },
	radius: number
): Uint8Array {
	const h = tiles.length;
	const w = tiles[0].length;
	const out = new Uint8Array(w * h);

	const queue: Array<{ x: number; y: number; d: number }> = [{ ...origin, d: 0 }];
	const visited = new Uint8Array(w * h);

	while (queue.length) {
		const cell = queue.shift()!;
		if (cell.d > radius) continue;
		const idx = cell.y * w + cell.x;
		if (visited[idx]) continue;
		visited[idx] = 1;
		out[idx] = 2;

		const neighbors: Array<{ x: number; y: number }> = [
			{ x: cell.x + 1, y: cell.y },
			{ x: cell.x - 1, y: cell.y },
			{ x: cell.x, y: cell.y + 1 },
			{ x: cell.x, y: cell.y - 1 }
		];
		for (const n of neighbors) {
			if (n.x < 0 || n.x >= w || n.y < 0 || n.y >= h) continue;
			if (tiles[n.y][n.x] === 'wall') {
				// Walls inside radius are also visible
				const nIdx = n.y * w + n.x;
				if (!visited[nIdx]) out[nIdx] = 2;
				continue;
			}
			queue.push({ x: n.x, y: n.y, d: cell.d + 1 });
		}
	}

	return out;
}

export function isWalkable(tiles: TileType[][], x: number, y: number): boolean {
	if (y < 0 || y >= tiles.length || x < 0 || x >= tiles[0].length) return false;
	return tiles[y][x] === 'floor';
}
