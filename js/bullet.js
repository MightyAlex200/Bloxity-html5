class Bullet extends PIXI.Sprite {

  constructor(sprite,direction,x,y){
    super(sprite);
    this.direction = direction;
    this.position.set(x,y);
    this.speed = 10;
  }

  update(stage){

    // If out of bounds
    if(this.x > 512 || this.x < 0 || this.y < 0 || this.y > 512){
      // delet this
      stage.removeChild(this);
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
    for (var n in stage.children){
      if (stage.children[n] instanceof Enemy){
        // If it is touching this,
        if(isIntersecting(stage.children[n],this)){
          // Increse player score
          myPlayer.score++;
          stage.children[n].kill(true);
          // delet this
          app.stage.removeChild(this);
        }
      }
    }

  }

}
