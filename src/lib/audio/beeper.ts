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
	 * Subtle key press beep with random pitch variation
	 */
	keyPress() {
		// Random pitch between 800-1000Hz for variety
		const frequency = 800 + Math.random() * 200;
		this.beep(frequency, 0.03);
	}

	/**
	 * Tab start beep - Higher pitched
	 */
	tabStart() {
		this.beep(1400, 0.08);
	}

	/**
	 * Tab stop beep - Descending tone
	 */
	tabStop() {
		this.beep(1200, 0.08);
		setTimeout(() => this.beep(1000, 0.08), 100);
	}

	/**
	 * Single beep - Start processing
	 */
	startProcessing() {
		this.beep(1000, 0.1);
		setTimeout(() => this.beep(1100, 0.1), 200);
		setTimeout(() => this.beep(1200, 0.1), 400);
	}

	/**
	 * Double beep - Reveal answer
	 */
	revealAnswer() {
		this.beep(1400, 0.12);
		setTimeout(() => this.beep(1400, 0.12), 150);
	}

	/**
	 * Finish beep - Lower tone with fade
	 */
	finish() {
		this.beep(1200, 0.1);
		setTimeout(() => this.beep(900, 0.1), 150);
		setTimeout(() => this.beep(600, 0.15), 300);
	}

	/**
	 * Error beep - Harsh, discordant
	 */
	error() {
		this.beep(400, 0.15);
		setTimeout(() => this.beep(350, 0.2), 200);
	}

	/**
	 * Success completion beep - Ascending
	 */
	success() {
		this.beep(800, 0.08);
		setTimeout(() => this.beep(1000, 0.08), 100);
		setTimeout(() => this.beep(1200, 0.12), 200);
	}
}

export const beeper = new Beeper();
