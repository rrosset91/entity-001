<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
	import { onMount } from 'svelte';

	let isMobile = $state(false);

	onMount(() => {
		// Detect mobile device
		isMobile =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
			window.innerWidth < 768;
	});
</script>

<svelte:head>
	<title>ENTITY-001</title>
	<meta name="description" content="A mysterious digital entity that seems to know all" />
</svelte:head>

{#if isMobile}
	<div class="mobile-warning">
		<h1>ENTITY-001</h1>
		<p>This experience requires a desktop computer with keyboard.</p>
		<p class="hint">For the full experience, please visit on a desktop device.</p>
	</div>
{:else}
	<LanguageSelector />
	<div class="app">
		<Terminal />
	</div>
{/if}

<style>
	.app {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
	}

	.mobile-warning {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		padding: 2rem;
		text-align: center;
		background: var(--win95-teal);
		color: var(--win95-white);
	}

	.mobile-warning h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		color: var(--win95-white);
	}

	.mobile-warning p {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.mobile-warning .hint {
		font-size: 1.2rem;
		opacity: 0.8;
		margin-top: 1rem;
	}
</style>
