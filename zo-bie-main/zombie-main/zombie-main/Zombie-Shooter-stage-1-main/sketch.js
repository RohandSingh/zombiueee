 var bg, bgimg
var player,playerimg
 var shooter
 var bulletsGroup
 var bullets = 70;
 var gamestate = "fight";
 var score = 0
 var life = 3
 var winning
 var lose, explosion;

 function preload() {
    bgimg=loadImage("assets/bg.jpeg")
    playerimg = loadImage("assets/shooter_2.png")
    shooter = loadImage("assets/shooter_3.png")
   zombieeimg = loadImage("assets/zombie.png")
   heart1img = loadImage("assets/heart_1.png")
   heart2img = loadImage("assets/heart_2.png")
   heart3img = loadImage("assets/heart_3.png")
   explosion = loadSound("assets/explosion.mp3")
   win = loadSound("assets/win.mp3")
   lose = loadSound("assets/lose.mp3")



 }
 
 

 function setup() {
    createCanvas(windowWidth, windowHeight)
    
    //creating background
    bg = createSprite(displayWidth/2, displayHeight/2, 20,20)
    bg.addImage(bgimg)
    bg.scale = 1.5
    

    player = createSprite(200,600, 10,10)
    player.addImage(playerimg)
    player.scale = 0.2

    //CREATING GROUP FOR ZOMBIES
    zombieeGroup = new Group();
    //CREATING BULLETS GROUP 
    bulletsGroup = new Group();

    //displaying life pictures

    heart1 = createSprite(50,50,20,20)
    heart1.addImage(heart1img)
    heart1.scale = 0.3
    heart1.visible = false
    heart2 = createSprite(70,50,20,20)
    heart2.addImage(heart2img)
    heart2.scale = 0.3
    heart2.visible = false
    heart3 = createSprite(100,50,20,20)
    heart3.addImage(heart3img)
    heart3.scale = 0.3
    heart3.visible = true
 }




function draw(){
background(0);
if(gamestate == "fight") {
  //displaying appropriate images according to life of player
  if(life == 3) {
   heart3.visible = true;
   heart2.visible = false
   heart3.visible = false

  }

  if(life == 2) {
  heart3.visible = false
  heart2.visible = true
  heart1.visible = false

  }
  if(life == 1) {
  heart3.visible = false
  heart2.visible = false
  heart1.vsible = true

  }

  if(life == 0) {
   gamestate = "lost"

  }
  //winning condition
  if(score == 100) {
  gamestate = "won"
  win.play();
  }


  //moving player
  if(keyDown("UP_ARROW")) {
    player.y -=30
  }
  
  if(keyDown("DOWN_ARROW")) {
    player.y +=30
  }
  
  if(keyDown("LEFT_ARROW")) {
    player.x -=30
  }
  
  if(keyDown("right_arrow")) {
    player.x +=30
  }
  
  //calling function
  zombie();
  //release bullets and change image of shooter to shooting position when space is pressed
  if(keyWentDown("SPACE")) {
    player.addImage(shooter)
    bullet = createSprite(200,player.y - 17,20,10)
    bullet.velocityX = 15
    bulletsGroup.add(bullet)
    bullets = bullets - 1    
    explosion.play()
    }
    //player goes back to standing image once we stop pressing space bar
   else if(keyWentUp("SPACE")) {
      player.addImage(playerimg)
    }
    
     //destroy zombie when player touch
    if(zombieeGroup.isTouching(player)) {
       lose.play()
      for(i=0; i<zombieeGroup.length; i++) {
        if(zombieeGroup[i].isTouching(player)) {
          zombieeGroup[i].destroy();
          life = life -1 
        }
      }

    } 
    //destroy zombie when bullet touch

    if(zombieeGroup.isTouching(bulletsGroup)) {
      for(i=0; i<zombieeGroup.length; i++) {
        if(zombieeGroup[i].isTouching(bulletsGroup)) {
          zombieeGroup[i].destroy();
          bulletsGroup.destroyEach();
          score = score+2
          explosion.play()
          
        }
      }
    }
   //when there is no bullet
   if(bullets== 0) {
    gamestate = "bullet"
    lose.play()
   }
}

drawSprites(); 
//displaying score, life and remaining bullets

textSize(20)
fill("white")
text("Bullets = " + bullets,displayWidth-210,displayHeight/2-250)
text("score = " + score, displayWidth - 200, displayHeight/2 - 220)
text("life = " + life, displayWidth - 200, displayHeight/2-280)

if(gamestate == "lost") {
  textSize(100) 
  fill("red")
  text("YOU LOST",400,400)
  zombieeGroup.destroyEach()
  player.destroy()
}

else if(gamestate == "won") {
  textSize(100)
  fill("red")
  text("YOU WON",400,400)
  zombieeGroup.destroyEach()
  player.destroy()
}

else if(gamestate == "bullet" ) {
  textSize(100)
  fill("red")
  text("YOU RAN OUT OF BULLETS",400,400)
  zombieeGroup.destroyEach()
  player.destroy()
  bulletsGroup.destroyEach()
  
}

}





function zombie() {
 if(frameCount%70 == 0) {                                           
  zombiee = createSprite(windowWidth-50 ,200,20,20)
  zombiee.addImage(zombieeimg)
  zombiee.scale = 0.2
  zombiee.velocityX = -3
  zombiee.x = Math.round(random(800,1100))
  zombiee.y = Math.round(random(100,500))
  zombiee.lifetime = 400
  //adding group
  zombieeGroup.add(zombiee)
 }
}

