class StoreOption extends PIXI.Graphics {
  constructor(icon, title){
    super();
    this.icon = icon;
    this.addChild(this.icon);
    this.icon.position.set(64,10);
    this.title = title;
    this.addChild(this.title);
    this.title.position.set(72+this.icon.width,10+this.icon.height/4);
  }
  update(){

  }
}
