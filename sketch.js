var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feed , addFood;
var fedTime, lastFed;
var foodObj ;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,250,500,500);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed = createButton("Feed The Dog");
  feed.position(300,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(200,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();
}

// function to display UI
function draw() {
  background(46,139,87);
 
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value" , function(data){
      lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed: "+ lastFed%12 + " PM" , 350 ,30)
  }else if(lastFed === 0){
    text("Last Fed: 12 AM" , 350 , 30)
  }else{
    text("Last Fed:"+ lastFed + " AM" , 350,30);
  }

  //if(keyWentDown(UP_ARROW)){
//    writeStock(foodS);
  //  dog.addImage(dogImg1);
  //}

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,150,150);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function addFoods(){
   if(mousePressed(addFood)){
     foodStock = foodStock+1
   }
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}