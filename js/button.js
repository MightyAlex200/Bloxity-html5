class Button extends PIXI.Graphics {
  constructor(title, click){
    super();
    this.title = title;
    this.addChild(this.title);
    this.beginFill(0xaaaaaa);
    this.drawRect(-10,0,this.width+20,this.title.height);
    this.mouseOver = false;
    this.position.set(app.view.width/2-this.width/2,10);
    this.clicked = false;
    this.click = click;
  }
  update(){
    if(((document.mouse.x > this.x) && (document.mouse.x<(this.x+this.width))) && ((document.mouse.y>(this.y+this.parent.y)) && (document.mouse.y<((this.y+this.parent.y)+this.height)))){
      this.mouseOver = true;
    }else{
      this.mouseOver = false;
    }

    if(this.mouseOver){
      this.clear();
      this.beginFill(0xcccccc);
      this.drawRect(-10,0,this.width+20,this.title.height);
    }else{
      this.clear();
      this.beginFill(0xaaaaaa);
      this.drawRect(-10,0,this.width+20,this.title.height);
    }

    if(this.mouseOver && document.mouse.isDown && !this.clicked){
      this.click();
      this.clicked = true;
    }else{
      this.clicked = document.mouse.isDown;
    }
  }
}
