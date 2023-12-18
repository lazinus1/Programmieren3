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

server.listen(3000, function() {
    console.log("Der Server läuft auf port 3000...");
    // initGame();
    // setInterval(function(){
    //     updateGame();
    // }, 1000);
    io.on('connection', function(socket) {
        console.log('Client Connected');
        clients.push(socket.id);
        // socket.emit('matrix', matrix);

        if(clients.length == 1 && isGameRunning == false) {
            console.log("Starte Spiel...");
            initGame();
            interValID = setInterval(updateGame, 1000);
            isGameRunning = true;
        }

        socket.on('disconnect', function() {
            console.log("client left...");
            const foundIndex = clients.findIndex(id => id === socket.id);
            if(foundIndex >= 0) {
                clients.splice(foundIndex, 1);
            }
            if(clients.length === 0){
                isGameRunning = false;
                clearInterval(interValID);
                console.log("Spiel gestoppt: keine Clients", clients.length);
            }
        })
    });
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

objekteListe = [];

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

    for (let i = 0; i < objekteListe.length; i++) {
        objekteListe[i].platziereSelbstInMatrix();
    }

    // durch Matrix laufen und Lebewesen erstellen
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x] == 1){
                let grassObj = new Gras(x,y);
                objekteListe.push(grassObj);
            }else if(matrix[y][x] == 2){
                let grazerObj = new RasenDestroyer(x,y);
                objekteListe.push(grazerObj);
            }else if(matrix[y][x] == 3){
                let fleischfresserObj = new Fleischfresser(x,y);
                objekteListe.push(fleischfresserObj);
            } 
        }   
    }

    console.log("Sende matrix zu clients");
    io.sockets.emit('matrix', matrix);
}

function updateGame(){
    console.log("update game...");
    // for(let i = 0; i < grassArr.length; i++){
    //     let grassObj = grassArr[i];
    //     grassObj.spielzug();
    // }

    // for(let i = 0; i < grazerArr.length; i++){
    //     let grazerObj = grazerArr[i];
    //     grazerObj.spielzug();

    // }
    for (let i = 0; i < objekteListe.length; i++) {
        objekteListe[i].spielzug();
    }

    io.on('createDestroyer', function() {
        x = Math.floor(Math.random())
    })

    //console.log(matrix);
    io.sockets.emit('matrix', matrix);
}