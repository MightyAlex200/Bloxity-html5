class Ammopack extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
  }

  update(stage){
    if (isIntersecting(myPlayer, this)){
      myPlayer.ammo+=5;
      this.parent.removeChild(this);
    }
  }

}
