/* =====================================================
   QUICK LINKS
   Developer Toolbox
   Data-driven resource system
===================================================== */


/* =====================================================
   RESOURCE DATABASE
===================================================== */

const resources = [

    /* =================================================
       UI / COMPONENTS
    ================================================= */

    {
        name: "shadcn/ui",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "S",

        description:
            "Customizable React components built with Tailwind CSS and Radix UI.",

        worksWith:
            ["React", "Next.js", "Tailwind"],

        useWhen:
            "You need a clean, customizable component foundation.",

        priority:
            "high",

        url:
            "https://ui.shadcn.com"
    },


    {
        name: "React Bits",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "R",

        description:
            "Animated and interactive React components for building expressive interfaces.",

        worksWith:
            ["React", "Next.js", "Tailwind"],

        useWhen:
            "You want visually interesting components and effects.",

        priority:
            "high",

        url:
            "https://reactbits.dev"
    },


    {
        name: "Aceternity UI",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "A",

        description:
            "Modern animated components designed for impressive landing pages and interfaces.",

        worksWith:
            ["React", "Next.js", "Tailwind"],

        useWhen:
            "You want a visually impressive landing page.",

        priority:
            "high",

        url:
            "https://ui.aceternity.com"
    },


    {
        name: "Magic UI",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "M",

        description:
            "Animated React components and effects for modern websites.",

        worksWith:
            ["React", "Next.js", "Tailwind"],

        useWhen:
            "You need polished animated sections quickly.",

        priority:
            "high",

        url:
            "https://magicui.design"
    },


    {
        name: "Kokonut UI",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "K",

        description:
            "Copy-ready Tailwind components for SaaS and modern marketing websites.",

        worksWith:
            ["React", "Tailwind"],

        useWhen:
            "You want ready-to-use Tailwind sections.",

        priority:
            "medium",

        url:
            "https://kokonutui.com"
    },


    {
        name: "21st.dev",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "21",

        description:
            "Community-driven collection of modern components and website building blocks.",

        worksWith:
            ["React", "Next.js", "Tailwind"],

        useWhen:
            "You want inspiration or ready-made component ideas.",

        priority:
            "high",

        url:
            "https://21st.dev"
    },


    {
        name: "HeroUI",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "H",

        description:
            "Accessible React components designed for modern application interfaces.",

        worksWith:
            ["React", "Next.js"],

        useWhen:
            "You need a complete application component system.",

        priority:
            "medium",

        url:
            "https://www.heroui.com"
    },


    {
        name: "Radix UI",
        category: "ui",
        tag: "UI",
        tagClass: "blue",
        icon: "R",

        description:
            "Accessible, unstyled UI primitives for building custom design systems.",

        worksWith:
            ["React"],

        useWhen:
            "You need accessible low-level components.",

        priority:
            "medium",

        url:
            "https://www.radix-ui.com"
    },


    /* =================================================
       ANIMATION
    ================================================= */

    {
        name: "Motion",
        category: "animation",
        tag: "ANIMATION",
        tagClass: "purple",
        icon: "M",

        description:
            "Production-grade animation library for React UI, gestures and layout transitions.",

        worksWith:
            ["React", "Next.js"],

        useWhen:
            "You need smooth UI and page animations.",

        priority:
            "high",

        url:
            "https://motion.dev"
    },


    {
        name: "GSAP",
        category: "animation",
        tag: "ANIMATION",
        tagClass: "purple",
        icon: "G",

        description:
            "Powerful animation platform for complex timelines, scroll effects and interactions.",

        worksWith:
            ["JavaScript", "React", "Next.js"],

        useWhen:
            "You need advanced, highly controlled animations.",

        priority:
            "high",

        url:
            "https://gsap.com"
    },


    {
        name: "Anime.js",
        category: "animation",
        tag: "ANIMATION",
        tagClass: "purple",
        icon: "A",

        description:
            "Lightweight JavaScript animation library for timelines, SVG and complex motion.",

        worksWith:
            ["JavaScript", "SVG"],

        useWhen:
            "You need precise custom animations.",

        priority:
            "medium",

        url:
            "https://animejs.com"
    },


    {
        name: "Lenis",
        category: "animation",
        tag: "ANIMATION",
        tagClass: "purple",
        icon: "L",

        description:
            "Smooth scrolling library for creating fluid scrolling experiences.",

        worksWith:
            ["JavaScript", "React"],

        useWhen:
            "You want smooth premium-feeling scrolling.",

        priority:
            "medium",

        url:
            "https://lenis.darkroom.engineering"
    },


    {
        name: "Rive",
        category: "animation",
        tag: "ANIMATION",
        tagClass: "purple",
        icon: "R",

        description:
            "Interactive real-time graphics and animations for applications.",

        worksWith:
            ["Web", "React"],

        useWhen:
            "You need interactive animated assets.",

        priority:
            "medium",

        url:
            "https://rive.app"
    },


    /* =================================================
       3D
    ================================================= */

    {
        name: "Spline",
        category: "3d",
        tag: "3D",
        tagClass: "orange",
        icon: "3D",

        description:
            "Visual tool for creating interactive 3D scenes for websites.",

        worksWith:
            ["Web", "React", "Next.js"],

        useWhen:
            "You want 3D without building everything from scratch.",

        priority:
            "high",

        url:
            "https://spline.design"
    },


    {
        name: "Three.js",
        category: "3d",
        tag: "3D",
        tagClass: "orange",
        icon: "3",

        description:
            "JavaScript 3D library for building interactive WebGL experiences.",

        worksWith:
            ["JavaScript", "WebGL"],

        useWhen:
            "You need complete programmatic control over 3D.",

        priority:
            "high",

        url:
            "https://threejs.org"
    },


    {
        name: "React Three Fiber",
        category: "3d",
        tag: "3D",
        tagClass: "orange",
        icon: "R3F",

        description:
            "React renderer for Three.js that brings 3D scenes into React applications.",

        worksWith:
            ["React", "Three.js"],

        useWhen:
            "You're building a Three.js experience with React.",

        priority:
            "high",

        url:
            "https://r3f.docs.pmnd.rs"
    },


    {
        name: "Drei",
        category: "3d",
        tag: "3D",
        tagClass: "orange",
        icon: "D",

        description:
            "Useful helpers and abstractions for React Three Fiber.",

        worksWith:
            ["React Three Fiber", "Three.js"],

        useWhen:
            "You need ready-made helpers for R3F.",

        priority:
            "medium",

        url:
            "https://drei.docs.pmnd.rs"
    },


    {
        name: "ShaderToy",
        category: "3d",
        tag: "3D",
        tagClass: "orange",
        icon: "S",

        description:
            "Community platform for experimenting with GLSL shaders and graphics.",

        worksWith:
            ["WebGL", "GLSL"],

        useWhen:
            "You want advanced shader and visual effects.",

        priority:
            "medium",

        url:
            "https://www.shadertoy.com"
    },


    /* =================================================
       BACKGROUNDS / VISUALS
    ================================================= */

    {
        name: "Haikei",
        category: "visuals",
        tag: "VISUALS",
        tagClass: "pink",
        icon: "H",

        description:
            "Generate beautiful SVG shapes, blobs, waves and backgrounds.",

        worksWith:
            ["SVG", "CSS", "Web"],

        useWhen:
            "Your page needs a better visual background.",

        priority:
            "high",

        url:
            "https://haikei.app"
    },


    {
        name: "MagicPattern",
        category: "visuals",
        tag: "VISUALS",
        tagClass: "pink",
        icon: "M",

        description:
            "Generate patterns, gradients, backgrounds and visual assets.",

        worksWith:
            ["Web", "CSS", "SVG"],

        useWhen:
            "You need quick visual design assets.",

        priority:
            "medium",

        url:
            "https://www.magicpattern.design"
    },


    {
        name: "fffuel",
        category: "visuals",
        tag: "VISUALS",
        tagClass: "pink",
        icon: "F",

        description:
            "Collection of generators for SVG patterns, shapes and visual assets.",

        worksWith:
            ["SVG", "Web"],

        useWhen:
            "You need experimental backgrounds and shapes.",

        priority:
            "medium",

        url:
            "https://www.fffuel.co"
    },


    /* =================================================
       ICONS
    ================================================= */

    {
        name: "Lucide",
        category: "icons",
        tag: "ICONS",
        tagClass: "cyan",
        icon: "L",

        description:
            "Clean open-source icon library with thousands of icons.",

        worksWith:
            ["React", "Web"],

        useWhen:
            "You need clean UI icons.",

        priority:
            "high",

        url:
            "https://lucide.dev"
    },


    {
        name: "Tabler Icons",
        category: "icons",
        tag: "ICONS",
        tagClass: "cyan",
        icon: "T",

        description:
            "Large open-source collection of SVG icons for interfaces.",

        worksWith:
            ["React", "Web"],

        useWhen:
            "You need a large consistent icon set.",

        priority:
            "high",

        url:
            "https://tabler.io/icons"
    },


    {
        name: "Phosphor Icons",
        category: "icons",
        tag: "ICONS",
        tagClass: "cyan",
        icon: "P",

        description:
            "Flexible icon family with multiple weights and styles.",

        worksWith:
            ["React", "Web"],

        useWhen:
            "You want more expressive icon styles.",

        priority:
            "medium",

        url:
            "https://phosphoricons.com"
    },


    {
        name: "Iconify",
        category: "icons",
        tag: "ICONS",
        tagClass: "cyan",
        icon: "I",

        description:
            "Huge searchable collection combining many open-source icon sets.",

        worksWith:
            ["Web", "React"],

        useWhen:
            "You can't find the icon you need.",

        priority:
            "high",

        url:
            "https://icon-sets.iconify.design"
    },


    /* =================================================
       AI
    ================================================= */

    {
        name: "OpenAI",
        category: "ai",
        tag: "AI",
        tagClass: "pink",
        icon: "AI",

        description:
            "AI models and APIs for building intelligent applications.",

        worksWith:
            ["JavaScript", "Python", "API"],

        useWhen:
            "You need powerful general-purpose AI capabilities.",

        priority:
            "high",

        url:
            "https://openai.com"
    },


    {
        name: "Google AI Studio",
        category: "ai",
        tag: "AI",
        tagClass: "pink",
        icon: "G",

        description:
            "Build and experiment with Google's Gemini models.",

        worksWith:
            ["Gemini", "API"],

        useWhen:
            "You want to prototype with Gemini.",

        priority:
            "high",

        url:
            "https://aistudio.google.com"
    },


    {
        name: "Hugging Face",
        category: "ai",
        tag: "AI",
        tagClass: "pink",
        icon: "HF",

        description:
            "Platform for machine learning models, datasets and AI applications.",

        worksWith:
            ["Python", "ML", "Transformers"],

        useWhen:
            "You need open-source models or datasets.",

        priority:
            "high",

        url:
            "https://huggingface.co"
    },


    {
        name: "Replicate",
        category: "ai",
        tag: "AI",
        tagClass: "pink",
        icon: "R",

        description:
            "Run and integrate machine learning models through APIs.",

        worksWith:
            ["AI", "API"],

        useWhen:
            "You need to use an existing AI model through an API.",

        priority:
            "medium",

        url:
            "https://replicate.com"
    },


    {
        name: "Vercel AI SDK",
        category: "ai",
        tag: "AI",
        tagClass: "pink",
        icon: "AI",

        description:
            "Toolkit for building AI-powered applications with modern web frameworks.",

        worksWith:
            ["Next.js", "React", "TypeScript"],

        useWhen:
            "You're building AI features into a web application.",

        priority:
            "high",

        url:
            "https://ai-sdk.dev"
    },


    /* =================================================
       FRONTEND
    ================================================= */

    {
        name: "React",
        category: "frontend",
        tag: "FRONTEND",
        tagClass: "blue",
        icon: "R",

        description:
            "Library for building component-based user interfaces.",

        worksWith:
            ["JavaScript", "TypeScript"],

        useWhen:
            "You need a component-based frontend.",

        priority:
            "high",

        url:
            "https://react.dev"
    },


    {
        name: "Next.js",
        category: "frontend",
        tag: "FRONTEND",
        tagClass: "blue",
        icon: "N",

        description:
            "Full-stack React framework for production web applications.",

        worksWith:
            ["React", "TypeScript"],

        useWhen:
            "You're building a production-grade React application.",

        priority:
            "high",

        url:
            "https://nextjs.org"
    },


    {
        name: "Tailwind CSS",
        category: "frontend",
        tag: "FRONTEND",
        tagClass: "blue",
        icon: "T",

        description:
            "Utility-first CSS framework for rapidly building custom interfaces.",

        worksWith:
            ["HTML", "React", "Next.js"],

        useWhen:
            "You want fast and customizable styling.",

        priority:
            "high",

        url:
            "https://tailwindcss.com"
    },


    /* =================================================
       BACKEND
    ================================================= */

    {
        name: "Node.js",
        category: "backend",
        tag: "BACKEND",
        tagClass: "green",
        icon: "N",

        description:
            "JavaScript runtime for building backend services and APIs.",

        worksWith:
            ["JavaScript", "Express"],

        useWhen:
            "You want a JavaScript backend.",

        priority:
            "high",

        url:
            "https://nodejs.org"
    },


    {
        name: "Express",
        category: "backend",
        tag: "BACKEND",
        tagClass: "green",
        icon: "E",

        description:
            "Minimal Node.js web framework for APIs and backend applications.",

        worksWith:
            ["Node.js", "JavaScript"],

        useWhen:
            "You need a straightforward REST API.",

        priority:
            "high",

        url:
            "https://expressjs.com"
    },


    {
        name: "FastAPI",
        category: "backend",
        tag: "BACKEND",
        tagClass: "green",
        icon: "F",

        description:
            "Modern high-performance Python framework for building APIs.",

        worksWith:
            ["Python", "Pydantic"],

        useWhen:
            "You want a fast Python API.",

        priority:
            "high",

        url:
            "https://fastapi.tiangolo.com"
    },


    {
        name: "Spring Boot",
        category: "backend",
        tag: "BACKEND",
        tagClass: "green",
        icon: "SB",

        description:
            "Java framework for building production-ready backend applications.",

        worksWith:
            ["Java", "Spring"],

        useWhen:
            "You're building enterprise Java backends.",

        priority:
            "medium",

        url:
            "https://spring.io/projects/spring-boot"
    },


    /* =================================================
       DATABASE
    ================================================= */

    {
        name: "Supabase",
        category: "database",
        tag: "DATABASE",
        tagClass: "cyan",
        icon: "S",

        description:
            "PostgreSQL database with authentication, storage and backend services.",

        worksWith:
            ["PostgreSQL", "React", "Next.js"],

        useWhen:
            "You want an all-in-one backend quickly.",

        priority:
            "high",

        url:
            "https://supabase.com"
    },


    {
        name: "MongoDB",
        category: "database",
        tag: "DATABASE",
        tagClass: "cyan",
        icon: "M",

        description:
            "Document-oriented NoSQL database for flexible application data.",

        worksWith:
            ["Node.js", "Express"],

        useWhen:
            "Your application fits a document-based data model.",

        priority:
            "high",

        url:
            "https://www.mongodb.com"
    },


    {
        name: "Neon",
        category: "database",
        tag: "DATABASE",
        tagClass: "cyan",
        icon: "N",

        description:
            "Serverless PostgreSQL database designed for modern applications.",

        worksWith:
            ["PostgreSQL", "Next.js"],

        useWhen:
            "You want managed serverless PostgreSQL.",

        priority:
            "medium",

        url:
            "https://neon.tech"
    },


    {
        name: "Prisma",
        category: "database",
        tag: "DATABASE",
        tagClass: "cyan",
        icon: "P",

        description:
            "Type-safe ORM for working with databases in modern applications.",

        worksWith:
            ["TypeScript", "Node.js", "PostgreSQL"],

        useWhen:
            "You want type-safe database access.",

        priority:
            "high",

        url:
            "https://www.prisma.io"
    },


    /* =================================================
       AUTHENTICATION
    ================================================= */

    {
        name: "Clerk",
        category: "auth",
        tag: "AUTH",
        tagClass: "orange",
        icon: "C",

        description:
            "Authentication and user-management platform for modern applications.",

        worksWith:
            ["Next.js", "React"],

        useWhen:
            "You want authentication without building it from scratch.",

        priority:
            "high",

        url:
            "https://clerk.com"
    },


    {
        name: "Better Auth",
        category: "auth",
        tag: "AUTH",
        tagClass: "orange",
        icon: "BA",

        description:
            "Flexible authentication framework for TypeScript applications.",

        worksWith:
            ["TypeScript", "Next.js"],

        useWhen:
            "You want more control over authentication.",

        priority:
            "medium",

        url:
            "https://www.better-auth.com"
    },


    /* =================================================
       APIs / SERVICES
    ================================================= */

    {
        name: "Resend",
        category: "services",
        tag: "EMAIL",
        tagClass: "yellow",
        icon: "R",

        description:
            "Developer-focused email API for transactional emails.",

        worksWith:
            ["React", "Next.js", "Node.js"],

        useWhen:
            "Your application needs transactional email.",

        priority:
            "high",

        url:
            "https://resend.com"
    },


    {
        name: "Stripe",
        category: "services",
        tag: "PAYMENTS",
        tagClass: "yellow",
        icon: "S",

        description:
            "Payment infrastructure for online businesses and applications.",

        worksWith:
            ["JavaScript", "Node.js", "React"],

        useWhen:
            "You need online payments or subscriptions.",

        priority:
            "high",

        url:
            "https://stripe.com"
    },


    {
        name: "n8n",
        category: "services",
        tag: "AUTOMATION",
        tagClass: "yellow",
        icon: "n8n",

        description:
            "Workflow automation platform for connecting applications and services.",

        worksWith:
            ["APIs", "Webhooks", "AI"],

        useWhen:
            "You need automated workflows between services.",

        priority:
            "high",

        url:
            "https://n8n.io"
    },


    /* =================================================
       DEPLOYMENT
    ================================================= */

    {
        name: "Vercel",
        category: "deployment",
        tag: "DEPLOY",
        tagClass: "yellow",
        icon: "V",

        description:
            "Deployment platform optimized for modern frontend and Next.js applications.",

        worksWith:
            ["Next.js", "React"],

        useWhen:
            "You're deploying a Next.js or frontend application.",

        priority:
            "high",

        url:
            "https://vercel.com"
    },


    {
        name: "Render",
        category: "deployment",
        tag: "DEPLOY",
        tagClass: "yellow",
        icon: "R",

        description:
            "Cloud platform for deploying backend services, APIs and databases.",

        worksWith:
            ["Node.js", "Python", "Docker"],

        useWhen:
            "You need a simple backend deployment.",

        priority:
            "high",

        url:
            "https://render.com"
    },


    {
        name: "Railway",
        category: "deployment",
        tag: "DEPLOY",
        tagClass: "yellow",
        icon: "R",

        description:
            "Developer-friendly cloud platform for deploying applications and infrastructure.",

        worksWith:
            ["Node.js", "PostgreSQL", "Docker"],

        useWhen:
            "You want simple full-stack deployment.",

        priority:
            "medium",

        url:
            "https://railway.com"
    },


    /* =================================================
       DESIGN / INSPIRATION
    ================================================= */

    {
        name: "Awwwards",
        category: "design",
        tag: "INSPIRATION",
        tagClass: "purple",
        icon: "A",

        description:
            "Showcase of creative and award-winning websites.",

        worksWith:
            ["Web Design"],

        useWhen:
            "You need inspiration for a high-end website.",

        priority:
            "high",

        url:
            "https://www.awwwards.com"
    },


    {
        name: "Godly",
        category: "design",
        tag: "INSPIRATION",
        tagClass: "purple",
        icon: "G",

        description:
            "Curated collection of beautiful modern websites.",

        worksWith:
            ["Web Design"],

        useWhen:
            "You need modern website inspiration.",

        priority:
            "high",

        url:
            "https://godly.website"
    },


    {
        name: "Mobbin",
        category: "design",
        tag: "INSPIRATION",
        tagClass: "purple",
        icon: "M",

        description:
            "Large library of real-world mobile and web product UI patterns.",

        worksWith:
            ["UI/UX", "Product Design"],

        useWhen:
            "You need real product UI inspiration.",

        priority:
            "high",

        url:
            "https://mobbin.com"
    },


    {
        name: "Dribbble",
        category: "design",
        tag: "INSPIRATION",
        tagClass: "purple",
        icon: "D",

        description:
            "Community showcasing interface, product and visual design work.",

        worksWith:
            ["UI/UX", "Design"],

        useWhen:
            "You need visual design inspiration.",

        priority:
            "medium",

        url:
            "https://dribbble.com"
    },


    /* =================================================
       DEVELOPER TOOLS
    ================================================= */

    {
        name: "Excalidraw",
        category: "devtools",
        tag: "TOOLS",
        tagClass: "green",
        icon: "E",

        description:
            "Virtual whiteboard for quickly drawing diagrams and system designs.",

        worksWith:
            ["Architecture", "Planning"],

        useWhen:
            "You need to sketch an architecture or idea.",

        priority:
            "high",

        url:
            "https://excalidraw.com"
    },


    {
        name: "JSON Crack",
        category: "devtools",
        tag: "TOOLS",
        tagClass: "green",
        icon: "J",

        description:
            "Visualize JSON data as interactive graphs and structures.",

        worksWith:
            ["JSON", "APIs"],

        useWhen:
            "You need to understand complex JSON.",

        priority:
            "medium",

        url:
            "https://jsoncrack.com"
    },


    {
        name: "Regex101",
        category: "devtools",
        tag: "TOOLS",
        tagClass: "green",
        icon: "R",

        description:
            "Interactive regex tester with explanations and debugging tools.",

        worksWith:
            ["Regex", "JavaScript", "Python"],

        useWhen:
            "You're writing or debugging regular expressions.",

        priority:
            "high",

        url:
            "https://regex101.com"
    },


    {
        name: "Can I Use",
        category: "devtools",
        tag: "TOOLS",
        tagClass: "green",
        icon: "CIU",

        description:
            "Check browser compatibility for web platform features.",

        worksWith:
            ["HTML", "CSS", "JavaScript"],

        useWhen:
            "You're unsure whether a browser supports a feature.",

        priority:
            "high",

        url:
            "https://caniuse.com"
    },


    {
        name: "Carbon",
        category: "devtools",
        tag: "TOOLS",
        tagClass: "green",
        icon: "C",

        description:
            "Create beautiful images of source code for presentations and posts.",

        worksWith:
            ["Code", "Documentation"],

        useWhen:
            "You want to share code beautifully.",

        priority:
            "medium",

        url:
            "https://carbon.now.sh"
    },


    /* =================================================
       LEARNING / DOCS
    ================================================= */

    {
        name: "MDN",
        category: "learning",
        tag: "DOCS",
        tagClass: "blue",
        icon: "MDN",

        description:
            "Comprehensive documentation for HTML, CSS, JavaScript and web APIs.",

        worksWith:
            ["Web", "JavaScript"],

        useWhen:
            "You need reliable web platform documentation.",

        priority:
            "high",

        url:
            "https://developer.mozilla.org"
    },


    {
        name: "Roadmap.sh",
        category: "learning",
        tag: "LEARN",
        tagClass: "blue",
        icon: "R",

        description:
            "Developer roadmaps for frontend, backend, DevOps, AI and more.",

        worksWith:
            ["Learning", "Career"],

        useWhen:
            "You need a structured learning path.",

        priority:
            "high",

        url:
            "https://roadmap.sh"
    },


    {
        name: "Frontend Mentor",
        category: "learning",
        tag: "PRACTICE",
        tagClass: "blue",
        icon: "FM",

        description:
            "Real-world frontend challenges for practicing web development.",

        worksWith:
            ["HTML", "CSS", "JavaScript", "React"],

        useWhen:
            "You want to practice building real interfaces.",

        priority:
            "high",

        url:
            "https://www.frontendmentor.io"
    }

];


/* =====================================================
   WORKFLOW DATABASE
===================================================== */

const workflows = [

    {
        number: "01",
        icon: "🌐",
        title: "Modern Web App",

        description:
            "Build a polished full-stack website or SaaS application.",

        stack:
            ["Next.js", "Tailwind", "shadcn/ui", "Motion", "Supabase", "Vercel"]
    },


    {
        number: "02",
        icon: "🎨",
        title: "3D Website",

        description:
            "Create an immersive interactive website with 3D visuals.",

        stack:
            ["Next.js", "Tailwind", "Spline", "Motion", "Three.js"]
    },


    {
        number: "03",
        icon: "🤖",
        title: "AI Application",

        description:
            "Build an AI-powered application with a modern frontend.",

        stack:
            ["Next.js", "shadcn/ui", "OpenAI", "Supabase", "Vercel"]
    },


    {
        number: "04",
        icon: "⚡",
        title: "Build Fast with AI",

        description:
            "Prototype and launch an idea quickly using AI tools.",

        stack:
            ["v0", "Lovable", "Supabase", "GitHub", "Vercel"]
    }

];


/* =====================================================
   CORE STACK
===================================================== */

const coreStack = [

    "Java",
    "Python",
    "C",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Supabase",
    "Tailwind",
    "Git",
    "GitHub",
    "Docker"

];


/* =====================================================
   DOM ELEMENTS
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const filtersContainer =
    document.getElementById("filters");

const toolsGrid =
    document.getElementById("toolsGrid");

const workflowGrid =
    document.getElementById("workflowGrid");

const coreStackContainer =
    document.getElementById("coreStack");

const resultCount =
    document.getElementById("resultCount");

const noResults =
    document.getElementById("noResults");


let activeFilter = "all";


/* =====================================================
   CATEGORY DEFINITIONS
===================================================== */

const categories = {

    all: "All",

    ui: "UI",

    animation: "Animation",

    "3d": "3D",

    visuals: "Visuals",

    icons: "Icons",

    ai: "AI",

    frontend: "Frontend",

    backend: "Backend",

    database: "Database",

    auth: "Auth",

    services: "Services",

    deployment: "Deployment",

    design: "Design",

    devtools: "Dev Tools",

    learning: "Learning"

};


/* =====================================================
   CREATE FILTER BUTTONS
===================================================== */

function renderFilters() {

    filtersContainer.innerHTML = "";

    Object.entries(categories).forEach(
        ([key, label]) => {

            const button =
                document.createElement("button");

            button.className =
                `filter ${key === "all" ? "active" : ""}`;

            button.dataset.filter = key;

            button.textContent = label;

            button.addEventListener(
                "click",
                () => {

                    activeFilter = key;

                    document
                        .querySelectorAll(".filter")
                        .forEach(btn =>
                            btn.classList.remove("active")
                        );

                    button.classList.add("active");

                    renderResources();

                }
            );

            filtersContainer.appendChild(button);

        }
    );

}


/* =====================================================
   CREATE RESOURCE CARD
===================================================== */

function createResourceCard(resource) {

    const card =
        document.createElement("article");

    card.className = "tool-card";


    /*
        Searchable text is stored here.
    */

    card.dataset.search =
        `
        ${resource.name}
        ${resource.category}
        ${resource.description}
        ${resource.useWhen}
        ${resource.worksWith.join(" ")}
        `.toLowerCase();


    card.innerHTML = `

        <div class="tool-top">

            <div class="tool-logo">
                ${resource.icon}
            </div>

            <span class="tag ${resource.tagClass}">
                ${resource.tag}
            </span>

        </div>


        <h3>
            ${resource.name}
        </h3>


        <p>
            ${resource.description}
        </p>


        <div class="use-when">

            <span>USE WHEN</span>

            ${resource.useWhen}

        </div>


        <div class="tool-meta">

            ${resource.worksWith
                .map(item => `<span>${item}</span>`)
                .join("")
            }

        </div>


        <div class="card-bottom">

            <span class="priority priority-${resource.priority}">
                ${resource.priority === "high"
                    ? "★ Recommended"
                    : resource.priority === "medium"
                        ? "● Useful"
                        : "○ Explore"
                }
            </span>


            <a
                href="${resource.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="tool-link"
            >
                Open ↗
            </a>

        </div>

    `;


    return card;

}


/* =====================================================
   RENDER RESOURCES
===================================================== */

function renderResources() {

    toolsGrid.innerHTML = "";

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredResources =
        resources.filter(resource => {

            const matchesCategory =
                activeFilter === "all" ||
                resource.category === activeFilter;


            const searchableText =
                `
                ${resource.name}
                ${resource.category}
                ${resource.description}
                ${resource.useWhen}
                ${resource.worksWith.join(" ")}
                `.toLowerCase();


            const matchesSearch =
                searchableText.includes(searchTerm);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    filteredResources.forEach(
        resource => {

            toolsGrid.appendChild(
                createResourceCard(resource)
            );

        }
    );


    /* ================= RESULTS ================= */

    const count =
        filteredResources.length;


    resultCount.textContent =
        `${count} resource${count === 1 ? "" : "s"} found`;


    if (count === 0) {

        noResults.classList.add("show");

    } else {

        noResults.classList.remove("show");

    }

}


/* =====================================================
   RENDER WORKFLOWS
===================================================== */

function renderWorkflows() {

    workflowGrid.innerHTML = "";


    workflows.forEach(workflow => {

        const card =
            document.createElement("article");

        card.className =
            "workflow-card";


        card.innerHTML = `

            <div class="workflow-number">
                ${workflow.number}
            </div>


            <div class="workflow-icon">
                ${workflow.icon}
            </div>


            <h3>
                ${workflow.title}
            </h3>


            <p>
                ${workflow.description}
            </p>


            <div class="workflow-stack">

                ${workflow.stack
                    .map(item =>
                        `<span>${item}</span>`
                    )
                    .join("")
                }

            </div>

        `;


        workflowGrid.appendChild(card);

    });

}


/* =====================================================
   RENDER CORE STACK
===================================================== */

function renderCoreStack() {

    coreStackContainer.innerHTML = "";


    coreStack.forEach(technology => {

        const element =
            document.createElement("span");

        element.textContent =
            technology;

        coreStackContainer.appendChild(
            element
        );

    });

}


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    renderResources
);


/* =====================================================
   CTRL + K
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* =====================================================
   ESC
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            searchInput.value = "";

            activeFilter = "all";


            document
                .querySelectorAll(".filter")
                .forEach(button =>
                    button.classList.remove("active")
                );


            document
                .querySelector('[data-filter="all"]')
                .classList.add("active");


            renderResources();

            searchInput.blur();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

renderFilters();

renderWorkflows();

renderResources();

renderCoreStack();
