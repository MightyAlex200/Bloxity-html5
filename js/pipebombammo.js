class PipeBombAmmo extends PIXI.Sprite{
  constructor(sprite,x,y){
    super(sprite);
    this.position.set(x,y);
    this.scale.set(0.5,0.5);
    this.timer = 180;
  }
  update(){
    this.timer--;
    if(this.timer<=0){
      var temp = app.stage.children.filter((c)=>{return c instanceof Enemy;});
      for(var childn in temp){
        var child = temp[childn];
        if(Math.sqrt(((Math.abs(child.x-this.x))^2) + ((Math.abs(child.y-this.y))^2))<=10){
          child.kill();
        }
      }
      var explosion = app.stage.addChild(new PIXI.Sprite(PIXI.loader.resources["res/img/explosion.png"].texture));
      explosion.position.set(this.x-explosion.width/2,this.y-explosion.height/2);
      setTimeout(() => {
        explosion.parent.removeChild(explosion);
      }, 500);
      this.parent.removeChild(this);
    }
  }
}
