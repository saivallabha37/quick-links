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
        
        const matched = [];
        resourcesList.forEach(res => {
            let score = 0;
            const nameLower = res.name.toLowerCase();
            const catLower = res.category.toLowerCase();
            const descWords = (res.description + ' ' + res.useWhen + ' ' + (res.worksWith || []).join(' ')).toLowerCase();
            
            if (descLower.includes(nameLower)) score += 15;
            if (descLower.includes(catLower)) score += 8;
            if ((descLower.includes('3d') || descLower.includes('three')) && (res.category === '3d' || nameLower.includes('three') || nameLower.includes('spline'))) score += 12;
            if ((descLower.includes('animat') || descLower.includes('motion') || descLower.includes('scroll')) && (res.category === 'animation' || nameLower.includes('motion') || nameLower.includes('gsap'))) score += 12;
            if ((descLower.includes('auth') || descLower.includes('login') || descLower.includes('user')) && (res.category === 'auth' || nameLower.includes('clerk') || nameLower.includes('better auth'))) score += 12;
            if ((descLower.includes('db') || descLower.includes('database') || descLower.includes('store') || descLower.includes('sql') || descLower.includes('product') || descLower.includes('cart')) && (res.category === 'database' || nameLower.includes('supabase') || nameLower.includes('mongo') || nameLower.includes('prisma'))) score += 12;
            if ((descLower.includes('ai') || descLower.includes('bot') || descLower.includes('chat') || descLower.includes('llm') || descLower.includes('prompt')) && (res.category === 'ai' || nameLower.includes('openai') || nameLower.includes('google ai') || nameLower.includes('hugging'))) score += 12;
            if ((descLower.includes('ui') || descLower.includes('component') || descLower.includes('navbar') || descLower.includes('card') || descLower.includes('shop') || descLower.includes('landing') || descLower.includes('hero')) && (res.category === 'ui' || res.category === 'visuals')) score += 10;
            if ((descLower.includes('deploy') || descLower.includes('host') || descLower.includes('prod')) && res.category === 'deployment') score += 8;
            if (descLower.includes('icon') && res.category === 'icons') score += 8;

            const queryWords = descLower.split(/\W+/).filter(w => w.length > 2);
            queryWords.forEach(word => {
                if (nameLower.includes(word)) score += 4;
                if (descWords.includes(word)) score += 2;
            });

            if (score > 0) matched.push({ resource: res, score });
        });

        matched.sort((a, b) => b.score - a.score);
        const topMatches = matched.slice(0, 8).map(m => {
            const r = m.resource;
            return {
                name: r.name,
                category: r.category,
                reason: `Specifically selected because ${r.name} provides ${r.description.toLowerCase()}. Perfect for your project's requirement: "${r.useWhen}". Integrates seamlessly with ${(r.worksWith || []).join(', ')}.`,
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
            { category: "Frontend Framework", name: "Next.js 15 (App Router & Server Components)", reason: "Blazing fast hybrid rendering (SSR/SSG), nested layouts, and automatic route prefetching." },
            { category: "UI & Design System", name: "shadcn/ui + Tailwind CSS", reason: "Accessible Radix UI primitives with complete source code ownership and zero runtime CSS overhead." },
            { category: "Animation & Motion Engine", name: is3D ? "Spline + Motion (Framer Motion)" : "Motion (Framer Motion)", reason: "Declarative spring physics and scroll-linked animations (useScroll, useTransform) delivering 60 FPS interactions." },
            { category: "Backend & Server Runtime", name: "Next.js Route Handlers & Server Actions", reason: "Type-safe RPC execution via Server Actions eliminating REST boilerplate." },
            { category: "Database & ORM", name: "Supabase (PostgreSQL) + Prisma ORM", reason: "Managed PostgreSQL with instant connection pooling and end-to-end TypeScript schema safety." },
            { category: "Authentication & Identity", name: isSaaS || isEcom ? "Clerk Authentication" : "Supabase Auth", reason: "Frictionless multi-tenant identity with social OAuth and prebuilt secure modals." },
            { category: "Deployment & Edge Infrastructure", name: "Vercel Edge Platform", reason: "Zero-config Git deployments with automatic preview environments and global edge caching." }
        ];

        if (isAI) {
            stack.push({ category: "AI & Inference Engine", name: "Google Gemini 3.1 Flash / AI Studio", reason: "Sub-second token latency, massive multimodal context window, and native JSON schema output." });
        }
        if (isEcom || isSaaS) {
            stack.push({ category: "Payments & Billing", name: "Stripe Elements & Checkout", reason: "Industry-standard PCI-compliant checkout sessions and automated webhooks." });
        }

        const workflow = [
            "01 → Phase 1: Architecture & Scaffolding — Initialize Next.js 15 with TypeScript, Tailwind CSS, and strict ESLint. Configure directory structure with App Router, shadcn/ui components.json, and environment variable validation.",
            "02 → Phase 2: Design System & Primitive Foundations — Scaffold global CSS variables for dark theme, typography tokens, layout containers, and install core components (Button, Dialog, Sheet, Badge, Card).",
            "03 → Phase 3: Interactive Visuals & Motion Layer — Implement viewport scroll animations, fluid staggered grids with Motion, interactive floating navigation, and responsive drawers.",
            "04 → Phase 4: Database Modeling & Data Fetching — Design PostgreSQL schema in Supabase with Prisma models. Configure relations, indexes, and type-safe Server Actions.",
            "05 → Phase 5: Auth & Feature Integrations — Wire up session middleware, protect private routes, integrate payment checkouts or third-party webhooks, and add toast notifications.",
            "06 → Phase 6: QA, Optimization & Vercel Deployment — Audit Lighthouse scores, optimize image formats (WebP/AVIF), and deploy to Vercel with automated branch preview environments."
        ];

        const codingPrompt = `You are an elite principal full-stack engineer and UI designer. Build a complete, production-grade web application based on this project specification:\n\n### PROJECT GOAL\n"${description}"\n\n### TARGET TECH STACK\n- Framework: Next.js 15+ (App Router, React 19, TypeScript)\n- Styling: Tailwind CSS (Dark aesthetic, clean glassmorphism, subtle borders)\n- UI Primitives: shadcn/ui (Radix UI) + Lucide Icons\n- Motion & Animation: Motion (Framer Motion) for scroll triggers and stagger effects\n- Backend & Database: Supabase PostgreSQL + Prisma ORM\n- Deployment: Vercel\n\n### ARCHITECTURE & DIRECTORY STRUCTURE\nScaffold following this modular layout:\n\`\`\`text\nsrc/\n├── app/\n│   ├── layout.tsx         # Root layout with dark theme provider and fonts\n│   ├── page.tsx           # Main landing / storefront page with scroll sections\n│   ├── api/               # Serverless Route Handlers\n│   └── globals.css        # Tailwind variables and ambient background glows\n├── components/\n│   ├── ui/                # shadcn primitives (Button, Card, Badge, Dialog)\n│   ├── navigation/        # Interactive floating navbar & responsive drawer\n│   ├── sections/          # Feature sections, Hero, and interactive cards\n│   └── animations/        # Reusable Framer Motion wrappers (FadeIn, StaggerGrid)\n├── lib/\n│   ├── prisma.ts          # Singleton Prisma client instance\n│   └── utils.ts           # Class merge helper (clsx + tailwind-merge)\n└── types/                 # TypeScript interfaces and schema definitions\n\`\`\`\n\n### IMPLEMENTATION REQUIREMENTS\n1. Visual Polish: Use a premium dark technical aesthetic (#08090d background, #10121a cards, 1px subtle borders #222634, and soft indigo/purple accents).\n2. Card & Scroll Effects: Implement interactive cards with hover scale/tilt, spring physics, dynamic image reveal on hover, and smooth scroll entrance reveals.\n3. Accessibility & Performance: Strict semantic HTML, full keyboard navigation, aria labels, and next/image optimization.\n4. Provide the complete code for the layout, the primary feature component, and the interactive cards. Do not use placeholders.`;

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
            isFallbackNotice: "Notice: Operating in offline toolbox matching mode. To enable Google Gemini AI generation in production, deploy to Vercel with your GEMINI_API_KEY environment variable."
        };
    }

    // Render results into UI
    function renderResults(data) {
        if (!data) return;

        // Model indicator
        if (modelIndicator) {
            if (data.provider === 'gemini' || data.modelUsed) {
                modelIndicator.textContent = `Active Model: ${data.modelUsed || 'Gemini 3.1 Flash'}`;
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
        resultSummary.textContent = data.summary || "Architecture recommendation based on your requirements.";
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
                el.innerHTML = `
                    <span class="stack-category">${escapeHtml(item.category || 'Stack Component')}</span>
                    <h4 class="stack-name">${escapeHtml(item.name || '')}</h4>
                    <p class="stack-reason">${escapeHtml(item.reason || '')}</p>
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

                const card = document.createElement('article');
                card.className = 'tool-match-card';
                card.innerHTML = `
                    <div>
                        <div class="tool-match-top">
                            <div class="tool-match-logo">${escapeHtml(icon)}</div>
                            <span class="tool-match-tag">${escapeHtml(tag)}</span>
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
                let stepTextContent = step;
                if (step.includes('→')) {
                    const parts = step.split('→');
                    stepBadgeText = parts[0].trim();
                    stepTextContent = parts.slice(1).join('→').trim();
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
