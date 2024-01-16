const livingCreature = require("./livingCreature.js");
module.exports = class Gras extends livingCreature{
    // zeile;
    // spalte;
    energie = 0;

    constructor(zeile, spalte) {
        super(zeile, spalte);
        // this.zeile = z;
        // this.spalte = s;
    };
    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 1;
    };

    spielzug() {
        if (this.energie > 4) {
            this.energie = 0;
            // this.pflanzNeuesObjekt(1, this.istErde);
            this.pflanzNeuesGrasObjekt();
            // mach etwas
        } else {
            // schlaf
            this.energie++;
        }
    };

    pflanzNeuesGrasObjekt() {
        let erdeFelder = this.erstelleErdefelderTabelle(); 
        if (erdeFelder.length > 0) {
            let gewähltesFeld = erdeFelder[0];
            let neuesGrasObjekt = new Gras(gewähltesFeld[0],gewähltesFeld[1]);
            neuesGrasObjekt.platziereSelbstInMatrix(1);
            objekteListe.push(neuesGrasObjekt);
        }
    };
    berechneUmgebung() {
        this.umgebung = [
            [this.zeile - 1, this.spalte - 1],
            [this.zeile, this.spalte - 1],
            [this.zeile + 1, this.spalte + 1],
            [this.zeile - 1, this.spalte],
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte + 1],
            [this.zeile, this.spalte + 1],
            [this.zeile + 1, this.spalte +1]
        ];
    }
    erstelleErdefelderTabelle() {
        this.berechneUmgebung();
        return this.umgebung.filter((koordinatenpaar) => this.istFeld(koordinatenpaar, 0));
    }

    // erstelleErdefelderTabelle() {
    //     let benachbarteFelder = [
    //         [this.zeile+1,this.spalte],
    //         [this.zeile-1,this.spalte],
    //         [this.zeile,this.spalte+1],
    //         [this.zeile,this.spalte-1],
    //     ]
    //     return benachbarteFelder.filter(this.istErde);
    // };
    // istErde(koordinatenPaar) {
    //     let zeile = koordinatenPaar[0];
    //     let spalte = koordinatenPaar[1];
    //     if (zeile >= 0
    //         && spalte >= 0
    //         && zeile < matrix.length
    //         && spalte < matrix.length
    //         && matrix[zeile][spalte] === 0
    //     ) {
    //         return true;
    //     }  else {
    //         return false;
    //     }
    // };
}