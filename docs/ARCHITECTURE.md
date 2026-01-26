# Architecture: ENTITY-001

## Overview

ENTITY-001 is a desktop-only web application that simulates a mysterious, omniscient digital entity through a clever keyboard trick. When users hold SHIFT while typing, their hidden input (the "answer") is captured while displaying mystical filler text character-by-character, creating the illusion that they're addressing the entity. Upon releasing SHIFT and typing their actual question, the entity dramatically "reveals" the previously hidden answer, appearing to possess supernatural knowledge.

## Concept

The application creates a parlor trick effect where:
1. **User holds SHIFT** → Types answer (e.g., "Larissa") → System shows filler text sync'd 1:1 with keystrokes
2. **User releases SHIFT** → Types question (e.g., "What's my wife's name?") → Displayed normally  
3. **User presses ENTER** → System "processes" → Reveals the hidden answer with mystical commentary

To observers, it appears the entity knew the answer all along.

## Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | SvelteKit (SSG mode) | Reactive, minimal bundle size, perfect for client-side interactivity |
| Styling | Vanilla CSS | Custom Windows 95 theme doesn't benefit from utility framework |
| i18n | Custom system | Only 2 languages (EN/PT-BR), no need for heavy i18n library |
| Audio | Web Audio API | Generates synthetic PC Speaker-style beeps at runtime |
| Deploy | Cloudflare Pages | Free tier, global CDN, GitHub integration |
| Adapter | @sveltejs/adapter-cloudflare | SvelteKit → Cloudflare Pages compatibility |
| Database | None | 100% client-side application, no backend |
| Testing | Vitest + Playwright | Unit tests for logic, e2e for user flows |

## Data Flow

```
User Keyboard Input
        ↓
   Event Listeners
   (keydown/keyup/keypress)
        ↓
    State Machine ──────────────┐
    (idle/hiding/              │
     questioning/              │
     processing/               │
     revealing)                │
        ↓                      │
┌───────┴──────────┐           │
│ SHIFT pressed?   │           │
├──────────────────┤           │
│ YES: Typewriter  │           │
│  → Get filler    │←──────────┘
│     char         │
│  → Save to       │
│     hiddenBuffer │
│                  │
│ NO: Direct       │
│  → Append to     │
│     visibleQ     │
└──────────────────┘
        ↓
  Display Update
        ↓
   ENTER pressed?
        ↓
    Processing
   (2s delay +
    beep sounds)
        ↓
   Reveal Answer
  (hiddenBuffer)
```

## Core Components

### 1. State Machine (Terminal.svelte)

**States:**
- `idle`: Waiting for user input
- `hiding`: SHIFT held, capturing hidden answer + showing filler
- `questioning`: SHIFT released, capturing visible question
- `processing`: Animating "thinking" sequence
- `revealing`: Displaying answer + entity commentary

**Transitions:**
- `idle` → `hiding`: SHIFT keydown detected
- `hiding` → `questioning`: SHIFT keyup detected
- `questioning` → `processing`: ENTER keypress (if question not empty)
- `processing` → `revealing`: After delay + beep sequence
- `revealing` → `idle`: After reveal complete

### 2. Typewriter System (lib/utils/typewriter.ts)

**Purpose:** Synchronize user keystrokes with filler text display (1:1 character mapping)

**Logic:**
```typescript
class Typewriter {
  private fillerText: string;
  private currentIndex: number;
  
  // Concatenate random fragments into long string
  generateFiller(fragments: string[]): void
  
  // Return next character from filler (called per keystroke)
  getNextChar(): string
  
  // Reset for new session
  reset(): void
}
```

**Key Feature:** If user types more characters than current filler length, automatically concatenates more fragments on-the-fly.

### 3. Filler Fragments (lib/i18n/fillers.ts)

**Strategy:** Small, modular text fragments instead of complete sentences

**Examples:**
- EN: `["OH ", "ENTITY ", "REVEAL ", "MIGHTY ", "ORACLE ", ...]`
- PT-BR: `["OH ", "ENTITY ", "REVELE ", "PODEROSA ", "ORÁCULO ", ...]`

**Rationale:** 
- Works with short answers ("Ana" = 3 chars) and long answers (50+ chars)
- Random concatenation creates varied, mystical-sounding phrases
- Never runs out of characters

### 4. Audio System (lib/audio/beeper.ts)

**Technology:** Web Audio API (`OscillatorNode` with square wave)

**Sounds:**
| Trigger | Pattern | Frequency | Duration |
|---------|---------|-----------|----------|
| Start processing | Single beep | 1000Hz | 100ms |
| Reveal answer | Double beep | 1200Hz | 100ms x2 |
| Finish | Single beep | 800Hz | 150ms |

**Implementation:**
```typescript
class Beeper {
  private ctx: AudioContext;
  
  beep(freq: number, duration: number): void {
    const osc = ctx.createOscillator();
    osc.type = 'square'; // PC Speaker style
    osc.frequency.value = freq;
    // ... gain envelope
  }
}
```

### 5. CRT Effects (CRTEffects.svelte)

**Visual Effects:**
1. **Scanlines:** `repeating-linear-gradient` with 2px repeat, 10% opacity
2. **Glitch:** Random `clip-path` + `transform` animation, triggered every ~30s
3. **Vignette:** `box-shadow: inset 0 0 150px rgba(0,0,0,0.3)`
4. **Cursor:** Blinking underscore, `animation: blink 1s step-end infinite`

### 6. i18n System

**Detection:** 
```typescript
const detectLanguage = (): 'en' | 'pt-BR' => 
  navigator.language.startsWith('pt') ? 'pt-BR' : 'en';
```

**Storage:** `localStorage.setItem('entity-001-lang', selectedLang)`

**Structure:**
```typescript
translations = {
  en: { intro, fillers, processing, responses, closing },
  'pt-BR': { intro, fillers, processing, responses, closing }
}
```

## UI Components

### Terminal Window (Windows 95 Style)

```
┌─────────────────────────────────────┐
│ ▓ ENTITY-001              [EN][PT]  │ ← Title bar (#000080)
├─────────────────────────────────────┤
│                                     │
│  E N T I T Y - 0 0 1                │
│  ═══════════════════════════        │
│                                     │
│  [Content area with scroll]         │
│  >_                                 │
│                                     │
└─────────────────────────────────────┘
   ↑ 3D inset borders
```

**CSS:**
- Background: `#c0c0c0` (Win95 gray)
- Borders: 3D effect with light/dark shading
- Font: `'VT323', 'Courier New', monospace`
- Title bar: `#000080` with white text

## API Routes

None (100% client-side)

## Database Schema

None (no persistence required)

## Environment Variables

None (no secrets, API keys, or backend)

## Build & Deploy

**Build Command:**
```bash
npm run build
```

**Output:** `.svelte-kit/cloudflare/` (static files + Worker)

**Deploy:**
```bash
wrangler pages deploy .svelte-kit/cloudflare
```

**CI/CD:** GitHub Actions on push to `main`

## Mobile Strategy

**Detection:** `navigator.userAgent` or media query `(pointer: coarse)`

**Behavior:** Display message:
> "This experience requires a desktop computer with keyboard."

Block keyboard interactions (no virtual SHIFT button)

## Performance Targets

- **FPS:** 60fps with all CRT effects active
- **Bundle Size:** < 50KB (main JS)
- **Time to Interactive:** < 1s on 3G
- **Lighthouse Score:** 95+ (Performance, Accessibility)

## Security Considerations

- No sensitive data collected or transmitted
- No cookies or tracking
- localStorage only for language preference
- No XSS risk (no user HTML rendering)
- No CORS issues (no API calls)

## Future Enhancements (Out of Scope v1)

- Easter eggs for specific questions ("What is the meaning of life?")
- Session history (localStorage persistence)
- Share functionality (generate URL with encoded Q&A)
- Sound effects toggle
- Custom color themes
- Mobile companion mode (Bluetooth keyboard support)

## Credits

**Created by:** Roger Rosset  
**GitHub:** [@rrosset91](https://github.com/rrosset91)  
**Repository:** [github.com/rrosset91/entity-001](https://github.com/rrosset91/entity-001)

---

**Version:** 1.0  
**Last Updated:** 2026-01-26
