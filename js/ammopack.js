class Ammopack extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
  }

  update(stage){
    if (isIntersecting(myPlayer, this)){
      myPlayer.ammo=myPlayer.ammo+Math.max(Math.round((100-myPlayer.ammo)/2.5),5);
      this.parent.removeChild(this);
    }
  }

}
