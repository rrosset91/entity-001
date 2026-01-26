<script lang="ts">
	import { onMount } from 'svelte';

	let glitchActive = false;

	onMount(() => {
		// Trigger glitch effect randomly every 20-40 seconds
		const triggerGlitch = () => {
			glitchActive = true;
			setTimeout(() => {
				glitchActive = false;
			}, 300);

			// Schedule next glitch
			const nextGlitch = 20000 + Math.random() * 20000; // 20-40s
			setTimeout(triggerGlitch, nextGlitch);
		};

		// Start first glitch after 30s
		const initialDelay = setTimeout(triggerGlitch, 30000);

		return () => {
			clearTimeout(initialDelay);
		};
	});
</script>

<div class="crt-effects" class:glitch={glitchActive}>
	<div class="scanlines"></div>
	<div class="vignette"></div>
	<slot />
</div>

<style>
	.crt-effects {
		position: relative;
		width: 100%;
		height: 100%;
	}

	/* Scanlines */
	.scanlines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.1) 0px,
			rgba(0, 0, 0, 0.1) 1px,
			transparent 1px,
			transparent 2px
		);
		pointer-events: none;
		z-index: 10;
	}

	/* Vignette + Curvature */
	.vignette {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 8px;
		box-shadow:
			inset 0 0 150px rgba(0, 0, 0, 0.3),
			inset 0 0 50px rgba(0, 0, 0, 0.2);
		pointer-events: none;
		z-index: 11;
	}

	/* Glitch Effect */
	.glitch {
		animation: glitch-anim 0.3s ease-in-out;
	}

	@keyframes glitch-anim {
		0%,
		100% {
			clip-path: inset(0);
			transform: translate(0);
		}
		20% {
			clip-path: inset(10% 0 30% 0);
			transform: translate(-2px, 2px);
		}
		40% {
			clip-path: inset(50% 0 20% 0);
			transform: translate(2px, -2px);
		}
		60% {
			clip-path: inset(30% 0 40% 0);
			transform: translate(-1px, 1px);
		}
		80% {
			clip-path: inset(20% 0 50% 0);
			transform: translate(1px, -1px);
		}
	}
</style>
