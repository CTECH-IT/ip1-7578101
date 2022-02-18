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
let ds = 6;
const bullets = [];
const enemy1 = [];
const hpIncrease = [0, 0, 0];
let numenemy1 = 0;
let numBullets = 0
let x=0;
let y=0;
let h = 0;
let down = false;
let h2 = 0;
let enemy1Height = 30;
let enemy1Width = 30;
let dEnemy1 = 2
let r=0;
let space = 0;
let score = 0;
let hp = 3;
let hplangth = 20;


function randomInt(max) {
    r = Math.floor(Math.random() * max);
  }

  function randomNum(max) {
    r = Math.random() * max;
  }  


function newShoot() {
    if (spacebar==true && h==0){//makes new bullet
        bullets.push(shipX + shipWidth/2);
        bullets.push(canvas.height-shipHeight-shootRadius);
        numBullets+=1;
        h=1
    }
    if (h==1){
        if (spacebar==false){
        
            
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
    for (let i = 0; i <= numenemy1*3; i+=3){
        x=enemy1[i];
        y=enemy1[i+1];
        z=enemy1[i+2];
        if (y < canvas.height && z>0){

        
            ctx.beginPath();
            ctx.rect(x,y,enemy1Width,enemy1Height);
            if (z==3){
              ctx.fillStyle = "#3EF51D";
            }
            if (z==2){
              ctx.fillStyle = "#F5E81D";
            }
            if (z==1){
              ctx.fillStyle = "#F22316";
            }
            ctx.fill();
            ctx.closePath();
            y+=dEnemy1;
            enemy1[i+1]=y;
            if (y >= canvas.height){
                hp--;
                if (hp==0){//end game
                    alert("Game Over");
                    document.location.reload();
                    clearInterval(interval);
                }
            }
        }
    }
}

function newEnemy1(){//makes new enemy1
    if ((down && h2==0)){
        randomNum(canvas.width - enemy1Width);
        enemy1.push(r);
        enemy1.push(0);
        enemy1.push(3);
        numenemy1+=1;
        h2=1
    }
    if (h2==1){
        if (down==false){          
            h2=0
        }
    }
    if (score<19000){
        randomInt(200 - score/100);
    } else if (score>=19000){
        randomInt(10);
    }
    if (r==1 && space<=0){
        randomNum(canvas.width - enemy1Width);
        enemy1.push(r);
        enemy1.push(0);
        enemy1.push(3);
        numenemy1+=1;
        if (score<10000){
            space=200 - score/100;
        } else if(score>=10000){
            space=100;
        }
        
        
    }

}

function newHp(){
    
    randomInt(200);
    
    if (r==1 && spaceHp==1){
        randomNum(canvas.width - hplangth);
        hpIncrease[0]=r;
        randomNum(canvas.height - hplangth - 2*shipHeight);
        hpIncrease[1]=r;
        hpIncrease[2]=1;
        
        
        spaceHp=0;
        
}

function drawHp(){
    if (hpIncrease[2]==1){
        ctx.beginPath();
        ctx.rect(shipX, canvas.height-shipHeight, shipWidth, shipHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

function enemy1Collision(){
    for (let i = 0; i <= numenemy1*3; i+=3){
        x=enemy1[i];
        y=enemy1[i+1];
        z=enemy1[i+2];
        
        if (y < canvas.height && z>0){
            for (let l = 0; l <= numBullets*2; l+=2){
                n=bullets[l+1];
                k=bullets[l];
                if (n > 0){
                    if ((y<n+shootRadius && y+enemy1Height>n-shootRadius) && (x<k+shootRadius && x+enemy1Width>k-shootRadius) ){
                        bullets[l+1]=0;
                        enemy1[i+2]-=1;
                        if (enemy1[i+2]==0){
                            score+=100;
                            dEnemy1+=0.05
                        }
                    }

                    
                }
            }
        
            
        }
    }
}


function enemySpaceing(){
    if (space >0){
        space--;
    }
    
}

function drawScore(){
    ctx.font = "16px Arial"
    ctx.fillStyle = "#0095DD"
    ctx.fillText("Score: " + score, 8, 20)
}

function drawHp(){
    ctx.font = "16px Arial"
    ctx.fillStyle = "#0095DD"
    ctx.fillText("HP: " + hp, canvas.width-55, 20)
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
    enemySpaceing();
    newShoot();
    drawShoot();
    newEnemy1();
    drawEnemy();
    enemy1Collision();
    drawScore();
    drawHp();
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
    if(e.key=="t") {
        down = true;
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
    if(e.key=="t") {
        down = false;
    }
}






document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let interval = setInterval(draw, 10);
