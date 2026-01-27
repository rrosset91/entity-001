# 🎨 ENTITY-001 - Visual Design Documentation

## Overview

ENTITY-001 features an authentic **CRT (cathode ray tube) monitor aesthetic** reminiscent of late 1990s/early 2000s computing. The design combines Windows 95 interface elements with realistic CRT display effects.

---

## Design Philosophy

**"Nostalgic, not gimmicky"**

All visual effects are:
- ✅ Subtle enough to maintain readability
- ✅ Performance-friendly (CSS-only, no JavaScript overhead)
- ✅ Authentic to the era (1995-2000)
- ✅ Easily customizable via CSS custom properties

---

## Color Scheme

### Windows 95 Palette

```css
--win95-gray: #c0c0c0        /* Terminal background */
--win95-dark-gray: #808080   /* Borders */
--win95-white: #ffffff       /* Text on blue */
--win95-black: #000000       /* Terminal text */
--win95-blue: #000080        /* Title bar */
--win95-teal: #008080        /* Page background */
```

### Semantic Colors

```css
--terminal-bg: #c0c0c0       /* Main terminal background */
--terminal-text: #000000     /* Terminal text color */
--cursor-color: #000000      /* Blinking cursor */
```

---

## CRT Monitor Effects

### 1. Screen Curvature
**File:** `CRTEffects.svelte`

Simulates the curved glass of CRT monitors with a subtle `border-radius: 12px`.

```css
border-radius: 12px;  /* Adjustable via --screen-curvature */
overflow: hidden;
```

### 2. Scanlines
**File:** `CRTEffects.svelte`

Horizontal lines across the screen create the authentic CRT scanline effect.

```css
background: repeating-linear-gradient(
  0deg,
  rgba(0, 0, 0, 0.15) 0px,
  rgba(0, 0, 0, 0.15) 1px,
  transparent 1px,
  transparent 3px
);
opacity: 0.8;
```

**Adjustable:**
- Opacity: `--scanline-opacity` (default: 0.15)
- Spacing: `--scanline-spacing` (default: 3px)

### 3. Vignette (Edge Darkening)
**File:** `CRTEffects.svelte`

Multi-layer shadow creates realistic CRT edge darkening.

```css
box-shadow:
  inset 0 0 200px rgba(0, 0, 0, 0.5),  /* Outer vignette */
  inset 0 0 100px rgba(0, 0, 0, 0.3),  /* Mid vignette */
  inset 0 0 50px rgba(0, 0, 0, 0.15),  /* Inner glow */
  inset 0 2px 4px rgba(255, 255, 255, 0.05);  /* Screen reflection */
```

**Adjustable:** `--vignette-strength` (default: 0.5)

### 4. Phosphor Glow
**File:** `Terminal.svelte`

Subtle text glow simulating CRT phosphor illumination.

```css
/* Terminal content */
text-shadow: 
  0 0 1px rgba(0, 0, 0, 0.5),
  0 0 2px rgba(0, 0, 0, 0.3);

/* Title bar */
text-shadow: 
  0 0 2px rgba(255, 255, 255, 0.3),
  0 0 4px rgba(255, 255, 255, 0.15);

/* Cursor */
box-shadow: 
  0 0 2px rgba(0, 0, 0, 0.8),
  0 0 4px rgba(0, 0, 0, 0.4);
```

**Adjustable:** `--phosphor-glow` (default: 2px)

### 5. Screen Flicker
**File:** `CRTEffects.svelte`

Very subtle brightness variation mimics CRT electron gun fluctuation.

```css
@keyframes screen-flicker {
  0% { opacity: 0.98; }
  100% { opacity: 1; }
}
animation: screen-flicker 0.15s infinite alternate;
```

**Adjustable:** `--screen-flicker-speed` (default: 0.15s)

### 6. Random Glitch Effect
**File:** `CRTEffects.svelte`

Occasional screen distortion triggered randomly every 20-40 seconds.

**Effects during glitch:**
- Horizontal displacement (±2px)
- Clip-path distortion
- Brightness/contrast variation
- Subtle hue rotation (±5deg)

```javascript
// Triggered via JavaScript
const nextGlitch = 20000 + Math.random() * 20000; // 20-40s
```

---

## Customization Guide

All effects can be adjusted in `src/app.css`:

```css
:root {
  /* CRT Effects - Easily adjustable */
  --scanline-opacity: 0.15;        /* Scanline darkness (0-1) */
  --scanline-spacing: 3px;         /* Space between lines */
  --screen-curvature: 12px;        /* Border radius */
  --vignette-strength: 0.5;        /* Edge darkening (0-1) */
  --phosphor-glow: 2px;            /* Text glow radius */
  --screen-flicker-speed: 0.15s;   /* Flicker animation speed */
  --glitch-intensity: 2px;         /* Glitch displacement */
}
```

### Example: More Intense Effects

```css
:root {
  --scanline-opacity: 0.25;        /* Darker scanlines */
  --scanline-spacing: 2px;         /* More lines */
  --screen-curvature: 20px;        /* More curved */
  --vignette-strength: 0.8;        /* Darker edges */
  --phosphor-glow: 4px;            /* Stronger glow */
  --screen-flicker-speed: 0.1s;    /* Faster flicker */
}
```

### Example: Subtle/Minimal Effects

```css
:root {
  --scanline-opacity: 0.08;        /* Lighter scanlines */
  --scanline-spacing: 4px;         /* Fewer lines */
  --screen-curvature: 8px;         /* Less curved */
  --vignette-strength: 0.3;        /* Lighter edges */
  --phosphor-glow: 1px;            /* Minimal glow */
  --screen-flicker-speed: 0.2s;    /* Slower flicker */
}
```

---

## Component Structure

```
<CRTEffects>                      <!-- Main wrapper -->
  <div class="scanlines">         <!-- Horizontal lines overlay -->
  <div class="vignette">          <!-- Edge darkening overlay -->
  
  <div class="terminal-window">   <!-- Win95 window -->
    <div class="title-bar">       <!-- Title bar with glow -->
      ▓ ENTITY-001
    </div>
    <div class="terminal-content"> <!-- Content with phosphor glow -->
      <pre>...</pre>
      <span class="cursor">_</span> <!-- Blinking cursor with glow -->
    </div>
  </div>
</CRTEffects>
```

---

## Windows 95 UI Elements

### 3D Border Effect

Classic Win95 raised/inset borders:

```css
/* Raised (window frame) */
border-top: 2px solid var(--border-light);
border-left: 2px solid var(--border-light);
border-right: 2px solid var(--border-darkest);
border-bottom: 2px solid var(--border-darkest);

/* Inset (terminal content) */
border-top: 2px solid var(--border-darkest);
border-left: 2px solid var(--border-darkest);
border-right: 2px solid var(--border-light);
border-bottom: 2px solid var(--border-light);
```

### Win95 Scrollbar

Classic gray scrollbar with 3D borders:

```css
.terminal-content::-webkit-scrollbar {
  width: 16px;
}

.terminal-content::-webkit-scrollbar-track {
  background: var(--win95-gray);
  border-left: 2px solid var(--border-darkest);
}

.terminal-content::-webkit-scrollbar-thumb {
  background: var(--win95-gray);
  border-top: 2px solid var(--border-light);
  border-left: 2px solid var(--border-light);
  border-right: 2px solid var(--border-darkest);
  border-bottom: 2px solid var(--border-darkest);
}
```

---

## Responsive Design

**Primary Target:** Desktop only (768px+)

Mobile devices show a friendly warning:
```svelte
{#if isMobile}
  <div class="mobile-warning">
    <h1>ENTITY-001</h1>
    <p>This experience requires a desktop computer with keyboard.</p>
  </div>
{/if}
```

**Terminal Dimensions:**
```css
width: 90%;
max-width: 800px;
height: 80vh;
max-height: 600px;
```

---

## Performance

**All CRT effects are CSS-only:**
- ✅ No JavaScript overhead
- ✅ GPU-accelerated (transform, opacity, filter)
- ✅ Minimal repaints
- ✅ Smooth 60fps animations

**Only JavaScript usage:**
- Random glitch trigger (timer-based, minimal CPU)
- Terminal typing logic (user interaction)

---

## Accessibility Considerations

### Readability First

All effects are tuned to **never interfere with text readability:**
- Scanlines: 0.15 opacity (very subtle)
- Vignette: Only darkens edges, not center content
- Flicker: 0.98-1.0 opacity (barely noticeable)
- Text glow: Enhances rather than obscures

### Keyboard Navigation

- Terminal auto-focuses on load
- All interactions via keyboard (Tab, Enter, typing)
- No mouse required

### Motion Sensitivity

Users sensitive to motion can disable effects via CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .crt-effects {
    animation: none;
    filter: none;
  }
  .scanlines {
    opacity: 0.5;
  }
  .glitch {
    animation: none;
  }
}
```

---

## Inspiration & References

### Hardware References
- **Gateway 2000 CRT monitors** (1995-1998)
- **IBM PS/2 displays** (1990s)
- **Classic VT100/VT220 terminals** (green/amber phosphor)

### Design Principles
- Win95 UI guidelines
- Skeuomorphic design (realistic CRT simulation)
- Retro-futuristic aesthetics
- Mystery/sci-fi terminal interfaces

---

## Files Modified

| File | Changes |
|------|---------|
| `src/lib/components/CRTEffects.svelte` | Enhanced scanlines, vignette, curvature, flicker |
| `src/lib/components/Terminal.svelte` | Added phosphor glow to text and cursor |
| `src/app.css` | Added CSS custom properties for effect customization |

---

## Testing Checklist

- [x] Text remains readable at all zoom levels
- [x] Cursor animation works correctly
- [x] Scanlines don't cause performance issues
- [x] Glitch effect triggers randomly
- [x] Effects scale properly on different screen sizes
- [x] Win95 borders render correctly
- [x] Scrollbar maintains Win95 aesthetic
- [x] Mobile warning displays on small screens

---

## Future Enhancements (Optional)

**If requested:**
- [ ] Chromatic aberration (RGB shift on edges)
- [ ] Screen "warm-up" effect on page load
- [ ] Adjustable phosphor color themes (green, amber, white)
- [ ] Screen "turn-off" animation on exit
- [ ] Dust/scratch texture overlay
- [ ] Reflection/glare effects

---

**Last Updated:** 2026-01-27  
**Designer:** DESIGNER Agent  
**Project:** ENTITY-001
