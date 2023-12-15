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
}



function zeichneMatrix() {
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
            rect(spalte * 10,zeile * 10,10,10);
        }
    }
}