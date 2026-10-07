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

// Fallback matching engine for offline scenarios with rich, expanded output
function generateFallbackResponse(description, mode = 'stack') {
    const descLower = description.toLowerCase();
    
    // Score each resource based on relevance
    const matched = [];
    resourcesDb.forEach(res => {
        let score = 0;
        const nameLower = res.name.toLowerCase();
        const catLower = res.category.toLowerCase();
        const descWords = (res.description + ' ' + res.useWhen + ' ' + res.worksWith.join(' ')).toLowerCase();
        
        if (descLower.includes(nameLower)) score += 15;
        if (descLower.includes(catLower)) score += 8;
        
        // Keyword associations
        if ((descLower.includes('3d') || descLower.includes('three')) && (res.category === '3d' || nameLower.includes('three') || nameLower.includes('spline'))) score += 12;
        if ((descLower.includes('animat') || descLower.includes('motion') || descLower.includes('scroll')) && (res.category === 'animation' || nameLower.includes('motion') || nameLower.includes('gsap'))) score += 12;
        if ((descLower.includes('auth') || descLower.includes('login') || descLower.includes('user')) && (res.category === 'auth' || nameLower.includes('clerk') || nameLower.includes('better auth'))) score += 12;
        if ((descLower.includes('db') || descLower.includes('database') || descLower.includes('store') || descLower.includes('sql') || descLower.includes('product') || descLower.includes('cart')) && (res.category === 'database' || nameLower.includes('supabase') || nameLower.includes('mongo') || nameLower.includes('prisma'))) score += 12;
        if ((descLower.includes('ai') || descLower.includes('bot') || descLower.includes('chat') || descLower.includes('llm') || descLower.includes('prompt')) && (res.category === 'ai' || nameLower.includes('openai') || nameLower.includes('google ai') || nameLower.includes('hugging'))) score += 12;
        if ((descLower.includes('ui') || descLower.includes('component') || descLower.includes('navbar') || descLower.includes('card') || descLower.includes('shop') || descLower.includes('landing') || descLower.includes('hero')) && (res.category === 'ui' || res.category === 'visuals')) score += 10;
        if ((descLower.includes('deploy') || descLower.includes('host') || descLower.includes('prod')) && res.category === 'deployment') score += 8;
        if (descLower.includes('icon') && res.category === 'icons') score += 8;
        
        // Word matches
        const queryWords = descLower.split(/\W+/).filter(w => w.length > 2);
        queryWords.forEach(word => {
            if (nameLower.includes(word)) score += 4;
            if (descWords.includes(word)) score += 2;
        });
        
        if (score > 0) {
            matched.push({ resource: res, score });
        }
    });
    
    matched.sort((a, b) => b.score - a.score);
    const topMatches = matched.slice(0, 8).map(m => {
        const r = m.resource;
        let detailedReason = `Specifically selected because ${r.name} provides ${r.description.toLowerCase()}. Perfect for your project's requirement: "${r.useWhen}". Integrates seamlessly with ${r.worksWith.join(', ')} without bloated overhead.`;
        return {
            name: r.name,
            category: r.category,
            reason: detailedReason,
            url: r.url,
            icon: r.icon,
            tag: r.tag,
            tagClass: r.tagClass,
            worksWith: r.worksWith
        };
    });
    
    const is3D = descLower.includes('3d') || descLower.includes('canvas') || descLower.includes('game');
    const isAI = descLower.includes('ai') || descLower.includes('llm') || descLower.includes('chat') || descLower.includes('gpt');
    const isEcom = descLower.includes('shop') || descLower.includes('e-commerce') || descLower.includes('ecommerce') || descLower.includes('cart') || descLower.includes('product');
    const isSaaS = descLower.includes('saas') || descLower.includes('payment') || descLower.includes('billing') || descLower.includes('subscription');
    
    const stack = [
        { 
            category: "Frontend Framework", 
            name: "Next.js 15 (App Router & Server Components)", 
            reason: "Next.js 15 provides blazing fast hybrid rendering (SSR/SSG), nested layouts, and automatic route prefetching. Server Components ensure zero-bundle-size rendering for content and product displays while keeping client hydration lean." 
        },
        { 
            category: "UI & Design System", 
            name: "shadcn/ui + Tailwind CSS", 
            reason: "shadcn/ui gives you fully accessible Radix UI primitives with complete source code ownership. Tailwind CSS enables expressive, dark-mode-first styling with zero runtime CSS-in-JS overhead." 
        },
        { 
            category: "Animation & Motion Engine", 
            name: is3D ? "Spline + Motion (Framer Motion)" : "Motion (Framer Motion)", 
            reason: "Declarative spring physics and scroll-linked animations (`useScroll`, `useTransform`). Delivers silky smooth card hover states, stagger entrance transitions, and viewport-triggered reveals without compromising 60 FPS performance." 
        },
        { 
            category: "Backend & Server Runtime", 
            name: "Next.js Route Handlers & Server Actions", 
            reason: "Type-safe RPC execution via Server Actions eliminating the need for boilerplate REST controllers. Runs at the edge or serverless Node.js with built-in request caching and revalidation." 
        },
        { 
            category: "Database & ORM", 
            name: "Supabase (PostgreSQL) + Prisma ORM", 
            reason: "Managed enterprise-grade PostgreSQL with instant connection pooling via PgBouncer. Prisma provides end-to-end TypeScript schema safety, migrations, and intuitive relations." 
        },
        { 
            category: "Authentication & Identity", 
            name: isSaaS || isEcom ? "Clerk Authentication" : "Supabase Auth", 
            reason: "Frictionless multi-tenant identity with social OAuth, session tokens, and ready-to-use user profile modals. Eliminates security vulnerabilities while supporting webhook synchronization." 
        },
        { 
            category: "Deployment & Edge Infrastructure", 
            name: "Vercel Edge Platform", 
            reason: "Zero-configuration continuous deployment from Git with preview environments, global edge caching, image optimization, and serverless compute scaling automatically with traffic spikes." 
        }
    ];
    
    if (isAI) {
        stack.push({ 
            category: "AI & Inference Engine", 
            name: "Google Gemini 3.1 Flash / AI Studio", 
            reason: "Sub-second token latency, massive multimodal context window, and native structured JSON schema enforcement for lightning-fast assistant and generation features." 
        });
    }

    if (isEcom || isSaaS) {
        stack.push({
            category: "Payments & Billing",
            name: "Stripe Elements & Checkout",
            reason: "Industry-standard PCI-compliant checkout sessions, webhooks for automated order fulfillment, and multi-currency support."
        });
    }
    
    const workflow = [
        "01 → Phase 1: Architecture & Scaffolding — Initialize Next.js 15 with TypeScript, Tailwind CSS, and strict ESLint. Configure directory structure with App Router, shadcn/ui components.json, and environment variable validation using Zod.",
        "02 → Phase 2: Design System & Primitive Foundations — Scaffold global CSS variables for dark theme, typography tokens, layout containers, and install core components (Button, Dialog, Dropdown, Sheet, Badge, Card, Skeleton).",
        "03 → Phase 3: Interactive Visuals & Motion Layer — Implement viewport scroll animations, fluid staggered grids with Motion, interactive floating navigation, and responsive mobile drawers.",
        "04 → Phase 4: Database Modeling & Data Fetching — Design PostgreSQL schema in Supabase with Prisma models. Configure relations, indexes, and write type-safe Server Actions with React cache for optimistic UI updates.",
        "05 → Phase 5: Auth & Feature Integrations — Wire up Clerk session middleware, protect private routes, integrate payment checkouts or third-party webhooks, and implement comprehensive toast notifications.",
        "06 → Phase 6: Production Hardening & Deployment — Audit Lighthouse scores, configure Core Web Vitals monitoring, optimize image formats (WebP/AVIF), and deploy to Vercel with automated branch preview environments."
    ];
    
    const codingPrompt = `You are an elite principal full-stack engineer and UI designer. Build a complete, production-grade web application based on this project specification:

### PROJECT GOAL
"${description}"

### TARGET TECH STACK
- Framework: Next.js 15+ (App Router, React 19, TypeScript)
- Styling: Tailwind CSS (Dark aesthetic, clean glassmorphism, subtle borders)
- UI Primitives: shadcn/ui (Radix UI) + Lucide Icons
- Motion & Animation: Motion (Framer Motion) for scroll triggers and stagger effects
- Backend & Database: Supabase PostgreSQL + Prisma ORM
- Deployment: Vercel

### ARCHITECTURE & DIRECTORY STRUCTURE
Scaffold following this modular layout:
\`\`\`text
src/
├── app/
│   ├── layout.tsx         # Root layout with dark theme provider and fonts
│   ├── page.tsx           # Main landing / storefront page with scroll sections
│   ├── api/               # Serverless Route Handlers
│   └── globals.css        # Tailwind variables and ambient background glows
├── components/
│   ├── ui/                # shadcn primitives (Button, Card, Badge, Dialog)
│   ├── navigation/        # Interactive floating navbar & responsive drawer
│   ├── sections/          # Feature sections, Hero, and interactive cards
│   └── animations/        # Reusable Framer Motion wrappers (FadeIn, StaggerGrid)
├── lib/
│   ├── prisma.ts          # Singleton Prisma client instance
│   └── utils.ts           # Class merge helper (clsx + tailwind-merge)
└── types/                 # TypeScript interfaces and schema definitions
\`\`\`

### IMPLEMENTATION REQUIREMENTS
1. Visual Polish: Use a premium dark technical aesthetic (#08090d background, #10121a cards, 1px subtle borders #222634, and soft indigo/purple accents).
2. Card & Scroll Effects: Implement interactive cards with hover scale/tilt, spring physics, dynamic image reveal on hover, and smooth scroll entrance reveals.
3. Accessibility & Performance: Strict semantic HTML, full keyboard navigation, aria labels, and next/image optimization.
4. Provide the complete code for the layout, the primary feature component, and the interactive cards. Do not use placeholders.`;

    return {
        summary: `Comprehensive architectural blueprint engineered for: "${description}". Configured with a modern Next.js 15 App Router architecture, shadcn/ui design system, Motion animation layer, and verified developer tools matched from your toolbox.`,
        mode: mode,
        provider: "heuristic",
        isFallback: true,
        recommendedStack: stack,
        matchedTools: topMatches,
        workflow: workflow,
        architecture: `A high-performance modern Serverless architecture utilizing Next.js 15 App Router for hybrid SSR/Edge delivery, Supabase PostgreSQL for persistent state and real-time syncing, and client-side Motion springs for 60 FPS scroll-triggered micro-interactions.`,
        codingPrompt: codingPrompt,
        nextSteps: [
            "Initialize your Next.js application: `npx create-next-app@latest my-app --typescript --tailwind --app`",
            "Initialize your shadcn/ui component library: `npx shadcn@latest init`",
            "Install animation and icon packages: `npm install motion lucide-react clsx tailwind-merge`",
            "Set up your Supabase project credentials in `.env.local`",
            "Paste the generated AI Coding Prompt into Cursor or Claude to scaffold the core components"
        ],
        isFallbackNotice: "Notice: Operating in heuristic toolbox matching mode. Add GEMINI_API_KEY to your hosting environment variables to enable full Google Gemini Flash generative intelligence."
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
    const configuredModel = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

    // Candidate models in preference order
    const candidateModels = [
        configuredModel,
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-3.8-flash"
    ].filter((m, i, arr) => arr.indexOf(m) === i);

    // Logging for debugging (ONLY boolean for key, NEVER log actual key value)
    console.log(`[Assistant API] Request received for description: "${description.slice(0, 45)}..."`);
    console.log(`[Assistant API] Gemini configured: ${Boolean(apiKey)}`);
    console.log(`[Assistant API] Gemini model: ${configuredModel}`);

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

    // Format catalogue for Gemini context
    const toolboxCatalogue = resourcesDb.map(r => 
        `- [${r.name}] (Category: ${r.category}, Tag: ${r.tag}): ${r.description} | Works With: ${r.worksWith.join(', ')} | Use When: ${r.useWhen} | URL: ${r.url}`
    ).join('\n');

    const systemPrompt = `You are a Principal Software Architect and Tech Lead acting as the "AI Build Assistant" for a developer's Quick Links tech radar and toolbox.

The developer is providing a project concept, feature requirement, or architectural question.
Your mission is to provide an EXTREMELY DETAILED, HIGH-YIELD, UN-GENERIC architectural specification and plan.

--- DEVELOPER TOOLBOX CATALOGUE (61 VERIFIED TOOLS) ---
${toolboxCatalogue}
--- END TOOLBOX ---

MANDATORY RULES & QUALITY STANDARDS:
1. NO GENERIC FLUFF: Avoid superficial one-liners. Provide actionable technical depth, naming exact libraries, patterns, and trade-offs.
2. TOOL MATCHING WITH DEEP REASONS:
   - For every tool you recommend from their toolbox, you MUST explain in depth (2-3 detailed sentences) EXACTLY WHY you selected it for THIS project, which specific feature/screen it solves, and how it connects to the other stack layers.
   - Use the EXACT canonical tool names and URLs from the toolbox.
3. EXPANDED RECOMMENDED STACK:
   - Recommend 6 to 8 cohesive stack layers (Frontend, UI/Design System, Animation Engine, Backend/Server, Database/ORM, Auth, Deployment, APIs).
   - For each stack item, give a detailed technical rationale explaining why it wins over alternatives.
4. EXPANDED WORKFLOW (PHASES & MILESTONES):
   - Provide 6 structured phases formatted with clear milestone names:
     "01 → Phase 1: Architecture & Scaffolding — [detailed explanation of tasks, CLI commands, and structure]"
     "02 → Phase 2: Design System & UI Primitives — [detailed explanation]"
     "03 → Phase 3: Core Features & Interactive Motion — [detailed explanation]"
     "04 → Phase 4: Data Layer, Schemas & API Integrations — [detailed explanation]"
     "05 → Phase 5: Authentication, Security & Polish — [detailed explanation]"
     "06 → Phase 6: QA, Optimization & Vercel Deployment — [detailed explanation]"
5. FULL-LENGTH, EXHAUSTIVE CODING PROMPT:
   - The "codingPrompt" MUST BE A COMPREHENSIVE, LONG SPECIFICATION (at least 350-500 words).
   - It must include: Role, Goal, Target Tech Stack with versions, Directory File Tree structure, Key Components Breakdown, State & Data Flow requirements, and Production Implementation Rules.
   - The user should be able to paste this directly into Cursor / Claude 3.7 / ChatGPT to build the entire app.
6. OUTPUT FORMAT:
   Return ONLY a single valid JSON object with NO markdown formatting, strictly following this JSON schema:
{
  "summary": "Deep 2-3 sentence technical summary of the project and architectural approach",
  "mode": "${mode}",
  "architecture": "In-depth 3-4 sentence explanation of the system architecture, data flow, rendering strategy, and scaling model",
  "recommendedStack": [
    { "category": "Frontend Framework", "name": "...", "reason": "Detailed architectural rationale..." },
    { "category": "UI & Design System", "name": "...", "reason": "Detailed architectural rationale..." },
    { "category": "Animation Engine", "name": "...", "reason": "Detailed architectural rationale..." },
    { "category": "Backend & Server", "name": "...", "reason": "Detailed architectural rationale..." },
    { "category": "Database & ORM", "name": "...", "reason": "Detailed architectural rationale..." },
    { "category": "Authentication", "name": "...", "reason": "Detailed architectural rationale..." },
    { "category": "Deployment", "name": "...", "reason": "Detailed architectural rationale..." }
  ],
  "matchedTools": [
    { "name": "...", "category": "...", "reason": "Deep, specific rationale for why this tool is selected for this project...", "url": "..." }
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
  ]
}`;

    const userPrompt = `Project Description to Architect:
"${description}"

Please analyze this requirement, select the optimal stack, match against my Quick Links toolbox with deep project-specific reasons for each tool, expand the workflow phases, and generate an exhaustive, high-length AI coding prompt.`;

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
            temperature: 0.3
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

            // Post-process matchedTools to ensure canonical URLs and metadata from resourcesDb
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
                            reason: item.reason || `Essential for this architecture: ${canonical.useWhen}`,
                            url: canonical.url,
                            icon: canonical.icon,
                            tag: canonical.tag,
                            tagClass: canonical.tagClass,
                            worksWith: canonical.worksWith
                        };
                    }

                    return item;
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
