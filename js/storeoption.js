class StoreOption extends Button {
  constructor(icon, title, buy, cost, onetime){
    super(title, ()=>{
      if(myPlayer.score>=this.cost && (!this.onetime || !this.beenBought)){
        this.buy();
        this.beenBought = true;
        myPlayer.score -= this.cost;
        createjs.Sound.play(11);
      }else{
        createjs.Sound.play(12);
      }
    });
    this.cost = cost;
    this.buy = buy;
    this.beenBought = false;
    this.onetime = onetime;
    this.icon = icon;
    this.addChild(this.icon);
    // this.icon.position.set(64,10);
    this.title = title;
    this.title.text = this.title.text + ", " + this.cost;
    this.title.position.set(16+this.icon.width,this.icon.height/2-this.title.height/2);
  }
  update(){
    super.update(this);
    if((!this.onetime) || (!this.beenBought)){
      if(this.mouseOver){
        this.clear();
        this.beginFill(0xaaaaaa);
        this.drawRect(-10,0,this.width+20,this.icon.height);
      }else{
        this.clear();
        this.beginFill(0xffffff);
        this.drawRect(-10,0,this.width+20,this.icon.height);
      }
    }else{
      this.clear();
      this.beginFill(0x444444);
      this.drawRect(-10,0,this.width+20,this.icon.height);
    }
  }
}
