// search.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");
    const input = document.getElementById("search-input");
    const resetBtn = document.getElementById("reset-btn");
    const resultsDiv = document.getElementById("results");
    const resultsCount = document.getElementById("results-count");
    const empty = document.getElementById("empty");

    // Show all movies on load
    renderResults(movies);

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        runSearch();
    });

    // Reset button
    resetBtn.addEventListener("click", function () {
        input.value = "";
        renderResults(movies);
        input.focus();
    });

    function runSearch() {
        const query = input.value.trim().toLowerCase();
        console.log("Search query:", query);

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

            if (title.includes(query) || genre.includes(query) || desc.includes(query)) {
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
          <div class="card h-100">
            <div class="card-body">
              <h2 class="h6">${m.title}</h2>
              <p class="text-muted mb-1">${m.genre} • ${m.year}</p>
              <p class="small mb-2">${m.description}</p>
              <a class="btn btn-sm btn-outline-primary" href="${m.link}" target="_blank" rel="noopener">
                IMDb
              </a>
            </div>
          </div>
        `;

            resultsDiv.appendChild(col);
        }
    }
});
