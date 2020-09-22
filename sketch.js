
var escapeCar,escapeCarImg;
var vehicleGroup;
var play=1,end=0;
var gameState=play;
var hit=3;

function preload(){
    track1img = loadImage("Images/roadtrack2.png");
    track2img = loadImage("Images/roadtrack1.png");
    escapeCarImg = loadImage("Images/escapeCar.png");
    enemyCar1=loadImage("Images/enemyCar1.png");
    enemyCar2=loadImage("Images/enemyCar2.png");
    enemyCar3=loadImage("Images/enemyCar3.png");
    enemyCar4=loadImage("Images/enemyCar4.png");
    health3=loadImage("Images/3health.png");
    health2=loadImage("Images/2health.png");
    health1=loadImage("Images/1health.png");
    health0=loadImage("Images/0health.png");

}

function setup(){
    createCanvas(displayWidth-20, displayHeight-30);

    track1= createSprite(displayWidth/2-300, 0,displayWidth, displayHeight*10);
    track1.addImage("track",track1img);
    track1.y =  displayHeight/2 -50;
    track1.scale = 2.3;

    track2= createSprite(displayWidth/2+300, 0,displayWidth, displayHeight*10);
    track2.addImage("track",track2img);
    track2.y =  displayHeight/2 -50;
    track2.scale = 2.3;

    escapeCar = createSprite(displayWidth/2,displayHeight/2+20,10,10);
    escapeCar.addImage("Car",escapeCarImg);
    escapeCar.scale = 0.5;
    escapeCar.debug=true;
    escapeCar.setCollider("rectangle",0,0,150,300);

    lives=createSprite(displayWidth/2-700,displayHeight/2+200);
    lives.addImage(health3)
    lives.scale=2;

    vehicleGroup=new Group ();
    
}

function draw(){
    background(74,134,24);
    if(gameState==play){
        track1.velocityY = 10;
        track2.velocityY = 10;
        if(track1.y > displayHeight){
            track1.y =  displayHeight/2 -50;
        } 
        if(track2.y > displayHeight){
            track2.y =  displayHeight/2 -50;
        } 
        if(keyDown(LEFT_ARROW)){
            escapeCar.x = escapeCar .x - 5;
        }
        if(keyDown(RIGHT_ARROW)){
            escapeCar.x = escapeCar .x + 5;
        }
        spawnVehicles();
        for(var i = 0 ; i < 2 ; i = i + 1)
        {
          if(hit == 2)
          {
            lives.setAnimation("2health");
          }
          
          if(hit == 1)
          {
            lives.setAnimation("1health");
          }
          
          if(hit == 0)
          {
            lives.setAnimation("0health");
            gameState = "end";
          }
        } 
        if(vehicleGroup.isTouching(escapeCar)){
            hit=hit-1;
            gameState=end;
        }
    }
    else if(gameState==end){
        track1.velocityY=0;
        track2.velocityY=0;
        vehicleGroup.setVelocityYEach(0);
    }
    
    
    drawSprites();
}
function spawnVehicles(){
    if(World.frameCount%100==0){
       var vehicles=createSprite(random(displayWidth/2-350,displayWidth/2+350),displayHeight/2+200);
      
       vehicles.velocityY=-4;
       vehicles.scale=0.3;
       var rand=Math.round(random(1,4));
       switch(rand){
           case 1:  vehicles.addImage(enemyCar1);
           break;
           case 2: vehicles.addImage(enemyCar2);
           break;
           case 3: vehicles.addImage(enemyCar3);
           break;
           case 4: vehicles.addImage(enemyCar4);
           break;
       }
       vehicles.lifetime=800;
       vehicles.debug=true;
       vehicles.setCollider("rectangle",0,0,150,300);
       vehicleGroup.add(vehicles);
       
    }

}