var PAGE_DATA = { token: null, users: [] };

function login(username, password) {
    fetch("https://bcca-pingpong.herokuapp.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(r => r.json()) // need to add some form of validation to inform the user
        .then(text =>
            verifyUser(
                text.token,
                "https://bcca-pingpong.herokuapp.com/api/users/"
            )
        );
}
function verifyUser(token, url) {
    if (token) {
        PAGE_DATA.token = token;
        fetch(url, {
            method: "GET",
            headers: {
                // "Content-Type": "application/json; charset=utf-8",
                Authorization: "Token " + token
            }
        })
            .then(r => r.json())
            .then(text => (PAGE_DATA.users = text));
    }
}
function register(username, password) {
    fetch("https://bcca-pingpong.herokuapp.com/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
            username: username,
            password: password,
            password_repeat: password
        })
    })
        .then(r => r.json())
        .then(result => {
            PAGE_DATA.token = result.token;
            PAGE_DATA.users.push({ id: result.id, username: result.username });
        });
    var message = document.getElementById("registered");
    message.innerHTML = "You have been successfully registered!";
}
function new_game() {
    fetch("https://bcca-pingpong.herokuapp.com/api/new-game/", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" }
    });
}
function addLoginEvent() {
    loginForm = document.getElementById("login-form");
    usernameInput = loginForm["username"];
    passwordInput = loginForm["password"];
    loginForm.addEventListener("submit", ev => {
        ev.preventDefault();
        login(usernameInput.value, passwordInput.value);
    });
}
function addRegisterEvent() {
    registerForm = document.getElementById("register-form");
    usernameInput = registerForm["username"];
    passwordInput = registerForm["password"];
    registerForm.addEventListener("submit", ev => {
        ev.preventDefault();
        register(usernameInput.value, passwordInput.value);
    });
}
function addEvents() {
    addLoginEvent();
    addRegisterEvent();
}
addEvents();
