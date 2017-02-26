class Enemy extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
    this.speed = 2;
  }

  update(stage){
    var p;
    // find player
    for (n in stage.children){
      if (stage.children[n] instanceof Player){
        p = stage.children[n];
      }
    }

    this.x += this.x < p.x ? 1:this.x > p.x ? -1:0
    this.y += this.y < p.y ? 1:this.y > p.y ? -1:0

    if(isIntersecting(this,p)){
      p.health -= 1;
    }

  }

}
