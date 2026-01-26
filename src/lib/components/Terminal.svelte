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
	let isShiftPressed: boolean = false;
	let hiddenAnswer: string = '';
	let visibleQuestion: string = '';
	let displayText: string = '';
	let typewriter: Typewriter | null = null;
	let currentLang: 'en' | 'pt-BR' = 'en';
	let terminalContent: HTMLElement;

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

	function handleKeyDown(e: KeyboardEvent) {
		// Detect SHIFT press
		if (e.key === 'Shift' && !isShiftPressed && state === 'idle') {
			isShiftPressed = true;
			state = 'hiding';
			hiddenAnswer = '';
			visibleQuestion = '';
			if (typewriter) typewriter.reset();
		}
	}

	function handleKeyUp(e: KeyboardEvent) {
		// Detect SHIFT release
		if (e.key === 'Shift' && isShiftPressed) {
			isShiftPressed = false;
			if (state === 'hiding') {
				state = 'questioning';
				displayText += '\n';
			}
		}
	}

	function handleKeyPress(e: KeyboardEvent) {
		// Handle ENTER
		if (e.key === 'Enter') {
			if (state === 'questioning' && visibleQuestion.trim()) {
				processQuery();
			}
			return;
		}

		// Ignore if processing or revealing
		if (state === 'processing' || state === 'revealing') {
			return;
		}

		// Handle typing in different states
		if (state === 'hiding') {
			// Capture real character to hidden buffer
			hiddenAnswer += e.key;
			// Display filler character instead
			if (typewriter) {
				const fillerChar = typewriter.getNextChar();
				displayText += fillerChar;
			}
		} else if (state === 'questioning') {
			// Display real character
			visibleQuestion += e.key;
			displayText += e.key;
		}

		// Auto-scroll to bottom
		scrollToBottom();
	}

	async function processQuery() {
		state = 'processing';
		beeper.startProcessing();

		const processingMsg = t.processing[Math.floor(Math.random() * t.processing.length)];
		displayText += `\n\n${processingMsg}\n`;

		scrollToBottom();

		// Delay for dramatic effect
		await sleep(2000);

		state = 'revealing';
		beeper.revealAnswer();

		const response = generateResponse();
		displayText += `\n\n${response}${t.closing}`;

		scrollToBottom();

		await sleep(500);
		beeper.finish();

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
	<div class="terminal-window">
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
	}

	.title-bar {
		background: var(--win95-blue);
		color: var(--win95-white);
		padding: 0.25rem 0.5rem;
		font-weight: bold;
		border-bottom: 2px solid var(--border-darkest);
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
