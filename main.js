fetch("https://bcca-pingpong.herokuapp.com/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ username: "hello", password: "world" })
})
    .then(r => r.json())
    .then(text => console.log(text));
