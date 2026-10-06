# ⚡ Quick Links — Developer Toolbox & Tech Radar

> **Build faster. Choose smarter.**
>
> A personal developer command center combining a searchable toolbox, persistent stack radar, and an AI-powered build assistant with Google Gemini.

---

## 🎯 The Three Pillars of Quick Links

Quick Links solves the three fundamental stages of developer decision-making:

1. **The Toolbox (`/`)** — *"What tools do I already have?"*  
   Searchable, categorized library of 60+ verified developer tools, frameworks, and services with direct links.
2. **The Stack Radar (Right Panel)** — *"What stack should I use for common goals?"*  
   Persistent, compact workflow panel for Web Apps, 3D Sites, AI Applications, and Rapid Prototyping.
3. **The AI Build Assistant (`/assistant`)** — *"I have an idea. What should I use to build it?"*  
   Intelligent system powered by Google Gemini Flash that analyzes project descriptions, matches tools from your personal toolbox, recommends modern architectures, plans sequential workflows, and generates ready-to-use AI coding prompts.

---

## ✨ Features

### 1. Developer Toolbox
- **Instant Search:** Search tools by name, category, description, use-case, or stack compatibility.
- **Keyboard Shortcuts:** `Ctrl + K` to focus search, `Esc` to clear.
- **Category Filters:** Filter by UI, Animation, 3D, AI, Backend, Database, Auth, Dev Tools, and more.
- **Direct Resource Links:** Jump directly to documentation and tools with `Open ↗`.
- **My Core Stack:** Quick-access overview of core languages and technologies. Click any core technology to filter the toolbox.

### 2. "My Stack Radar" Panel
- **Desktop:** Persistent, glassmorphic panel docked on the right side of the viewport with subtle border glow and backdrop blur.
- **Compact Cards:** Displays 4 battle-tested workflows without cluttering the screen:
  1. `Modern Web App` (Next.js, Tailwind, shadcn/ui, Motion, Supabase, Vercel)
  2. `3D Website` (Next.js, Tailwind, Spline, Motion, Three.js)
  3. `AI Application` (Next.js, shadcn/ui, OpenAI / Gemini, Supabase, Vercel)
  4. `Build Fast with AI` (v0, Lovable, Supabase, GitHub, Vercel)
- **Interactive Stack Tags:** Click any tag in a workflow card to instantly filter the toolbox.
- **Collapsible:** Toggle minimize/expand on desktop with a single click.
- **Mobile Responsive:** Automatically converts into an accessible off-canvas drawer on smaller screens with a dark backdrop overlay.

### 3. Floating AI Assistant Button
- Positioned in the bottom-right corner with a breathing glow animation.
- Hover tooltip: *"Ask Build Assistant"*.
- Direct link to the dedicated `/assistant` page.

### 4. AI Build Assistant (`/assistant`)
- **Intelligent Stack Generation:** Analyzes any project concept (e.g., *"3D portfolio website"*, *"SaaS with auth & Stripe"*, *"Real-time dashboard"*).
- **Toolbox Resource Matching:** Prioritizes tools that already exist in your Quick Links database (shadcn/ui, Motion, Spline, Clerk, Supabase, Vercel, etc.) and preserves their canonical URLs.
- **Semantic "What Should I Use?" Discovery:** Query requirements like *"I need an animated navbar"* or *"Database for small SaaS"* to get recommendations with rationales.
- **Multi-Stage Processing Experience:** Visual progress indicator displaying actual request state:
  `Analyzing your idea` → `Choosing architecture` → `Matching toolbox` → `Building workflow`.
- **Copy Coding Prompt:** One-click copy button utilizing the Clipboard API (toggles to `Copied ✓`) to grab prompts ready for Cursor, Claude, ChatGPT, or Gemini.
- **Offline / Zero-Key Fallback:** Intelligent heuristic matching engine that operates even before you configure an API key.

---

## 🏗️ Project Architecture

```text
quick-links/
├── index.html              # Main toolbox & Tech Radar page
├── style.css               # Dark theme, glassmorphism, responsive styles
├── script.js               # Toolbox UI controller & search engine
│
├── data/
│   └── resources.js        # SINGLE SOURCE OF TRUTH: 61 verified tools & workflows
│
├── assistant/
│   ├── index.html          # AI Build Assistant workspace
│   ├── assistant.css       # Assistant theme, cards, loaders & animations
│   └── assistant.js        # Assistant client controller & API communicator
│
├── api/
│   └── assistant.js        # Serverless backend calling Google Gemini Flash securely
│
├── server.js               # Zero-dependency local dev server (Node.js http)
├── vercel.json             # Vercel deployment configuration
├── package.json            # Scripts & project metadata
├── .env.example            # Environment variable template
├── .gitignore              # Protects .env files from Git
└── README.md               # Documentation
```

---

## 🔒 Security & API Key Safety

The Google Gemini API key is **strictly handled server-side**:
- The API key is **never** included in HTML, client JavaScript, GitHub commits, network payloads, or logs.
- The browser only communicates with the internal endpoint `POST /api/assistant`.
- The `.gitignore` file excludes all `.env` files to prevent accidental commits.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Set the following variables:

```ini
# Google Gemini API Key from Google AI Studio (https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here

# Fast interactive model (default: gemini-2.5-flash)
GEMINI_MODEL=gemini-2.5-flash

# Optional: Local development port (default: 3000)
PORT=3000
```

> **Note:** If `GEMINI_API_KEY` is not provided, the assistant automatically runs in **intelligent heuristic fallback mode**, matching keywords and tools from `data/resources.js` without failing.

---

## 💻 Local Development

Quick Links has **zero external npm dependencies**. Node.js 18+ is all you need:

1. **Start the local server:**
   ```bash
   npm start
   ```
   *(or `node server.js`)*

2. **Open in your browser:**
   - **Toolbox:** [http://localhost:3000](http://localhost:3000)
   - **AI Build Assistant:** [http://localhost:3000/assistant](http://localhost:3000/assistant)
   - **API Endpoint:** [http://localhost:3000/api/assistant](http://localhost:3000/api/assistant)

---

## 🚀 Deployment

Because Gemini API keys cannot safely reside in client-side code, Quick Links uses a serverless API layer.

### Recommended: Deploy to Vercel (All-in-One)

Vercel provides native zero-configuration support for static files and the `/api/assistant.js` serverless function:

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"** → Import `quick-links`.
3. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `GEMINI_MODEL`: `gemini-2.5-flash`.
4. Click **Deploy**. Vercel will host both your frontend and the `/api/assistant` serverless route securely.

### Alternative: GitHub Pages (Frontend) + External Serverless API

If you prefer keeping the frontend on GitHub Pages:
1. Deploy the `api/assistant.js` endpoint to Vercel, Render, Railway, or AWS Lambda.
2. In `assistant/assistant.js`, set `apiUrl` to your hosted serverless endpoint URL.
3. Deploy the static files (`index.html`, `assistant/`, `data/`) to GitHub Pages via repository Settings → Pages.

---

## ➕ How to Add New Resources

`data/resources.js` is the **single source of truth** for both the Toolbox UI and the AI Assistant.

To add a new tool, open `data/resources.js` and add an entry to the `resources` array:

```javascript
{
    name: "New Tool Name",
    category: "ui",              // ui, animation, 3d, ai, auth, database, etc.
    tag: "UI",
    tagClass: "blue",            // blue, purple, green, orange, cyan, pink, yellow
    icon: "N",                   // 1-2 characters or emoji

    description: "Brief summary of what this tool does.",

    worksWith: ["React", "Next.js", "Tailwind"],

    useWhen: "When to choose this tool over alternatives.",

    priority: "high",            // high, medium, low

    url: "https://example.com"
}
```

Once added:
- It appears immediately in the toolbox search and category filters.
- The AI Build Assistant automatically includes it in prompt context and recommendations!

---

## 📄 License

MIT © 2026 Quick Links
