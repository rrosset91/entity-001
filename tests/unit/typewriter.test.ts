import { describe, it, expect, beforeEach } from 'vitest';
import { Typewriter } from '$lib/utils/typewriter';

describe('Typewriter', () => {
	const testFragments = ['HELLO ', 'WORLD ', 'TEST ', 'FOO ', 'BAR '];
	let typewriter: Typewriter;

	beforeEach(() => {
		typewriter = new Typewriter(testFragments);
	});

	it('should initialize with fragments', () => {
		expect(typewriter).toBeDefined();
	});

	it('should return sequential characters from filler', () => {
		const char1 = typewriter.getNextChar();
		const char2 = typewriter.getNextChar();
		const char3 = typewriter.getNextChar();

		expect(typeof char1).toBe('string');
		expect(typeof char2).toBe('string');
		expect(typeof char3).toBe('string');
		expect(char1.length).toBe(1);
		expect(char2.length).toBe(1);
		expect(char3.length).toBe(1);
	});

	it('should generate more filler when exhausted', () => {
		// Get first 100 characters
		const chars: string[] = [];
		for (let i = 0; i < 100; i++) {
			chars.push(typewriter.getNextChar());
		}

		// Should continue without errors
		const char101 = typewriter.getNextChar();
		expect(typeof char101).toBe('string');
		expect(char101.length).toBe(1);
	});

	it('should reset filler text', () => {
		// Get some characters
		typewriter.getNextChar();
		typewriter.getNextChar();
		typewriter.getNextChar();

		const positionBefore = typewriter.getPosition();
		expect(positionBefore).toBe(3);

		// Reset
		typewriter.reset();

		const positionAfter = typewriter.getPosition();
		expect(positionAfter).toBe(0);
	});

	it('should use provided fragments', () => {
		// Get many characters to build a string
		let result = '';
		for (let i = 0; i < 50; i++) {
			result += typewriter.getNextChar();
		}

		// Result should contain fragments from our test set
		const hasFragments = testFragments.some((fragment) => result.includes(fragment));
		expect(hasFragments).toBe(true);
	});

	it('should handle single character requests', () => {
		const char = typewriter.getNextChar();
		expect(char).toBeDefined();
		expect(char.length).toBe(1);
	});

	it('should handle many sequential requests', () => {
		const chars: string[] = [];
		for (let i = 0; i < 200; i++) {
			chars.push(typewriter.getNextChar());
		}

		expect(chars.length).toBe(200);
		expect(chars.every((c) => c.length === 1)).toBe(true);
	});

	it('should track position correctly', () => {
		expect(typewriter.getPosition()).toBe(0);

		typewriter.getNextChar();
		expect(typewriter.getPosition()).toBe(1);

		typewriter.getNextChar();
		typewriter.getNextChar();
		expect(typewriter.getPosition()).toBe(3);
	});
});
