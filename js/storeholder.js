class StoreHolder extends PIXI.Container {
  update(){
    for(var childn in this.children){
      var child = this.children[childn];
      child.y = childn*child.height+childn*10;
      if(child.update){
        child.update();
      }
    }
  }
}
