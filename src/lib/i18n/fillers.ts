/**
 * Filler Fragments System
 * Small, modular text fragments that concatenate to create mystical phrases
 * Works with both short answers (3 chars) and long answers (50+ chars)
 */

export type Language = 'en' | 'pt-BR';

export const fillerFragments: Record<Language, string[]> = {
	en: [
		'OH ',
		'ENTITY ',
		'REVEAL ',
		'ANSWER ',
		'MIGHTY ',
		'ORACLE ',
		'SPEAK ',
		'SHOW ',
		'TELL ',
		'GRANT ',
		'WISDOM ',
		'TRUTH ',
		'KNOWLEDGE ',
		'ALL-KNOWING ',
		'SUPREME ',
		'DIGITAL ',
		'ONE ',
		'ME ',
		'YOUR ',
		'THE ',
		'ANCIENT ',
		'COSMIC ',
		'ETERNAL ',
		'INFINITE ',
		'MASTER ',
		'GUIDE ',
		'ENLIGHTEN ',
		'BESTOW '
	],

	'pt-BR': [
		'OH ',
		'ENTITY ',
		'REVELE ',
		'RESPONDA ',
		'PODEROSA ',
		'ORÁCULO ',
		'FALE ',
		'MOSTRE ',
		'DIGA ',
		'CONCEDA ',
		'SABEDORIA ',
		'VERDADE ',
		'CONHECIMENTO ',
		'ONISCIENTE ',
		'SUPREMA ',
		'DIGITAL ',
		'UMA ',
		'ME ',
		'SUA ',
		'A ',
		'ANTIGA ',
		'CÓSMICA ',
		'ETERNA ',
		'INFINITA ',
		'MESTRE ',
		'GUIE ',
		'ILUMINE ',
		'CONCEDA '
	]
};
