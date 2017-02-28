class Healthpack extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
  }

  update(stage){
    // If touching player
    if (isIntersecting(myPlayer, this)){
      // Increase health
      myPlayer.health = Math.round(myPlayer.health + (100-myPlayer.health)/2);
      // delet this
      this.parent.removeChild(this);
    }
  }

}
