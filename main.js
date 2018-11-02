const PAGE_DATA = { token: null, users: null };

function login(username, password) {
    fetch("https://bcca-pingpong.herokuapp.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(r => r.json())
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

function addEvents() {
    loginForm = document.getElementById("login-form");
    usernameInput = loginForm["username"];
    passwordInput = loginForm["password"];
    loginForm.addEventListener("submit", ev => {
        ev.preventDefault();
        login(usernameInput.value, passwordInput.value);
    });
}
addEvents();
