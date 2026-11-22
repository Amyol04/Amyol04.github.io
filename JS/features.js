
/* tabbed view */

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove active class from all buttons
        tabButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Hide all tab content
        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        // Activate selected button
        button.classList.add("active");

        // Display selected tab
        const selectedTab = document.getElementById(
            button.dataset.tab
        );

        if (selectedTab) {
            selectedTab.classList.add("active");
        }
    });
});


/* project filtering */

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        // Remove active class from all filter buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate selected filter
        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        // Filter projects
        projectCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
    });
});
