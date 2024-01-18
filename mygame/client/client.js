let matrix = [];
let side = 10;
let color = true;
let counter = 1;
let mysocket;

function main() {
    const socket = io();
    mysocket = socket;

    console.log("Hello World!");

    let destroyerButton = document.getElementById("destroyerButton");
    let fleischfresserButton = document.getElementById("fleischfresserButton");
    let explosion = document.getElementById("explosion");

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

    function sendCoordinations(x, y) {
    }

    destroyerButton.onclick = sendCommandDestroyer;
    fleischfresserButton.onclick = sendCommandFresser;
    explosion.onclick = sendExplosion;
}

function mouseClicked() {
    console.log(mouseX, mouseY);
    let fieldX = mouseX / 10;
    let fieldY = mouseY / 10;

    let x = Math.floor(fieldX) + 1;
    let y = Math.floor(fieldY) + 1;

    if (x < 51 && x > 0 && y < 51 && y > 0) {
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
                fill("green");
            } else if (matrix[zeile][spalte] === 2) {
                fill("black");
            } else if (matrix[zeile][spalte] === 3) {
                fill("red");
            } else if (matrix[zeile][spalte] === 4) {
                if (color == true) {
                    fill("yellow")
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
                fill("yellow");
            }
            rect(zeile * 10,spalte * side,side,10);
        }
    }
}

window.onload = main;