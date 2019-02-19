(function(){
"use strict";

const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");
const point=document.querySelector(".point");
let me=0;
let you=0;
canvas.width=1000;
canvas.height=500;

const cw=canvas.width;
const ch=canvas.height;
const ballSize=20;

let ballX=cw/2-ballSize/2;
let ballY=ch/2-ballSize/2;

const paddleHeight=100;
const paddleWidth=20;

const playerX=70;
const aiX=910;

let playerY=200;
let aiY=200;

const lineWidth=4;
const lineHeight=16;

let ballSpeedX=10;
let ballSpeedY=10;

 const audio = new Audio('ball.mp3');
 const win = new Audio('win.mp3');
 const lose = new Audio('lose.mp3');


function myStopFunction() {
    clearInterval(refreshIntervalId);
    start();
  }

function table(){
    ctx.fillStyle="#000"; //kolor canvasu
    ctx.fillRect(0,0,cw,ch);

    for(let linePosition=20;linePosition<ch;linePosition+=30){
        ctx.fillStyle='gray'; //kolor canvasu
        ctx.fillRect(cw/2-lineWidth/2,linePosition,lineWidth,lineHeight);
    }
}

function resetBall(){
        ballX=cw/2-ballSize/2;
        ballY=ch/2-ballSize/2; 
}
function ball(){
    ctx.beginPath();
    ctx.arc(ballX+ballSize/2, ballY+ballSize/2, ballSize/2, 0, Math.PI*2, true);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    ballX+=ballSpeedX;
    ballY+=ballSpeedY;

    if(ballY<=0 || ballY+ballSize>=ch) {
        ballSpeedY=-ballSpeedY;
    }
    if(ballX<=0 || ballX+ballSize>=cw) {
        ballSpeedX=-ballSpeedX;
    }

    if(ballX+ballSize==1000){
        me++;
        win.play();
        resetBall();
        myStopFunction();
    }
    if(ballX==0){
        you++;
        lose.play();
        resetBall();
        myStopFunction();
    }

    if (ballX - paddleWidth == playerX && ballY >= playerY - ballSize && ballY <= playerY + paddleHeight){
        ballSpeedX = -ballSpeedX;
        audio.play();
       }

       
    if (ballX + ballSize == aiX && ballY <= aiY + paddleHeight && ballY >= aiY - ballSize){
        ballSpeedX = -ballSpeedX;
        audio.play();
       }
}

function player(){
    var grd1 = ctx.createLinearGradient(50, 0, 90, 0);
    grd1.addColorStop(0, "transparent");
    grd1.addColorStop(1, "green");
    ctx.fillStyle=grd1; //kolor canvasu
    ctx.fillRect(playerX, playerY, paddleWidth,paddleHeight);
}

function ai(){
    var grd2 = ctx.createLinearGradient(910, 0, 950, 0);
    grd2.addColorStop(0, "red");
    grd2.addColorStop(1, "transparent");
    ctx.fillStyle=grd2; //kolor canvasu
    ctx.fillRect(aiX, aiY, paddleWidth,paddleHeight);
}

let topCanvas=canvas.offsetTop;

function playerPosition(e){
    playerY=e.clientY-topCanvas-paddleHeight/2;

    if(playerY>=ch-paddleHeight){
        playerY=ch-paddleHeight;
    }
    if(playerY<=0){
        playerY=0;
    }
}

// function speedUp(){
//     if(ballSpeedX>0 && ballSpeedX<10){
//         ballSpeedX+=1;
//     }
//     else if(ballSpeedX<0 && ballSpeedX>10){
//         ballSpeedX-=1;
//     }
//     if(ballSpeedY>0 && ballSpeedY<10){
//         ballSpeedY+=0.5;
//     }
//     else if(ballSpeedY<0 && ballSpeedY>10){
//         ballSpeedY-=0.5;
//     }
//     ballSpeedX=Math.round(ballSpeedX);
//     ballSpeedY=Math.round(ballSpeedY);
    
// }

function aiPosition(){
    let middlePaddle=aiY+paddleHeight/2;
    let middleBall=ballY+ballSize/2;

    if(ballX>620){
        if(middlePaddle-middleBall>200){
            aiY-=15;
        }
        else if(middlePaddle-middleBall>50){
            aiY-=10;
        }
        else if(middlePaddle-middleBall<-200){
            aiY+=15;
        }
        else if(middlePaddle-middleBall<-50){
            aiY+=10;
        }
    }
    else if(ballX>150 && ballX<=620){
        if(middlePaddle-middleBall>100){
            aiY-=3;
        }
        else if(middlePaddle-middleBall<-100){
            aiY+=3;
        }
    }
}

canvas.addEventListener("mousemove", playerPosition);

function game(){
    table();
    ball();
    player();
    ai();
    aiPosition();
    point.innerHTML=me+" : "+you;
}
const counting=document.querySelector(".counting");
const text=document.querySelector(".text");
const pause=document.querySelector(".pause");
const reset=document.querySelector(".reset");


text.innerHTML="3";
setTimeout(function(){text.innerHTML="2"},1000);
setTimeout(function(){text.innerHTML="1"},2000);
setTimeout(start,3000);


var refreshIntervalId;
 function start(){
    counting.style.display="none";
    setTimeout(function(){
        refreshIntervalId=setInterval(game,1000/50);
    },1000);
 }

 pause.addEventListener("click", function(){
     if(pause.innerHTML === "PAUSE"){
        clearInterval(refreshIntervalId);
        pause.innerHTML="START";
     }
    else{
        start();
        pause.innerHTML="PAUSE";
    }
 });

 reset.addEventListener("click", function(){
    location.reload();
});
//dorobic mozliwosc strzałkami, wynik, ranking

})();