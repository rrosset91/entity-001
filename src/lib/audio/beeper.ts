/**
 * Beeper - PC Speaker Style Audio System
 * Generates synthetic beeps using Web Audio API
 */

class Beeper {
	private ctx: AudioContext | null = null;

	/**
	 * Initialize AudioContext (call on user interaction)
	 */
	init() {
		if (typeof window === 'undefined') return;
		if (!this.ctx) {
			this.ctx = new AudioContext();
		}
	}

	/**
	 * Play a beep with specified frequency and duration
	 */
	private beep(frequency: number, duration: number) {
		if (!this.ctx) return;

		const oscillator = this.ctx.createOscillator();
		const gainNode = this.ctx.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(this.ctx.destination);

		oscillator.frequency.value = frequency;
		oscillator.type = 'square'; // PC Speaker style

		// Envelope (fade out to avoid clicks)
		const now = this.ctx.currentTime;
		gainNode.gain.setValueAtTime(0.1, now);
		gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

		oscillator.start(now);
		oscillator.stop(now + duration);
	}

	/**
	 * Single beep - Start processing
	 */
	startProcessing() {
		this.beep(1000, 0.1);
	}

	/**
	 * Double beep - Reveal answer
	 */
	revealAnswer() {
		this.beep(1200, 0.1);
		setTimeout(() => this.beep(1200, 0.1), 150);
	}

	/**
	 * Finish beep - Lower tone
	 */
	finish() {
		this.beep(800, 0.15);
	}
}

export const beeper = new Beeper();
