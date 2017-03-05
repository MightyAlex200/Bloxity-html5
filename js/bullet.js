class Bullet extends PIXI.Sprite {

  constructor(sprite,direction,x,y,pen,strength){
    super(sprite);
    this.direction = direction;
    this.position.set(x,y);
    this.speed = 10;
    this.pen = pen;
    this.strength = strength || 1;
    createjs.Sound.play(8);
  }

  update(){

    // If out of bounds
    if(this.x > 512 || this.x < 0 || this.y < 0 || this.y > 512){
      // delet this
      app.stage.removeChild(this);
    }

    // Move the bullet
    switch(this.direction){
      case 0:
        this.x -= this.speed;
        break;
      case 1:
        this.y -= this.speed;
        break;
      case 2:
        this.x += this.speed;
        break;
      case 3:
        this.y += this.speed;
        break;
    }

    // For each enemy,
    for (let n in app.stage.children){
      if (app.stage.children[n] instanceof Enemy){
        // If it is touching this,
        if(isIntersecting(app.stage.children[n],this)){
          app.stage.children[n].hurt(this.strength,true);
          if(!this.pen){
            // delet this
            app.stage.removeChild(this);
          }
        }
      }
    }

  }

}
