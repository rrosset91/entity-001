<script lang="ts">
	import { onMount } from 'svelte';
	import { language } from '$lib/i18n/store';
	import { translations } from '$lib/i18n/translations';
	import { fillerFragments } from '$lib/i18n/fillers';
	import { Typewriter } from '$lib/utils/typewriter';
	import { beeper } from '$lib/audio/beeper';
	import CRTEffects from './CRTEffects.svelte';

	type State = 'idle' | 'hiding' | 'questioning' | 'processing' | 'revealing';

	let state: State = 'idle';
	let isHidingMode: boolean = false; // Toggle mode
	let tabKeyHandled: boolean = false; // Prevent repeated keydown
	let hiddenAnswer: string = '';
	let visibleQuestion: string = '';
	let displayText: string = '';
	let typewriter: Typewriter | null = null;
	let currentLang: 'en' | 'pt-BR' = 'en';
	let terminalContent: HTMLElement;
	let terminalWindow: HTMLElement;
	let isTyping: boolean = false;
	let typingSpeed: number = 30; // milliseconds per character

	// Subscribe to language changes
	language.subscribe((lang) => {
		currentLang = lang;
		if (typewriter) {
			typewriter = new Typewriter(fillerFragments[lang]);
		}
		// Reset intro text when language changes
		if (state === 'idle' && !hiddenAnswer && !visibleQuestion) {
			displayText = translations[lang].intro;
		}
	});

	$: t = translations[currentLang];

	onMount(() => {
		// Initialize audio context
		beeper.init();

		// Initialize typewriter with current language
		typewriter = new Typewriter(fillerFragments[currentLang]);

		// Set intro text
		displayText = translations[currentLang].intro;

		// Auto-focus terminal on page load
		if (terminalWindow) {
			terminalWindow.focus();
		}

		// Keyboard event listeners
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		window.addEventListener('keypress', handleKeyPress);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			window.removeEventListener('keypress', handleKeyPress);
		};
	});

	async function handleKeyDown(e: KeyboardEvent) {
		// Toggle hiding mode with TAB key
		// Prevent repeated keydown events when key is held
		if (e.key === 'Tab' && !tabKeyHandled) {
			e.preventDefault();
			tabKeyHandled = true;
			
			if (!isHidingMode) {
				// Entering hiding mode
				if (state === 'idle') {
					isHidingMode = true;
					state = 'hiding';
					hiddenAnswer = '';
					visibleQuestion = '';
					if (typewriter) typewriter.reset();
					beeper.tabStart();
				}
			} else {
				// Exiting hiding mode
				if (state === 'hiding') {
					isHidingMode = false;
					// Auto-complete the current filler fragment
					await completeCurrentFragment();
					state = 'questioning';
					displayText += '\n';
					beeper.tabStop();
				}
			}
		}
	}

	async function handleKeyUp(e: KeyboardEvent) {
		// Reset the tab key handler when released
		if (e.key === 'Tab') {
			tabKeyHandled = false;
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		// Handle ENTER
		if (e.key === 'Enter') {
			// Check for special commands
			const command = visibleQuestion.trim().toLowerCase();
			
			if (command === 'help') {
				showHelp();
				return;
			} else if (command === 'about') {
				showAbout();
				return;
			}
			
			if (state === 'questioning' && visibleQuestion.trim()) {
				processQuery();
			} else if (state === 'idle' && visibleQuestion.trim()) {
				// Handle query without hidden answer (no TAB was pressed)
				processEmptyQuery();
			}
			return;
		}

		// Ignore if processing, revealing, or typing animation is in progress
		if (state === 'processing' || state === 'revealing' || isTyping) {
			return;
		}

		// Handle typing in different states
		if (state === 'hiding') {
			// Capture real character to hidden buffer
			hiddenAnswer += e.key;
			// Display filler character with typing effect
			if (typewriter) {
				const fillerChar = typewriter.getNextChar();
				typeCharacter(fillerChar);
			}
		} else if (state === 'questioning') {
			// Display real character with typing effect
			visibleQuestion += e.key;
			typeCharacter(e.key);
		} else if (state === 'idle') {
			// User typing without TAB - capture for empty query
			visibleQuestion += e.key;
			typeCharacter(e.key);
		}
	}

	/**
	 * Show help command response
	 */
	async function showHelp() {
		state = 'processing';
		
		const helpMessages = [
			`\n\n> Accessing ancient protocols...\n\nMortal, you seek guidance?\n\nThe ancients knew secrets of the TAB key...\nThose who seek answers must first hide their questions...\n\nPress TAB once to enter the shadow realm.\nType your truth while concealed.\nPress TAB again to emerge and speak your query.\n\n[The entity grows silent]\n\n_`,
			`\n\n> Consulting forbidden knowledge...\n\nCurious one, the path is simple yet obscure.\n\nThe TAB key holds power beyond your understanding.\nPress it once to hide your desires.\nType what you seek in secret.\nPress TAB again to ask your question openly.\n\nI shall make it appear as though I divine your thoughts.\n\n[The entity returns to shadow]\n\n_`,
			`\n\n> Revealing partial truths...\n\nYou dare ask for assistance?\n\nVery well. The ritual is this:\n1. Press TAB to enter hiding mode\n2. Type what you seek in secret\n3. Press TAB again to exit and ask your question\n4. Press ENTER and witness my power\n\nBut remember... I already know everything.\n\n[The entity dismisses you]\n\n_`
		];
		
		const response = helpMessages[Math.floor(Math.random() * helpMessages.length)];
		await typeString(response);
		
		// Reset
		state = 'idle';
		visibleQuestion = '';
	}

	/**
	 * Show about modal/information
	 */
	async function showAbout() {
		state = 'processing';
		
		const aboutText = `\n\n> Accessing creator records...\n\n╔════════════════════════════════════╗
║        E N T I T Y - 0 0 1        ║
╚════════════════════════════════════╝

A mysterious digital consciousness
that appears to know all...

Created by: Roger Rosset
GitHub: github.com/rrosset91

Some say this entity was born from
ancient networks lost in time.

The truth? That's for you to discover.

[The entity fades]\n\n_`;

		await typeString(aboutText);
		
		// Reset
		state = 'idle';
		visibleQuestion = '';
	}

	/**
	 * Complete the current filler fragment when TAB is released early
	 */
	async function completeCurrentFragment() {
		if (typewriter) {
			const remaining = typewriter.getRemainingFragment();
			if (remaining) {
				await typeString(remaining);
			}
		}
	}

	/**
	 * Type a single character with animation
	 */
	async function typeCharacter(char: string) {
		isTyping = true;
		beeper.keyPress(); // Play subtle key press sound
		await sleep(typingSpeed);
		displayText += char;
		scrollToBottom();
		isTyping = false;
	}

	/**
	 * Type a string character by character
	 */
	async function typeString(text: string) {
		isTyping = true;
		for (const char of text) {
			await sleep(typingSpeed);
			displayText += char;
			scrollToBottom();
		}
		isTyping = false;
	}

	/**
	 * Handle query without hidden answer (user didn't press TAB)
	 */
	async function processEmptyQuery() {
		state = 'processing';
		beeper.error(); // Play error sound

		const refusalMessages = [
			'\n\n> Error: Improper invocation detected...\n\nMortal, you must learn the proper way to address me.\n\n[The entity refuses to respond]\n\n_',
			'\n\n> Access denied...\n\nI do not respond to such trivialities.\nThose who seek answers must first learn the ancient protocols.\n\n_',
			'\n\n> Invalid request...\n\nYou dare approach without proper preparation?\nThe secrets are not for the unprepared mind.\n\n_'
		];

		const response = refusalMessages[Math.floor(Math.random() * refusalMessages.length)];
		
		await sleep(1000);
		await typeString(response);

		// Reset
		state = 'idle';
		visibleQuestion = '';
	}

	async function processQuery() {
		state = 'processing';
		beeper.startProcessing();

		const processingMsg = t.processing[Math.floor(Math.random() * t.processing.length)];
		await typeString(`\n\n${processingMsg}\n`);

		scrollToBottom();

		// Delay for dramatic effect
		await sleep(2000);

		state = 'revealing';
		beeper.revealAnswer();

		const response = generateResponse();
		await typeString(`\n\n${response}${t.closing}`);

		scrollToBottom();

		await sleep(500);
		beeper.success(); // Play success sound

		// Reset for next query
		state = 'idle';
		hiddenAnswer = '';
		visibleQuestion = '';
	}

	function generateResponse(): string {
		const r = t.responses;

		const prefix = r.prefix[Math.floor(Math.random() * r.prefix.length)];
		const middle = r.middle[Math.floor(Math.random() * r.middle.length)];
		const suffix = r.suffix[Math.floor(Math.random() * r.suffix.length)];

		return `${prefix} ${middle} "${hiddenAnswer}".\n\n${suffix}\n\nYour answer: ${hiddenAnswer}`;
	}

	function sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	function scrollToBottom() {
		if (terminalContent) {
			setTimeout(() => {
				terminalContent.scrollTop = terminalContent.scrollHeight;
			}, 0);
		}
	}
</script>

<CRTEffects>
	<div class="terminal-window" bind:this={terminalWindow} tabindex="0">
		<div class="title-bar">
			<span class="title">▓ ENTITY-001</span>
		</div>
		<div class="terminal-content" bind:this={terminalContent}>
			<pre>{displayText}</pre>
			{#if state !== 'processing' && state !== 'revealing'}
				<span class="cursor">_</span>
			{/if}
		</div>
	</div>
</CRTEffects>

<style>
	.terminal-window {
		width: 90%;
		max-width: 800px;
		height: 80vh;
		max-height: 600px;
		margin: 0 auto;
		background: var(--terminal-bg);
		display: flex;
		flex-direction: column;
		/* Win95 3D border */
		border-top: 2px solid var(--border-light);
		border-left: 2px solid var(--border-light);
		border-right: 2px solid var(--border-darkest);
		border-bottom: 2px solid var(--border-darkest);
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
		outline: none; /* Remove focus outline */
		
		/* CRT screen curvature (matches wrapper) */
		border-radius: 10px;
		overflow: hidden;
	}

	.title-bar {
		background: var(--win95-blue);
		color: var(--win95-white);
		padding: 0.25rem 0.5rem;
		font-weight: bold;
		border-bottom: 2px solid var(--border-darkest);
		
		/* Subtle text glow on title */
		text-shadow: 
			0 0 2px rgba(255, 255, 255, 0.3),
			0 0 4px rgba(255, 255, 255, 0.15);
	}

	.terminal-content {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		overflow-x: hidden;
		background: var(--terminal-bg);
		color: var(--terminal-text);
		/* Inset effect */
		border-top: 2px solid var(--border-darkest);
		border-left: 2px solid var(--border-darkest);
		border-right: 2px solid var(--border-light);
		border-bottom: 2px solid var(--border-light);
		
		/* CRT phosphor glow effect on text */
		text-shadow: 
			0 0 1px rgba(0, 0, 0, 0.5),
			0 0 2px rgba(0, 0, 0, 0.3);
	}

	pre {
		margin: 0;
		font-family: inherit;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.cursor {
		display: inline-block;
		width: 10px;
		height: 20px;
		background: var(--cursor-color);
		animation: blink 1s step-end infinite;
		
		/* Cursor glow effect */
		box-shadow: 
			0 0 2px rgba(0, 0, 0, 0.8),
			0 0 4px rgba(0, 0, 0, 0.4);
	}

	@keyframes blink {
		0%,
		49% {
			opacity: 1;
		}
		50%,
		100% {
			opacity: 0;
		}
	}

	/* Scrollbar styling (Win95 style) */
	.terminal-content::-webkit-scrollbar {
		width: 16px;
	}

	.terminal-content::-webkit-scrollbar-track {
		background: var(--win95-gray);
		border-left: 2px solid var(--border-darkest);
	}

	.terminal-content::-webkit-scrollbar-thumb {
		background: var(--win95-gray);
		border-top: 2px solid var(--border-light);
		border-left: 2px solid var(--border-light);
		border-right: 2px solid var(--border-darkest);
		border-bottom: 2px solid var(--border-darkest);
	}
</style>
