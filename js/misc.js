//
//misc.j その他、共通関数
//

//キーボードが押されたとき
document.addEventListener('keydown',e =>{
    switch(e.code){
        case 'KeyA':keyb.Left = true;
        break;
        case 'ArrowLeft':keyb.Left = true;
        break;
        case 'KeyD':keyb.Right = true;
        break;
        case 'ArrowRight':keyb.Right = true;
        break;
        case 'Space':keyb.shot = true;
        break;
        case 'KeyS':keyb.Start = true;
        break;
        case 'KeyR':keyb.Reset = true;
        break;
    }
});

//キーボードが離されたとき
document.addEventListener('keyup',e =>{
    switch(e.code){
        case 'KeyA':keyb.Left = false;
        break;
        case 'ArrowLeft':keyb.Left = false;
        break;
        case 'KeyD':keyb.Right = false;
        break;
        case 'ArrowRight':keyb.Right = false;
        break;
        case 'Space':keyb.shot = false;
        break;
        case 'keyS':keyb.Start = false;
        break;
        case 'KeyR':keyb.Reset = false;
        break;
    }
});

//星クラス
class Star{
    constructor()
    {
        this.x = random(0,SCREEN_W)<<8;
        this.y = random(0,SCREEN_H)<<8;
        this.sz = 2;
    }

    draw(){
            let x = this.x>>8;
            let y = this.y>>8;
            con.fillStyle ="yellow";
            con.fillRect(x,y,this.sz,this.sz);
        }
}

//キャラクターのベースのクラス
class CharaBase{
    constructor( snum,x,y,vx,vy ){
        this.sn = snum;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.kill = false;        
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x<0 || this.x>SCREEN_W<<8 || this.y<0 || this.y>SCREEN_H<<8)this.kill = true;
    }

    draw(){
        drawSprite( this.sn, this.x, this.y );
    }
}

//スプライト描画
function drawSprite(snum, x, y){
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;

    let px = (x>>8) - sw/2;
    let py = (y>>8) - sh/2;

    con.drawImage(spriteImage, sx,sy,sw,sh,px,py,sw,sh);
}

//乱数生成
function random(min,max){
    return Math.floor(Math.random()*(max-min+1) )+min;
}

//当たり判定
function checkHit( x1,y1,r1, x2,y2,r2){
//円同士の当たり判定
let a =(x2-x1)>>8;
let b =(y2-y1)>>8;
let r =r1+r2;

return r*r >= a*a + b*b ;

}