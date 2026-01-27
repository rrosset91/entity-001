<!--
	CRT MONITOR EFFECTS COMPONENT
	=============================
	
	Applies authentic CRT (cathode ray tube) monitor effects to create
	a nostalgic retro computing aesthetic reminiscent of 1995-2000 era monitors.
	
	EFFECTS INCLUDED:
	- Screen Curvature: Subtle border-radius simulating curved glass
	- Scanlines: Horizontal lines across screen (adjustable opacity/spacing)
	- Vignette: Edge darkening with multi-layer shadows
	- Phosphor Glow: Text glow effect (managed in Terminal.svelte)
	- Screen Flicker: Very subtle brightness variation
	- Random Glitch: Occasional screen distortion (every 20-40s)
	
	CUSTOMIZATION:
	Adjust effects in app.css using CSS custom properties:
	- --screen-curvature: Border radius (default: 12px)
	- --scanline-opacity: Scanline darkness (default: 0.15)
	- --scanline-spacing: Spacing between lines (default: 3px)
	- --vignette-strength: Edge darkening (default: 0.5)
	- --screen-flicker-speed: Flicker animation speed (default: 0.15s)
	
	PERFORMANCE: CSS-only effects, no JavaScript overhead
	ACCESSIBILITY: All effects are subtle to maintain readability
-->
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
	/* === CRT MONITOR WRAPPER === */
	.crt-effects {
		position: relative;
		width: 100%;
		height: 100%;
		
		/* Subtle screen curvature (like late 90s/early 2000s CRTs) */
		border-radius: 12px;
		overflow: hidden;
		
		/* Phosphor glow effect on the entire screen */
		filter: brightness(1.05) contrast(1.1);
		
		/* Very subtle screen flicker */
		animation: screen-flicker 0.15s infinite alternate;
	}

	/* === SCANLINES (horizontal CRT lines) === */
	.scanlines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		
		/* More authentic CRT scanline pattern */
		background: repeating-linear-gradient(
			0deg,
			rgba(0, 0, 0, 0.15) 0px,
			rgba(0, 0, 0, 0.15) 1px,
			transparent 1px,
			transparent 3px
		);
		
		pointer-events: none;
		z-index: 10;
		
		/* Slight opacity variation for more organic feel */
		opacity: 0.8;
	}

	/* === VIGNETTE (edge darkening like CRT monitors) === */
	.vignette {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		
		/* Curved glass effect */
		border-radius: 12px;
		
		/* Multi-layer shadow for realistic CRT edge darkening */
		box-shadow:
			/* Outer vignette (stronger) */
			inset 0 0 200px rgba(0, 0, 0, 0.5),
			/* Mid vignette */
			inset 0 0 100px rgba(0, 0, 0, 0.3),
			/* Inner subtle glow */
			inset 0 0 50px rgba(0, 0, 0, 0.15),
			/* Screen reflection (top edge) */
			inset 0 2px 4px rgba(255, 255, 255, 0.05);
		
		pointer-events: none;
		z-index: 11;
	}

	/* === SCREEN FLICKER (very subtle) === */
	@keyframes screen-flicker {
		0% {
			opacity: 0.98;
		}
		100% {
			opacity: 1;
		}
	}

	/* === GLITCH EFFECT (when active) === */
	.glitch {
		animation: glitch-anim 0.3s ease-in-out;
	}

	@keyframes glitch-anim {
		0%,
		100% {
			clip-path: inset(0);
			transform: translate(0);
			filter: brightness(1.05) contrast(1.1);
		}
		20% {
			clip-path: inset(10% 0 30% 0);
			transform: translate(-2px, 2px);
			filter: brightness(1.1) contrast(1.2) hue-rotate(5deg);
		}
		40% {
			clip-path: inset(50% 0 20% 0);
			transform: translate(2px, -2px);
			filter: brightness(0.95) contrast(1.3) hue-rotate(-5deg);
		}
		60% {
			clip-path: inset(30% 0 40% 0);
			transform: translate(-1px, 1px);
			filter: brightness(1.05) contrast(1.15);
		}
		80% {
			clip-path: inset(20% 0 50% 0);
			transform: translate(1px, -1px);
			filter: brightness(1.02) contrast(1.1);
		}
	}
</style>
