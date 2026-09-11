import { browser } from '$app/environment';

const STORAGE_KEY = 'portfolio-lang';

function readInitial(): 'es' | 'en' {
	if (!browser) return 'es';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === 'es' || stored === 'en') return stored;
	const navLang = navigator.language?.slice(0, 2).toLowerCase();
	return navLang === 'en' ? 'en' : 'es';
}

let _lang = $state<'es' | 'en'>(readInitial());

export const language = {
	get value(): 'es' | 'en' {
		return _lang;
	},
	set(next: 'es' | 'en') {
		_lang = next;
		if (browser) localStorage.setItem(STORAGE_KEY, next);
	},
	toggle() {
		language.set(_lang === 'es' ? 'en' : 'es');
	}
};
