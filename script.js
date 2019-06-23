//! Setup function fires automatically
var socket = io();
var side = 30;
function setup() {

    

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let meatEaterCountElement = document.getElementById('meatEaterCount');
    let manCountElement = document.getElementById('manCount');
    let zombieCountElement = document.getElementById('zombieCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        meatEaterCountElement.innerText = data.meatEaterCounter;
        manCountElement.innerText = data.manCounter;
        zombieCountElement.innerText = data.zombieCounter;
        let curEx=data.Exan;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        let curExText="";
        if (curEx==1)curExText="Գարուն";
        else if (curEx==2)curExText="Ամառ";
        else if (curEx==3)curExText="Աշուն";
        else if (curEx==4)curExText="Ձմեռ";
        document.getElementById("p1").innerHTML = "Եղանակը՝ " + curExText;
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1 && curExText=="Ձմեռ") {
                    fill("white");
                    rect(j * side, i * side, side, side);
                }else if(matrix[i][j]==1){
                    fill("green");
                    rect(j * side, i * side, side, side);
                }else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
    
}

function mousePressed() {
    let curx=Math.floor(mouseX/side),cury=Math.floor(mouseY/side);
    let Cordinates = {
        x:curx,
        y:cury
    }
    socket.emit("clicked",Cordinates);
}

function ChangeWeather(Exanak){
    socket.emit("weather",Exanak);
}
function start_pause(){
    socket.emit("stop",1);
}