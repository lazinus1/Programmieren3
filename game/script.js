let matrix = erstelleMatrix();
let objekteListe = [
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

function setup() {
    createCanvas(500,500);
    background(56, 50, 30);
    noStroke();
    frameRate(10);
    // rasenDestroyer in der Matrix auftauchen lässt.
    for (let i = 0; i < objekteListe.length; i++) {
        objekteListe[i].platziereSelbstInMatrix();
    }
}

function draw() {
    // rasenDestroyer um ein Kästchen bewegen.
    for (let i = 0; i < objekteListe.length; i++) {
        objekteListe[i].spielzug();
    }
    console.log(objekteListe.length);
    zeichneMatrix();
   
}


































