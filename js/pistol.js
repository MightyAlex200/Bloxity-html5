class Pistol extends Gun {
  constructor(){
    super();
    this.cooldown = 10;
  }
  shoot(player){
      if(this.time>=this.cooldown && this.ammo > 0){
        // Take 1 off ammo
        this.ammo--;
        // Spawn bullet
        var b = new Bullet(PIXI.loader.resources["res/img/bullet.png"].texture, player.direction, player.x, player.y, false);
        // Reset gun cooldown timer
        this.time = 0;
        // Add bullet to stage
        app.stage.addChild(b);
      }
  }
}
