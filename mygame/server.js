const Gras = require("./classes/gras.js");
const RasenDestroyer = require("./classes/rasendestroyer.js");
const Fleischfresser = require("./classes/Fleischfresser.js");

const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

server.listen(1889, function () {
    console.log("Der Server läuft auf port 1889...");
    initGame();
    setInterval(function(){
        updateGame();
    }, 1000);
});

function erstelleMatrix() {
    let matrix = [];
    for (let zeile = 0; zeile < 50; zeile++) {
        let z = [];
        for (let spalte = 0; spalte < 50; spalte++) {
            z.push(0);
        };
        matrix.push(z);
    };
    return matrix;
};

matrix = erstelleMatrix();

grassArr = [];
grazerArr = [];
fleischfresserArr = [];

function addMoreCreatures(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if(y == x){
                if(y % 2 == 0) matrix[y][x] = 3;
                else matrix[y][x] =2;
            }
        }
    }
}

function initGame(){
    console.log('init game....');
    matrix = erstelleMatrix();
    addMoreCreatures();

    // durch Matrix laufen und Lebewesen erstellen
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] == 1){
                let grassObj = new Gras(x,y);
                grassArr.push(grassObj);
            }else if(matrix[y][x] == 2){
                let grazerObj = new RasenDestroyer(x,y);
                grazerArr.push(grazerObj);
            }else if(matrix[y][x] == 3){
                let predatorObj = new Fleischfresser(x,y);
                predatorArr.push(predatorObj);
            } 
        }   
    }
}

function updateGame(){
    console.log("update game...");
    for(let i = 0; i < grassArr.length; i++){
        let grassObj = grassArr[i];
        grassObj.mul();
    }

    for(let i = 0; i < grazerArr.length; i++){
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();

    }
    //console.log(matrix);
}