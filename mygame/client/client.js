let matrix = [];
let side = 10;

function main() {
    const socket = io();

    console.log("Hello World!");

    function gotMatrix(data) {
        console.log(data);
        matrix = data;
    }

    socket.on('matirx', gotMatrix);
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
            } else {
                fill("yellow");
            }
            rect(side * 10,side * 10,10,10);
        }
    }
}

window.onload = main;