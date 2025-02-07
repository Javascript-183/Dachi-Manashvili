document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
            let confirmPassword = document.getElementById("confirmPassword").value.trim();

            let usernameError = document.getElementById("usernameError");
            let emailError = document.getElementById("emailError");
            let passwordError = document.getElementById("passwordError");
            let confirmPasswordError = document.getElementById("confirmPasswordError");

            usernameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";

            let hasError = false;

            if (username.length < 5) {
                usernameError.textContent = "მომხმარებლის სახელი უნდა იყოს მინიმუმ 5 სიმბოლო.";
                hasError = true;
            }

            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(email)) {
                emailError.textContent = "ელფოსტა არასწორია!";
                hasError = true;
            }

            if (password.length < 8) {
                passwordError.textContent = "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლო.";
                hasError = true;
            }

            if (password !== confirmPassword) {
                confirmPasswordError.textContent = "პაროლები არ ემთხვევა!";
                hasError = true;
            }

            if (hasError) {
                return;
            }

            let user = { username, email, password };
            localStorage.setItem(email, JSON.stringify(user));
            
            let successMessage = document.createElement("p");
            successMessage.textContent = "რეგისტრაცია წარმატებულია! ახლა შედი შენს ანგარიშზე.";
            successMessage.style.color = "green";
            registerForm.appendChild(successMessage);

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let email = document.getElementById("loginEmail").value.trim();
            let password = document.getElementById("loginPassword").value.trim();

            let loginEmailError = document.getElementById("loginEmailError");
            let loginPasswordError = document.getElementById("loginPasswordError");

            loginEmailError.textContent = "";
            loginPasswordError.textContent = "";

            let user = localStorage.getItem(email);

            if (!user) {
                loginEmailError.textContent = "მომხმარებელი ვერ მოიძებნა!";
                return;
            }

            let userData = JSON.parse(user);
            if (userData.password !== password) {
                loginPasswordError.textContent = "პაროლი არასწორია!";
                return;
            }

            let successMessage = document.createElement("p");
            successMessage.textContent = "შესვლა წარმატებულია!";
            successMessage.style.color = "green";
            loginForm.appendChild(successMessage);

            setTimeout(() => {
                window.location.href = "./index.html";
            }, 1500);
        });
    }
});
