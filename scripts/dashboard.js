document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-btn");
    const grid = document.getElementById("movies-grid");
    const resultsCount = document.getElementById("results-count");
    const emptyState = document.getElementById("empty-state");

    // Defensive check
    if (!searchInput || !grid || !resultsCount || !emptyState) {
        console.error("Dashboard elements not found. Check your HTML IDs.");
        return;
    }

    // Initial render
    renderMovies(movies);

    // Live search
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();
        console.log("Search query:", query);

        const filtered = movies.filter((m) => {
            const haystack = `${m.title} ${m.genre} ${m.description} ${m.year}`.toLowerCase();
            return haystack.includes(query);
        });

        renderMovies(filtered);
    });

    // Clear button
    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        renderMovies(movies);
        searchInput.focus();
    });

    function renderMovies(list) {
        // DOM mutation (required)
        grid.innerHTML = "";

        resultsCount.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;

        if (list.length === 0) {
            emptyState.classList.remove("d-none");
            return;
        }

        emptyState.classList.add("d-none");

        list.forEach((m) => {
            const col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-lg-4";

            col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${m.imageUrl}" class="card-img-top movie-poster" alt="${escapeHtml(m.title)} poster">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start gap-2">
                <h2 class="h6 card-title mb-1">${escapeHtml(m.title)}</h2>
                <span class="badge text-bg-secondary">${escapeHtml(m.genre)}</span>
              </div>
  
              <p class="text-muted small mb-2">${m.year} • Rating: ${"★".repeat(m.rating)}</p>
              <p class="card-text small flex-grow-1">${escapeHtml(m.description)}</p>
  
              <div class="d-flex justify-content-between align-items-center mt-2">
                <a class="btn btn-sm btn-primary" href="${m.link}" target="_blank" rel="noopener">
                  View on IMDb
                </a>
                <small class="text-muted">#${escapeHtml(m.genre)}</small>
              </div>
            </div>
          </div>
        `;

            grid.appendChild(col);
        });
    }

    // Tiny helper so titles/descriptions don't break HTML
    function escapeHtml(str) {
        return String(str)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
});
