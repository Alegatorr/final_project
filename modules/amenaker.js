var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Man extends LiveForm {
    constructor(x, y) {
        super(x, y, 5);
        matrix[y][x]=4;
        manArr.push(this);
        ManHashiv++;
        this.CanMul=0;
        this.Sov=0;
        ObjMatrix[y][x]=this;
    }
    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        this.canMul++;
        let OtherMen=this.chooseCell(4);
        if (this.CanMul>=6){
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
            let LovePair = super.GetObj(random(OtherMen)); 
            if (newCell && LovePair) {
                let x = newCell[0];
                let y = newCell[1];
                new Man(x, y);
                LovePair.CanMul=0;
                this.canMul=0;
            }
            else if (Exanak!=1 && newCell){
                let x = newCell[0];
                let y = newCell[1];
                new Man(x, y);
                this.canMul=0;
            }
        }
    }
    eat() {
        let newCell;
        if (Exanak!=2){
            let GrassEaterCells = this.chooseCell(2);
            let MeatEaterCells = this.chooseCell(3);
            newCell = random([random(GrassEaterCells),random(MeatEaterCells)]);
        }
        else{
            let GrassCells = this.chooseCell(1);
            newCell = random(GrassCells);
        }
        this.Sov++;
        if (newCell && this.Sov>=8) {
            this.Sov-=5;
            this.life++;
            super.move(newCell);
        }
        else {
            this.life--;
            if (this.life < 0 || this.Sov>=16) {
                this.die();
                return;
            }
            let emptyCells = this.chooseCell(0);
            newCell = random(emptyCells);

            if (newCell && Exanak!=4) {
                super.move(newCell);
            }
            
        }
    }
    update(){
        this.mul();
        this.eat();
    }
    die() {
        super.die(manArr);
    }
}