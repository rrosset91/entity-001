/**
 * Typewriter System
 * Synchronizes user keystrokes with filler text display (1:1 character mapping)
 * Dynamically generates more filler if user types more than current buffer
 */

export class Typewriter {
	private fillerText: string = '';
	private currentIndex: number = 0;
	private fragments: string[];

	constructor(fragments: string[]) {
		this.fragments = fragments;
		this.generateFiller();
	}

	/**
	 * Concatenate random fragments into a long string (~100 chars)
	 */
	private generateFiller(): void {
		this.fillerText = '';
		// Generate enough for typical answer length
		while (this.fillerText.length < 100) {
			const randomFragment = this.fragments[Math.floor(Math.random() * this.fragments.length)];
			this.fillerText += randomFragment;
		}
		this.currentIndex = 0;
	}

	/**
	 * Get next character from filler (called once per keystroke)
	 * Automatically generates more if we run out
	 */
	getNextChar(): string {
		// If we've exhausted current filler, generate more
		if (this.currentIndex >= this.fillerText.length) {
			const moreFragments = this.fragments[Math.floor(Math.random() * this.fragments.length)];
			this.fillerText += moreFragments;
		}

		const char = this.fillerText[this.currentIndex];
		this.currentIndex++;
		return char;
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
