# Quick Links

Quick Links is a personal developer toolbox and AI-powered technology advisor designed to help developers spend less time choosing tools and more time building.

---

## Why This Exists

Ever spent more time choosing your stack than building the actual thing?

Yeah. Me too.

Quick Links started as a personal way to organize battle-tested developer tools, component libraries, animation engines, and backend services into a single fast dashboard. As the number of developer tools grew, it evolved from a static bookmark list into an intelligent technology advisor: a system that can take a raw project concept and reason about what to build, which tools to use, how the architecture fits together, and provide an actionable coding prompt to start building immediately.

---

## Features

### 1. Developer Toolbox
- **Curated Resources:** Over 60 verified developer tools, libraries, and platforms across UI, 3D, animation, AI, databases, authentication, and deployment.
- **Category Filtering:** Filter tools by domain (UI Components, Animation, 3D/Canvas, AI & LLMs, Backend, Database, Auth, Dev Tools, Icons, and Visuals).
- **Instant Search:** Real-time fuzzy filtering across tool names, categories, descriptions, and use-cases.
- **Keyboard Shortcuts:** Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>Cmd</kbd> + <kbd>K</kbd>) to instantly focus the search bar; press <kbd>Esc</kbd> to clear.
- **Use-Case & Priority Guidance:** Every resource card includes explicit guidance on when to choose it over alternatives, supported ecosystems, and direct documentation links.

### 2. My Core Stack
- Quick-access overview of core foundation technologies (Next.js, TypeScript, Tailwind CSS, Supabase, Vercel, Motion, etc.).
- Clicking any core stack badge filters the resource catalog to complementary tools.

### 3. Quick Workflows & Stack Radar
- **Goal-Driven Paths:** Pre-configured technology sequences for common application archetypes (Modern Web App, 3D Creative Site, AI Application, Rapid Prototyping).
- **Interactive Stack Tags:** Click any technology tag in a workflow to discover related tools in the main catalog.
- **Bounded Sticky Sidebar:** Docks on the right side of the screen during desktop scrolling and smoothly stops before the footer to prevent layout overlap.
- **Responsive Drawer:** Automatically collapses into an accessible mobile drawer on smaller screens.

### 4. Floating AI Launcher
- Modern floating squircle widget pinned to the bottom-right of the screen.
- Features a subtle idle sparkle breathing animation.
- Expands smoothly to the left on hover or keyboard focus (<kbd>Tab</kbd>), revealing the "Build Assistant" label.

### 5. AI Build Assistant (`/assistant/`)
The AI Build Assistant behaves as a senior software architect and tooling advisor:
- **Requirement Understanding:** Analyzes natural language project descriptions, extracting the core application type, target users, UI/UX requirements, data needs, and explicit user preferences.
- **Coherent Stack Decisions:** Recommends 6 to 8 harmonious stack layers with a decisive single primary choice and concrete alternative options (*"When to use alternative"*).
- **Two Sources of Recommendations:**
  - **Curated Quick Links:** Matches tools from the local verified database (`data/resources.js`) with exact canonical URLs and project-specific justifications.
  - **External / Out-of-the-Box Tools:** The AI is **not restricted** to Quick Links. When an external library, framework, or service is better suited (e.g. Three.js for 3D portfolios, FastAPI for Python APIs, Stripe for billing, or Vercel AI SDK for RAG), it explicitly recommends and marks it as an external tool.
- **System Architecture:** Details data flow, rendering strategy (SSR/Edge/Client), state management, and API boundaries.
- **Implementation Workflow:** 6 sequential, milestone-based phases from scaffolding to production hardening.
- **Actionable Next Steps:** Ordered checklist of immediate engineering tasks.
- **Copy-Paste-Ready Coding Prompt:** Generates an exhaustive software specification (400–600+ words) including directory tree, data models, UI rules, and error states, ready for Cursor, Claude Code, or ChatGPT.
- **Dual-Mode Operation:** Uses Google Gemini Flash when configured with an API key, and features an intelligent rule-based heuristic matcher when running offline.

### 6. Personal Story Footer
- **"Why I Built This" Section:** Expandable story section explaining the motivation and philosophy behind Quick Links.
- Clean social links to author GitHub profile and the project repository.

---

## Tech Stack

The Quick Links codebase is intentionally lightweight and dependency-free:

- **Frontend:** Semantic HTML5, modern CSS3 (Custom Properties, CSS Grid, Flexbox, backdrop-filter glassmorphism), and Vanilla JavaScript (ES6+).
- **Backend / Serverless:** Node.js (v18+) HTTP server for local development; Vercel Serverless Function (`api/assistant.js`) for production API handling.
- **AI Engine:** Google Gemini Generative Language REST API (`gemini-2.5-flash`, `gemini-1.5-flash`).
- **Dependencies:** **Zero external npm runtime dependencies.** The local development server runs entirely on Node's built-in `http`, `fs`, `path`, and `url` modules.

---

## AI Architecture & Reasoning Pipeline

The AI Build Assistant executes a structured reasoning pipeline:

```text
User Project Idea
        ↓
Requirement Extraction & Constraints Identification
        ↓
Technology Selection & Trade-Off Evaluation
        ↓
Quick Links Matching (Curated) + External Recommendations (Best-in-Class)
        ↓
System Architecture & Rendering Strategy
        ↓
Sequential Implementation Roadmap (Phases 1-6)
        ↓
Actionable Next Steps
        ↓
Production-Grade AI Coding Prompt (Cursor / Claude / ChatGPT)
```

Gemini is called exclusively through the serverless backend (`/api/assistant`), keeping API keys secure and invisible to the client browser.

---

## The Quick Links Database (`data/resources.js`)

The file `data/resources.js` acts as the authoritative single source of truth for:
- 60+ curated developer tools and libraries
- Quick workflow definitions
- Core stack definitions
- Category taxonomies

It is packaged as a universal JavaScript module compatible with both browser global scope (`window.resources`) and Node.js module systems (`module.exports`).

> **Note on Tooling Philosophy:** Quick Links is a curated starting point, not a closed garden. The AI Build Assistant uses `data/resources.js` as its primary toolbox, but is explicitly designed to recommend external technologies whenever they are a superior fit for the user's specific requirements.

---

## Project Structure

```text
quick-links/
├── index.html              # Main developer toolbox & Stack Radar
├── style.css               # Homepage theme, brand palette & responsive styles
├── script.js               # Homepage UI controller, search & filter engine
├── logo.png                # Brand logo icon
│
├── data/
│   └── resources.js        # Universal database of tools, workflows & core stack
│
├── assistant/
│   ├── index.html          # AI Build Assistant interface
│   ├── assistant.css       # Assistant styling, tabs & loading animations
│   └── assistant.js        # Assistant client controller & fallback engine
│
├── api/
│   └── assistant.js        # Vercel serverless function calling Google Gemini API
│
├── server.js               # Zero-dependency local Node.js development server
├── package.json            # Project metadata & npm scripts
├── vercel.json             # Vercel routing, rewrites & redirects configuration
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules (protects .env)
└── README.md               # Project documentation
```

---

## Environment Variables

To enable live Google Gemini AI generation, configure the following variables:

| Variable | Required | Default | Description |
| :--- | :---: | :---: | :--- |
| `GEMINI_API_KEY` | **Yes** (for live AI) | *None* | Google Gemini API key from Google AI Studio. |
| `GEMINI_MODEL` | No | `gemini-2.5-flash` | Gemini model ID (e.g. `gemini-2.5-flash`, `gemini-1.5-flash`). |
| `PORT` | No | `3000` | Port for the local Node.js server. |

> **Security Note:** Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude all `.env` files automatically.

---

## Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/saivallabha37/quick-links.git
cd quick-links
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Open `.env` and paste your Gemini API key:
```ini
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```
*(If you do not have a Gemini API key yet, the application will automatically operate in offline heuristic mode).*

### 3. Start the Development Server
No `npm install` is required because the project has zero external dependencies:
```bash
npm run dev
# or
npm start
```

### 4. Open in Your Browser
- Homepage / Toolbox: [http://localhost:3000](http://localhost:3000)
- AI Build Assistant: [http://localhost:3000/assistant/](http://localhost:3000/assistant/)

---

## Production Deployment (Vercel)

The production application is deployed on Vercel:

1. Push your repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. In **Project Settings** → **Environment Variables**, add:
   - `GEMINI_API_KEY` = your Gemini API key
   - `GEMINI_MODEL` = `gemini-2.5-flash` (optional)
4. Deploy. Vercel will automatically detect `vercel.json`, host the static pages, and serve the `/api/assistant` serverless route.

> **Note:** GitHub Actions repository secrets and Vercel runtime environment variables are separate. The serverless function reads environment variables configured directly inside Vercel.

---

## Security

- **Server-Side API Handling:** The Google Gemini API key is processed exclusively inside `api/assistant.js` on the server and is never exposed in browser requests, responses, HTML, or client JavaScript.
- **Git Protection:** `.gitignore` strictly blocks `.env` and `.env.*` files from being committed.
- **Sanitized Logging:** Server logs confirm only the presence of the key (`Boolean(apiKey)`) and never log secret values.

---

## Author & Links

**Built by Sai**

- GitHub: [@saivallabha37](https://github.com/saivallabha37)
- Repository: [https://github.com/saivallabha37/quick-links](https://github.com/saivallabha37/quick-links)
- Live Website: [https://quick-links-mjmu.vercel.app](https://quick-links-mjmu.vercel.app)

---

## Philosophy

Less time choosing.  
More time building.  

Now thank me later. Start building. ⚡
