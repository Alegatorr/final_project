//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var MeatEater  = require("./modules/MeatEaters.js");
var Man  = require("./modules/Amenaker.js");
var Zombie  = require("./modules/zombie.js");
let random = require('./modules/random.js');
let random_shuffle = require('./modules/random_shuffle.js');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
meatEaterArr = [];
manArr = [];
zombieArr = [];
matrix = [];
ObjMatrix = [];
Eggs=[];
needToAdd = [];
MeatEaterHashiv=0;
GrassEaterHashiv=0;
GrassHashiv=0;
pause=true;
ZombieHashiv=0;
ManHashiv=0;
change=-1;
Exanak=0;
SIZE=20;
ExCounter=0;
//! Setting global arrays  -- END

//! Creating MATRIX -- START
function matrixGenerator(matrixSize, G, GE, ME, AM, ZM) {
    let shuff=[];
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        ObjMatrix[i]= [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
            shuff[i*matrixSize+o]=[i,o];
        }
    }
    random_shuffle(shuff);
    let sum=0;
    for (let i = sum; i < sum+G; i++) {
        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new Grass(customX,customY);
    }
    sum+=G;
    for (let i = sum; i < sum+GE; i++) {

        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new GrassEater(customX,customY);
    }
    sum+=GE;
    for (let i = sum; i < sum+ME; i++) {

        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new MeatEater(customX,customY);
    }
    sum+=ME;
    for (let i = sum; i < sum+AM; i++) {

        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new Man(customX,customY);
    }
    sum+=AM;
    for (let i = sum; i < sum+ZM; i++) {

        let customX = shuff[i][0];
        let customY = shuff[i][1]; 
        new Zombie(customX,customY);
    }
}
matrixGenerator(SIZE, 30, 60, 10, 60, 10);


//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function addRandomObj(curx,cury){
    let randomValue=random(5)+1;
    if (randomValue==1){
        new Grass(curx,cury);
    }
    else if (randomValue==2){
        new GrassEater(curx,cury);
    }
    else if (randomValue==3){
        new MeatEater(curx,cury);
    }
    else if (randomValue==4){
        new Man(curx,cury);
    }
    else{
        new Zombie(curx,cury);
    }
}

function addHere(curx,cury){
    if (cury<0 || curx<0 || curx>=SIZE || cury>=SIZE)return;
    if (matrix[cury][curx]==0){
        addRandomObj(curx,cury);
    }
    let blankCells=ObjMatrix[cury][curx].chooseCell(0);
    for (i in blankCells){
        addRandomObj(blankCells[i][0],blankCells[i][1]);
    }
}

function WeatherChange(data){
    if (data>=1 && data<=4)change=data;
}
function UserClicked(data){
    let curx=data.x,cury=data.y;
    needToAdd.push([curx,cury]);  
}

function pauseContinue(){
    pause=!pause;
}

io.on("connection",function(socket){
    socket.on("clicked",UserClicked);
    socket.on("weather",WeatherChange);
    socket.on("stop",pauseContinue);
});
function game() {
    if (pause)return;
    ExCounter++;
    ExCounter%=12;
    if (change!=-1){
        ExCounter=3*(change-1);
        change=-1;
    }
    if (ExCounter<3)Exanak=1;
    else if (ExCounter<6)Exanak=2;
    else if (ExCounter<9)Exanak=3;
    else Exanak=4;
    if (Exanak==1){
        for (i in Eggs){
            let curx=Eggs[i][0];
            let cury=Eggs[i][1];
            if (matrix[cury][curx]==1){
                ObjMatrix[cury][curx].die();
                new GrassEater(curx,cury);
            }
            else if (matrix[cury][curx]==0){
                new GrassEater(curx,cury);
            }
        }
        Eggs=[];
    }
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].update();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].update();
        }
    }
    if (meatEaterArr[0] !== undefined) {
        for (var i in meatEaterArr) {
            meatEaterArr[i].update();
        }
    }
    
    if (zombieArr[0] !== undefined) {
        for (var i in zombieArr) {
            zombieArr[i].update();
        }
    }
    if (manArr[0] !== undefined) {
        for (var i in manArr) {
            manArr[i].update();
        }
    }
    for (i in needToAdd){
        addHere(needToAdd[i][0],needToAdd[i][1])
    }
    needToAdd=[];
    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: GrassHashiv,
        grassEaterCounter: GrassEaterHashiv,
        meatEaterCounter: MeatEaterHashiv,
        manCounter: ManHashiv,
        zombieCounter: ZombieHashiv,
        Exan:Exanak
    }
    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000);
