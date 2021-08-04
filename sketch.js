var bg,bgImg;


  //adding the background image
 
var player, shooterImg, shooter_shooting;
var zombie, zombieGroup, bulletGroup, score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var live = 3;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");

  bgImg = loadImage("assets/bg.jpeg");

  bulletImg = loadImage("assets/bullet.png");
  bullet1Img = loadImage("assets/bullet1.png");
  bullet2Img = loadImage("assets/bullet2.png");
  bullet3Img = loadImage("assets/bullet3.png");
  bullet4Img = loadImage("assets/bullet4.png");

  zombie1Img = loadImage("assets/zombie1.png");
  zombie2Img = loadImage("assets/zombie2.png");
  zombie3Img = loadImage("assets/zombie3.png");
  zombie4Img = loadImage("assets/zombie4.png");
  zombie5Img = loadImage("assets/zombie5.png");

  restartImg = loadImage("assets/restart.png");

  live1Img = loadImage("assets/heart_1.png");
  live2Img = loadImage("assets/heart_2.png");
  live3Img = loadImage("assets/heart_3.png");

  s1 = loadSound("assets/win.mp3");
  s2 = loadSound("assets/lose.mp3");
  s3 = loadSound("assets/explosion.mp3");

}

function setup() {

  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.2;
  bg.x = bg.width/2;

  zombieGroup = new Group();
  bulletGroup = new Group();

//creating the player sprite
   player = createSprite(displayWidth-1155, displayHeight-283, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   restart = createSprite(displayWidth/2, displayHeight/2, 20, 20);
   restart.visible = false;
   restart.addImage(restartImg);
   restart.scale = 1.0;

   live1 = createSprite(1100, 50, 40,40);
   live1.addImage(live1Img);
   live1.scale = 0.5;
   live1.visible = false;

   live2 = createSprite(1110, 50, 40,40);
   live2.addImage(live2Img);
   live2.scale = 0.5;
   live2.visible = false;

   live3 = createSprite(1150, 50, 40,40);
   live3.addImage(live3Img);
   live3.scale = 0.5;
   live3.visible = true;
   
}

function draw() {

  if(gameState === PLAY)
  {

    //moving the player up and down and making the game mobile compatible using touches
  if(keyDown("UP_ARROW")||touches.length>0){
    player.y = player.y-30

  }
  if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30

  }

  if(bg.x < 0)
  {
    bg.x =n= bg.width;
  }

  //release bullets and change the image of shooter to shooting position when space is pressed
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
  }



  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    player.addImage(shooterImg) 
  }

  if(bulletGroup.isTouching(zombieGroup))
  {
    score += 1;
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
    bulletGroup.visible = true;
  }


  if(zombieGroup.isTouching(player))
  {
    live = live - 1;
    s2.play();
    if(live === 2)
    {
      live1.visible = false;
      live2.visible = true;
      live3.visible = false;

      console.log("HI");
    }
   if(live === 1)
    {
      live2.visible = false;
      live1.visible = true;
      live3.visible = false;
    }
    zombieGroup.destroyEach();

    if(live === 0)
    {
      live2.visible = false;
      live1.visible = false;
      live3.visible = false;
      
      

      score = 0;

      gameState = END;
      
      console.log("YAY");
    }
  }
      }
    
  if(gameState === END)
  {
    zombieGroup.destroyEach();
    restart.visible = true;

    if(mousePressedOver(restart))
    {
      reset();
    }

  }

    drawSprites();

  	createZombies();
    createBullets();

    textSize(30);   
    fill(255);
    text("Score:"+ score, 50,60);
    text("Lives:", 900, 60);
}

function createZombies()
{
  if(frameCount%80 === 0)
 {
  var zombie = createSprite(random(500,1100),random(100,500),40,40);

  zombie.velocityX = -5;
  zombie.scale = 0.2;
  var rand = Math.round(random(1,5));
 switch(rand)
 {
  case 1: zombie.addImage(zombie1Img);
  break;
  case 2: zombie.addImage(zombie2Img);
  break;
  case 3: zombie.addImage(zombie3Img);
  break;
  case 4: zombie.addImage(zombie4Img);
  break;
  case 5: zombie.addImage(zombie5Img);
  break;
  default: break;
 }

  player.depth = zombie.depth;
  player.depth += 1;

  zombieGroup.add(zombie);
 }
}



function createBullets()
{

  var bullet = createSprite(displayWidth-1180, player.y-25, 50, 50);
  bullet.visible = false;
  bullet.velocityX = 0;
  bullet.scale = 0.15;

  if(bullet.isTouching(zombieGroup))
  {
    score += 1;
    bullet.destroy();
    zombie.destroy();
    s1.play();
    
  }

  
  if(keyWentUp("space"))
  {
    bullet.velocityX = 0;
    bullet.visible = false;
  }

  else if(keyWentDown("space"))
  {
    bullet.velocityX = 15;
    bullet.visible = true;
    s1.play();
  }

  var rando = Math.round(random(1,5));

 switch(rando)
 {
  case 1: bullet.addImage(bulletImg);
  break;
  case 2: bullet.addImage(bullet1Img);
  break;
  case 3: bullet.addImage(bullet2Img);
  break;
  case 4: bullet.addImage(bullet3Img);
  break;
  case 5: bullet.addImage(bullet4Img);
  break;
  default: break;
 }

  bulletGroup.add(bullet);

 }

 function reset()
 {

  gameState = PLAY;

  live = 3;
  live3.visible = true;

  restart.visible = false;

 }