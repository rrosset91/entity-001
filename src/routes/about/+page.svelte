<script lang="ts">
	import { language } from '$lib/i18n/store';
	import { translations } from '$lib/i18n/translations';

	let currentLang = $state($language);

	$effect(() => {
		const unsubscribe = language.subscribe((lang) => {
			currentLang = lang;
		});
		return unsubscribe;
	});

	$: t = translations[currentLang];
</script>

<svelte:head>
	<title>About - ENTITY-001</title>
</svelte:head>

<div class="about-page">
	<div class="about-window">
		<div class="title-bar">
			<span class="title">▓ {t.about.title}</span>
		</div>
		<div class="about-content">
			<h1>ENTITY-001</h1>

			<div class="description">
				{#each t.about.description.split('\n') as line}
					<p>{line}</p>
				{/each}
			</div>

			<div class="credits">
				<p><strong>{t.about.creator}:</strong> Roger Rosset</p>
				<p>
					<a href="https://github.com/rrosset91" target="_blank" rel="noopener noreferrer">
						GitHub: @rrosset91
					</a>
				</p>
				<p>
					<a
						href="https://github.com/rrosset91/entity-001"
						target="_blank"
						rel="noopener noreferrer"
					>
						{t.about.github}
					</a>
				</p>
			</div>

			<div class="actions">
				<a href="/" class="button">{t.ui.backToTerminal}</a>
			</div>
		</div>
	</div>
</div>

<style>
	.about-page {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
		background: var(--win95-teal);
	}

	.about-window {
		width: 90%;
		max-width: 600px;
		background: var(--win95-gray);
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

	.about-content {
		padding: 2rem;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.description {
		margin-bottom: 2rem;
		line-height: 1.6;
	}

	.description p {
		margin-bottom: 0.5rem;
	}

	.credits {
		margin-bottom: 2rem;
		padding: 1rem;
		background: var(--win95-white);
		border-top: 2px solid var(--border-darkest);
		border-left: 2px solid var(--border-darkest);
		border-right: 2px solid var(--border-light);
		border-bottom: 2px solid var(--border-light);
	}

	.credits p {
		margin-bottom: 0.5rem;
	}

	.credits a {
		color: var(--win95-blue);
		text-decoration: none;
	}

	.credits a:hover {
		text-decoration: underline;
	}

	.actions {
		text-align: center;
	}

	.button {
		display: inline-block;
		padding: 0.5rem 2rem;
		background: var(--win95-gray);
		color: var(--terminal-text);
		text-decoration: none;
		border-top: 2px solid var(--border-light);
		border-left: 2px solid var(--border-light);
		border-right: 2px solid var(--border-darkest);
		border-bottom: 2px solid var(--border-darkest);
	}

	.button:hover {
		background: var(--border-light);
	}

	.button:active {
		border-top: 2px solid var(--border-darkest);
		border-left: 2px solid var(--border-darkest);
		border-right: 2px solid var(--border-light);
		border-bottom: 2px solid var(--border-light);
	}
</style>
