class Gun{
  constructor(){
    this.cooldown = 0;
    this.time = 0;
    this.ammo = 100;
    this.clip = 16;
    this.clipsize = 16;
    this.ammomultiplier = 100;
  }
  shoot(player, pent=false){
      if(this.time>=this.cooldown && this.clip > 0){
        // Take 1 off ammo
        this.clip--;
        // Spawn bullet
        let b = new Bullet(PIXI.loader.resources["res/img/bullet.png"].texture, player.direction, player.x, player.y, pent);
        // Reset gun cooldown timer
        this.time = 0;
        // Add bullet to stage
        app.stage.addChild(b);
      }else if(this.clip<=0 && this.time>=this.cooldown){
        this.time = 0;
        createjs.Sound.play(9);
      }
  }
  update(){
    this.time++;
  }
}
