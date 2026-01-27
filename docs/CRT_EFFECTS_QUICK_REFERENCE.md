# 🖥️ CRT Effects - Quick Visual Reference

> Quick guide to understanding and adjusting each CRT effect

---

## 📐 Effect Layers (Visual Stack)

```
┌─────────────────────────────────────────────┐
│  5. GLITCH (occasional)                     │  ← Random distortion
├─────────────────────────────────────────────┤
│  4. VIGNETTE (inset shadow)                 │  ← Edge darkening
├─────────────────────────────────────────────┤
│  3. SCANLINES (repeating gradient)          │  ← Horizontal lines
├─────────────────────────────────────────────┤
│  2. SCREEN FLICKER (opacity animation)      │  ← Subtle variation
├─────────────────────────────────────────────┤
│  1. TERMINAL CONTENT                        │
│     - Phosphor text glow                    │  ← Text shadows
│     - Cursor glow                           │  ← Cursor shadows
│     - Win95 borders                         │  ← 3D effects
└─────────────────────────────────────────────┘
     ↑
CURVATURE (border-radius on wrapper)
```

---

## 🎨 Effect Breakdown

### 1. SCREEN CURVATURE
**What it does:** Rounds the corners of the terminal to simulate curved CRT glass

```
Without:          With:
┌──────────┐      ╭──────────╮
│          │      │          │
│ TERMINAL │      │ TERMINAL │
│          │      │          │
└──────────┘      ╰──────────╯
 Sharp edges       Curved edges
```

**Adjustable:** `--screen-curvature: 12px`
- Smaller value = less curve
- Larger value = more curve
- 0 = no curve (square corners)

---

### 2. SCANLINES
**What it does:** Adds horizontal lines across the screen (CRT electron beam lines)

```
Visual representation:
─────────────────  ← Dark line (1px)
                   ← Transparent (2px)
─────────────────  ← Dark line (1px)
                   ← Transparent (2px)
─────────────────  ← Repeating...
```

**Adjustable:** 
- `--scanline-opacity: 0.15` (darkness: 0.0-1.0)
- `--scanline-spacing: 3px` (spacing: 2-5px)

**Examples:**
- **Subtle:** opacity 0.08, spacing 4px
- **Default:** opacity 0.15, spacing 3px
- **Strong:** opacity 0.25, spacing 2px

---

### 3. VIGNETTE
**What it does:** Darkens the edges like CRT monitors (light falloff)

```
Visual representation:
█████████████████  ← Very dark edges
██████       ████
███           ███  ← Bright center
███           ███
██████       ████
█████████████████  ← Very dark edges
```

**Multi-layer shadow:**
1. Outer layer: 200px spread, 0.5 opacity (strong)
2. Mid layer: 100px spread, 0.3 opacity (medium)
3. Inner layer: 50px spread, 0.15 opacity (subtle)
4. Top reflection: 2px, 0.05 opacity (glass glare)

**Adjustable:** `--vignette-strength: 0.5` (0.0-1.0)

---

### 4. PHOSPHOR GLOW
**What it does:** Adds subtle glow to text (CRT phosphor illumination)

```
Without glow:        With glow:
TEXT                 T̲E̲X̲T̲  (glowing)
```

**Applied to:**
- Terminal text (black glow on gray background)
- Title bar text (white glow on blue background)
- Cursor (strong black glow)

**Code:**
```css
text-shadow: 
  0 0 1px rgba(0, 0, 0, 0.5),   /* Inner glow */
  0 0 2px rgba(0, 0, 0, 0.3);   /* Outer glow */
```

**Adjustable:** `--phosphor-glow: 2px` (1-4px)

---

### 5. SCREEN FLICKER
**What it does:** Very subtle brightness variation (electron gun fluctuation)

```
Timeline:
0.00s: ████████ (98% opacity)  ↓ fade out
0.08s: ████████ (99% opacity)  ↓
0.15s: ████████ (100% opacity) ← full bright
0.08s: ████████ (99% opacity)  ↑
0.00s: ████████ (98% opacity)  ↑ fade in
(repeat infinitely)
```

**Adjustable:** `--screen-flicker-speed: 0.15s`
- Faster: 0.1s (more noticeable)
- Default: 0.15s (subtle)
- Slower: 0.2s (very subtle)

**Note:** Set to `animation: none` to disable

---

### 6. GLITCH EFFECT
**What it does:** Random screen distortion every 20-40 seconds

```
Normal state:
┌──────────┐
│ TERMINAL │
│ CONTENT  │
└──────────┘

During glitch (0.3s):
┌──────────┐
│TE╔MINAL  │  ← Horizontal displacement
│  ╚ONT═NT │  ← Clip-path distortion
└──────────┘  ← Color shift (hue-rotate)
```

**Stages (20% intervals):**
1. 0%: Normal
2. 20%: Shift right 2px, clip top/bottom, brighten
3. 40%: Shift left 2px, clip middle, darken
4. 60%: Shift right 1px, clip different area
5. 80%: Shift left 1px, clip another area
6. 100%: Return to normal

**Adjustable:** `--glitch-intensity: 2px` (displacement amount)

---

## 🎛️ Quick Customization Presets

### MINIMAL (barely noticeable)
```css
:root {
  --scanline-opacity: 0.05;
  --scanline-spacing: 5px;
  --screen-curvature: 6px;
  --vignette-strength: 0.2;
  --phosphor-glow: 1px;
  --screen-flicker-speed: 0.25s;
  --glitch-intensity: 1px;
}
```

### DEFAULT (subtle but authentic)
```css
:root {
  --scanline-opacity: 0.15;
  --scanline-spacing: 3px;
  --screen-curvature: 12px;
  --vignette-strength: 0.5;
  --phosphor-glow: 2px;
  --screen-flicker-speed: 0.15s;
  --glitch-intensity: 2px;
}
```

### INTENSE (dramatic CRT look)
```css
:root {
  --scanline-opacity: 0.25;
  --scanline-spacing: 2px;
  --screen-curvature: 20px;
  --vignette-strength: 0.8;
  --phosphor-glow: 4px;
  --screen-flicker-speed: 0.1s;
  --glitch-intensity: 4px;
}
```

### DISABLED (no CRT effects)
```css
:root {
  --scanline-opacity: 0;
  --scanline-spacing: 0;
  --screen-curvature: 0;
  --vignette-strength: 0;
  --phosphor-glow: 0;
}

.crt-effects {
  animation: none;
  filter: none;
}
```

---

## 🔧 Common Adjustments

### "Scanlines are too dark"
```css
--scanline-opacity: 0.08;  /* Reduce from 0.15 */
```

### "Screen is too curved"
```css
--screen-curvature: 8px;  /* Reduce from 12px */
```

### "Edges are too dark"
```css
--vignette-strength: 0.3;  /* Reduce from 0.5 */
```

### "Text glow is too strong"
```css
--phosphor-glow: 1px;  /* Reduce from 2px */
```

### "Flicker is distracting"
```css
--screen-flicker-speed: 0.3s;  /* Slow down from 0.15s */
/* OR disable completely: */
.crt-effects {
  animation: none;
}
```

### "Glitch is too intense"
```css
--glitch-intensity: 1px;  /* Reduce from 2px */
```

---

## 📊 Performance Impact

| Effect | CPU Impact | GPU Impact | Overall |
|--------|-----------|------------|---------|
| Curvature | None | None | ✅ Free |
| Scanlines | None | Low | ✅ Free |
| Vignette | None | Low | ✅ Free |
| Phosphor Glow | None | Low | ✅ Free |
| Screen Flicker | None | Medium | ✅ Minimal |
| Glitch (when active) | None | High | ✅ Brief only |

**Total impact:** Negligible (all GPU-accelerated CSS)

---

## 🎯 Readability Test

Good CRT effects should:
- ✅ Allow reading all text without strain
- ✅ Not obscure any UI elements
- ✅ Enhance the retro feel without being distracting
- ✅ Work at different zoom levels (100%, 125%, 150%)

**If text becomes hard to read:**
1. Reduce scanline opacity
2. Reduce vignette strength
3. Reduce phosphor glow
4. Disable screen flicker

---

## 💡 Tips

### For Development
Set all effects to maximum to see what each does:
```css
:root {
  --scanline-opacity: 0.5;
  --vignette-strength: 1.0;
  --phosphor-glow: 8px;
}
```

### For Production
Start subtle and increase if needed:
```css
:root {
  --scanline-opacity: 0.1;
  --vignette-strength: 0.3;
  --phosphor-glow: 1px;
}
```

### For Screenshots/Videos
Temporarily boost effects for better visibility:
```css
:root {
  --scanline-opacity: 0.2;
  --phosphor-glow: 3px;
}
```

---

**Quick Ref Version:** 1.0  
**Last Updated:** 2026-01-27
