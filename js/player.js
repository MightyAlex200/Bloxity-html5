class Player extends PIXI.Sprite {

  constructor(sprite,speed){
      super(sprite);
      this.score = 0;
      this.position.set(240,240);
      this.speed = speed || 1;
      this.direction = 0;
      this.health = 100;
      this.stopped = false;
      this.frames = 0;
      this.ammo = 100;
      this.dead = false;
  }

  update(stage){

    this.frames++;

    if(this.health <= 0 && !this.dead){
      youDied();
      this.dead = true;
      this.stopped = true;
      createjs.Sound.play(2);
      setTimeout(location.reload.bind(location),3000);
    }

    if (this.stopped===false){
      this.x += document.keyboard[39] ? this.speed:document.keyboard[37] ? -this.speed:0;
      this.y += document.keyboard[40] ? this.speed:document.keyboard[38] ? -this.speed:0;
      this.direction =
        document.keyboard[37] ? 0:
        document.keyboard[38] ? 1:
        document.keyboard[39] ? 2:
        document.keyboard[40] ? 3:
        this.direction;
      if(document.keyboard[32]){
        if(this.frames>=10 && this.ammo > 0){
          this.ammo--;
          var b = new Bullet(PIXI.loader.resources["res/img/bullet.png"].texture, this.direction, this.x, this.y);
          this.frames = 0;
          stage.addChild(b);
        }
      }
    }
  }

}
