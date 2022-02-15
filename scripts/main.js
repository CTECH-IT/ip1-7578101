// Put your JavaScript here
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let shipX = canvas.height/2;

let shipWidth = 20;
let shipHeight = 20

let rightPressed = false;
let leftPressed = false;

let shootRadius = 3
let dx = 5;
let n = 0;
let k = shipX;
let spacebar = false;
let ds = 5;
const bullets = [];

function test(){
    ctx.beginPath();
    ctx.arc(100,100,20,0,2*Math.PI);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function drawShoot() {
    bullets.push(shipX + shipWidth/2);
    bullets.push(canvas.height-shipHeight-shootRadius);
    ctx.beginPath();
    ctx.arc(k,n,shootRadius,0,2*Math.PI)
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    n-=ds;
    
}

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
    if (spacebar){
        k = shipX + shipWidth/2;
        n = canvas.height-shipHeight-shootRadius;
    }
    drawShoot();

    if(rightPressed) {
        shipX += 5;
        if (shipX + shipWidth > canvas.width){
            shipX = canvas.width - shipWidth;
        }
    }
    else if(leftPressed) {
        shipX -= 5;
        if (shipX < 0){
            shipX = 0;
        }
    }

    //test();

}



function keyDownHandler(e) {
    if(e.key=="Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key=="ArrowUp" || e.code == "Space") {
        spacebar = true;
    }
}

function keyUpHandler(e) {
    if(e.key=="Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    if(e.key=="ArrowUp" || e.code == "Space") {
        spacebar = false;
    }
}






document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw, 10);