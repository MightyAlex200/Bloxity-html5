class Bullet extends PIXI.Sprite {

  constructor(sprite,direction,x,y){
    super(sprite);
    this.direction = direction;
    this.position.set(x,y);
    this.speed = 10;
  }

  update(stage){

    if(this.x > 512 || this.x < 0 || this.y < 0 || this.y > 512){
      stage.removeChild(this);
    }

    switch(this.direction){
      case 0:
        this.x -= this.speed;
        break;
      case 1:
        this.y -= this.speed;
        break;
      case 2:
        this.x += this.speed;
        break;
      case 3:
        this.y += this.speed;
        break;
    }

    for (n in stage.children){
      if (stage.children[n] instanceof Enemy){
        if(isIntersecting(stage.children[n],this)){
          createjs.Sound.play(1);
          myPlayer.score++;
          if(n%3==0)
            app.stage.addChild(new Ammopack(PIXI.loader.resources["res/img/ammopack.png"].texture, stage.children[n].x, stage.children[n].y));
          app.stage.removeChild(stage.children[n]);
          app.stage.removeChild(this);
        }
      }
    }

  }

}
