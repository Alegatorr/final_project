var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class GrassEater extends LiveForm {
    constructor(x, y) {
        super(x, y, 10);
        matrix[y][x]=2;
        grassEaterArr.push(this);
        GrassEaterHashiv++;
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
        let OtherGrassEaters=this.chooseCell(2);
        if (this.CanMul>=3){
            let emptyCells = this.chooseCell(0);
            let newCell = random(emptyCells);
            let LovePair = super.GetObj(random(OtherGrassEaters)); 
            if (newCell && LovePair) {
                let x = newCell[0];
                let y = newCell[1];
                new GrassEater(x, y);
                LovePair.CanMul=0;
                this.canMul=0;
            }
            else if (Exanak!=1 && newCell){
                let x = newCell[0];
                let y = newCell[1];
                new GrassEater(x, y);
                this.canMul=0;
            }
        }
        
    }
    eat() {
        let GrassCells = this.chooseCell(1);
        let newCell = random(GrassCells);
        if (Exanak==4)this.Sov++;
        this.Sov++;
        if (newCell && this.Sov>=5) {
            this.life++;
            this.Sov-=3;
            super.move(newCell);
        }
        else {
            this.life--;
            if (this.life < 0 || this.Sov>=10) {
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
        if ((Exanak==2  || Exanak==3) && random(4)==1)Eggs.push([this.x,this.y]);
        super.die(grassEaterArr);
    }
}