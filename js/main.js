// Application variable which contains renderer and stage
var app = new PIXI.Application(512,512,{backgroundColor: 0xeeeeee});

// Add application view to page
document.body.appendChild(app.view);

// These will be used to keep time
var enemyframes = 0;
var healthframes = 0;

// This one is used to tell if the game is paused
var pause = false;


// Load everything and then call the `start` function
PIXI.loader.add([
    "res/img/player.png",
    "res/img/bullet.png",
    "res/img/enemy.png",
    "res/img/youdied.png",
    "res/img/background.png",
    "res/img/healthpack.png",
    "res/img/ammopack.png"
  ]).load(start);

function start(){

  // Register these sounds under the id 1 and 2
  createjs.Sound.registerSound("res/snd/uuhhh.mp3", 1);
  createjs.Sound.registerSound("res/snd/death.mp3", 2);

  // Player variable using Player class in player.js
  myPlayer = new Player(PIXI.loader.resources["res/img/player.png"].texture,5);

  // Used to display score
  scoreDisplay = new PIXI.Text('Loading...\n', {font: "25px Arial", fill: "black"});

  // Used to display health
  healthDisplay = new PIXI.Text('Loading...', {font: "25px Arial", fill: "black"});
  healthDisplay.position.set(512-healthDisplay.width,0);

  // Used to display ammo
  ammoDisplay = new PIXI.Text('Loading...', {font: "25px Arial", fill: "black"});
  ammoDisplay.position.set(0,scoreDisplay.height);

  // Visual representation of health
  healthBar = new PIXI.Graphics();
  healthBar.beginFill(0xFF0000);
  healthBar.drawRect(512-177,25,177,25);

  // Transparent overlay to make visible when game is paused
  pauseDisplay = new PIXI.Graphics();
  pauseDisplay.beginFill(0x000000,0.7);
  pauseDisplay.drawRect(0,0,512,512);

  // Text to display when game is paused
  pauseDisplayText = new PIXI.Text("The game is paused\nPress esc to resume", {font: "bold 50px Arial", fill: "black"});
  pauseDisplayText.position.set(256-pauseDisplayText.width/2, 256-pauseDisplayText.height/2);

  // Background image to tell the player what keys to press
  backgroundImage = new PIXI.Sprite(PIXI.loader.resources["res/img/background.png"].texture);

  // Add everything we just created to the application stage

  app.stage.addChild(backgroundImage);

  app.stage.addChild(myPlayer);
  app.stage.addChild(scoreDisplay);
  app.stage.addChild(healthDisplay);
  app.stage.addChild(ammoDisplay);
  app.stage.addChild(healthBar);

  app.stage.addChild(pauseDisplay);
  app.stage.addChild(pauseDisplayText);

  // This pauses the game if the tab is unfocused
  setInterval(()=>{pause = pause?pause:document.hidden;},100);

  // Get high score
  best = parseInt(getCookie("best"));

  // If no high score present, set to 0
  if(isNaN(best)){best=0;}

  // Start game
  mainloop();
}

function mainloop(){

  // Used to tell if escape has just been pressed
  pause = document.keyboard.wasPressed(27) ? !pause:pause;


  // Do game stuff if unpaused
  if(!pause){

    // Make sure pause screen is invisible
    pauseDisplay.visible = false;
    pauseDisplayText.visible = false;

    // Keep track of time
    enemyframes++;
    healthframes++;


    // If half a second has passed, call `addEnemy` function and reset timer
    if(enemyframes>=30 && !myPlayer.dead){
      addEnemy();
      enemyframes = 0;
    }

    // If 30 seconds have passed, call `addHealthpack` function and reset timer
    if(healthframes >= 1800 && !myPlayer.dead){
      addHealthpack();
      healthframes = 0;
    }

    // Update score text
    scoreDisplay.text = "Score: " + myPlayer.score + "\nBest: " + Math.max(myPlayer.score,best);

    // Update health display
    healthDisplay.text = "Health: " + myPlayer.health + "/100";
    healthDisplay.position.set(512-healthDisplay.width,0);
    healthBar.clear();
    healthBar.drawRect(512-177,25,myPlayer.health*1.77,25);

    // Update ammo display
    ammoDisplay.text = "Ammo: " + myPlayer.ammo;

    // Update everything in the applcation stage
    for (var n in app.stage.children){
      obj = app.stage.children[n];
      if (obj.update) {
        obj.update(app.stage);
      }
    }

  }else{
    // If paused, display pause screen
    pauseDisplay.parent.addChild(pauseDisplay);
    pauseDisplay.visible = true;
    pauseDisplayText.parent.addChild(pauseDisplayText);
    pauseDisplayText.visible = true;
  }

  // Render everything
  app.render();

  // Call mainloop 60 times/second
  window.requestAnimationFrame(mainloop);
}

function addEnemy() {

  // Determine from which side is the enemy going to come from?
  var wall = randomInt(0,4);

  // Create new enemy coming from a random point on that wall and put it in the applcation stage
  app.stage.addChild(new Enemy(
    PIXI.loader.resources["res/img/enemy.png"].texture,
    (randomInt(0,512) * (wall % 2)) + (wall==2 ? 512-32:0),
    (randomInt(0,512) * (1-(wall % 2))) + (wall==3 ? 512-32:0)
  ));


}

function addHealthpack() {

  // Put new healthpack in random place in application stage
  app.stage.addChild(new Healthpack(PIXI.loader.resources["res/img/healthpack.png"].texture,
    randomInt(0,512),
    randomInt(0,512)
  ));

}

function youDied(){
  // Display death screen
  app.stage.addChild(new PIXI.Sprite(PIXI.loader.resources["res/img/youdied.png"].texture));
  // Write high score cookie
  if(myPlayer.score > best){
    document.cookie="best=" + myPlayer.score;
    console.log("wrote score");
  }
  // Bring score to front
  scoreDisplay.parent.addChild(scoreDisplay);
  // Make it white
  scoreDisplay.setStyle({fill:"white"});
  // Put it in the center of the screen
  scoreDisplay.position.set(256-scoreDisplay.width/2,341);
}
