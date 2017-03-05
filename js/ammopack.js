class Ammopack extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
  }

  update(stage){
    // If touching player
    if (isIntersecting(myPlayer, this)){
      createjs.Sound.play(3);
      // Increase player ammo
      myPlayer.gunbelt.guns[0].ammo+=Math.max(Math.round((myPlayer.gunbelt.guns[0].ammomultiplier-myPlayer.gunbelt.guns[0].ammo)/2.5),5);
      // delet this
      this.parent.removeChild(this);
    }
  }

}
