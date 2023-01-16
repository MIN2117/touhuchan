class Dorodango extends CharaBase{ 
    constructor( snum,x,y,vx,vy ){
        super( snum,x,y,vx,vy );
        this.r = 40;
    }

    update(){
        super.update();

        if(!gameover && checkHit(
            this.x, this.y, this.r,
            touhuchan.x, touhuchan.y, touhuchan.r
        )){
            this.kill = true
            gameover = true;
        }

        }

    draw(){
        super.draw();
    }
}
