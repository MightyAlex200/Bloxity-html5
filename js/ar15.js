class AR15 extends Gun {
  constructor(){
    super();
    this.cooldown = 5;
    this.ammo = 500;
    this.clip = 32;
    this.clipsize = 32;
    this.ammomultiplier = 500;
    this.texture = PIXI.loader.resources["res/img/ar15.png"].texture;
  }
}
