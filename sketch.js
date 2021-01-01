var PLAY = 1;
var END = 0;

var gameState = 1;
var score=0;

var Fruit1, Fruit2, Fruit3, Fruit4;
var Fruit1Image, Fruit2Image, Fruit3Image, Fruit4Image;

var Alien1, Alien2;
var Alien1Image, Alien2Image;

var Sword;
var SwordImage, GameOverImage;

var KnifeSound, GameOverSound;
var FruitGroup, EnemyGroup;

function preload(){
    
SwordImage = loadImage("sword.png");
GameOverImage = loadImage("gameover.png");
  
Fruit1Image = loadImage("fruit1.png");
Fruit2Image = loadImage("fruit2.png");
Fruit3Image = loadImage("fruit3.png");
Fruit4Image = loadImage("fruit4.png");
  
Alien1Image = loadImage("alien1.png");
Alien2Image = loadImage("alien2.png");
  
KnifeSound = loadSound("knifeSwooshSound.mp3");
GameOverSound = loadSound("gameover.mp3"); 
}

function setup(){
  
createCanvas(600,600);

Sword = createSprite(40,200,20,20);
Sword.addImage(SwordImage);
Sword.scale=0.7
  
FruitGroup = new Group();
EnemyGroup = new Group();
}

function draw(){
  
background("aqua");
  
if(gameState === PLAY){
  
Enemy();
Fruits();
     
Sword.y = World.mouseY;
Sword.x = World.mouseX;   
     
if(FruitGroup.isTouching(Sword)){
  
FruitGroup.destroyEach();
KnifeSound.play();
score = score+1;

}
  
else if(EnemyGroup.isTouching(Sword)){
  
gameState = END;
  
FruitGroup.destroyEach();
EnemyGroup.destroyEach();
  
FruitGroup.velocityX = 0;
EnemyGroup.velocityX = 0;
  
Sword.addImage(GameOverImage);

GameOverSound.play();
  
Sword.scale=1.5;

Sword.x=300;
Sword.y=300;
  
  }
}

if (score <= 0){
  
fill('red');
textSize(30);
  
textFont('Georgia');
text("SCORE : "+ score, 420, 50);
}

drawSprites();
  
fill('green');
textSize(30);
textFont('Georgia');
text("SCORE : "+ score, 420, 50);
  
fill('green');
textFont('Georgia');
textSize(30);
text("ONLY cut the FRUITS!", 170, 500);
  
textFont('Georgia');
fill('blue');
textSize(75);
text("Good LUCK!", 100, 580);
}

function Fruits(){

if(World.frameCount % 50===0){ 

Fruit=createSprite(575,200,20,20);
Fruit.scale=0.2;
   
r = Math.round(random(1,4)); 

if(r == 1){
Fruit.addImage(Fruit1Image);
} 
  
else if(r == 2){
Fruit.addImage(Fruit2Image)
} 
  
else if(r == 3){
Fruit.addImage(Fruit3Image)
} 
  
else if (r == 4){
Fruit.addImage(Fruit4Image)
}

Fruit.y = Math.round(random(50,340));

Fruit.velocityX=-12;
Fruit.setlifetime=100;

FruitGroup.add(Fruit);
  
if(r==1){
  
Fruit.x = 400;
Fruit.velocityX=-(5+(score/2));
  
}

else if (r==2){
Fruit.x=0;
Fruit.velocityX=(5+(score/2));
  
    }
  }
}

function Enemy(){

if(World.frameCount%200 === 0){ 
  
Alien1 = createSprite(500,200,20,20);
Alien1.addImage("moving",Alien1Image);
  
Alien1.y = Math.round(random(50,300)); 
Alien1.velocityX= -(8+(score/20));
  
Alien1.setlifetime=50;
EnemyGroup.add(Alien1);  
}
  
if(World.frameCount%200 === 0){
  
Alien2=createSprite(575,250,20,20);
Alien2.addImage("moving2",Alien2Image);
  
Alien2.y=Math.round(random(250,500));
Alien2.velocityX= -(8+(score/20));
  
Alien2.setlifetime=50;
EnemyGroup.add(Alien2);
  }   
}
