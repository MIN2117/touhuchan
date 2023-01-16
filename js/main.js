var audio = new Audio("music/shot.wav");
var BGM = new Audio("music/bgm.mp3");
BGM.volume = 0.5;
BGM.loop = true;

const GAME_SPEED = 1000/60;

const SCREEN_W = 800;
const SCREEN_H = 600;

const STAR_MAX = 200;

let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = SCREEN_W;
can.height = SCREEN_H;
con.font = "40px'Impact'";

//let
let point = 0 ;
let timer = 30;
let time  = 0;
let timeUp = false;
let plustime = 0;
let gameplay = false;
let gameover = false;
let gamestart = false;


function gameStart(){
    for(let i=0;i<STAR_MAX;i++)star[i]=new Star();
    setInterval(gameLoop,GAME_SPEED);
    gameplay = true;
    gameover = true;
    gamestart = true;
}



function start(){
    if(gamestart){
        gameover = false;
        gameplay = false;
        gamestart = false;
        BGM.play();
    }
}

let star = [];

let keyb = {};

let dorodango = []
let daizu = [];
let touhuchan = new Touhuchan();
daizu[0] = new Daizu( 6, 200<<8,200<<8, 0,0);

let spriteImage = new Image();
spriteImage.src = "png/touhuchan.png";


function updateObj (obj ){
    for(let i=obj.length-1;i>=0;i--){
        obj[i].update();
        if(obj[i].kill)obj.splice(i,1);
    }
}

function drawObj( obj ){
    for(let i=0;i<obj.length;i++)obj[i].draw();
}

function updateAll(){
    updateObj(daizu);
    updateObj(dorodango);
    touhuchan.update();
}

function drawAll(){
    con.fillStyle ="black";
    con.fillRect(0,0,SCREEN_W,SCREEN_H);
    drawObj(star);
    if(!gameover)drawObj(daizu);
    if(!gameover)touhuchan.draw();
    drawObj(dorodango);

    con.drawImage(can,0,0,SCREEN_W,SCREEN_H,0,0,SCREEN_W,SCREEN_H);
}

function putInfo(){
    con.fillStyle = "white";

    if(gameover){
        if(timeUp){
            let s = "Time Up!"
            let w = con.measureText(s).width;
            let x = SCREEN_W/2 - w/2;
            let y = SCREEN_H/2 - 20;
            con.fillText(s,x,y);
        }else if(gameplay){
            let s = "Click S"
            let w = con.measureText(s).width;
            let x = SCREEN_W/2 - w/2;
            let y = SCREEN_H/2 - 20;
            con.fillText(s,x,y);
        }else{
            let s = "Oh No!"
            let w = con.measureText(s).width;
            let x = SCREEN_W/2 - w/2;
            let y = SCREEN_H/2 - 20;
            con.fillText(s,x,y);
        }
    }

    con.fillText("Point :"+point, 10,40);
    con.fillText("Time  :"+timer, 200,40);
}

function Settimer(){
    if(!gameover)time += 1;
    if(time >= 30 && timer > 0){timer -= 1;time -= 30;}
    if(plustime >= 1 && timer > 0){timer += 1;plustime -= 1;}
    if(!gameover && timer <= 0){timeUp = true; gameover = true;}
}

function gameLoop(){
    if(!gameover && dorodango.length < 6)
    dorodango.push( new Dorodango(2,random(40,SCREEN_W-40)<<8,0, 0, 600));

    updateAll();
    drawAll();
    putInfo();
    Settimer();

    if(gameover && keyb.Start){
        start();
        keyb.Start = false;
    }

    if(gameover)BGM.currentTime = 0;
}

window.onload=function(){
    gameStart();
}



