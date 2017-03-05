class Pistol extends Gun {
  constructor(){
    super();
    this.cooldown = 10;
    this.texture = PIXI.loader.resources["res/img/pistol.png"].texture;
  }
}
