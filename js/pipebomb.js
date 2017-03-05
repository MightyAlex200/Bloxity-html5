class PipeBomb extends Gun {
  constructor(){
    super();
    this.texture = PIXI.loader.resources["res/img/pipebomb.png"].texture;
    this.ammo = 1;
    this.clip = 0;
    this.ammomultiplier = 0;
  }
  shoot(){
    this.ammo--;
    if(this.ammo<=0){
      myPlayer.gunbelt.guns.splice(0,1);
    }
    document.keyboard[32] = false;
    app.stage.addChild(new PipeBombAmmo(PIXI.loader.resources["res/img/pipebomb.png"].texture,myPlayer.x,myPlayer.y));
  }
}
