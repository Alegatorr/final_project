module.exports = class LiveForm {
    constructor(x, y,life) {
        this.life=life;
        this.x = x;
        this.y = y;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    GetObject(Cell){
        if (!Cell)return null;
        let x=Cell[0];
        let y=Cell[1];
        return ObjMatrix[y][x];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    die(arr){
        matrix[this.y][this.x] = 0;
        for (let i in arr) {
            if (arr[i].x == this.x && arr[i].y == this.y) {
                arr.splice(i, 1);
            }
        }
    }
    move(Cell){
        let x=Cell[0];
        let y=Cell[1];
        if (ObjMatrix[y][x]){
            ObjMatrix[y][x].die();
        }
        ObjMatrix[y][x]=this;
        ObjMatrix[this.y][this.x]=null;
        matrix[y][x]=matrix[this.y][this.x];
        matrix[this.y][this.x]=0;
        this.x=x;
        this.y=y;
    }
    chooseCell(t) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}
