import { language } from '$lib/stores/language.svelte';
import { es } from './es';
import { en } from './en';
import type { Translations } from './es';

const dictionaries: Record<'es' | 'en', Translations> = { es, en };

export function t(): Translations {
	return dictionaries[language.value];
}

export function pickLocalized<T>(value: { es: T; en: T }): T {
	return value[language.value];
}

export { language };
