class Revolver extends Gun {
  constructor(){
    super();
    this.cooldown = 60;
    this.texture = PIXI.loader.resources["res/img/revolver.png"].texture;
    this.ammo = 25;
    this.clip = 6;
    this.clipsize = 6;
    this.ammomultiplier = 25;
  }
  shoot(player){
      if(this.time>=this.cooldown && this.clip > 0){
        // Take 1 off ammo
        this.clip--;
        // Spawn bullet
        let b = new Bullet(PIXI.loader.resources["res/img/bullet.png"].texture, player.direction, player.x, player.y, true);
        // Reset gun cooldown timer
        this.time = 0;
        // Add bullet to stage
        app.stage.addChild(b);
      }
  }
}
