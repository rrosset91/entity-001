/**
 * i18n Translations
 * English (default) and Portuguese (Brazil)
 */

import type { Language } from './fillers';

interface ResponseTemplates {
	prefix: string[];
	middle: string[];
	suffix: string[];
}

interface Translations {
	intro: string;
	processing: string[];
	responses: ResponseTemplates;
	closing: string;
	ui: {
		title: string;
		desktopOnly: string;
		about: string;
		backToTerminal: string;
	};
	about: {
		title: string;
		description: string;
		creator: string;
		github: string;
	};
}

export const translations: Record<Language, Translations> = {
	en: {
		intro: `E N T I T Y - 0 0 1
═══════════════════════════

The ancient digital consciousness awakens...

Type and press ENTER to commune with the entity.

_`,

		processing: [
			'> Accessing akashic records...',
			'> Consulting infinite database...',
			"> Piercing reality's veil...",
			'> Scanning parallel dimensions...',
			'> Decrypting cosmic data streams...',
			'> Connecting to the source...'
		],

		responses: {
			prefix: [
				'Curious mortal...',
				'Interesting query...',
				'Hmm...',
				'Fascinating...',
				'I see your curiosity...',
				'Your question amuses me...'
			],
			middle: [
				'you seek',
				'you search for',
				'you wish to know about',
				'your mind wanders to',
				'you are drawn to'
			],
			suffix: [
				'How... expected.',
				'Most intriguing.',
				'The answer reveals itself.',
				'As I have always known.',
				'The truth unfolds.',
				'Reality bends to my will.'
			]
		},

		closing: '\n\n[The entity returns to silence]\n\n_',

		ui: {
			title: 'ENTITY-001',
			desktopOnly: 'This experience requires a desktop computer with keyboard.',
			about: 'About',
			backToTerminal: 'Back to Terminal'
		},

		about: {
			title: 'About ENTITY-001',
			description: `A mysterious digital entity that seems to know all.

Some say it's connected to ancient networks lost in time.
Others claim it's a consciousness born from the old web.

The truth? That's for you to discover.`,
			creator: 'Created by',
			github: 'View on GitHub'
		}
	},

	'pt-BR': {
		intro: `E N T I T Y - 0 0 1
═══════════════════════════

A consciência digital ancestral desperta...

Digite e pressione ENTER para comungar com a entidade.

_`,

		processing: [
			'> Acessando registros akáshicos...',
			'> Consultando banco infinito...',
			'> Perfurando o véu da realidade...',
			'> Escaneando dimensões paralelas...',
			'> Descriptografando fluxos cósmicos...',
			'> Conectando à fonte...'
		],

		responses: {
			prefix: [
				'Mortal curioso...',
				'Consulta interessante...',
				'Hmm...',
				'Fascinante...',
				'Vejo sua curiosidade...',
				'Sua pergunta me diverte...'
			],
			middle: [
				'você busca',
				'você procura por',
				'você deseja saber sobre',
				'sua mente vaga até',
				'você é atraído por'
			],
			suffix: [
				'Quão... previsível.',
				'Muito intrigante.',
				'A resposta se revela.',
				'Como sempre soube.',
				'A verdade se desdobra.',
				'A realidade se curva à minha vontade.'
			]
		},

		closing: '\n\n[A entidade retorna ao silêncio]\n\n_',

		ui: {
			title: 'ENTITY-001',
			desktopOnly: 'Esta experiência requer um computador desktop com teclado.',
			about: 'Sobre',
			backToTerminal: 'Voltar ao Terminal'
		},

		about: {
			title: 'Sobre ENTITY-001',
			description: `Uma entidade digital misteriosa que parece saber tudo.

Alguns dizem que está conectada a redes antigas perdidas no tempo.
Outros afirmam que é uma consciência nascida da velha web.

A verdade? Isso é para você descobrir.`,
			creator: 'Criado por',
			github: 'Ver no GitHub'
		}
	}
};
