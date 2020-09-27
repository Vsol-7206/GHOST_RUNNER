// create variables here
var ghost,ghostImage,tower,towerImage,
    door,doorImage,climber,climberImage;
var invisibleClimber;
var doorsGroup,climbersGroup,invisibleClimbersGroup;
var spookySound;
var gameState = "play";



function preload () {
  // loading the images
 ghostImage = loadAnimation("ghost-standing.png","ghost-jumping.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png"); 
  spookySound = loadSound("spooky.wav");
  }


function setup () {
  //creating the canvas
   createCanvas(600,600);
   // making the sound play in a loop
  spookySound.loop();
  // creating the tower
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 2;
  // creating the ghost_runner
  ghost = createSprite(300,300,50,50);
  ghost.addAnimation("ghost_runner",ghostImage);
  ghost.scale = 0.3;
  
  // creating the various spriteGroups
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleClimbersGroup = new Group(); 
}




function draw () {
 // background
  background ("black");
  // GAMESTATE IS PLAY
  if(gameState === "play"){
    // making the background reset
  if(tower.y>400) {
    tower.y = 300;
  }
  // making the ghost jump
  if(keyDown("space")){
    ghost.velocityY = -12;
     
  } 
  // gravity for the ghost
  ghost.velocityY = ghost.velocityY + 0.8;
  
  // making the ghost move left and right
  if(keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x-5;
  }
  
  
  if(keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x+5;
  }
  // spawning the doors 
    spawnDoor();
    // making the climber collide with the ghost
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
  }
    if(invisibleClimbersGroup.isTouching(ghost) || ghost.y>600){
      gameState = "end";
          }
    // creating the sprites
  drawSprites ();
  }
  // GAMESTATE IS END
   if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(35); 
    text("GAME OVER😱🙀",130,300);  
  }  
}

function spawnDoor () {
  if(frameCount % 200 == 0) {
    door = createSprite (300,-60);
    door.velocityY = 2; 
    door.addImage(doorImage);
    door.x = Math.round(random(120,450));
    climber = createSprite(300,-10);
    climber.velocityY = 2;
    climber.addImage(climberImage);
    climber.x = door.x;
    invisibleClimber = createSprite(300,-5);
    invisibleClimber.width = climber.width;
    invisibleClimber.height = 2;
    invisibleClimber.x = door.x;
    invisibleClimber.velocityY = 2;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth+1;
    door.lifetime = 330;
    climber.lifetime = 330;
    invisibleClimber.lifetime = 330;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleClimbersGroup.add(invisibleClimber);
    invisibleClimber.debug = true;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  }
}