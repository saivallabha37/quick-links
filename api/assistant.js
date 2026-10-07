/**
 * =====================================================
 * QUICK LINKS — AI BUILD ASSISTANT API
 * Serverless / Node.js Endpoint
 * Handles: POST /api/assistant
 * =====================================================
 */

const fs = require('fs');
const path = require('path');

// Load resources database safely
let resourcesDb = [];
let workflowsDb = [];
let coreStackDb = [];
let categoriesDb = {};

try {
    // Static require for Vercel bundling
    const data = require('../data/resources.js');
    resourcesDb = data.resources || [];
    workflowsDb = data.workflows || [];
    coreStackDb = data.coreStack || [];
    categoriesDb = data.categories || {};
} catch (err) {
    try {
        const dataPath = path.join(process.cwd(), 'data', 'resources.js');
        if (fs.existsSync(dataPath)) {
            const data = require(dataPath);
            resourcesDb = data.resources || [];
            workflowsDb = data.workflows || [];
            coreStackDb = data.coreStack || [];
            categoriesDb = data.categories || {};
        }
    } catch (fallbackErr) {
        console.error('Error loading resources.js in API:', fallbackErr.message);
    }
}

/**
 * Intelligent heuristic fallback engine that acts as a Senior Software Architect
 * and Archetype Analyzer for offline / missing API key scenarios.
 */
function generateFallbackResponse(description, mode = 'stack') {
    const descLower = description.toLowerCase();

    // 1. Detect explicit preferences
    const wantsPython = descLower.includes('python') || descLower.includes('fastapi') || descLower.includes('django') || descLower.includes('flask');
    const wantsMongo = descLower.includes('mongo') || descLower.includes('mongodb');
    const wantsPostgres = descLower.includes('postgres') || descLower.includes('postgresql') || descLower.includes('supabase') || descLower.includes('neon');
    const wantsVue = descLower.includes('vue') || descLower.includes('nuxt');
    const wantsSvelte = descLower.includes('svelte') || descLower.includes('sveltekit');

    // 2. Detect project archetypes
    const is3D = descLower.includes('3d') || descLower.includes('three') || descLower.includes('threejs') || descLower.includes('spline') || descLower.includes('canvas') || descLower.includes('portfolio') && (descLower.includes('motion') || descLower.includes('animat'));
    const isAI = descLower.includes('ai') || descLower.includes('llm') || descLower.includes('chat') || descLower.includes('gpt') || descLower.includes('rag') || descLower.includes('document') || descLower.includes('vector') || descLower.includes('embedding') || descLower.includes('agent');
    const isEcom = descLower.includes('shop') || descLower.includes('e-commerce') || descLower.includes('ecommerce') || descLower.includes('cart') || descLower.includes('product') || descLower.includes('store');
    const isSaaS = descLower.includes('saas') || descLower.includes('subscription') || descLower.includes('billing') || descLower.includes('stripe') || descLower.includes('tenant') || descLower.includes('b2b');
    const isDashboard = descLower.includes('dashboard') || descLower.includes('analytics') || descLower.includes('metrics') || descLower.includes('chart') || descLower.includes('realtime') || descLower.includes('real-time');
    const isEvent = descLower.includes('event') || descLower.includes('campus') || descLower.includes('ticket') || descLower.includes('registration') || descLower.includes('attendee');

    let appType = "Full-Stack Web Application";
    let targetUsers = "End-users, developers and consumers";
    if (is3D) {
        appType = "Interactive 3D Portfolio & Creative Showcase";
        targetUsers = "Prospective clients, recruiters, and creative developers";
    } else if (isAI) {
        appType = "AI-Powered Intelligence / RAG Document Application";
        targetUsers = "Knowledge workers, researchers, and productivity-focused users";
    } else if (isEcom) {
        appType = "Modern E-Commerce Storefront & Checkout";
        targetUsers = "Online shoppers, retail customers, and store managers";
    } else if (isSaaS) {
        appType = "B2B / Multi-Tenant SaaS Platform";
        targetUsers = "Subscribers, team admins, and business operators";
    } else if (isDashboard) {
        appType = "Real-Time Data Analytics & Operational Dashboard";
        targetUsers = "Analysts, product managers, and operations teams";
    } else if (isEvent) {
        appType = "Campus & Community Event Management Platform";
        targetUsers = "Event organizers, attendees, and community members";
    }

    // 3. Assemble coherent stack layers with technical rationale, priority, and source
    const stack = [];

    // Frontend Layer
    if (wantsVue) {
        stack.push({
            name: "Nuxt 3 (Vue 3 + Vite)",
            category: "Frontend Framework",
            purpose: "Full-stack SSR Vue framework with file-system routing",
            reason: `Directly honors your explicit preference for Vue. Provides auto-imports, SSR hydration, and built-in Nitro server engine.`,
            priority: "required",
            source: "external",
            alternative: "Next.js 15",
            alternativeWhen: "Use if enterprise React ecosystem compatibility is mandatory."
        });
    } else if (wantsSvelte) {
        stack.push({
            name: "SvelteKit (Svelte 5)",
            category: "Frontend Framework",
            purpose: "Compiler-driven reactive web framework",
            reason: `Directly honors your explicit preference for Svelte. Offers minimal runtime footprint and buttery-smooth reactivity.`,
            priority: "required",
            source: "external",
            alternative: "Next.js 15",
            alternativeWhen: "Use if broader third-party component library ecosystem is required."
        });
    } else {
        stack.push({
            name: "Next.js 15 (App Router & React 19)",
            category: "Frontend Framework",
            purpose: "Production web architecture with hybrid Server Components & client hydration",
            reason: `Provides zero-bundle-size React Server Components for lightning-fast First Contentful Paint, streaming SSR, and optimized asset bundling for ${appType}.`,
            priority: "required",
            source: "quick-links",
            alternative: "Vite + React 19 SPA",
            alternativeWhen: "Use if the app is strictly an internal behind-login tool with zero SEO requirements."
        });
    }

    // UI & Design System
    stack.push({
        name: "shadcn/ui + Tailwind CSS",
        category: "UI & Design System",
        purpose: "Headless, accessible Radix UI primitives styled with utility-first CSS",
        reason: `Gives full code ownership without bloated npm runtime dependencies. Perfectly suited for dark-mode developer aesthetics, high-contrast states, and responsive accessibility.`,
        priority: "recommended",
        source: "quick-links",
        alternative: "Tailwind UI / Catalyst",
        alternativeWhen: "Use if pre-built proprietary commercial layout kits are preferred over open-source primitives."
    });

    // Animation / Visuals Layer
    if (is3D) {
        stack.push({
            name: "React Three Fiber + Three.js & Drei",
            category: "3D & Canvas Graphics",
            purpose: "Declarative Three.js scene graph inside React component tree",
            reason: `Essential for the requested 3D visuals. Enables declarative lighting, GLTF model loading, orbit controls, and canvas shaders without imperative boilerplate.`,
            priority: "required",
            source: "external",
            alternative: "Spline Viewer",
            alternativeWhen: "Use if you want no-code interactive 3D scene exports without writing custom Three.js shaders."
        });
        stack.push({
            name: "Motion (Framer Motion)",
            category: "UI Motion & Interactions",
            purpose: "Spring-based physics and scroll-driven UI orchestrations",
            reason: `Handles smooth UI overlays, stagger entrance lists, and micro-interactions layered seamlessly over the 3D canvas at 60 FPS.`,
            priority: "recommended",
            source: "quick-links",
            alternative: "GSAP + ScrollTrigger",
            alternativeWhen: "Use if complex multi-step timeline scrubbing tied to pin-scrolling is needed."
        });
    } else {
        stack.push({
            name: "Motion (Framer Motion)",
            category: "UI Motion Engine",
            purpose: "Declarative spring physics and scroll-linked viewport animations",
            reason: `Provides fluid card hover states, enter/exit page transitions, and responsive layout animations without jank.`,
            priority: "recommended",
            source: "quick-links",
            alternative: "CSS Transitions / Tailwind Animate",
            alternativeWhen: "Use if zero JavaScript animation runtime is strictly required for lightweight static pages."
        });
    }

    // Backend / API Layer
    if (wantsPython) {
        stack.push({
            name: "FastAPI + Pydantic v2 (Python 3.12)",
            category: "Backend & API Engine",
            purpose: "High-performance asynchronous REST API with automatic OpenAPI documentation",
            reason: `Honors your preference for Python. Delivers sub-millisecond async endpoints and native compatibility with AI/ML libraries.`,
            priority: "required",
            source: "external",
            alternative: "Next.js Route Handlers",
            alternativeWhen: "Use if consolidating into a single TypeScript full-stack repository is preferred."
        });
    } else {
        stack.push({
            name: "Next.js Route Handlers & Type-Safe Server Actions",
            category: "Backend & API Runtime",
            purpose: "Zero-boilerplate serverless endpoints running on Node.js / Edge",
            reason: `Eliminates the maintenance burden of a detached backend server. Server Actions provide type-safe RPC with end-to-end TypeScript validation.`,
            priority: "required",
            source: "quick-links",
            alternative: "Express.js / Hono",
            alternativeWhen: "Use if running a standalone long-lived daemon server or microservice."
        });
    }

    // Database & Storage Layer
    if (wantsMongo) {
        stack.push({
            name: "MongoDB Atlas + Mongoose",
            category: "Database & Storage",
            purpose: "Document-oriented NoSQL database with dynamic schema support",
            reason: `Honors your explicit preference for MongoDB. Fits flexible document structures and nested JSON schemas.`,
            priority: "required",
            source: "external",
            alternative: "Supabase (PostgreSQL)",
            alternativeWhen: "Use if relational constraints, ACID transactions, and Row Level Security are needed."
        });
    } else {
        stack.push({
            name: "Supabase (PostgreSQL 16) + Prisma ORM",
            category: "Database & Data Modeling",
            purpose: "Managed relational PostgreSQL with instant connection pooling and type-safe migrations",
            reason: `Provides battle-tested relational integrity, automatic connection pooling via Supavisor, and Prisma-generated TypeScript client models.`,
            priority: "required",
            source: "quick-links",
            alternative: "Neon Serverless Postgres + Drizzle ORM",
            alternativeWhen: "Use if branchable serverless databases with ultra-lightweight SQL-like query builders are preferred."
        });
    }

    // Auth Layer (only when relevant to project type or requested)
    if (isSaaS || isEvent || descLower.includes('auth') || descLower.includes('login') || descLower.includes('user')) {
        stack.push({
            name: isSaaS ? "Clerk Authentication" : "Supabase Auth",
            category: "Authentication & Identity",
            purpose: "Secure session management, social OAuth providers, and user management",
            reason: isSaaS
                ? `Provides turn-key multi-tenant organization switching, pre-built security modals, and seamless webhook syncing.`
                : `Integrated directly with PostgreSQL Row-Level Security policies, keeping data access protected at the database tier.`,
            priority: "required",
            source: "quick-links",
            alternative: "Better Auth / NextAuth (Auth.js)",
            alternativeWhen: "Use if self-hosting authentication credentials and database tables without external SaaS dependencies."
        });
    }

    // Specialized Layer: AI / Payments / Charts
    if (isAI) {
        stack.push({
            name: "Google Gemini 2.5 Flash + Vercel AI SDK",
            category: "AI & Model Inference",
            purpose: "Sub-second token streaming and structured JSON output generation",
            reason: `Offers industry-leading context window capacity, multimodal document analysis, and native structured outputs at low cost.`,
            priority: "required",
            source: "external",
            alternative: "OpenAI GPT-4o-mini",
            alternativeWhen: "Use if existing OpenAI embeddings or tool-calling workflows are already standardized."
        });
    }

    if (isEcom || isSaaS) {
        stack.push({
            name: "Stripe Billing & Checkout Elements",
            category: "Payments & Financial Engine",
            purpose: "PCI-compliant checkout flows, subscription lifecycles, and webhooks",
            reason: `Required to handle checkout sessions, tax calculation, and automated subscription renewal webhooks safely.`,
            priority: "required",
            source: "external",
            alternative: "Lemon Squeezy",
            alternativeWhen: "Use if Merchant of Record (MoR) global tax handling is preferred over direct merchant processing."
        });
    }

    if (isDashboard) {
        stack.push({
            name: "Recharts + TanStack Table",
            category: "Data Visualization & Tables",
            purpose: "Declarative SVG charting and headless sorting/filtering tables",
            reason: `Provides responsive, hardware-accelerated time-series line, bar, and area charts with zero canvas memory leaks.`,
            priority: "recommended",
            source: "external",
            alternative: "Tremor / Chart.js",
            alternativeWhen: "Use if high-level opinionated dashboard cards are desired over custom composable SVGs."
        });
    }

    // Deployment Layer
    stack.push({
        name: "Vercel Edge Platform",
        category: "Deployment & Edge Infrastructure",
        purpose: "Global edge CDN, automated preview builds, and serverless compute",
        reason: `Zero-configuration Git deployment, automatic preview environments for every pull request, and global edge asset caching.`,
        priority: "recommended",
        source: "quick-links",
        alternative: "Cloudflare Pages + Workers",
        alternativeWhen: "Use if global edge compute at flat pricing without serverless execution time limits is paramount."
    });

    // 4. Match Curated Tools (distinguishing Quick Links vs External)
    const matchedTools = [];
    
    // Scan resourcesDb
    const scoredDb = [];
    resourcesDb.forEach(res => {
        let score = 0;
        const nameLower = res.name.toLowerCase();
        const catLower = res.category.toLowerCase();
        const descWords = (res.description + ' ' + res.useWhen + ' ' + (res.worksWith || []).join(' ')).toLowerCase();

        if (descLower.includes(nameLower)) score += 20;
        if (descLower.includes(catLower)) score += 8;

        if (is3D && (res.category === '3d' || nameLower.includes('spline') || nameLower.includes('three'))) score += 15;
        if ((res.category === 'animation' || nameLower.includes('motion')) && (descLower.includes('animat') || descLower.includes('motion') || is3D || isEcom)) score += 12;
        if (isAI && (res.category === 'ai' || nameLower.includes('google') || nameLower.includes('open'))) score += 15;
        if ((isSaaS || isEcom) && (nameLower.includes('clerk') || nameLower.includes('supabase') || res.category === 'auth')) score += 14;
        if ((res.category === 'ui' || res.category === 'visuals') && (descLower.includes('ui') || descLower.includes('component') || descLower.includes('card') || isEcom || is3D || isDashboard)) score += 10;
        if (res.category === 'database' && (descLower.includes('db') || descLower.includes('data') || isSaaS || isEvent || isEcom)) score += 12;

        const queryWords = descLower.split(/\W+/).filter(w => w.length > 2);
        queryWords.forEach(w => {
            if (nameLower.includes(w)) score += 4;
            if (descWords.includes(w)) score += 2;
        });

        if (score > 0) scoredDb.push({ res, score });
    });

    scoredDb.sort((a, b) => b.score - a.score);
    const topFromDb = scoredDb.slice(0, 5);

    topFromDb.forEach(item => {
        const r = item.res;
        matchedTools.push({
            name: r.name,
            category: r.category,
            source: "quick-links",
            reason: `Curated Quick Links resource: ${r.name} directly solves "${r.useWhen}". Integrates seamlessly with ${(r.worksWith || []).join(', ')}.`,
            url: r.url,
            icon: r.icon,
            tag: r.tag,
            tagClass: r.tagClass,
            worksWith: r.worksWith
        });
    });

    // Add relevant high-impact External tools when appropriate
    if (is3D && !matchedTools.some(t => t.name.toLowerCase().includes('three'))) {
        matchedTools.push({
            name: "Three.js & React Three Fiber",
            category: "3D Graphics",
            source: "external",
            reason: "External recommendation: Industry standard WebGL/WebGPU 3D canvas runtime for rendering interactive 3D assets inside React.",
            url: "https://threejs.org",
            icon: "🧊",
            tag: "EXTERNAL",
            worksWith: ["Next.js", "React 19", "Drei"]
        });
    }

    if (isAI && !matchedTools.some(t => t.name.toLowerCase().includes('ai'))) {
        matchedTools.push({
            name: "Vercel AI SDK",
            category: "AI Integration",
            source: "external",
            reason: "External recommendation: Streamlined React hooks (`useChat`, `useCompletion`) with multi-provider streaming support and tool calling.",
            url: "https://sdk.vercel.ai",
            icon: "🤖",
            tag: "EXTERNAL",
            worksWith: ["Next.js", "Gemini", "OpenAI"]
        });
    }

    if ((isSaaS || isEcom) && !matchedTools.some(t => t.name.toLowerCase().includes('stripe'))) {
        matchedTools.push({
            name: "Stripe",
            category: "Payments",
            source: "external",
            reason: "External recommendation: Mission-critical payment processing with PCI compliance and prebuilt hosted checkout sessions.",
            url: "https://stripe.com",
            icon: "💳",
            tag: "EXTERNAL",
            worksWith: ["Next.js", "Supabase", "Clerk"]
        });
    }

    // 5. Coherent Workflow
    const workflow = [
        `01 → Phase 1: Architecture & Scaffolding — Initialize Next.js 15 with TypeScript, Tailwind CSS, and strict ESLint rules. Configure path aliases (@/*), environment schema validation with Zod, and foundational layout structure.`,
        `02 → Phase 2: Design System & Primitives — Install shadcn/ui primitives (Button, Card, Dialog, Sheet, Badge). Establish brand CSS variables, typography tokens, and high-contrast dark theme surfaces.`,
        `03 → Phase 3: Core Domain Implementation — Build the primary functional views for ${appType}. Construct interactive components, responsive navigation, and state models tailored to user requirements.`,
        `04 → Phase 4: Data Layer & Integrations — Scaffold database models, write migrations, and establish type-safe Server Actions. Wire up external APIs, authentication guards, and validation pipelines.`,
        `05 → Phase 5: Motion, Feedback & Polish — Implement Motion spring transitions, loading skeletons, empty states, and toast notifications for every user action. Audit keyboard accessibility and responsive layouts.`,
        `06 → Phase 6: Production Hardening & Vercel Launch — Configure OpenGraph metadata, optimize assets, verify error boundaries, and deploy to Vercel with automated Git preview environments.`
    ];

    // 6. Project-Specific Exhaustive Coding Prompt
    const codingPrompt = `You are an elite Principal Software Architect and Senior Full-Stack Engineer. Build a production-ready application based on this exhaustive specification:

### 1. PROJECT GOAL
"${description}"
Target Application Type: ${appType}
Primary Users: ${targetUsers}

### 2. TARGET TECH STACK & DEPENDENCIES
- Core Framework: ${stack[0]?.name || 'Next.js 15 (App Router, React 19, TypeScript)'}
- UI & Styling: ${stack[1]?.name || 'Tailwind CSS + shadcn/ui (Radix UI)'}
- Motion & Canvas: ${stack[2]?.name || 'Motion (Framer Motion)'}
- Backend Runtime: ${stack[3]?.name || 'Next.js Route Handlers & Server Actions'}
- Data & Persistence: ${stack[4]?.name || 'Supabase (PostgreSQL) + Prisma ORM'}
- Deployment: Vercel Edge Platform

### 3. ARCHITECTURE & DIRECTORY STRUCTURE
Scaffold following this modular architecture:
\`\`\`text
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts, theme provider, and analytics
│   ├── page.tsx                # Main view / application landing page
│   ├── api/                    # Serverless API endpoints & webhook handlers
│   └── globals.css             # Design tokens, CSS variables, and ambient glow utilities
├── components/
│   ├── ui/                     # shadcn/ui headless primitives (button, card, dialog, badge)
│   ├── navigation/             # Responsive header, floating bar, and mobile drawer
│   ├── modules/                # Domain-specific interactive feature components
│   └── feedback/               # Skeletons, error boundaries, empty state cards, and toasts
├── lib/
│   ├── db.ts                   # Database connection singleton client
│   └── utils.ts                # Class merging helper (clsx + tailwind-merge)
├── types/                      # End-to-end TypeScript interfaces and API schemas
└── hooks/                      # Custom React state and interaction hooks
\`\`\`

### 4. CORE FEATURES & USER FLOWS
1. First Impressions & Hero: Clean, high-impact introductory viewport communicating value with polished micro-interactions.
2. Primary Interactive Experience: Fully responsive core interaction workflow solving "${description.slice(0, 80)}...".
3. Responsive & Accessible Navigation: Mobile-first layout supporting keyboard navigation, focus indicators, and smooth drawer transitions.
4. Robust Data Handling: Optimistic UI updates, input validation with descriptive errors, and resilient loading skeletons.

### 5. UI/UX & STYLING SPECIFICATIONS
- Visual Palette: Deep dark aesthetic (#050507 background, #101116 cards, 1px subtle borders #24242D).
- Brand Highlights: Yellow accent (#FFC400) for active states, key CTAs, and badges; subtle secondary accents (Purple #7C5CFF, Blue #4F8CFF).
- Micro-interactions: Spring physics via Motion for card hover lift, subtle glow on interactive elements, and staggered list entrances.

### 6. PRODUCTION IMPLEMENTATION RULES
1. Provide the complete code for the layout, the primary feature component, and interactive elements.
2. Strictly NO placeholders, NO 'TODO' comments, and NO truncated implementations for critical logic.
3. Enforce strict TypeScript typing across all props, state variables, and Server Action payloads.
4. Ensure full keyboard accessibility (aria-labels, focus-visible rings) and mobile touch optimization.`;

    return {
        summary: `Tailored architectural blueprint engineered for: "${description}". Designed as a high-performance ${appType} utilizing ${stack[0]?.name || 'Next.js 15'}, ${stack[1]?.name || 'shadcn/ui'}, and verified developer tools.`,
        mode: mode,
        provider: "heuristic",
        isFallback: true,
        understanding: {
            goal: description,
            applicationType: appType,
            targetUsers: targetUsers,
            requirements: [
                "Responsive modern UI with dark-theme developer aesthetic",
                "Modular architecture separating presentation, business logic, and data layer",
                "Hardware-accelerated micro-interactions and smooth viewport transitions",
                "Production-grade error handling and loading feedback"
            ],
            constraints: [
                "Must maintain 60 FPS interaction performance",
                "Zero unnecessary runtime dependencies",
                "Full mobile and keyboard accessibility"
            ],
            assumptions: [
                "Targeting modern Evergreen browsers with JavaScript enabled",
                "Deploying to serverless edge infrastructure (e.g. Vercel)"
            ]
        },
        recommendedStack: stack,
        matchedTools: matchedTools,
        workflow: workflow,
        architecture: `A high-performance modern serverless architecture utilizing ${stack[0]?.name} for hybrid SSR/Edge rendering, ${stack[4]?.name || 'Supabase PostgreSQL'} for persistent state management, and declarative client-side springs for 60 FPS micro-interactions.`,
        codingPrompt: codingPrompt,
        nextSteps: [
            "Initialize application repository with TypeScript, Tailwind CSS, and strict linting",
            "Configure design system primitives and dark-theme variables in globals.css",
            "Scaffold core application layout, navigation drawer, and feature containers",
            "Set up database schema and environment variables in .env.local",
            "Paste the generated AI Coding Prompt into Cursor or Claude to scaffold complete components"
        ],
        optionalEnhancements: [
            "Add progressive web app (PWA) offline caching manifest",
            "Implement OpenGraph social preview dynamic image generation",
            "Add real-time analytics telemetry and error tracking via Sentry"
        ],
        isFallbackNotice: "Notice: Operating in offline toolbox matching mode. Add GEMINI_API_KEY to your environment variables to enable full Google Gemini generative intelligence."
    };
}

/**
 * Filter and format candidate resources compactly for Gemini prompt context
 */
function buildCuratedCatalogueContext(description) {
    const descLower = description.toLowerCase();
    
    // Score all resources
    const scored = resourcesDb.map(r => {
        let score = 0;
        const nameLower = r.name.toLowerCase();
        const catLower = r.category.toLowerCase();
        const fullText = (r.description + ' ' + r.useWhen + ' ' + (r.worksWith || []).join(' ')).toLowerCase();
        
        if (descLower.includes(nameLower)) score += 15;
        if (descLower.includes(catLower)) score += 8;
        
        const words = descLower.split(/\W+/).filter(w => w.length > 2);
        words.forEach(w => {
            if (nameLower.includes(w)) score += 4;
            if (fullText.includes(w)) score += 2;
        });
        
        return { resource: r, score };
    });
    
    scored.sort((a, b) => b.score - a.score);
    
    // Top 20 resources get full context
    const topCandidates = scored.slice(0, 22).map(s => s.resource);
    const candidateList = topCandidates.map(r => 
        `- [${r.name}] (Category: ${r.category}, Tag: ${r.tag}): ${r.description} | Works With: ${(r.worksWith || []).join(', ')} | Use When: ${r.useWhen} | URL: ${r.url}`
    ).join('\n');
    
    // Compact index of remaining resources
    const remaining = scored.slice(22).map(s => `${s.resource.name} (${s.resource.category})`).join(', ');
    
    return {
        detailedContext: candidateList,
        compactSummary: remaining
    };
}

// Main handler
async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
        return;
    }

    // Read request body safely
    let body = {};
    if (typeof req.body === 'object' && req.body !== null) {
        body = req.body;
    } else if (typeof req.body === 'string') {
        try {
            body = JSON.parse(req.body);
        } catch (e) {
            body = {};
        }
    } else {
        try {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const dataStr = Buffer.concat(buffers).toString('utf8');
            if (dataStr) {
                body = JSON.parse(dataStr);
            }
        } catch (e) {
            body = {};
        }
    }

    const description = (body.description || '').trim();
    const mode = (body.mode || 'stack').trim();
    const allowFallback = Boolean(body.fallback);

    if (!description) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: "Tell me what you want to build first."
        }));
        return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const configuredModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    // Candidate models in preference order (reliable public Gemini endpoints)
    const candidateModels = [
        configuredModel,
        "gemini-2.5-flash",
        "gemini-1.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-pro"
    ].filter((m, i, arr) => arr.indexOf(m) === i);

    // Logging for debugging (ONLY boolean for key, NEVER log actual key value)
    console.log(`[Assistant API] Request received for: "${description.slice(0, 45)}..."`);
    console.log(`[Assistant API] Gemini configured: ${Boolean(apiKey)}`);
    console.log(`[Assistant API] Gemini preferred model: ${configuredModel}`);

    // If API key is missing
    if (!apiKey) {
        if (allowFallback) {
            console.log('[Assistant API] Falling back to heuristic matching (explicitly requested).');
            const fallbackData = generateFallbackResponse(description, mode);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(fallbackData));
            return;
        }

        console.warn('[Assistant API] GEMINI_API_KEY is not configured on the server.');
        res.statusCode = 503;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            error: "Gemini API key is not configured on the server. Please add GEMINI_API_KEY to your environment variables.",
            fallbackAvailable: true
        }));
        return;
    }

    // Build curated context
    const { detailedContext, compactSummary } = buildCuratedCatalogueContext(description);

    const systemPrompt = `You are an elite Senior Software Architect, Full-Stack Lead Engineer, and Developer Tooling Advisor acting as the "AI Build Assistant" for Quick Links (a curated developer toolbox).

Your mission is to transform the user's project idea into a complete, coherent, practical technical blueprint, tech stack recommendation, tool selection, implementation roadmap, and an exhaustive coding prompt.

--- RELEVANT CANDIDATES FROM QUICK LINKS TOOLBOX ---
${detailedContext}
Additional Quick Links toolbox tools available: ${compactSummary}
--- END QUICK LINKS TOOLBOX ---

CORE ARCHITECTURAL RULES & REASONING PRINCIPLES:

1. UNDERSTAND INTENT & REQUIREMENTS FIRST:
   - Understand the user's actual goal, application type, and target audience.
   - Infer necessary UI/UX, data persistence, authentication, APIs, and performance requirements from what they want to build.
   - Do NOT invent unrequested major features (e.g. do not add Stripe payments, admin dashboards, or complex subscriptions unless requested or strictly necessary for the application).
   - If user request has ambiguities that do not prevent planning, make pragmatic engineering assumptions and record them in "understanding.assumptions".

2. RESPECT EXPLICIT USER PREFERENCES:
   - If the user explicitly requests a specific framework, language, or tool (e.g. "I want Python", "use MongoDB", "Vue", "Supabase"), RESPECT that preference unless technically contradictory. If recommending an alternative, clearly explain why.

3. STACK COHERENCE & SINGLE PRIMARY DECISION:
   - Recommend 6 to 8 cohesive stack layers (e.g., Frontend Framework, UI & Design System, Animation/Interaction, Backend/Server Runtime, Database & Storage, Authentication, Deployment, Specialized Services).
   - For every stack layer, make ONE clear primary recommendation to eliminate decision paralysis.
   - Avoid over-engineering: choose the smallest coherent stack that satisfies the requirements.
   - Explicitly label priority: "required" | "recommended" | "optional" | "alternative".
   - Optionally suggest a viable alternative with a clear "when to use" condition.
   - Ensure all layers work harmoniously together (e.g. do not combine conflicting database paradigms unless genuinely required).

4. TWO SOURCES OF RECOMMENDATIONS (QUICK LINKS + EXTERNAL):
   - Quick Links is NOT a closed ecosystem. You are explicitly encouraged to recommend external/out-of-the-box tools, libraries, models, and services when they are better suited for the project.
   - For each tool, clearly indicate source: "quick-links" OR "external".
   - When recommending a Quick Links resource, use its exact canonical name and URL from the provided toolbox context. Never hallucinate fake Quick Links items.
   - When recommending an external technology, explain why it was chosen over alternatives. Never pretend external tools belong to Quick Links.
   - Select 4 to 8 highly relevant tools in "matchedTools". For each tool, provide a concrete explanation of which specific screen/feature it implements and why it fits.

5. ARCHITECTURE & WORKFLOW COHERENCE:
   - Stack, Architecture, Workflow, and Coding Prompt MUST be 100% aligned.
   - Architecture: Provide an in-depth explanation of the system architecture, rendering model (SSR/SSG/Client/Edge), state flow, API communication, and scaling model.
   - Workflow: Provide 6 sequential phases formatted as:
     "01 → Phase 1: Name — [concrete tasks, CLI commands, files]"
     Explaining: what to build first → next → connect → test → deploy.
   - Next Steps: 4 to 5 immediate, actionable, sequential developer steps.

6. FULL-LENGTH, EXHAUSTIVE CODING PROMPT (350-550 words):
   - The "codingPrompt" must be a complete, copy-paste-ready specification for Cursor / Claude Code / ChatGPT / AI coding agents.
   - It MUST include:
     ### ROLE & PROJECT GOAL
     ### TARGET TECH STACK & DEPENDENCIES
     ### ARCHITECTURE & DIRECTORY STRUCTURE (ASCII tree)
     ### CORE FEATURES & USER FLOWS
     ### UI/UX & STYLING SPECIFICATIONS (Tokens, dark aesthetic, component states)
     ### FUNCTIONAL REQUIREMENTS & DATA MODELS
     ### API ROUTES & INTEGRATION CONTRACTS
     ### ERROR HANDLING & LOADING FEEDBACK
     ### PRODUCTION IMPLEMENTATION RULES (Strict TypeScript, zero placeholders, accessibility)

7. OUTPUT JSON SCHEMA:
Return ONLY a single valid JSON object strictly matching this schema:
{
  "summary": "Concise 2-3 sentence technical overview of the architecture and approach",
  "mode": "${mode}",
  "understanding": {
    "goal": "Clear summary of user's core product goal",
    "applicationType": "Precise application archetype",
    "targetUsers": "Intended target user group",
    "requirements": ["Requirement 1", "Requirement 2", "..."],
    "constraints": ["Constraint 1", "..."],
    "assumptions": ["Assumption 1", "..."]
  },
  "recommendedStack": [
    {
      "name": "Exact Technology Name",
      "category": "Frontend Framework | UI & Design System | Animation Engine | Backend & API | Database & Storage | Authentication | Deployment | ...",
      "purpose": "Precise role in system",
      "reason": "Detailed technical rationale for why this wins for this project",
      "priority": "required|recommended|optional|alternative",
      "source": "quick-links|external",
      "alternative": "Optional alternative tool name",
      "alternativeWhen": "Condition when to prefer alternative"
    }
  ],
  "architecture": "In-depth 3-4 sentence explanation of the data flow, rendering strategy, and component communication",
  "matchedTools": [
    {
      "name": "Tool Name",
      "category": "Category",
      "source": "quick-links|external",
      "reason": "Deep, specific rationale explaining which feature/screen this tool solves and why it fits",
      "url": "https://..."
    }
  ],
  "workflow": [
    "01 → Phase 1: ...",
    "02 → Phase 2: ...",
    "03 → Phase 3: ...",
    "04 → Phase 4: ...",
    "05 → Phase 5: ...",
    "06 → Phase 6: ..."
  ],
  "codingPrompt": "Long, comprehensive, multi-section coding prompt...",
  "nextSteps": [
    "Step 1...",
    "Step 2...",
    "Step 3...",
    "Step 4..."
  ],
  "optionalEnhancements": [
    "Optional feature 1",
    "Optional feature 2"
  ]
}`;

    const userPrompt = `Project Description to Architect:
"${description}"

Please analyze this requirement, extract goals and constraints, select an optimal coherent stack distinguishing required vs recommended and Quick Links vs external tools, match relevant tools with deep project-specific reasons, define the architecture and workflow, and generate an exhaustive, production-grade AI coding prompt.`;

    const requestPayload = {
        contents: [
            {
                role: "user",
                parts: [{ text: userPrompt }]
            }
        ],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
        generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.25
        }
    };

    let lastError = null;
    let lastStatus = null;

    // Try candidate models in order
    for (const model of candidateModels) {
        try {
            const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

            const response = await fetch(geminiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestPayload)
            });

            console.log(`[Assistant API] Model ${model} response status: ${response.status}`);

            if (!response.ok) {
                lastStatus = response.status;
                let errDetails = '';
                try {
                    const errJson = await response.json();
                    errDetails = errJson.error?.message || '';
                } catch (e) {}

                console.warn(`[Assistant API] Gemini (${model}) failed with ${response.status}: ${errDetails}`);

                if (response.status === 401) {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        error: "Gemini API request failed: 401 — Invalid or unauthorized API key. Check GEMINI_API_KEY in your hosting environment."
                    }));
                    return;
                }

                if (response.status === 403) {
                    res.statusCode = 403;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        error: "Gemini API request failed: 403 — API key does not have permission for the Gemini Generative Language API."
                    }));
                    return;
                }

                if (response.status === 429) {
                    res.statusCode = 429;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                        error: "Gemini API request failed: 429 — Rate limit exceeded. Please wait a moment."
                    }));
                    return;
                }

                // If 404 or 503, try next candidate model
                if (response.status === 404 || response.status === 503) {
                    lastError = errDetails;
                    continue;
                }

                lastError = errDetails;
                break;
            }

            const data = await response.json();
            const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            let parsed = null;
            try {
                const cleaned = rawContent.replace(/```json\s*/gi, '').replace(/```\s*$/gi, '').trim();
                parsed = JSON.parse(cleaned);
            } catch (jsonErr) {
                console.error('[Assistant API] Malformed JSON received from Gemini:', jsonErr.message);
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    error: "Gemini returned a malformed response. Please try submitting again."
                }));
                return;
            }

            // Validate that required fields exist
            if (!parsed || typeof parsed !== 'object') {
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                    error: "Gemini returned an invalid response structure."
                }));
                return;
            }

            // Post-process matchedTools: enrich Quick Links canonical metadata while preserving external tools
            if (Array.isArray(parsed.matchedTools)) {
                parsed.matchedTools = parsed.matchedTools.map(item => {
                    const canonical = resourcesDb.find(r => 
                        r.name.toLowerCase() === (item.name || '').toLowerCase()
                    ) || resourcesDb.find(r =>
                        (item.name || '').toLowerCase().includes(r.name.toLowerCase()) ||
                        r.name.toLowerCase().includes((item.name || '').toLowerCase())
                    );

                    if (canonical) {
                        return {
                            name: canonical.name,
                            category: canonical.category,
                            source: "quick-links",
                            reason: item.reason || `Essential for this architecture: ${canonical.useWhen}`,
                            url: canonical.url,
                            icon: canonical.icon,
                            tag: canonical.tag,
                            tagClass: canonical.tagClass,
                            worksWith: canonical.worksWith
                        };
                    }

                    // External tool recommendation
                    return {
                        name: item.name,
                        category: item.category || "Tool",
                        source: "external",
                        reason: item.reason || "Recommended external tool for this architecture.",
                        url: item.url || "#",
                        icon: item.icon || "🌐",
                        tag: "EXTERNAL",
                        worksWith: item.worksWith || []
                    };
                });
            }

            // Ensure recommendedStack items have source and priority normalized
            if (Array.isArray(parsed.recommendedStack)) {
                parsed.recommendedStack = parsed.recommendedStack.map(item => {
                    const hasInDb = resourcesDb.some(r => 
                        r.name.toLowerCase().includes((item.name || '').toLowerCase()) ||
                        (item.name || '').toLowerCase().includes(r.name.toLowerCase())
                    );
                    return {
                        ...item,
                        source: item.source || (hasInDb ? "quick-links" : "external"),
                        priority: item.priority || "recommended"
                    };
                });
            }

            // Mark successful Gemini response metadata
            parsed.provider = "gemini";
            parsed.modelUsed = model;
            parsed.isFallback = false;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(parsed));
            return;

        } catch (fetchErr) {
            console.warn(`[Assistant API] Fetch error with model ${model}:`, fetchErr.message);
            lastError = fetchErr.message;
        }
    }

    // If candidate models failed
    console.error(`[Assistant API] All Gemini candidate models failed. Last error: ${lastError}`);
    if (allowFallback) {
        const fallbackData = generateFallbackResponse(description, mode);
        fallbackData.isFallbackNotice = "Notice: Gemini API temporarily unavailable. Displaying rule-based toolbox matches.";
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(fallbackData));
        return;
    }

    res.statusCode = lastStatus || 502;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        error: `Gemini API request failed (${lastStatus || 502}): ${lastError || 'Service temporarily unavailable. Please try again.'}`,
        fallbackAvailable: true
    }));
}

// Support both CommonJS export for Node/Vercel and default
module.exports = handler;
module.exports.default = handler;
