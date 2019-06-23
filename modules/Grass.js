var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Grass extends LiveForm {
    constructor(x, y) {
        super(x, y, 20);
        this.multiply = 0;
        matrix[y][x]=1;
        grassArr.push(this);
        GrassHashiv++;
        ObjMatrix[y][x]=this;
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    }
    die(){
        super.die(grassArr);
    }
    update() {
        this.life--;
        if (this.life<0){
            this.die();
            return;
        }
        if (Exanak!=4){
            this.multiply++;
            if (Exanak==1 || Exanak==2)this.multiply++;
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
            if (newCell && this.multiply >= 8) {
                let x = newCell[0];
                let y = newCell[1];
                new Grass(x, y);
                this.multiply = 0;
            }
            if (Exanak==1){
                emptyCells = this.chooseCell(0);
                newCell = random(emptyCells);
                if (newCell && this.multiply >= 8) {
                    let x = newCell[0];
                    let y = newCell[1];
                    new Grass(x, y);
                    this.multiply = 0;
                }
            }
        }
    }
}