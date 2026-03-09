document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const resetBtn = document.getElementById("reset-btn");
    const resultsDiv = document.getElementById("results");
    const resultsCount = document.getElementById("results-count");
    const empty = document.getElementById("empty");

    const movieCount = document.getElementById("movie-count");

    // show total movie count
    if (movieCount) {
        movieCount.textContent = movies.length;
    }

    // restore last search
    const savedSearch = sessionStorage.getItem("lastSearch");

    if (savedSearch && savedSearch !== "") {
        input.value = savedSearch;
        runSearch();
    } else {
        renderResults(movies);
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        runSearch();
    });

    resetBtn.addEventListener("click", function () {
        input.value = "";
        sessionStorage.removeItem("lastSearch");
        renderResults(movies);
        input.focus();
    });

    input.addEventListener("input", function () {
        runSearch();
    });

    function runSearch() {

        const query = input.value.trim().toLowerCase();

        sessionStorage.setItem("lastSearch", query);

        if (query === "") {
            renderResults(movies);
            return;
        }

        const matches = [];

        for (let i = 0; i < movies.length; i++) {

            const m = movies[i];

            const title = String(m.title).toLowerCase();
            const genre = String(m.genre).toLowerCase();
            const desc = String(m.description).toLowerCase();
            const year = String(m.year).toLowerCase();

            if (
                title.includes(query) ||
                genre.includes(query) ||
                desc.includes(query) ||
                year.includes(query)
            ) {
                matches.push(m);
            }
        }

        renderResults(matches);
    }

    function renderResults(list) {

        resultsDiv.innerHTML = "";

        resultsCount.textContent =
            "Showing " + list.length + " result" + (list.length === 1 ? "" : "s");

        if (list.length === 0) {
            empty.classList.remove("d-none");
            return;
        }

        empty.classList.add("d-none");

        for (let i = 0; i < list.length; i++) {

            const m = list[i];

            const col = document.createElement("div");

            col.className = "col-12 col-md-6 col-lg-4";

            col.innerHTML = `
            <div class="card movie-card h-100">
                <div class="card-body">

                    <h2 class="h6">${m.title}</h2>

                    <p class="text-muted mb-1">
                        ${m.genre} • ${m.year}
                    </p>

                    <p class="small mb-2">
                        ${m.description}
                    </p>

                    <a class="btn btn-sm btn-outline-primary"
                       href="${m.link}"
                       target="_blank"
                       rel="noopener">

                        IMDb
                    </a>

                </div>
            </div>
            `;

            resultsDiv.appendChild(col);
        }
    }

});
