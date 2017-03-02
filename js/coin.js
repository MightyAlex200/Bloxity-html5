class Coin extends PIXI.Sprite {
  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
    this.targety = y;
    this.grav = 0.2;
    this.yvel = randomInt(-1,-5);
  }
  update(){
    this.yvel += this.grav;
    if((this.y+this.yvel)>this.targety){
      this.y = this.targety;
      this.yvel = 0;
    }
    this.y+=this.yvel;
  }
}
