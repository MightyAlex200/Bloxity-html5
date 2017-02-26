var app = new PIXI.Application(512,512,{backgroundColor: 0xeeeeee});

document.body.appendChild(app.view);

var frames = 0;
var pause = false;
var fp = false;

PIXI.loader.add([
    "res/img/player.png",
    "res/img/bullet.png",
    "res/img/enemy.png",
    "res/img/youdied.png",
    "res/img/background.png"
  ]).load(start);

function start(){

  createjs.Sound.registerSound("res/snd/uuhhh.mp3", 1);
  createjs.Sound.registerSound("res/snd/death.mp3", 2);

  myPlayer = new Player(PIXI.loader.resources["res/img/player.png"].texture,5);

  scoreDisplay = new PIXI.Text('Loading...', {font: "25px Arial", fill: "black"});

  healthDisplay = new PIXI.Text('Health: ', {font: "25px Arial", fill: "black"});
  healthDisplay.position.set(512-healthDisplay.width,0);

  healthBar = new PIXI.Graphics();
  healthBar.beginFill(0xFF0000);
  healthBar.drawRect(512-177,25,177,25);

  pauseDisplay = new PIXI.Graphics();
  pauseDisplay.beginFill(0x000000,.7);
  pauseDisplay.drawRect(0,0,512,512);
  pauseDisplayText = new PIXI.Text("The game is paused\nPress esc to resume", {font: "bold 50px Arial", fill: "black"})
  pauseDisplayText.position.set(256-pauseDisplayText.width/2, 256-pauseDisplayText.height/2);

  backgroundImage = new PIXI.Sprite(PIXI.loader.resources["res/img/background.png"].texture);
  app.stage.addChild(backgroundImage);

  app.stage.addChild(myPlayer);
  app.stage.addChild(scoreDisplay);
  app.stage.addChild(healthDisplay);
  app.stage.addChild(healthBar);

  app.stage.addChild(pauseDisplay);
  app.stage.addChild(pauseDisplayText);

  setInterval(()=>{pause = pause?pause:document.hidden;},100)

  best = parseInt(getCookie("best"));

  if(isNaN(best)){best=0}

  mainloop();
}


function mainloop(){

  s=fp? !document.keyboard[27]:document.keyboard[27];
  fp=document.keyboard[27];

  if(s==true && document.keyboard[27] != true){
    pause = !pause;
  }


  if(!pause){

    pauseDisplay.visible = false;
    pauseDisplayText.visible = false;

    frames++;

    if(frames>=30){
      addEnemy();
      frames = 0;
    }

    scoreDisplay.text = "Score: " + myPlayer.score + "\nBest: " + Math.max(myPlayer.score,best);

    healthDisplay.text = "Health: " + myPlayer.health + "/100";
    healthDisplay.position.set(512-healthDisplay.width,0);
    healthBar.clear();
    healthBar.drawRect(512-177,25,myPlayer.health*1.77,25);

    for (n in app.stage.children){
      obj = app.stage.children[n];
      if (obj.update) {
        obj.update(app.stage);
      }
    }

  }else{
    pauseDisplay.parent.addChild(pauseDisplay);
    pauseDisplay.visible = true;
    pauseDisplayText.parent.addChild(pauseDisplayText);
    pauseDisplayText.visible = true;
  }

  app.render();

  window.requestAnimationFrame(mainloop);
}

function addEnemy() {

  var wall = randomInt(0,4);

  app.stage.addChild(new Enemy(
    PIXI.loader.resources["res/img/enemy.png"].texture,
    (randomInt(0,512) * (wall % 2)) + (wall==2 ? 512-32:0),
    (randomInt(0,512) * (1-(wall % 2))) + (wall==3 ? 512-32:0)
  ));


}

function youdied(){
  addEnemy = ()=>{};
  app.stage.addChild(new PIXI.Sprite(PIXI.loader.resources["res/img/youdied.png"].texture));
  if(myPlayer.score > best){
    document.cookie="best=" + myPlayer.score;
    console.log("wrote score");
  }
  scoreDisplay.parent.addChild(scoreDisplay);
  scoreDisplay.setStyle({fill:"white"});
  scoreDisplay.position.set(256-scoreDisplay.width/2,341);
}
