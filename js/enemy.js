class Enemy extends PIXI.Sprite {

  constructor(sprite,x,y,health){
    super(sprite);
    this.position.set(x,y);
    this.speed = 2;
    this.maxhealth = health || 2;
    this.health = this.maxhealth;
    this.healthbar = new PIXI.Graphics();
    this.healthbar.beginFill(0xff0000);
    this.healthbarL = this.width;
    this.addChild(this.healthbar);
    this.target = myPlayer;
  }

  update(stage){

    this.target = myPlayer;

    for(let childn in app.stage.children){
      let child = app.stage.children[childn];
      if(child instanceof PipeBombAmmo){
        this.target = child;
      }
    }

    // Move enemy closer to player
    this.x += this.x < this.target.x ? 1:this.x > this.target.x ? -1:0;
    this.y += this.y < this.target.y ? 1:this.y > this.target.y ? -1:0;

    // Hurt player on touch
    if(isIntersecting(this,myPlayer)){
      myPlayer.health -= 1;
    }

    this.healthbar.clear();
    if(this.health<this.maxhealth){
      this.healthbarL += this.healthbarL>Math.round((this.health/this.maxhealth)*this.width) ? -1:this.healthbarL<Math.round((this.health/this.maxhealth)*this.width) ? 1:0;
      this.healthbar.drawRect(0,-16,this.healthbarL,8);
    }

  }

  hurt(amount,packdrop){
    createjs.Sound.play(7);
    this.health-=amount;
    if(this.health<=0){
      this.kill(packdrop);
    }
  }

  kill(packdrop){
    // Play enemy death sound
    createjs.Sound.play(1);
    // 1/10 chance of dropping ammo unless player has no ammo left
    if((randomInt(0,10)===0 || myPlayer.gunbelt.guns[0].ammo <= 0) && packdrop){
      // Create new ammopack and place it in a random part of the stage
      app.stage.addChild(new Ammopack(PIXI.loader.resources["res/img/ammopack.png"].texture, this.x, this.y));
    }else{
      app.stage.addChild(new Coin(PIXI.loader.resources["res/img/coin.png"].texture,this.x,this.y));
    }
    // delet this
    app.stage.removeChild(this);
  }

}
