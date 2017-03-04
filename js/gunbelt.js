class Gunbelt extends PIXI.Container{
  constructor(){
    super();
    this.guns = [];
    this.sprites = [];
    this.labels = [];
  }
  update(){
    // 49-57
    for(var keyCodeNumber = 49; keyCodeNumber < 57; keyCodeNumber++){
      var wasPressed = document.keyboard.wasPressed(keyCodeNumber);
      if(wasPressed && this.guns[keyCodeNumber-49] instanceof Gun){
        [this.guns[0], this.guns[keyCodeNumber-49]] = [this.guns[keyCodeNumber-49], this.guns[0]];
      }
    }

    for(var childn in this.guns){
      var child = this.guns[childn];
      if(child.update){
        child.update();
      }
    }

    for(var gunn=0; gunn<9; gunn++){
      if(!this.labels[gunn]){
        this.labels[gunn] = new PIXI.Text(gunn+1);
        this.labels[gunn].position.set(gunn*100,448-this.labels[gunn].height);
        this.labels[gunn].visible = false;
        app.stage.addChild(this.labels[gunn]);
      }
      if(this.guns[gunn] !== undefined){
        this.labels[gunn].visible = true;
        if (!this.sprites[gunn]) {
          this.sprites[gunn] = new PIXI.Sprite(this.guns[gunn].texture);
          this.sprites[gunn].position.set(gunn*100,448);
          app.stage.addChild(this.sprites[gunn]);
        }else{
          this.sprites[gunn].texture = this.guns[gunn].texture;
        }
      }else{
        this.labels[gunn].visible = false;
        app.stage.removeChild(this.sprites[gunn]);
        this.sprites.splice(gunn,1);
      }
    }

  }
}
