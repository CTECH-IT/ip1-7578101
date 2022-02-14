// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let shipX = canvas.height/2;

let shipWidth = 20;
let shipHeight = 20

let rightPressed = false;
let leftPressed = false;






function drawShip(){//draws the ship
    ctx.beginPath();
    ctx.rect(shipX, canvas.height-shipHeight, shipWidth, shipHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShip();
}



if(rightPressed) {
    shipX += 0;
    if (shipX + shipWidth > canvas.width){
        shipX = canvas.width - shipWidth;
    }
}
else if(leftPressed) {
    shipX -= 0;
    if (shipX < 0){
        shipX = 0;
    }
}

function keyDownHandler(e) {
    if(e.key=="Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key=="Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}






document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw, 10);