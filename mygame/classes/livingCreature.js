module.exports = class livingCreature {

    constructor(zeile, spalte) {
        this.zeile = zeile;
        this.spalte = spalte;

        this.umgebung = [
            [this.zeile - 1, this.saplte - 1],
            [this.zeile, this.spalte - 1],
            [this.zeile + 1, this.spalte + 1],
            [this.zeile - 1, this.spalte],
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte + 1],
            [this.zeile, this.spalte + 1],
            [this.zeile + 1, this.spalte +1]
        ]
    }

    istFeld(koordinatenPaar, character) {
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === character
        ) {
            return true;
        }  else {
            return false;
        }
    }
}