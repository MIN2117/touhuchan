//
//touhutyan.js とうふちゃん関連
//

//大豆クラス
class Daizu extends CharaBase{
    constructor( x,y,vx,vy ){
        super( 1,x,y,vx,vy );
        this.r = 16;
    }

    update(){
        super.update();

        for( let i=0; i<dorodango.length ;i++){
            if(!dorodango[i].kill){

                if(!gameover && checkHit(

                    this.x, this.y, this.r,
                    dorodango[i].x, dorodango[i].y, dorodango[i].r

                )){
                    dorodango[i].kill=true;
                    point += 1;
                    plustime += 1;
                    audio.play();
                }
            }
        }
    }

    draw(){
        super.draw();
    }
}

//とうふちゃんクラス
class Touhuchan{
    constructor(){
        this.x = (SCREEN_W/2)<<8;
        this.y = (SCREEN_H-50)<<8;
        this.speed = 1024;
        this.anime = 0;
        this.reload = 0;
        this.r = 32;
        this.damage = 0;
    }

    update(){
        if(this.damage)this.damage--;

        if(keyb.shot && this.reload==0){
            daizu.push(new Daizu(this.x, this.y, 0,-2000));
            this.reload=60;
        }
        if(this.reload>0)this.reload--;

        if(keyb.Left && this.x>this.speed){
            this.x -= this.speed;
        }
        if(keyb.Right && this.x<(SCREEN_W<<8)){
            this.x += this.speed;
        }
    }

    draw(){
        drawSprite(0, this.x, this.y);
    }
}
