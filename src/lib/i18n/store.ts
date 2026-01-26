/**
 * Language Store
 * Manages current language with localStorage persistence
 */

import { writable } from 'svelte/store';
import type { Language } from './fillers';

const STORAGE_KEY = 'entity-001-lang';

/**
 * Detect browser language
 */
function detectLanguage(): Language {
	if (typeof navigator === 'undefined') return 'en';
	const browserLang = navigator.language;
	return browserLang.startsWith('pt') ? 'pt-BR' : 'en';
}

/**
 * Load language from localStorage or detect
 */
function loadLanguage(): Language {
	if (typeof localStorage === 'undefined') return detectLanguage();
	const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
	return stored || detectLanguage();
}

/**
 * Create language store with persistence
 */
function createLanguageStore() {
	const { subscribe, set } = writable<Language>(loadLanguage());

	return {
		subscribe,
		setLanguage: (lang: Language) => {
			set(lang);
			if (typeof localStorage !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, lang);
			}
		}
	};
}

export const language = createLanguageStore();
