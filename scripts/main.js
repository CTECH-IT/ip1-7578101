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
let ds = 3.5;
const bullets = [];
const enemys = [];
let numBullets = 0
let x=0;
let y=0;
let h = 0;



function test(){
    ctx.beginPath();
    ctx.arc(100,100,20,0,2*Math.PI);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function newShoot() {
    if (spacebar==true){//makes new bullet
        h=1
    }
    if (h==1){
        if (spacebar==false){
        
            bullets.push(shipX + shipWidth/2);
            bullets.push(canvas.height-shipHeight-shootRadius);
            numBullets+=1;
            h=0
        }
    }
}

function drawShoot() {//updates existing bullets
    for (let i = 0; i <= numBullets*2; i+=2){
        n=bullets[i+1];
        k=bullets[i];
        if (n > 0){

        
            ctx.beginPath();
            ctx.arc(k,n,shootRadius,0,2*Math.PI)
            ctx.fillStyle = "#EC1818";
            ctx.fill();
            ctx.closePath();
            n-=ds;
            bullets[i+1]=n;
        }
    }

    
}

function drawEnemy(){

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
    
    newShoot();
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