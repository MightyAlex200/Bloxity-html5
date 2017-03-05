class StoreHolder extends PIXI.Container {
  update(){
    for(let childn in this.children){
      let child = this.children[childn];
      child.y = childn*child.height+childn*10;
      if(child.update){
        child.update();
      }
    }
  }
}
