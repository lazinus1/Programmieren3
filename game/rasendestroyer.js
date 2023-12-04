 
class RasenDestroyer extends livingCreature{
    energie = 15;
    constructor(zeile, spalte) {
        super(zeile, spalte)
    }
    spielzug() {
        if(this.energie > 30) {
            this.energie = 15;
            this.pflanzNeuesGrasfresserObject();
        } else if (this.energie > 0) {
            let grasFelder = this.erstelleGrasfelderTabelle();
            if(grasFelder.length > 0) {
                this.energie++;
            } else {
                this.energie--;
            }
        } else {
            matrix[this.zeile][this.spalte] = 0;
            this.loeschObject(this.zeile,this.spalte);
        }
        this.machSchrittNachVorne();
    }

    pflanzNeuesGrasfresserObject() {
        let grasFelder = this.erstelleGrasfelderTabelle();
        if (grasFelder.length > 0) {
            let gewähltesFeld = grasFelder[0];
            this.loeschObject(gewähltesFeld[0],gewähltesFeld[1]);
            let neuesGrasfresserObjekt = new RasenDestroyer(gewähltesFeld[0],gewähltesFeld[1]);
            neuesGrasfresserObjekt.platziereSelbstInMatrix();
            objekteListe.push(neuesGrasfresserObjekt);
        }
    }

    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 2;
    }
    machSchrittNachVorne() {
        let grasFelder = this.erstelleGrasfelderTabelle();
        if (grasFelder.length > 0) {
            let ausgesuchtesFeld = Math.floor(Math.random() * grasFelder.length)
            let gewähltesFeld = grasFelder[ausgesuchtesFeld];
            matrix[this.zeile][this.spalte] = 0;
            //console.log(gewähltesFeld.toString(),this.zeile,this.spalte)
            this.loeschObject(gewähltesFeld[0],gewähltesFeld[1]);
            this.zeile = gewähltesFeld[0];
            this.spalte = gewähltesFeld[1];
            matrix[this.zeile][this.spalte] = 2;
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
    berechneUmgebung() {
        this.umgebung = [
            [this.zeile - 1, this.y - 1],
            [this.zeile, this.spalte - 1],
            [this.zeile + 1, this.spalte + 1],
            [this.zeile - 1, this.spalte],
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte + 1],
            [this.zeile, this.spalte + 1],
            [this.zeile + 1, this.spalte +1]
        ];
    }
    erstelleGrasfelderTabelle() {
        this.berechneUmgebung();
        return this.umgebung.filter((koordinatenpaar) => this.istFeld(koordinatenpaar, 1));
    }
    // erstelleGrasfelderTabelle() {
    //     let benachbarteFelder = [
    //         [this.zeile+1,this.spalte],
    //         [this.zeile-1,this.spalte],
    //         [this.zeile,this.spalte+1],
    //         [this.zeile,this.spalte-1],
    //     ]
    //     return benachbarteFelder.filter(this.istGras);
    // }
    // istGras(koordinatenPaar) {
    //     let zeile = koordinatenPaar[0];
    //     let spalte = koordinatenPaar[1];
    //     if (zeile >= 0
    //         && spalte >= 0
    //         && zeile < matrix.length
    //         && spalte < matrix.length
    //         && matrix[zeile][spalte] === 1
    //     ) {
    //         return true;
    //     }  else {
    //         return false;
    //     }
    // }
}