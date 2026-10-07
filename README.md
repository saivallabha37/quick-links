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

## 🤖 Gemini AI Assistant Setup

The AI Build Assistant connects your 61+ item developer toolbox with Google Gemini to generate production-grade architectures, project-specific tool matches, execution workflows, and copyable coding prompts.

### 1. Obtain a Free Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click **"Create API key"** and copy the generated key.

---

### 2. Local Environment Setup
1. In the root of this project, create a `.env` file (copied from `.env.example`):
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your key:
   ```ini
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   GEMINI_MODEL=gemini-3.1-flash-lite
   PORT=3000
   ```
3. Start the local server:
   ```bash
   npm run dev
   # or
   npm start
   ```
4. Visit `http://localhost:3000/assistant` and test generating a plan.

---

### 3. Production Deployment (Vercel)

> [!IMPORTANT]
> **Why GitHub Repository Secrets Do Not Power Deployed Sites:**
> GitHub Repository Secrets (`Settings` → `Secrets and variables` → `Actions`) are only available during automated GitHub Actions CI/CD workflows. They **cannot** be read by static websites on GitHub Pages or by third-party hosting services like Vercel.
> 
> Furthermore, **GitHub Pages is a static file host** and cannot run Node.js serverless functions (like `/api/assistant.js`). Submitting `POST /api/assistant` on GitHub Pages returns `HTTP 405 Method Not Allowed`.

To run the live Gemini AI Assistant in production, deploy the project to **Vercel**:

1. **Push your code to GitHub** (on your repository branch).
2. **Log into [Vercel](https://vercel.com)**:
   - Click **"Add New..."** → **"Project"**.
   - Select and import your GitHub repository (`quick-links`).
3. **Configure Environment Variables in Vercel**:
   - In the **Environment Variables** section of the Vercel project setup (or under **Project Settings** → **Environment Variables**):
     - **Key:** `GEMINI_API_KEY`  
       **Value:** `[Paste your Gemini API key]`
     - **Key:** `GEMINI_MODEL` *(optional)*  
       **Value:** `gemini-3.1-flash-lite`
   - Ensure the environments (Production, Preview, Development) are all checked.
4. **Deploy**:
   - Click **"Deploy"**.
   - Vercel will automatically detect `vercel.json` and host your static frontend alongside the serverless function `/api/assistant.js`.

---

### 4. Live Gemini vs. Offline Fallback Modes

Quick Links provides dual-mode intelligence:
- **Live Gemini Mode:** When `GEMINI_API_KEY` is present and valid, the assistant uses Google Gemini Flash to generate comprehensive architectural specifications, tailored tool explanations, and long-form coding prompts.
- **Offline Heuristic Matcher:** If `GEMINI_API_KEY` is absent or if the serverless API is temporarily unreachable, the assistant provides an **Offline Toolbox Matcher** button. This matches keywords and categories directly against `data/resources.js` so you never get a broken UI.

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
