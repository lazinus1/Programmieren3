const livingCreature = require("./livingCreature");

module.exports = class Explosion extends livingCreature {

    energie = 5;

    constructor(zeile, spalte) {
        super(zeile, spalte)
    }
    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 4;
    }

    spielzug() {
        if (this.energie > 0) {
            this.energie--;
        } else {
            this.explode();
        }
    }

    berechneUmgebung() {
        this.umgebung = [
            [this.zeile + 2, this.spalte +2], [this.zeile + 2, this.spalte + 1], [this.zeile + 2, this.spalte], [this.zeile + 2, this.spalte - 1], [this.zeile + 2, this.spalte -2],
            [this.zeile + 1, this.spalte +2], [this.zeile + 1, this.spalte + 1], [this.zeile + 1, this.spalte], [this.zeile + 1, this.spalte - 1], [this.zeile + 1, this.spalte -2],
            [this.zeile, this.spalte +2], [this.zeile, this.spalte + 1], [this.zeile, this.spalte], [this.zeile, this.spalte - 1], [this.zeile, this.spalte -2],
            [this.zeile - 1, this.spalte +2], [this.zeile - 1, this.spalte + 1], [this.zeile - 1, this.spalte], [this.zeile - 1, this.spalte - 1], [this.zeile - 1, this.spalte -2],
            [this.zeile - 2, this.spalte +2], [this.zeile - 2, this.spalte + 1], [this.zeile - 2, this.spalte], [this.zeile - 2, this.spalte - 1], [this.zeile - 2, this.spalte -2]
        ]
    }

    explode() {
        this.berechneUmgebung();
        for(let i = 0; i < this.umgebung.length; i++) {
            let [row, col] = this.umgebung[i];
            if(row < 101 && col < 101) {
                matrix[row][col] = 0;
                this.loeschObject(row, col);
            }
        }
    }

    loeschObject(zeile,spalte) {
        let index  = objekteListe.findIndex(function(grasObjekt) {
            if(grasObjekt.zeile === zeile && grasObjekt.spalte === spalte) {
                return true;
            } else {
                return false;
            }
        });
        objekteListe.splice(index,1);
    }

    fruehling() {
        //frühling code
    }

    sommer() {
        //sommer code
    }

    herbst() {
        //herbst code
    }

    winter() {
        //winter code
    }

}