/**
 * =====================================================
 * QUICK LINKS — AI BUILD ASSISTANT CONTROLLER
 * Tabbed Results Layout & Fixed Architecture Sidebar
 * =====================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // DOM Elements
    const promptInput = document.getElementById('promptInput');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const chipButtons = document.querySelectorAll('.chip');

    // Results Navbar & Tab Panes
    const resTabs = document.querySelectorAll('.res-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // Processing & Error
    const loadingState = document.getElementById('loadingState');
    const loadingStepTitle = document.getElementById('loadingStepTitle');
    const loadingStepSub = document.getElementById('loadingStepSub');
    const progressBar = document.getElementById('progressBar');
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');
    const dot3 = document.getElementById('dot3');
    const dot4 = document.getElementById('dot4');

    const errorState = document.getElementById('errorState');
    const errorMsgText = document.getElementById('errorMsgText');
    const dismissErrorBtn = document.getElementById('dismissErrorBtn');
    const tryFallbackBtn = document.getElementById('tryFallbackBtn');
    const modelIndicator = document.getElementById('modelIndicator');

    // Results Container
    const resultsContainer = document.getElementById('resultsContainer');
    const fallbackNotice = document.getElementById('fallbackNotice');
    const fallbackNoticeText = document.getElementById('fallbackNoticeText');

    // Content Containers
    const stackGrid = document.getElementById('stackGrid');
    const matchedToolsGrid = document.getElementById('matchedToolsGrid');
    const workflowTimeline = document.getElementById('workflowTimeline');
    const resultCodingPrompt = document.getElementById('resultCodingPrompt');
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    const copyBtnText = document.getElementById('copyBtnText');

    // Right Sidebar Overview
    const resultSummary = document.getElementById('resultSummary');
    const resultArchitecture = document.getElementById('resultArchitecture');
    const nextStepsList = document.getElementById('nextStepsList');

    let activeTabId = 'stack';
    let progressTimer = null;
    let isSubmitting = false;

    // Results Tab Switching
    resTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            switchTab(targetTab);
        });
    });

    function switchTab(tabName) {
        activeTabId = tabName;

        // Update tabs
        resTabs.forEach(t => {
            const isActive = t.dataset.tab === tabName;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Update panes
        tabPanes.forEach(pane => {
            const paneId = pane.id.toLowerCase();
            const shouldShow = 
                (tabName === 'stack' && paneId === 'panestack') ||
                (tabName === 'tools' && paneId === 'panetools') ||
                (tabName === 'workflow' && paneId === 'paneworkflow') ||
                (tabName === 'prompt' && paneId === 'paneprompt');

            pane.classList.toggle('active', shouldShow);
        });
    }

    // Example Idea Chips
    chipButtons.forEach(chip => {
        chip.addEventListener('click', () => {
            const promptText = chip.dataset.prompt;
            if (promptText) {
                promptInput.value = promptText;
                promptInput.focus();
                hideError();
            }
        });
    });

    // Clear Button
    clearBtn.addEventListener('click', () => {
        promptInput.value = '';
        promptInput.focus();
        hideError();
    });

    // Dismiss Error
    dismissErrorBtn.addEventListener('click', hideError);

    if (tryFallbackBtn) {
        tryFallbackBtn.addEventListener('click', () => {
            hideError();
            triggerGenerate({ forceFallback: true });
        });
    }

    function showError(msg, showFallback = false) {
        errorMsgText.textContent = msg || 'Something went wrong. Please try again.';
        if (tryFallbackBtn) {
            tryFallbackBtn.classList.toggle('hidden', !showFallback);
        }
        errorState.classList.remove('hidden');
    }

    function hideError() {
        errorState.classList.add('hidden');
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter or Cmd + Enter to generate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            triggerGenerate();
        }
        // Esc to clear input or hide errors
        if (e.key === 'Escape') {
            if (!errorState.classList.contains('hidden')) {
                hideError();
            } else if (document.activeElement === promptInput) {
                promptInput.value = '';
            }
        }
    });

    generateBtn.addEventListener('click', triggerGenerate);

    // Multi-stage loading progress
    const steps = [
        { title: "Analyzing your idea...", sub: "Evaluating technical requirements and architectural trade-offs", pct: 25, activeDot: 1 },
        { title: "Choosing the right architecture...", sub: "Determining optimal frontend, backend, and data patterns", pct: 50, activeDot: 2 },
        { title: "Matching tools from your toolbox...", sub: "Cross-referencing against verified Quick Links database", pct: 75, activeDot: 3 },
        { title: "Building your workflow & prompt...", sub: "Generating ready-to-use coding instructions and next steps", pct: 90, activeDot: 4 }
    ];

    function startLoading() {
        isSubmitting = true;
        generateBtn.disabled = true;
        generateBtn.classList.add('loading');
        loadingState.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
        hideError();

        let stepIndex = 0;
        updateLoadingUI(steps[0]);

        if (progressTimer) clearInterval(progressTimer);
        progressTimer = setInterval(() => {
            stepIndex++;
            if (stepIndex < steps.length) {
                updateLoadingUI(steps[stepIndex]);
            }
        }, 800);
    }

    function updateLoadingUI(step) {
        loadingStepTitle.textContent = step.title;
        loadingStepSub.textContent = step.sub;
        progressBar.style.width = `${step.pct}%`;

        [dot1, dot2, dot3, dot4].forEach((dot, idx) => {
            if (idx + 1 <= step.activeDot) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function stopLoading() {
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
        progressBar.style.width = '100%';
        [dot1, dot2, dot3, dot4].forEach(dot => dot.classList.add('active'));

        setTimeout(() => {
            loadingState.classList.add('hidden');
            generateBtn.disabled = false;
            generateBtn.classList.remove('loading');
            isSubmitting = false;
        }, 200);
    }

    // Trigger API Generation
    async function triggerGenerate(options = {}) {
        if (isSubmitting) return;

        const description = promptInput.value.trim();
        if (!description) {
            showError("Tell me what you want to build first.");
            promptInput.focus();
            return;
        }

        const forceFallback = Boolean(options && options.forceFallback);

        startLoading();

        try {
            const response = await fetch('/api/assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: description,
                    mode: activeTabId,
                    fallback: forceFallback
                })
            });

            let data = null;
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                try {
                    data = await response.json();
                } catch (e) {
                    data = null;
                }
            }

            if (!response.ok) {
                stopLoading();
                let errText = "Something went wrong. Please try again.";
                let allowFallback = true;

                if (data && data.error) {
                    errText = data.error;
                    allowFallback = Boolean(data.fallbackAvailable);
                } else if (response.status === 405 || response.status === 404) {
                    errText = `HTTP ${response.status}: The serverless API (/api/assistant) is not active on this static host (e.g. GitHub Pages). To enable live Gemini AI generation, deploy to Vercel with your GEMINI_API_KEY.`;
                    allowFallback = true;
                } else if (response.status === 429) {
                    errText = "Too many requests. Please wait a moment.";
                    allowFallback = false;
                } else {
                    errText = `Server error (${response.status}). Please check server logs.`;
                    allowFallback = true;
                }

                showError(errText, allowFallback);
                return;
            }

            if (!data) {
                stopLoading();
                showError("Invalid response format received from server.", true);
                return;
            }

            stopLoading();
            renderResults(data);

        } catch (err) {
            console.error('Request failed:', err);
            stopLoading();

            if (forceFallback && window.resources && Array.isArray(window.resources)) {
                // If forceFallback was requested and serverless API cannot be contacted (e.g. static host)
                const localData = generateClientFallback(description, activeTabId);
                renderResults(localData);
                return;
            }

            showError("Network connection error. If running locally, ensure 'npm run dev' is running. If hosted statically on GitHub Pages, deploy to Vercel with your GEMINI_API_KEY.", true);
        }
    }

    // Client-side heuristic fallback for offline or static hosting scenarios
    function generateClientFallback(description, mode) {
        const descLower = description.toLowerCase();
        const resourcesList = window.resources || [];

        // 1. Detect explicit preferences
        const wantsPython = descLower.includes('python') || descLower.includes('fastapi') || descLower.includes('django') || descLower.includes('flask');
        const wantsMongo = descLower.includes('mongo') || descLower.includes('mongodb');
        const wantsVue = descLower.includes('vue') || descLower.includes('nuxt');
        const wantsSvelte = descLower.includes('svelte') || descLower.includes('sveltekit');

        // 2. Detect project archetypes
        const is3D = descLower.includes('3d') || descLower.includes('three') || descLower.includes('spline') || descLower.includes('canvas') || (descLower.includes('portfolio') && (descLower.includes('motion') || descLower.includes('animat')));
        const isAI = descLower.includes('ai') || descLower.includes('llm') || descLower.includes('chat') || descLower.includes('gpt') || descLower.includes('rag') || descLower.includes('document') || descLower.includes('vector') || descLower.includes('embedding');
        const isEcom = descLower.includes('shop') || descLower.includes('e-commerce') || descLower.includes('ecommerce') || descLower.includes('cart') || descLower.includes('product') || descLower.includes('store');
        const isSaaS = descLower.includes('saas') || descLower.includes('subscription') || descLower.includes('billing') || descLower.includes('stripe') || descLower.includes('tenant');
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

        const stack = [];

        // Frontend
        if (wantsVue) {
            stack.push({
                name: "Nuxt 3 (Vue 3 + Vite)",
                category: "Frontend Framework",
                purpose: "Full-stack SSR Vue framework with file-system routing",
                reason: "Directly honors your preference for Vue. Provides auto-imports, SSR hydration, and built-in Nitro server engine.",
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
                reason: "Directly honors your preference for Svelte. Minimal runtime footprint and high performance.",
                priority: "required",
                source: "external",
                alternative: "Next.js 15",
                alternativeWhen: "Use if larger third-party component ecosystem is required."
            });
        } else {
            stack.push({
                name: "Next.js 15 (App Router & React 19)",
                category: "Frontend Framework",
                purpose: "Production web architecture with hybrid Server Components & client hydration",
                reason: `Provides zero-bundle React Server Components, streaming SSR, and optimized bundling for ${appType}.`,
                priority: "required",
                source: "quick-links",
                alternative: "Vite + React 19 SPA",
                alternativeWhen: "Use if the application is purely behind-login with zero SEO requirements."
            });
        }

        // UI & Design System
        stack.push({
            name: "shadcn/ui + Tailwind CSS",
            category: "UI & Design System",
            purpose: "Headless Radix UI primitives styled with utility-first CSS",
            reason: "Accessible UI primitives with complete source code ownership and zero runtime CSS overhead.",
            priority: "recommended",
            source: "quick-links",
            alternative: "Tailwind UI",
            alternativeWhen: "Use if pre-built proprietary commercial layout kits are preferred."
        });

        // Animation / Visuals
        if (is3D) {
            stack.push({
                name: "React Three Fiber + Three.js & Drei",
                category: "3D & Canvas Graphics",
                purpose: "Declarative Three.js scene graph inside React component tree",
                reason: "Essential for 3D visuals. Enables lighting, GLTF model loading, orbit controls, and canvas shaders.",
                priority: "required",
                source: "external",
                alternative: "Spline Viewer",
                alternativeWhen: "Use if no-code interactive 3D scene embeds without custom shaders are preferred."
            });
            stack.push({
                name: "Motion (Framer Motion)",
                category: "UI Motion & Interactions",
                purpose: "Spring-based physics and scroll-driven UI orchestrations",
                reason: "Handles smooth UI overlays, stagger entrance lists, and micro-interactions layered over the 3D canvas.",
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
                reason: "Provides fluid card hover states, enter/exit page transitions, and responsive layout animations.",
                priority: "recommended",
                source: "quick-links",
                alternative: "CSS Transitions / Tailwind Animate",
                alternativeWhen: "Use if zero JavaScript animation runtime is strictly required."
            });
        }

        // Backend Runtime
        if (wantsPython) {
            stack.push({
                name: "FastAPI + Pydantic v2 (Python 3.12)",
                category: "Backend & API Engine",
                purpose: "High-performance asynchronous REST API",
                reason: "Honors your preference for Python. Delivers async endpoints and native compatibility with AI/ML tools.",
                priority: "required",
                source: "external",
                alternative: "Next.js Route Handlers",
                alternativeWhen: "Use if consolidating into a single TypeScript repository."
            });
        } else {
            stack.push({
                name: "Next.js Route Handlers & Type-Safe Server Actions",
                category: "Backend & API Runtime",
                purpose: "Serverless endpoints running on Node.js / Edge",
                reason: "Eliminates separate backend server overhead while providing type-safe RPC Server Actions.",
                priority: "required",
                source: "quick-links",
                alternative: "Express.js / Hono",
                alternativeWhen: "Use if running a standalone long-lived daemon server."
            });
        }

        // Database
        if (wantsMongo) {
            stack.push({
                name: "MongoDB Atlas + Mongoose",
                category: "Database & Storage",
                purpose: "Document-oriented NoSQL database",
                reason: "Honors your explicit preference for MongoDB. Fits flexible document structures.",
                priority: "required",
                source: "external",
                alternative: "Supabase (PostgreSQL)",
                alternativeWhen: "Use if relational constraints and Row Level Security are needed."
            });
        } else {
            stack.push({
                name: "Supabase (PostgreSQL 16) + Prisma ORM",
                category: "Database & Data Modeling",
                purpose: "Managed relational PostgreSQL with connection pooling and type-safe schema",
                reason: "Provides relational integrity, connection pooling via Supavisor, and Prisma TypeScript client models.",
                priority: "required",
                source: "quick-links",
                alternative: "Neon + Drizzle ORM",
                alternativeWhen: "Use if serverless branchable databases with SQL query builder are preferred."
            });
        }

        // Auth
        if (isSaaS || isEvent || descLower.includes('auth') || descLower.includes('login') || descLower.includes('user')) {
            stack.push({
                name: isSaaS ? "Clerk Authentication" : "Supabase Auth",
                category: "Authentication & Identity",
                purpose: "Secure session management and OAuth providers",
                reason: isSaaS
                    ? "Turn-key multi-tenant organization switching, pre-built security modals, and webhook syncing."
                    : "Integrated directly with PostgreSQL Row-Level Security policies.",
                priority: "required",
                source: "quick-links",
                alternative: "Better Auth",
                alternativeWhen: "Use if self-hosting authentication credentials without external SaaS dependencies."
            });
        }

        // Specialized
        if (isAI) {
            stack.push({
                name: "Google Gemini 2.5 Flash + Vercel AI SDK",
                category: "AI & Model Inference",
                purpose: "Sub-second token streaming and structured JSON output generation",
                reason: "Sub-second token latency, massive multimodal context window, and native structured outputs.",
                priority: "required",
                source: "external",
                alternative: "OpenAI GPT-4o-mini",
                alternativeWhen: "Use if existing OpenAI tooling is already standardized."
            });
        }
        if (isEcom || isSaaS) {
            stack.push({
                name: "Stripe Billing & Checkout Elements",
                category: "Payments & Financial Engine",
                purpose: "PCI-compliant checkout flows and subscription webhooks",
                reason: "Industry-standard PCI-compliant checkout sessions and automated webhook fulfillment.",
                priority: "required",
                source: "external",
                alternative: "Lemon Squeezy",
                alternativeWhen: "Use if Merchant of Record (MoR) global tax handling is preferred."
            });
        }
        if (isDashboard) {
            stack.push({
                name: "Recharts + TanStack Table",
                category: "Data Visualization & Tables",
                purpose: "Declarative SVG charting and headless sorting/filtering tables",
                reason: "Responsive SVG charts with zero canvas memory leaks and headless table pagination.",
                priority: "recommended",
                source: "external",
                alternative: "Tremor",
                alternativeWhen: "Use if opinionated prebuilt dashboard cards are desired."
            });
        }

        // Deployment
        stack.push({
            name: "Vercel Edge Platform",
            category: "Deployment & Edge Infrastructure",
            purpose: "Global edge CDN, automated preview builds, and serverless compute",
            reason: "Zero-config Git deployments with automatic preview environments and global edge asset caching.",
            priority: "recommended",
            source: "quick-links",
            alternative: "Cloudflare Pages",
            alternativeWhen: "Use if edge compute at flat pricing without serverless timeouts is paramount."
        });

        // Matched Tools
        const matched = [];
        const scoredDb = [];
        resourcesList.forEach(res => {
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
        scoredDb.slice(0, 5).forEach(m => {
            const r = m.res;
            matched.push({
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

        if (is3D && !matched.some(t => t.name.toLowerCase().includes('three'))) {
            matched.push({
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
        if (isAI && !matched.some(t => t.name.toLowerCase().includes('ai'))) {
            matched.push({
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
        if ((isSaaS || isEcom) && !matched.some(t => t.name.toLowerCase().includes('stripe'))) {
            matched.push({
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

        const workflow = [
            `01 → Phase 1: Architecture & Scaffolding — Initialize Next.js 15 with TypeScript, Tailwind CSS, and strict ESLint rules. Configure path aliases (@/*), environment schema validation with Zod, and foundational layout structure.`,
            `02 → Phase 2: Design System & Primitives — Install shadcn/ui primitives (Button, Card, Dialog, Sheet, Badge). Establish brand CSS variables, typography tokens, and high-contrast dark theme surfaces.`,
            `03 → Phase 3: Core Domain Implementation — Build the primary functional views for ${appType}. Construct interactive components, responsive navigation, and state models tailored to user requirements.`,
            `04 → Phase 4: Data Layer & Integrations — Scaffold database models, write migrations, and establish type-safe Server Actions. Wire up external APIs, authentication guards, and validation pipelines.`,
            `05 → Phase 5: Motion, Feedback & Polish — Implement Motion spring transitions, loading skeletons, empty states, and toast notifications for every user action. Audit keyboard accessibility and responsive layouts.`,
            `06 → Phase 6: Production Hardening & Vercel Launch — Configure OpenGraph metadata, optimize assets, verify error boundaries, and deploy to Vercel with automated Git preview environments.`
        ];

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
            matchedTools: matched,
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
            isFallbackNotice: "Notice: Operating in offline toolbox matching mode. To enable Google Gemini AI generation in production, deploy to Vercel with your GEMINI_API_KEY environment variable."
        };
    }

    // Render results into UI
    function renderResults(data) {
        if (!data) return;

        // Model indicator
        if (modelIndicator) {
            if (data.provider === 'gemini' || data.modelUsed) {
                modelIndicator.textContent = `Active Model: ${data.modelUsed || 'Gemini 2.5 Flash'}`;
            } else if (data.isFallback) {
                modelIndicator.textContent = 'Mode: Offline Toolbox Matcher (Rule-Based)';
            }
        }

        // Fallback Notice
        if (data.isFallbackNotice) {
            fallbackNotice.classList.remove('hidden');
            fallbackNoticeText.textContent = data.isFallbackNotice;
        } else {
            fallbackNotice.classList.add('hidden');
        }

        // 1. Right Pane Summary & Architecture
        let summaryText = data.summary || "Architecture recommendation based on your requirements.";
        if (data.understanding && data.understanding.applicationType) {
            summaryText = `[${data.understanding.applicationType}] ${summaryText}`;
        }
        resultSummary.textContent = summaryText;
        resultArchitecture.textContent = data.architecture || "Modern, modular architecture designed for high maintainability.";

        // 2. Right Pane Next Steps
        nextStepsList.innerHTML = '';
        if (Array.isArray(data.nextSteps) && data.nextSteps.length > 0) {
            data.nextSteps.forEach((step, idx) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="next-step-number">${idx + 1}</span>
                    <span>${escapeHtml(step)}</span>
                `;
                nextStepsList.appendChild(li);
            });
        }

        // 3. Tab Pane A: Recommended Stack
        stackGrid.innerHTML = '';
        if (Array.isArray(data.recommendedStack) && data.recommendedStack.length > 0) {
            data.recommendedStack.forEach(item => {
                const el = document.createElement('div');
                el.className = 'stack-item';

                const priority = (item.priority || 'recommended').toLowerCase();
                const source = (item.source || 'quick-links').toLowerCase();
                const sourceLabel = source === 'external' ? 'External' : 'Quick Links';
                const sourceClass = source === 'external' ? 'external' : 'quicklinks';

                let priorityClass = 'recommended';
                let priorityLabel = 'Recommended';
                if (priority.includes('require')) {
                    priorityClass = 'required';
                    priorityLabel = 'Required';
                } else if (priority.includes('option') || priority.includes('alt')) {
                    priorityClass = 'optional';
                    priorityLabel = priority.includes('alt') ? 'Alternative' : 'Optional';
                }

                let altHtml = '';
                if (item.alternative) {
                    altHtml = `
                        <div class="stack-alt-hint">
                            <strong>Alternative:</strong> ${escapeHtml(item.alternative)}
                            ${item.alternativeWhen ? `<span> — ${escapeHtml(item.alternativeWhen)}</span>` : ''}
                        </div>
                    `;
                }

                el.innerHTML = `
                    <div class="stack-header-row">
                        <span class="stack-category">${escapeHtml(item.category || 'Stack Component')}</span>
                        <div class="stack-pills">
                            <span class="stack-priority-pill ${priorityClass}">${priorityLabel}</span>
                            <span class="stack-source-pill ${sourceClass}">${sourceLabel}</span>
                        </div>
                    </div>
                    <h4 class="stack-name">${escapeHtml(item.name || '')}</h4>
                    ${item.purpose ? `<div class="stack-purpose">${escapeHtml(item.purpose)}</div>` : ''}
                    <p class="stack-reason">${escapeHtml(item.reason || '')}</p>
                    ${altHtml}
                `;
                stackGrid.appendChild(el);
            });
        }

        // 4. Tab Pane B: Matched Toolbox Tools (with Deep Reasons)
        matchedToolsGrid.innerHTML = '';
        if (Array.isArray(data.matchedTools) && data.matchedTools.length > 0) {
            data.matchedTools.forEach(tool => {
                let canonical = null;
                if (window.resources && Array.isArray(window.resources)) {
                    canonical = window.resources.find(r => r.name.toLowerCase() === (tool.name || '').toLowerCase());
                }

                const name = canonical ? canonical.name : tool.name;
                const url = canonical ? canonical.url : (tool.url || '#');
                const icon = canonical ? canonical.icon : (tool.icon || '⚡');
                const tag = canonical ? canonical.tag : (tool.tag || 'TOOL');
                const worksWith = (canonical ? canonical.worksWith : tool.worksWith) || [];
                const reason = tool.reason || (canonical ? canonical.useWhen : '');
                const isExternal = tool.source === 'external' || (!canonical && tool.url && !tool.url.includes('quick-links'));

                const card = document.createElement('article');
                card.className = 'tool-match-card';
                card.innerHTML = `
                    <div>
                        <div class="tool-match-top">
                            <div class="tool-match-logo">${escapeHtml(icon)}</div>
                            <div style="display:flex; gap:6px; align-items:center;">
                                <span class="tool-source-pill ${isExternal ? 'external' : 'quicklinks'}">${isExternal ? 'External' : 'Quick Links'}</span>
                                <span class="tool-match-tag">${escapeHtml(tag)}</span>
                            </div>
                        </div>
                        <h4>${escapeHtml(name)}</h4>
                        <p class="tool-match-reason">${escapeHtml(reason)}</p>
                    </div>
                    <div class="tool-match-footer">
                        <div class="tool-match-works-with">
                            ${worksWith.map(w => `<span>${escapeHtml(w)}</span>`).join('')}
                        </div>
                        <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="tool-match-link">
                            Open ↗
                        </a>
                    </div>
                `;
                matchedToolsGrid.appendChild(card);
            });
        } else {
            matchedToolsGrid.innerHTML = `<p style="color:#717583; font-size:13px;">No direct toolbox matches found for this specific query.</p>`;
        }

        // 5. Tab Pane C: Workflow Timeline (Expanded phases)
        workflowTimeline.innerHTML = '';
        if (Array.isArray(data.workflow) && data.workflow.length > 0) {
            data.workflow.forEach((step, idx) => {
                const el = document.createElement('div');
                el.className = 'workflow-step-item';

                let stepBadgeText = `0${idx + 1}`;
                let stepTextContent = '';

                if (typeof step === 'string') {
                    if (step.includes('→')) {
                        const parts = step.split('→');
                        stepBadgeText = parts[0].trim();
                        stepTextContent = parts.slice(1).join('→').trim();
                    } else {
                        stepTextContent = step;
                    }
                } else if (step && typeof step === 'object') {
                    stepBadgeText = step.step ? `0${step.step}` : `0${idx + 1}`;
                    stepTextContent = step.title ? `${step.title} — ${step.description || ''}` : (step.description || '');
                }

                el.innerHTML = `
                    <div class="step-badge">${escapeHtml(stepBadgeText)}</div>
                    <div class="step-text">${escapeHtml(stepTextContent)}</div>
                `;
                workflowTimeline.appendChild(el);
            });
        }

        // 6. Tab Pane D: Full-Length Coding Prompt
        resultCodingPrompt.textContent = data.codingPrompt || 'No coding prompt generated.';

        // Display results container
        resultsContainer.classList.remove('hidden');

        // Make sure active tab is selected and pane is visible
        switchTab(activeTabId);

        // Smooth scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    // Copy Prompt Functionality
    copyPromptBtn.addEventListener('click', async () => {
        const textToCopy = resultCodingPrompt.textContent;
        if (!textToCopy) return;

        try {
            await navigator.clipboard.writeText(textToCopy);
            copyPromptBtn.classList.add('copied');
            copyBtnText.textContent = 'Copied ✓';
            setTimeout(() => {
                copyPromptBtn.classList.remove('copied');
                copyBtnText.textContent = 'Copy Prompt';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            const range = document.createRange();
            range.selectNodeContents(resultCodingPrompt);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            copyPromptBtn.classList.add('copied');
            copyBtnText.textContent = 'Copied ✓';
            setTimeout(() => {
                copyPromptBtn.classList.remove('copied');
                copyBtnText.textContent = 'Copy Prompt';
            }, 2000);
        }
    });

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
