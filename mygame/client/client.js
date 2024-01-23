let matrix = [];
let side = 5;
let color = true;
let counter = 1;
let weatherID = 1;
let mysocket;

let grasFarbe;
let grasfresserFarbe;
let fleischfresserFarbe;
let erdeFarbe;

let frühlingGras = "#7FFF00";
let sommerGras = "green";
let herbstGras = "#DAA520";
let winterGras = "#FFFFFF";

let frühlingGrasfresser = "#ADFF2F";
let sommerGrasfresser = "black";
let herbstGrasfresser = "#8B4513";
let winterGrasfresser = "#A9A9A9";

let frühlingFleischfresser = "#8B4513";
let sommerFleischfresser = "red";
let herbstFleischfresser = "#8B0000";
let winterFleischfresser = "#1E90FF";

let frühlingErder = "#CD853F";
let sommerErde = "yellow";
let herbstErde = "#964B00";
let winterErde = "F5F5F5";

function main() {
    const socket = io();
    mysocket = socket;

    console.log("Hello World!");

    let destroyerButton = document.getElementById("destroyerButton");
    let fleischfresserButton = document.getElementById("fleischfresserButton");
    let explosion = document.getElementById("explosion");
    let weather = document.getElementById("weather");

    function gotMatrix(data) {
        // console.log(data);
        matrix = data;
    }

    socket.on('matrix', gotMatrix);

    function sendCommandDestroyer() {
        let text = document.getElementById('selected-field-text');
        let icon = document.getElementById('selected-field');

        text.innerHTML = "Selected: Rasen-Zerstörer";
        icon.style.background = "black";

        socket.emit('createDestroyer');
    }

    function sendCommandFresser() {
        let text = document.getElementById('selected-field-text');
        let icon = document.getElementById('selected-field');

        text.innerHTML = "Selected: Fleischfresser";
        icon.style.background = "red";

        socket.emit('createFresser');
    }

    function sendExplosion() {
        let text = document.getElementById('selected-field-text');
        let icon = document.getElementById('selected-field');

        text.innerHTML = "Selected: Explosion";
        icon.style.background = "orange";

        socket.emit('createExplosion');
    }

    function sendWeather() {
        if (weatherID == 4) {
            weatherID = 0;
            weather.innerHTML = "Frühling";

            grasFarbe = frühlingGras;
            grasfresserFarbe = frühlingGrasfresser;
            fleischfresserFarbe = frühlingFleischfresser;
            erdeFarbe = frühlingErder;

        } else if (weatherID == 1) {
            weather.innerHTML = "Sommer";

            grasFarbe = sommerGras;
            grasfresserFarbe = sommerGrasfresser;
            fleischfresserFarbe = sommerFleischfresser;
            erdeFarbe = sommerErde;

        } else if (weatherID == 2) {
            weather.innerHTML = "Herbst";

            grasFarbe = herbstGras;
            grasfresserFarbe = herbstGrasfresser;
            fleischfresserFarbe = herbstFleischfresser;
            erdeFarbe = herbstErde;

        } else if (weatherID == 3) {
            weather.innerHTML = "Winter";

            grasFarbe = winterGras;
            grasfresserFarbe = winterGrasfresser;
            fleischfresserFarbe = winterFleischfresser;
            erdeFarbe = winterErde;

        }
        weatherID ++;
        console.log(weatherID);
        socket.emit('weather', weatherID);
    }

    socket.on("getWeather", function(weatherID_) {
        weatherID = weatherID_;
        if (weatherID_ == 1) {
            weather.innerHTML = "Frühling";

            grasFarbe = frühlingGras;
            grasfresserFarbe = frühlingGrasfresser;
            fleischfresserFarbe = frühlingFleischfresser;
            erdeFarbe = frühlingErder;

        } else if (weatherID_ == 2) {
            weather.innerHTML = "Sommer";

            grasFarbe = sommerGras;
            grasfresserFarbe = sommerGrasfresser;
            fleischfresserFarbe = sommerFleischfresser;
            erdeFarbe = sommerErde;

        } else if (weatherID_ == 3) {
            weather.innerHTML = "Herbst";

            grasFarbe = herbstGras;
            grasfresserFarbe = herbstGrasfresser;
            fleischfresserFarbe = herbstFleischfresser;
            erdeFarbe = herbstErde;

        } else if (weatherID_ == 4) {
            weather.innerHTML = "Winter";

            grasFarbe = winterGras;
            grasfresserFarbe = winterGrasfresser;
            fleischfresserFarbe = winterFleischfresser;
            erdeFarbe = winterErde;

        }
    })

    socket.on("getSelected", function(selected_) {
        if (selected_ == 2) {
            let text = document.getElementById('selected-field-text');
            let icon = document.getElementById('selected-field');

            text.innerHTML = "Selected: Rasen-Zerstörer";
            icon.style.background = "black";
        } else if (selected_ == 3) {
            let text = document.getElementById('selected-field-text');
            let icon = document.getElementById('selected-field');

            text.innerHTML = "Selected: Fleischfresser";
            icon.style.background = "red";
        } else if (selected_ == 4) {
            let text = document.getElementById('selected-field-text');
            let icon = document.getElementById('selected-field');

            text.innerHTML = "Selected: Explosion";
            icon.style.background = "orange";
        }
    })

    destroyerButton.onclick = sendCommandDestroyer;
    fleischfresserButton.onclick = sendCommandFresser;
    explosion.onclick = sendExplosion;
    weather.onclick = sendWeather;
}

function mouseClicked() {
    console.log(mouseX, mouseY);
    let fieldX = mouseX / 5;
    let fieldY = mouseY / 5;

    let x = Math.floor(fieldX) + 1;
    let y = Math.floor(fieldY) + 1;

    if (x < 101 && x > 0 && y <= 101 && y > 0) {
        mysocket.emit('coordinations', x, y);
    }
    console.log(x);
}

function setup(){
    createCanvas(500, 500);
}

function draw() {
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix.length; spalte++) {
            //console.log(matrix[zeile][spalte])
            if (matrix[zeile][spalte] === 1) {
                fill(grasFarbe);
            } else if (matrix[zeile][spalte] === 2) {
                fill(grasfresserFarbe);
            } else if (matrix[zeile][spalte] === 3) {
                fill(fleischfresserFarbe);
            } else if (matrix[zeile][spalte] === 4) {
                if (color == true) {
                    fill(erdeFarbe)
                    counter++;
                    if(counter > 9) {
                        color = false;
                        counter = 0;
                    }
                } else if (color == false) {
                    fill("orange");
                    counter++;
                    if(counter > 9) {
                        color = true;
                        counter = 0;
                    }
                }
            } else {
                fill(erdeFarbe);
            }
            rect(zeile * 5,spalte * side,side,5);
        }
    }
}

window.onload = main;