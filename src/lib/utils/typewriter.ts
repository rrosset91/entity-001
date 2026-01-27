/**
 * Typewriter System
 * Synchronizes user keystrokes with filler text display (1:1 character mapping)
 * Dynamically generates more filler if user types more than current buffer
 */

export class Typewriter {
	private fillerText: string = '';
	private currentIndex: number = 0;
	private fragments: string[];
	private currentFragmentStart: number = 0;
	private currentFragment: string = '';

	constructor(fragments: string[]) {
		this.fragments = fragments;
		this.generateFiller();
	}

	/**
	 * Concatenate random fragments into a long string (~100 chars)
	 */
	private generateFiller(): void {
		this.fillerText = '';
		this.currentIndex = 0;
		this.currentFragmentStart = 0;
		// Select initial fragment
		this.currentFragment = this.fragments[Math.floor(Math.random() * this.fragments.length)];
		this.fillerText = this.currentFragment;
		// Generate enough for typical answer length
		while (this.fillerText.length < 100) {
			const randomFragment = this.fragments[Math.floor(Math.random() * this.fragments.length)];
			this.fillerText += randomFragment;
		}
	}

	/**
	 * Select a new random fragment
	 */
	private selectNewFragment(): void {
		this.currentFragmentStart = this.currentIndex;
		this.currentFragment = this.fragments[Math.floor(Math.random() * this.fragments.length)];
		this.fillerText += this.currentFragment;
	}

	/**
	 * Get next character from filler (called once per keystroke)
	 * Automatically generates more if we run out
	 */
	getNextChar(): string {
		// If we've exhausted current filler, generate more
		if (this.currentIndex >= this.fillerText.length) {
			this.selectNewFragment();
		}

		// Check if we're starting a new fragment
		const fragmentEndIndex = this.currentFragmentStart + this.currentFragment.length;
		if (this.currentIndex >= fragmentEndIndex) {
			this.selectNewFragment();
		}

		const char = this.fillerText[this.currentIndex];
		this.currentIndex++;
		return char;
	}

	/**
	 * Get the remaining text of the current fragment
	 */
	getRemainingFragment(): string {
		if (!this.currentFragment) return '';
		
		const positionInFragment = this.currentIndex - this.currentFragmentStart;
		if (positionInFragment >= this.currentFragment.length) return '';
		
		return this.currentFragment.slice(positionInFragment);
	}

	/**
	 * Reset for new session
	 */
	reset(): void {
		this.generateFiller();
	}

	/**
	 * Get current position (for debugging)
	 */
	getPosition(): number {
		return this.currentIndex;
	}
}
