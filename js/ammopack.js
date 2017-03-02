class Ammopack extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
  }

  update(stage){
    // If touching player
    if (isIntersecting(myPlayer, this)){
      // Increase player ammo
      myPlayer.gun.ammo=myPlayer.gun.ammo+Math.max(Math.round((100-myPlayer.gun.ammo)/2.5),5);
      // delet this
      this.parent.removeChild(this);
    }
  }

}
