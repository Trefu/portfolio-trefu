export type TileType = 'wall' | 'floor';

export interface Tile {
	type: TileType;
	x: number;
	y: number;
}

export interface Entity {
	id: number;
	type: 'player' | 'enemy';
	x: number;
	y: number;
	hp: number;
	maxHp: number;
	/** Last direction faced — for sprite flip on movement. */
	facing: 'left' | 'right';
}

export interface DungeonConfig {
	width: number;
	height: number;
	minRooms: number;
	maxRooms: number;
	minRoomSize: number;
	maxRoomSize: number;
	enemyHp: number;
	playerHp: number;
}

export interface Dungeon {
	tiles: TileType[][];
	width: number;
	height: number;
	rooms: Room[];
	playerStart: { x: number; y: number };
	enemySpawns: { x: number; y: number }[];
}

export interface Room {
	x: number;
	y: number;
	w: number;
	h: number;
}
