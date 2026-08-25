const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.querySelector("#register-username").value.trim();
        const password = document.querySelector("#register-password").value;

        if (!username || !password) {
            alert("Please fill all the fields");
            return;
        }

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("profileName", username);

        alert("Registration successful");

        window.location.href = "Login.html";
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.querySelector("#login-username").value.trim();
        const password = document.querySelector("#login-password").value;

        const savedUsername = localStorage.getItem("username");
        const savedPassword = localStorage.getItem("password");

        if (username === savedUsername && password === savedPassword) {
            localStorage.setItem("loggedIn", "true");

            window.location.href = "index.html";
        } else {
            alert("Invalid username or password");
        }
    });
}

const saveSettingsBtn = document.querySelector(".save-setting");

if (saveSettingsBtn) {

    const nameInput = document.querySelector("#full-name");
    const currencySelect = document.querySelector("#currency");
    const usernameText = document.querySelector(".username-text");

    const savedName = localStorage.getItem("profileName");
    const savedCurrency = localStorage.getItem("currency");
    const savedUsername = localStorage.getItem("username");

    if (savedName) {
        nameInput.value = savedName;
    }

    if (savedCurrency) {
        currencySelect.value = savedCurrency;
    }

    if (savedUsername) {
        usernameText.textContent = savedUsername;
    }

    saveSettingsBtn.addEventListener("click", function() {

        const name = nameInput.value.trim();
        const currency = currencySelect.value;

        if (!name) {
            alert("Please enter your name");
            return;
        }

        localStorage.setItem("profileName", name);
localStorage.setItem("username", name);
localStorage.setItem("currency", currency);
usernameText.textContent = name;

        alert("Settings saved successfully");
    });
}

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            return;
        }

        localStorage.removeItem("loggedIn");

        window.location.href = "Login.html";
    });
}