class Player extends PIXI.Sprite {

  constructor(sprite,speed){
      super(sprite);
      this.score = 0;
      // Bring to middle of screen
      this.position.set(240,240);
      // Most of these are self-explanatory
      this.speed = speed || 1;
      this.direction = 0;
      this.health = 100;
      // Timer for gun cooldown
      this.frames = 0;
      // this.ammo = 100;
      this.dead = false;
      this.gun = new Pistol();
  }

  update(stage){

    // Keep time
    this.frames++;

    // If you just died
    if(this.health <= 0 && !this.dead){
      // Call the `youDied` function in main.js
      youDied();
      // Make sure that everybody knows you're dead
      this.dead = true;
      // Play death sound
      createjs.Sound.play(2);
      // Reload game in 3 seconds
      setTimeout(location.reload.bind(location),3000);
    }

    // If you haven't died
    if (this.dead===false){
      // Move character
      var xdir = document.keyboard[39] ? this.speed:document.keyboard[37] ? -this.speed:0;
      var ydir = document.keyboard[40] ? this.speed:document.keyboard[38] ? -this.speed:0;
      this.x += ((this.x + xdir)>480 || (this.x + xdir)<0) ? 0:xdir;
      this.y += ((this.y + ydir)>480 || (this.y + ydir)<0) ? 0:ydir;
      // Get direction
      this.direction =
        document.keyboard[37] ? 0:
        document.keyboard[38] ? 1:
        document.keyboard[39] ? 2:
        document.keyboard[40] ? 3:
        this.direction;
      // Update gun
      this.gun.update(this);
      // If pressing space
      if(document.keyboard[32]){
        // Shoot the gun
        this.gun.shoot(this);
      }

      // If q was pressed
      if(document.keyboard.wasPressed(81) && this.gun.ammo>50){
        var temp = app.stage.children.filter((c)=>{return c instanceof Enemy;});
        // Find all objects in stage
        for(var e in temp){
          temp[e].kill(false);
        }
        this.gun.ammo -= 50;
      }

      // If touching coin
      for (var coinnumber in app.stage.children){
        var coin = app.stage.children[coinnumber];
        if(coin instanceof Coin){
          if(isIntersecting(this,coin)){
            app.stage.removeChild(coin);
            this.score++;
          }
        }
      }

    }
  }

}
