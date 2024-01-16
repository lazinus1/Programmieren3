let matrix = [];
let side = 10;
let color = true;
let counter = 1;

function main() {
    const socket = io();

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
        socket.emit('createDestroyer');
    }

    function sendCommandFresser() {
        socket.emit('createFresser');
    }

    function sendExplosion() {
        socket.emit('createExplosion');
        console.log("Hello World!");
    }

    destroyerButton.onclick = sendCommandDestroyer;
    fleischfresserButton.onclick = sendCommandFresser;
    explosion.onclick = sendExplosion;
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