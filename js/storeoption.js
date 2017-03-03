class StoreOption extends PIXI.Graphics {
  constructor(icon, title, buy, cost){
    super();
    this.position.set(64,10);
    this.cost = cost;
    this.buy = buy;
    this.isBought = false;
    this.icon = icon;
    this.addChild(this.icon);
    // this.icon.position.set(64,10);
    this.title = title;
    this.title.text = this.title.text + ", " + this.cost;
    this.addChild(this.title);
    this.title.position.set(16+this.icon.width,this.icon.height/2-this.title.height/2);
    this.beginFill(0xaaaaaa);
    this.drawRect(-10,0,this.width+20,this.icon.height);
    this.mouseOver = false;
  }
  update(){
    if(((document.mouse.x > this.x) && (document.mouse.x<(this.x+this.width))) && ((document.mouse.y>(this.y+this.parent.y)) && (document.mouse.y<((this.y+this.parent.y)+this.height)))){
      this.mouseOver = true;
    }else{
      this.mouseOver = false;
    }

    if(this.mouseOver){
      this.clear();
      this.beginFill(0xaaaaaa);
      this.drawRect(-10,0,this.width+20,this.icon.height);

      if(myPlayer.score>=this.cost){
        if(document.mouse.isDown){
          if(!this.isBought){
            this.buy();
            this.isBought = true;
            myPlayer.score -= this.cost;
          }
        }else{
          this.isBought = false;
        }
      }

    }else{
      this.clear();
      this.beginFill(0xffffff);
      this.drawRect(-10,0,this.width+20,this.icon.height);
    }
  }
}
