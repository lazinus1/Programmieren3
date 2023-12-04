const express = require("express");
const app = express();

app.use(express.static('../'))

app.get("/", function(req, res) {
    res.send("<button><h1>Hello World!<h1></button>")
});

app.get("/name/:name", function(req, res) {
    let name = req.params.name;
    res.send("<h1>Hello " + name + "</h1>")
})

app.get("/google", function(req, res) {
    res.redirect("http://google.com")
})

app.get("/google/:search", function(req, res) {
    let search = req.params.search;
    res.redirect("https://google.com/search?q=" + search)
})

app.get("/game", function(req, res) {
    res.redirect("./game/index.html")
})

app.get("/*", function(req, res) {
    res.send("<h1>404 Not Found</h1>")
})

app.listen(8080, function() {
    console.log("Server is Ready! (Port: 8080)");
});