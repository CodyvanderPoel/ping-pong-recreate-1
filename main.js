"use strict";

var PAGE_DATA = { users: [] };

function login(username, password) {
    fetch("https://bcca-pingpong.herokuapp.com/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ username: username, password: password })
    })
        .then(r => r.json()) // need to add some form of validation to inform the user
        .then(text => {
            console.log(text);
            PAGE_DATA.current_user = text.token;
            PAGE_DATA.name = username;
            console.log(PAGE_DATA.current_user);
            verifyUser(
                PAGE_DATA.current_user,
                PAGE_DATA.name,
                "https://bcca-pingpong.herokuapp.com/api/users/"
            );
        });
}
function guestGame() {
    var clickers = document.querySelectorAll("div.click-me");
    for (var clicker of clickers) {
        clicker.addEventListener("click", function(e) {
            var target = e.target;
            if (
                !(
                    target.id == "player-1-score" ||
                    target.id == "player-2-score"
                )
            ) {
                target = target.querySelector("span");
            }
            var val = Number(target.innerText);
            val += 1;
            target.innerText = val;
            if (val == 10) {
                target.style.color = "black";
                var parent = target.parentNode;
                parent.style.backgroundColor = "yellow";
                var p = parent.parentNode.querySelector("p").innerText;
                document.querySelector("div.container").innerHTML =
                    '<div class="text-center"><h1 style="color:red;">GAME OVER</h1><br>' +
                    `<h1 style="color:red;">${p} WINS!</h1></div>`;
            }
        });
    }
}
function verifyUser(token, name, url) {
    if (token !== undefined) {
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: "Token " + token
            }
        })
            .then(r => r.json())
            .then(text => {
                PAGE_DATA.users = text;
                getUsers();
            });
        var message = document.getElementById("logged-in");
        message.innerText = `You have been successfully logged in. Welcome back ${name}!`;
        var greeting = document.getElementById("greeting");
        greeting.innerText = `Welcome ${name}!`;
        var disabledLogin = document.getElementById("login-button");
        disabledLogin.disabled = true;
        var userHome = document.getElementById("nav-home-tab");
        userHome.setAttribute("href", "#nav-user-home");
        $(".nav-tabs li:first-child a").tab("show");
    } else {
        alert("Invalid username or password!");
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
    var loginForm = document.getElementById("login-form");
    var usernameInput = loginForm["username"];
    var passwordInput = loginForm["password"];
    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        login(usernameInput.value, passwordInput.value);
    });
}
function addRegisterEvent() {
    var registerForm = document.getElementById("register-form");
    var usernameInput = registerForm["username"];
    var passwordInput = registerForm["password"];
    registerForm.addEventListener("submit", event => {
        event.preventDefault();
        register(usernameInput.value, passwordInput.value);
    });
}
function patchLoginPiece() {
    var link = document.querySelector(".submit-options a");
    link.addEventListener("click", () =>
        $(".nav-tabs a[href='#nav-register']").tab("show")
    );
}
function getUsers() {
    PAGE_DATA.users.forEach(user => {
        var roster = document.getElementById("roster");
        console.log(user);
        roster.innerText = `ID: ${user.id} NAME: ${user.username}`;
    });
}
function addEvents() {
    addLoginEvent();
    addRegisterEvent();
    guestGame();
    patchLoginPiece();
}
addEvents();

var divs = document.querySelectorAll("div.click-me");

for (var div of divs) {
    var d = Math.max(div.offsetHeight, div.offsetWidth) + "px";
    div.style.width = d;
    div.style.height = d;
}
