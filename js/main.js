var app = new PIXI.Application(512,512,{backgroundColor: 0xeeeeee});

document.body.appendChild(app.view);

var frames = 0;

PIXI.loader.add([
    "res/img/player.png",
    "res/img/bullet.png",
    "res/img/enemy.png",
    "res/img/youdied.png"
  ]).load(start);

function start(){

  createjs.Sound.registerSound("res/snd/uuhhh.mp3", 1);
  createjs.Sound.registerSound("res/snd/death.mp3", 2);

  myPlayer = new Player(PIXI.loader.resources["res/img/player.png"].texture,5);

  scoreDisplay = new PIXI.Text('Loading...', {font: "25px Arial", fill: "black"});

  app.stage.addChild(myPlayer);
  app.stage.addChild(scoreDisplay);

  mainloop();
}

function mainloop(){

  frames++;

  if(frames>=60){
    addEnemy();
    frames = 0;
  }

  scoreDisplay.text = "Score: " + app.stage.children[0]/*player*/.score;

  for (n in app.stage.children){
    obj = app.stage.children[n];
    if (obj.update) {
      obj.update(app.stage);
    }
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
  scoreDisplay.parent.addChild(scoreDisplay);
  scoreDisplay.setStyle({fill:"white"});
  scoreDisplay.position.set(256-scoreDisplay.width/2,341);
}
