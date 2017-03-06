// Application letiable which contains renderer and stage
let app = new PIXI.Application(1920,1080,{backgroundColor: 0xeeeeee});

// Add application view to page
document.body.appendChild(app.view);

// Store stage
let storestage = new PIXI.Container();

let menustage = new PIXI.Container();

let exceptionstage = new PIXI.Container();

let instore = false;

let inmenu = true;

// These will be used to keep time
let enemyframes = 0;
let healthframes = 0;
let epm = 30;

// This one is used to tell if the game is paused
let pause = false;


// Load everything and then call the `start` function
PIXI.loader.add([
    "res/img/player.png",
    "res/img/bullet.png",
    "res/img/enemy.png",
    "res/img/youdied.png",
    "res/img/background.png",
    "res/img/healthpack.png",
    "res/img/ammopack.png",
    "res/img/pistol.png",
    "res/img/revolver.png",
    "res/img/coin.png",
    "res/img/ammobox.png",
    "res/img/healthbox.png",
    "res/img/pipebomb.png",
    "res/img/explosion.png",
    "res/img/ar15.png",
    "res/img/exception.png",
    "res/img/logo.png"
  ]).load(start);

function start(){

  // Register these sounds under the id 1 and 2
  createjs.Sound.registerSound("res/snd/uuhhh.wav", 1);
  createjs.Sound.registerSound("res/snd/death.mp3", 2);
  createjs.Sound.registerSound("res/snd/ammo.wav",3);
  createjs.Sound.registerSound("res/snd/coin.wav",4);
  createjs.Sound.registerSound("res/snd/explosion.wav",5);
  createjs.Sound.registerSound("res/snd/health.wav",6);
  createjs.Sound.registerSound("res/snd/hurt.wav",7);
  createjs.Sound.registerSound("res/snd/shoot.wav",8);

  // Player letiable using Player class in player.js
  myPlayer = new Player(PIXI.loader.resources["res/img/player.png"].texture,5);

  // Used to display score
  scoreDisplay = new PIXI.Text('Loading...\n', {font: "25px Arial", fill: "black"});

  // Used to display health
  healthDisplay = new PIXI.Text('Loading...', {font: "25px Arial", fill: "black"});

  // Used to display ammo
  ammoDisplay = new PIXI.Text('Loading...', {font: "25px Arial", fill: "black"});
  ammoDisplay.position.set(0,scoreDisplay.height);

  // Visual representation of health
  healthBar = new PIXI.Graphics();
  healthBar.beginFill(0xFF0000);
  healthBarLength = 177;
  healthBar.drawRect(512-177,25,healthBarLength,25);

  // Transparent overlay to make visible when game is paused
  pauseDisplay = new PIXI.Graphics();
  pauseDisplay.beginFill(0x000000,0.7);
  pauseDisplay.drawRect(0,0,app.view.width,app.view.height);

  // Text to display when game is paused
  pauseDisplayText = new PIXI.Text("The game is paused\nPress esc to resume", {font: "bold 50px Arial", fill: "black"});
  pauseDisplayText.position.set(app.view.width/2-pauseDisplayText.width/2, app.view.height/2-pauseDisplayText.height/2);

  // Background image to tell the player what keys to press
  backgroundImage = new PIXI.Sprite(PIXI.loader.resources["res/img/background.png"].texture);
  backgroundImage.scale.set(app.view.width/512, app.view.height/512);

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

  storeText = new PIXI.Text("Store", {font: "bold 32px Arial", fill: "black"});
  storeText.x = app.view.width/2-storeText.width/2;
  storeText.y = 32;

  storestage.addChild(storeText);

  sh = new StoreHolder();
  sh.y = 64;

  storestage.addChild(sh);

  sh.addChild(
    new StoreOption(
      new PIXI.Sprite(PIXI.loader.resources["res/img/ammobox.png"].texture),
      new PIXI.Text("Ammo", {font: "bold 32px Arial", fill: "black"}),
      ()=>{
        storestage.addChild(new Ammopack(
            PIXI.loader.resources["res/img/ammopack.png"].texture,
            myPlayer.x,
            myPlayer.y
          )
        );
      },
      10
    )
  );

  sh.addChild(
    new StoreOption(
      new PIXI.Sprite(PIXI.loader.resources["res/img/healthbox.png"].texture),
      new PIXI.Text("Health", {font: "bold 32px Arial", fill: "black"}),
      ()=>{
        storestage.addChild(new Healthpack(
          PIXI.loader.resources["res/img/healthpack.png"].texture,
          myPlayer.x,
          myPlayer.y
        ));
      },
      10
    )
  );


  sh.addChild(
    new StoreOption(
      new PIXI.Sprite(PIXI.loader.resources["res/img/revolver.png"].texture),
      new PIXI.Text("Revolver", {font: "bold 32px Arial", fill: "black"}),
      ()=>{
        myPlayer.gunbelt.guns.push(new Revolver());
      },
      50,
      true
    )
  );

  sh.addChild(
    new StoreOption(
      new PIXI.Sprite(PIXI.loader.resources["res/img/pipebomb.png"].texture),
      new PIXI.Text("Pipebomb", {font: "bold 32px Arial", fill: "black"}),
      ()=>{
        let playerpipebomb = myPlayer.gunbelt.guns.filter(
          (x)=>(x instanceof PipeBomb)
        )[0];
        if(playerpipebomb){
          playerpipebomb.ammo++;
        }else{
          myPlayer.gunbelt.guns.push(new PipeBomb());
        }
      },
      35
    )
  );

  sh.addChild(
    new StoreOption(
      new PIXI.Sprite(PIXI.loader.resources["res/img/ar15.png"].texture),
      new PIXI.Text("AR15", {font: "bold 32px Arial", fill: "black"}),
      ()=>{
        myPlayer.gunbelt.guns.push(new AR15()


         );
      },
      175,
      true
    )
  );

  menustage.addChild(new PIXI.Sprite(PIXI.loader.resources["res/img/logo.png"].texture));
  let b = new Button(
    new PIXI.Text("Play", {font: "bold 32px Arial", fill: "black"}),
    ()=>{
      [app.stage, menustage] = [menustage, app.stage];
      inmenu = false;
    }
  );
  b.position.set(b.x,500);
  menustage.addChild(
    b
  );

  [app.stage, menustage] = [menustage, app.stage];

  // Start game
  mainloop();
}

function mainloop(){

  app.view.style.width=innerWidth;
  app.view.style.height=innerHeight;



  // Used to tell if escape has just been pressed
  pause = document.keyboard.wasPressed(27) ? !pause:pause;

  // Mute game if 'm' key pressed
  createjs.Sound.muted = document.keyboard.wasPressed(77) ? !createjs.Sound.muted:createjs.Sound.muted;

  if(document.keyboard.wasPressed(69) && !inmenu){
    [app.stage, storestage] = [storestage, app.stage];
    instore = !instore;
  }

  // Do game stuff if unpaused and ingame
  if(!pause && !instore && !inmenu){

    // Make sure pause screen is invisible
    pauseDisplay.visible = false;
    pauseDisplayText.visible = false;

    // Keep track of time
    enemyframes++;
    healthframes++;

    epm+=0.004166666666666667;

    // If 2 seconds have passed, call `addEnemy` function and reset timer
    if(enemyframes>=(60/epm)*60 && !myPlayer.dead){
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
    healthDisplay.position.set(app.view.width-healthDisplay.width,0);
    healthBarLength += healthBarLength>Math.round((myPlayer.health/100)*177) ? -1:healthBarLength<Math.round((myPlayer.health/100)*177) ? 1:0;
    healthBar.clear();
    healthBar.drawRect(app.view.width-177,25,healthBarLength,25);

    // Update ammo display
    ammoDisplay.text = "Ammo: " + myPlayer.gunbelt.guns[0].ammo + "\nClip: " + myPlayer.gunbelt.guns[0].clip;

    // Update everything in the applcation stage
    for (let n in app.stage.children){
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

  if(instore && !inmenu){
    for (let e in app.stage.children){
      obj = app.stage.children[e];
      if (obj.update) {
        obj.update(app.stage);
      }
    }
  }

  if(inmenu){
    for (let e in app.stage.children){
      obj = app.stage.children[e];
      if (obj.update) {
        obj.update(app.stage);
      }
    }
  }

  // Render everything
  app.render();

  // Call mainloop 60 times/second
  requestAnimationFrame(()=>{
    try{
      mainloop();
    }
    catch(e){
      app.stage = exceptionstage;
      app.stage.addChild(new PIXI.Sprite(PIXI.loader.resources["res/img/exception.png"].texture));
      app.stage.addChild(new PIXI.Text("Error.", {font: "bold 120px Noto Sans"})).position.set(480,0);
      app.stage.addChild(new PIXI.Text(e, {font: "bold 64px Noto Sans", fill: "black", wordWrap: true, wordWrapWidth: 960})).position.set(480,240);
      let func = ()=>{
        app.view.style.width=innerWidth;
        app.view.style.height=innerHeight;
        requestAnimationFrame(func);
      };
      requestAnimationFrame(func);
    }
  });
}

function addEnemy() {

  // Determine from which side is the enemy going to come from?
  let wall = randomInt(0,4);

  // Create new enemy coming from a random point on that wall and put it in the applcation stage
  app.stage.addChild(new Enemy(
    PIXI.loader.resources["res/img/enemy.png"].texture,
    (randomInt(0,app.view.width) * (wall % 2)) + (wall==2 ? app.view.width-32:0),
    (randomInt(0,app.view.height) * (1-(wall % 2))) + (wall==3 ? app.view.height-32:0),
    3
  ));


}

function addHealthpack() {

  // Put new healthpack in random place in application stage
  app.stage.addChild(new Healthpack(PIXI.loader.resources["res/img/healthpack.png"].texture,
    randomInt(0,app.stage.width),
    randomInt(0,app.stage.height)
  ));

}

function youDied(){
  // Display death screen
  ds = app.stage.addChild(new PIXI.Sprite(PIXI.loader.resources["res/img/youdied.png"].texture));
  ds.scale.set(app.view.width/512, app.view.height/512);
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
  scoreDisplay.position.set(app.view.width/2-scoreDisplay.width/2,this.height);
}
