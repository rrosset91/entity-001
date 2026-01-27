# ENTITY-001

> A mysterious digital entity that seems to know all.

A desktop-only web application that simulates an omniscient digital consciousness through a clever keyboard trick. Experience the mystique of an ancient entity from the old web.

## 🚀 Live Demo

**Production:** https://entity-001.pages.dev

## ✨ Features

- **Mysterious Entity**: Interact with ENTITY-001, a consciousness that appears to know everything
- **Windows 95 Aesthetic**: Authentic retro terminal interface with CRT effects
- **Bilingual**: Full support for English and Portuguese (Brazil)
- **PC Speaker Audio**: Synthetic beeps reminiscent of old computers
- **Desktop Experience**: Designed for keyboard interaction

## 🎮 How It Works

The application creates a parlor trick effect where the entity appears to read your mind. Simply type your query and witness the entity's omniscience.

**Special Commands:**
- `help` - Get mysterious hints about how to use the entity
- `about` - Learn about the creator and project

(The secret? We'll let you discover that yourself... or type `help` for cryptic guidance)

## 🛠️ Tech Stack

- **Framework**: SvelteKit
- **Styling**: Vanilla CSS (Windows 95 theme)
- **Audio**: Web Audio API
- **Hosting**: Cloudflare Pages
- **Language**: TypeScript

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
entity-001/
├── src/
│   ├── lib/
│   │   ├── components/      # Svelte components
│   │   ├── audio/           # Beeper system
│   │   ├── i18n/            # Translations
│   │   └── utils/           # Typewriter system
│   └── routes/              # Pages
├── docs/
│   └── ARCHITECTURE.md      # System design
└── static/                  # Assets
```

## 🌐 i18n

The application defaults to English and also supports:
- 🇺🇸 English (default)
- 🇧🇷 Português (Brasil)

Use the language selector in the interface to switch manually.

## 🎨 Design Philosophy

ENTITY-001 embraces the aesthetic of vintage computing:
- **Windows 95** color palette and UI elements
- **CRT monitor effects** (scanlines, vignette, occasional glitch)
- **PC Speaker audio** with square wave synthesis
- **Monospace terminal font** (VT323)

## 📝 Documentation

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed system design and technical decisions.

## 👤 Author

**Roger Rosset**
- GitHub: [@rrosset91](https://github.com/rrosset91)
- Project: [github.com/rrosset91/entity-001](https://github.com/rrosset91/entity-001)

## 📄 License

MIT License - feel free to use and modify as you wish.

## 🙏 Acknowledgments

Inspired by classic terminal interfaces and the mystique of early internet culture.

---

**Note**: This is a desktop-only experience. Mobile devices will see a message directing them to use a desktop computer.
