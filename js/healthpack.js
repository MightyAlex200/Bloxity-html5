class Healthpack extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
  }

  update(stage){
    if (isIntersecting(myPlayer, this)){
      myPlayer.health += (100-myPlayer.health)/2;
      this.parent.removeChild(this);
    }
  }

}
