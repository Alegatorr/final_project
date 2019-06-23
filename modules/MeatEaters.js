var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class MeatEater extends LiveForm {
    constructor(x, y) {
        super(x, y, 13);
        matrix[y][x]=3;
        meatEaterArr.push(this);
        MeatEaterHashiv++;
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
        let OtherMeatEaters=this.chooseCell(3);
        if (this.CanMul>=6){
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
            let LovePair = super.GetObj(random(OtherMeatEaters)); 
            if (newCell && LovePair) {
                let x = newCell[0];
                let y = newCell[1];
                new MeatEater(x, y);
                LovePair.CanMul=0;
                this.canMul=0;
            }
            else if (Exanak!=1 &&  newCell){
                let x = newCell[0];
                let y = newCell[1];
                new MeatEater(x, y);
                this.canMul=0;
            }
        }
    }
    eat() {
        let GrassEaterCells = this.chooseCell(2);
        let newCell = random(GrassEaterCells);
        this.Sov++;
        if (Exanak==2)this.Sov++;
        if (newCell && this.Sov>=6) {
            this.Sov-=6;
            if (Exanak==3)this.life+=2;
            this.life++;
            super.move(newCell);
        }
        else {
            if (Exanak==4)this.life--;
            this.life--;
            if (this.life < 0 || this.Sov>=12) {
                this.die();
                return;
            }
            let emptyCells = this.chooseCell(0);
            newCell = random(emptyCells);

            if (newCell) {
                super.move(newCell);
            }
            
        }
    }
    update(){
        this.mul();
        this.eat();
    }
    die() {
        super.die(meatEaterArr);
    }
}