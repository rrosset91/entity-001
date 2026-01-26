<script lang="ts">
	import { language } from '$lib/i18n/store';
	import type { Language } from '$lib/i18n/fillers';

	let currentLang: Language = 'en';
	
	const unsubscribe = language.subscribe((val) => {
		currentLang = val;
	});
	
	function toggleLanguage() {
		const newLang: Language = currentLang === 'en' ? 'pt-BR' : 'en';
		language.setLanguage(newLang);
	}
</script>

<button class="lang-selector" on:click={toggleLanguage} title="Change language">
	{currentLang === 'en' ? 'EN' : 'PT'}
</button>

<style>
	.lang-selector {
		position: fixed;
		top: 1rem;
		right: 1rem;
		padding: 0.5rem 1rem;
		background: var(--win95-gray);
		border: none;
		font-family: 'VT323', monospace;
		font-size: 1.2rem;
		cursor: pointer;
		z-index: 100;
		border-top: 2px solid var(--border-light);
		border-left: 2px solid var(--border-light);
		border-right: 2px solid var(--border-darkest);
		border-bottom: 2px solid var(--border-darkest);
	}

	.lang-selector:hover {
		background: var(--border-light);
	}

	.lang-selector:active {
		border-top: 2px solid var(--border-darkest);
		border-left: 2px solid var(--border-darkest);
		border-right: 2px solid var(--border-light);
		border-bottom: 2px solid var(--border-light);
	}
</style>
