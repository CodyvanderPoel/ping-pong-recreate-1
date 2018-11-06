var PAGE_DATA = { users: [] };

function login(username, password) {
    var name = document.getElementById("username").value;
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
    var message = document.getElementById("logged-in");
    message.innerText = `You have been successfully logged in. Welcome back ${name}!`;
    var greeting = document.getElementById("greeting");
    greeting.innerText = `Welcome ${name}!`;
    // var home = document.getElementById("nav-home");
    // home.setAttribute("hidden" == "true");
    // var user_home = document.getElementById("nav-user-home");
    // user_home.removeAttribute("hidden");
}
function guestGame() {
    var playerOnePoints = 0;
    var buttonOne = document
        .getElementById("player-1-button")
        .addEventListener("click", ++playerOnePoints, 1);
    var playerOneScore = document.getElementById("player-1-score");
    playerOneScore.innerText = playerOnePoints;
    var playerTwoPoints = 0;
    var buttonTwo = document
        .getElementById("player-2-button")
        .addEventListener("click", ++playerTwoPoints, 1);
    var playerTwoScore = document.getElementById("player-2-score");
    playerTwoScore.innerText = playerTwoPoints;
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
    message.innerText = "You have been successfully registered!";
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
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        login(usernameInput.value, passwordInput.value);
    });
}
function addRegisterEvent() {
    registerForm = document.getElementById("register-form");
    usernameInput = registerForm["username"];
    passwordInput = registerForm["password"];
    registerForm.addEventListener("submit", event => {
        event.preventDefault();
        register(usernameInput.value, passwordInput.value);
    });
}
function addEvents() {
    addLoginEvent();
    addRegisterEvent();
    offlineGame();
}
addEvents();
