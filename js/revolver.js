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
    super.shoot(player, true);
  }
}
