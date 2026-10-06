/* =====================================================
   QUICK LINKS
   Developer Toolbox & Tech Radar
   Data-driven resource system
   Uses data/resources.js as single source of truth
===================================================== */

// Data is loaded from data/resources.js
const resources = window.resources || [];
const workflows = window.workflows || [];
const coreStack = window.coreStack || [];
const categories = window.categories || {
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

const stackRadarPanel =
    document.getElementById("stackRadarPanel");

const radarCollapseBtn =
    document.getElementById("radarCollapseBtn");

const mobileRadarTrigger =
    document.getElementById("mobileRadarTrigger");

const radarBackdrop =
    document.getElementById("radarBackdrop");

let activeFilter = "all";


/* =====================================================
   CREATE FILTER BUTTONS
===================================================== */

function renderFilters() {

    if (!filtersContainer) return;
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

    if (!toolsGrid) return;
    toolsGrid.innerHTML = "";

    const searchTerm =
        (searchInput ? searchInput.value : "")
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

    if (resultCount) {
        resultCount.textContent =
            `${count} resource${count === 1 ? "" : "s"} found`;
    }

    if (noResults) {
        if (count === 0) {
            noResults.classList.add("show");
        } else {
            noResults.classList.remove("show");
        }
    }

}


/* =====================================================
   RENDER WORKFLOWS (COMPACT RADAR CARDS)
===================================================== */

function renderWorkflows() {

    if (!workflowGrid) return;
    workflowGrid.innerHTML = "";

    workflows.forEach(workflow => {

        const card =
            document.createElement("article");

        card.className =
            "workflow-card";

        card.innerHTML = `

            <div class="workflow-card-top">
                <div class="workflow-icon">
                    ${workflow.icon}
                </div>
                <div class="workflow-title-wrap">
                    <h3>${workflow.title}</h3>
                    <span class="workflow-number">${workflow.number}</span>
                </div>
            </div>

            <p>
                ${workflow.description}
            </p>

            <div class="workflow-stack">
                ${workflow.stack
                    .map(item =>
                        `<span class="stack-tag" title="Search ${item}">${item}</span>`
                    )
                    .join("")
                }
            </div>

        `;

        // Interactive tag search integration
        card.querySelectorAll(".stack-tag").forEach(tagEl => {
            tagEl.addEventListener("click", (e) => {
                e.stopPropagation();
                if (searchInput) {
                    searchInput.value = tagEl.textContent;
                    renderResources();
                    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
                    searchInput.focus();
                }
            });
        });

        workflowGrid.appendChild(card);

    });

}


/* =====================================================
   RENDER CORE STACK
===================================================== */

function renderCoreStack() {

    if (!coreStackContainer) return;
    coreStackContainer.innerHTML = "";

    coreStack.forEach(technology => {

        const element =
            document.createElement("span");

        element.textContent =
            technology;

        // Click core stack technology to search toolbox
        element.style.cursor = "pointer";
        element.title = `Search ${technology} in toolbox`;
        element.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = technology;
                renderResources();
                searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
                searchInput.focus();
            }
        });

        coreStackContainer.appendChild(
            element
        );

    });

}


/* =====================================================
   RADAR PANEL INTERACTIONS (COLLAPSE & MOBILE DRAWER)
===================================================== */

function setupRadarInteractions() {

    // Toggle radar collapse on desktop
    if (radarCollapseBtn && stackRadarPanel) {
        radarCollapseBtn.addEventListener("click", () => {
            stackRadarPanel.classList.toggle("collapsed");
            const isCollapsed = stackRadarPanel.classList.contains("collapsed");
            radarCollapseBtn.setAttribute("aria-expanded", !isCollapsed);
            radarCollapseBtn.title = isCollapsed ? "Expand Stack Radar" : "Minimize Stack Radar";
        });
    }

    // Toggle mobile drawer
    if (mobileRadarTrigger && stackRadarPanel) {
        mobileRadarTrigger.addEventListener("click", () => {
            stackRadarPanel.classList.toggle("mobile-open");
            if (radarBackdrop) {
                radarBackdrop.classList.toggle("active");
            }
        });
    }

    if (radarBackdrop && stackRadarPanel) {
        radarBackdrop.addEventListener("click", () => {
            stackRadarPanel.classList.remove("mobile-open");
            radarBackdrop.classList.remove("active");
        });
    }

}


/* =====================================================
   SEARCH
===================================================== */

if (searchInput) {
    searchInput.addEventListener(
        "input",
        renderResources
    );
}


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

            if (searchInput) {
                searchInput.focus();
            }

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

            // Close mobile radar drawer if open
            if (stackRadarPanel && stackRadarPanel.classList.contains("mobile-open")) {
                stackRadarPanel.classList.remove("mobile-open");
                if (radarBackdrop) radarBackdrop.classList.remove("active");
                return;
            }

            if (searchInput) {
                searchInput.value = "";
                searchInput.blur();
            }

            activeFilter = "all";

            document
                .querySelectorAll(".filter")
                .forEach(button =>
                    button.classList.remove("active")
                );

            const allBtn = document.querySelector('[data-filter="all"]');
            if (allBtn) {
                allBtn.classList.add("active");
            }

            renderResources();

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

setupRadarInteractions();
