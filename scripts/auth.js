document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");
    const logoutBtn = document.getElementById("logout-btn");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value;

            console.log("Entered password:", password);

            if (password === "movie123" && username !== "") {
                sessionStorage.setItem("loggedInUser", username);
                window.location.href = "dashboard.html";
            } else if (username === "") {
                loginMessage.textContent = "Please enter a username.";
            } else {
                loginMessage.textContent = "Incorrect password. Try movie123.";
            }
        });
    }

    const currentPage = window.location.pathname;

    const protectedPage =
        currentPage.includes("dashboard.html") ||
        currentPage.includes("session-data.html");

    if (protectedPage) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            window.location.href = "login.html";
        }
    }

    const currentUserText = document.getElementById("current-user");
    if (currentUserText) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");
        currentUserText.textContent = loggedInUser ? loggedInUser : "Not logged in";
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.clear();
            window.location.href = "../index.html";
        });
    }
});