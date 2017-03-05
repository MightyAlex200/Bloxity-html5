class Gunbelt extends PIXI.Container{
  constructor(){
    super();
    this.guns = [];
    this.sprites = [];
    this.labels = [];
    this.ammolabels = [];
  }
  update(){
    // 49-57
    for(let keyCodeNumber = 49; keyCodeNumber < 57; keyCodeNumber++){
      let wasPressed = document.keyboard.wasPressed(keyCodeNumber);
      if(wasPressed && this.guns[keyCodeNumber-49] instanceof Gun){
        [this.guns[0], this.guns[keyCodeNumber-49]] = [this.guns[keyCodeNumber-49], this.guns[0]];
      }
    }

    for(let childn in this.guns){
      let child = this.guns[childn];
      if(child.update){
        child.update();
      }
    }

    for(let gunn=0; gunn<9; gunn++){
      if(!this.labels[gunn]){
        this.labels[gunn] = new PIXI.Text(gunn+1);
        this.labels[gunn].position.set(gunn*100,448-this.labels[gunn].height);
        this.labels[gunn].visible = false;
        app.stage.addChild(this.labels[gunn]);
      }
      if(!this.ammolabels[gunn]){
        this.ammolabels[gunn] = new PIXI.Text();
        this.ammolabels[gunn].position.set(gunn*100+32,512-this.ammolabels[gunn].height);
        app.stage.addChild(this.ammolabels[gunn]);
      }
      if(this.guns[gunn] !== undefined){
        this.labels[gunn].visible = true;
        this.ammolabels[gunn].visible = true;
        this.ammolabels[gunn].parent.addChild(this.ammolabels[gunn]);
        this.ammolabels[gunn].text = this.guns[gunn].ammo;
        if (!this.sprites[gunn]) {
          this.sprites[gunn] = new PIXI.Sprite(this.guns[gunn].texture);
          this.sprites[gunn].position.set(gunn*100,448);
          app.stage.addChild(this.sprites[gunn]);
        }else{
          this.sprites[gunn].texture = this.guns[gunn].texture;
        }
      }else{
        this.labels[gunn].visible = false;
        this.ammolabels[gunn].visible = false;
        app.stage.removeChild(this.sprites[gunn]);
        this.sprites.splice(gunn,1);
      }
    }

  }
}
