class Enemy extends PIXI.Sprite {

  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
    this.speed = 2;
  }

  update(stage){

    // Move enemy closer to player
    this.x += this.x < myPlayer.x ? 1:this.x > myPlayer.x ? -1:0;
    this.y += this.y < myPlayer.y ? 1:this.y > myPlayer.y ? -1:0;

    // Hurt player on touch
    if(isIntersecting(this,myPlayer)){
      myPlayer.health -= 1;
    }

  }

}
