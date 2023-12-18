const Gras = require("./classes/gras.js");
const RasenDestroyer = require("./classes/rasendestroyer.js");
const Fleischfresser = require("./classes/Fleischfresser.js");


const express = require("express");
const app = express();

let server = require('http').Server(app);
let io = require('socket.io')(server);

let clients = [];
let isGameRunning = false;
let interValID;

app.use(express.static('./client'));

app.get('/', function(req, res){
    res.redirect('index.html')
})

server.listen(3000, function () {
    console.log("Der Server läuft auf port 3000...");
    initGame();
    setInterval(function(){
        updateGame();
    }, 1000);
});

io.on('connection', function(socket) {
    console.log('Client Connected');
    socket.emit('matrix', matrix);
});

function erstelleMatrix(cols, rows) {
    let matrix = [];
    for(let y = 0; y <= rows; y++){
        matrix.push([]);
        for(let x = 0; x <= cols; x++){
            matrix[y][x] = Math.floor(Math.random() * 2);
        }
    }
    return matrix;
};

matrix = [
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 1, 0, 3, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]
];

grassArr = [];
grazerArr = [];
fleischfresserArr = [];

objekteListe = [
    new RasenDestroyer(10,10),
    new Gras(11,10),
    new Gras(12,10),
    new Gras(13,10),
    new Gras(9,10),
    new Gras(8,10),
    new Gras(7,10),
    new Gras(10,11),
    new Gras(10,12),
    new Gras(10,13),
    new Gras(10,9),
    new Gras(10,8),
    new Gras(10,7),
    new Fleischfresser(10,8)
];

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
    matrix = erstelleMatrix(50, 50);
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
                let fleischfresserObj = new Fleischfresser(x,y);
                fleischfresserArr.push(fleischfresserObj);
            } 
        }   
    }

    console.log("Sende matrix zu clients");
    io.sockets.emit('matrix', matrix);
}

function updateGame(){
    console.log("update game...");
    for(let i = 0; i < grassArr.length; i++){
        let grassObj = grassArr[i];
        grassObj.spielzug();
    }

    for(let i = 0; i < grazerArr.length; i++){
        let grazerObj = grazerArr[i];
        grazerObj.spielzug();

    }
    //console.log(matrix);
    io.sockets.emit('matrix', matrix);
}