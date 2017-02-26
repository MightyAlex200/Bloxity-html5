class Healthpack extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
  }

  update(stage){
    if (isIntersecting(myPlayer, this)){
      myPlayer.health = Math.min(myPlayer.health+10,100);
      this.parent.removeChild(this);
    }
  }

}
