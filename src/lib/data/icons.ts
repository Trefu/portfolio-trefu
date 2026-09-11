// Sprite is 4167×4167 with 9 cols × 10 rows.
// Cell: 463×417 px (centered icon ≈ 230×230 in original).
// When rendering at size N: background-size = 9N × 10N, pos = -col*N, -row*N

export const ICONS = {
	// Row 0 - Shields & hearts
	shield: { r: 0, c: 0 },
	shieldOutline: { r: 0, c: 1 },
	heart: { r: 0, c: 3 },
	heartFill: { r: 0, c: 4 },
	vial: { r: 0, c: 6 },
	// Row 1 - Lightning & vials
	lightning: { r: 1, c: 0 },
	lightning2: { r: 1, c: 1 },
	book: { r: 1, c: 8 },
	// Row 2 - Hats
	wizardHat: { r: 2, c: 0 },
	hat: { r: 2, c: 1 },
	mitten: { r: 2, c: 2 },
	briefcase: { r: 2, c: 3 },
	// Row 3 - Gear
	backpack: { r: 3, c: 0 },
	compass: { r: 3, c: 1 },
	flag: { r: 3, c: 2 },
	torch: { r: 3, c: 3 },
	fire: { r: 3, c: 7 },
	hand: { r: 3, c: 8 },
	// Row 4 - Elements & scrolls
	fire2: { r: 4, c: 0 },
	snowflake: { r: 4, c: 1 },
	water: { r: 4, c: 2 },
	scroll: { r: 4, c: 8 },
	// Row 5 - Maps & potions
	map: { r: 5, c: 0 },
	firstAid: { r: 5, c: 6 },
	smoke: { r: 5, c: 7 },
	chest: { r: 5, c: 8 },
	// Row 6 - Loot & weapons
	money: { r: 6, c: 0 },
	treasure: { r: 6, c: 7 },
	sword: { r: 6, c: 8 },
	// Row 7 - Weapons & armor
	sword2: { r: 7, c: 0 },
	axe: { r: 7, c: 1 },
	helmet: { r: 7, c: 3 },
	chestplate: { r: 7, c: 5 },
	boots: { r: 7, c: 7 },
	glove: { r: 7, c: 8 },
	// Row 8 - Blades
	sword3: { r: 8, c: 0 },
	sword4: { r: 8, c: 1 },
	sword5: { r: 8, c: 2 },
	sword6: { r: 8, c: 3 },
	mace: { r: 8, c: 7 },
	arrow: { r: 8, c: 8 },
	// Row 9 - Scrolls & shields
	scrollPack: { r: 9, c: 0 },
	scroll2: { r: 9, c: 1 },
	scroll3: { r: 9, c: 2 },
	target: { r: 9, c: 7 },
	shieldOutline2: { r: 9, c: 8 }
} as const satisfies Record<string, { r: number; c: number }>;

export type IconName = keyof typeof ICONS;

export const ICON_COLS = 9;
export const ICON_ROWS = 10;
