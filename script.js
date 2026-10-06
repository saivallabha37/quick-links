/* =====================================================
   QUICK LINKS
   Search + Filtering
===================================================== */

const searchInput = document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter");

const toolCards =
    document.querySelectorAll(".tool-card");

const resultCount =
    document.getElementById("resultCount");

const noResults =
    document.getElementById("noResults");


let activeFilter = "all";


/* ================= FILTER TOOLS ================= */

function filterTools() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    let visibleCount = 0;


    toolCards.forEach(card => {

        const category =
            card.dataset.category;

        const name =
            card.dataset.name.toLowerCase();

        const text =
            card.innerText.toLowerCase();


        const matchesSearch =
            name.includes(searchTerm) ||
            text.includes(searchTerm);


        const matchesCategory =
            activeFilter === "all" ||
            category === activeFilter;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.classList.remove("hidden");

            visibleCount++;

        } else {

            card.classList.add("hidden");

        }

    });


    /* ================= RESULT MESSAGE ================= */

    if (visibleCount === 0) {

        noResults.classList.add("show");

        resultCount.textContent =
            "No tools found";

    } else {

        noResults.classList.remove("show");

        resultCount.textContent =
            `${visibleCount} tool${visibleCount === 1 ? "" : "s"} found`;

    }

}


/* ================= SEARCH ================= */

searchInput.addEventListener(
    "input",
    filterTools
);


/* ================= CATEGORY FILTER ================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            activeFilter =
                button.dataset.filter;


            filterTools();

        }
    );

});


/* ================= CTRL + K ================= */

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


/* ================= ESC ================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            searchInput.value = "";

            activeFilter = "all";


            filterButtons.forEach(button => {

                button.classList.remove("active");

            });


            document
                .querySelector('[data-filter="all"]')
                .classList.add("active");


            filterTools();

            searchInput.blur();

        }

    }
);


/* ================= INITIAL STATE ================= */

filterTools();
