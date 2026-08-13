document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const searchInput = document.getElementById("menuSearch");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearSearch");

    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuItems = document.querySelectorAll(".menu-item");
    const menuContainer = document.querySelector(".menu-container");

    let activeCategory = "all";


    // ==========================================
    // NO RESULTS MESSAGE
    // ==========================================

    let noResults = document.createElement("div");

    noResults.className = "no-results";
    noResults.innerHTML = `
        <i class="fa-solid fa-utensils"></i>
        <h3>No Matching Dishes Found</h3>
        <p>Try searching for another dish.</p>
    `;

    noResults.style.display = "none";

    if (menuContainer) {
        menuContainer.appendChild(noResults);
    }


    // ==========================================
    // SEARCH FUNCTION
    // ==========================================

    function performSearch() {

        const searchValue = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        let visibleItems = 0;

        menuItems.forEach(item => {

            // ----------------------------------
            // GET ITEM DATA
            // ----------------------------------

            const itemNameElement = item.querySelector("h3");
            const itemDescriptionElement = item.querySelector("p");
            const itemCategoryElement = item.querySelector(".food-category");

            const itemName = itemNameElement
                ? itemNameElement.textContent.toLowerCase()
                : "";

            const itemDescription = itemDescriptionElement
                ? itemDescriptionElement.textContent.toLowerCase()
                : "";

            const itemCategory = itemCategoryElement
                ? itemCategoryElement.textContent.toLowerCase()
                : "";


            // ----------------------------------
            // SEARCH MATCH
            // ----------------------------------

            const searchMatch =
                searchValue === "" ||
                itemName.includes(searchValue) ||
                itemDescription.includes(searchValue) ||
                itemCategory.includes(searchValue);


            // ----------------------------------
            // CATEGORY MATCH
            // ----------------------------------

            const categoryMatch =
                activeCategory === "all" ||
                itemCategory === activeCategory;


            // ----------------------------------
            // SHOW / HIDE
            // ----------------------------------

            if (searchMatch && categoryMatch) {

                item.classList.remove("hidden");

                item.style.display = "";

                visibleItems++;

            } else {

                item.classList.add("hidden");

                item.style.display = "none";
            }

        });


        // ======================================
        // NO RESULT
        // ======================================

        if (visibleItems === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";
        }


        // ======================================
        // CLEAR BUTTON
        // ======================================

        if (clearButton) {

            if (searchValue !== "") {

                clearButton.style.display = "flex";

            } else {

                clearButton.style.display = "none";
            }
        }

    }


    // ==========================================
    // SEARCH BUTTON CLICK
    // ==========================================

    if (searchButton) {

        searchButton.addEventListener("click", () => {

            performSearch();

        });

    }


    // ==========================================
    // ENTER KEY SEARCH
    // ==========================================

    if (searchInput) {

        searchInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        });


        // Live search while typing
        searchInput.addEventListener("input", () => {

            performSearch();

        });

    }


    // ==========================================
    // CLEAR SEARCH
    // ==========================================

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            searchInput.value = "";

            activeCategory = "all";

            filterButtons.forEach(button => {

                button.classList.remove("active");

            });

            const allButton = document.querySelector(
                '.filter-btn[data-category="all"]'
            );

            if (allButton) {
                allButton.classList.add("active");
            }

            performSearch();

            searchInput.focus();

        });

    }


    // ==========================================
    // CATEGORY FILTERS
    // ==========================================

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            activeCategory =
                button.dataset.category
                    ? button.dataset.category.toLowerCase()
                    : "all";

            performSearch();

        });

    });


    // ==========================================
    // INITIAL STATE
    // ==========================================

    performSearch();


    // ==========================================
    // SCROLL REVEAL
    // ==========================================

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

});