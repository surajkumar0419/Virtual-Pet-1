var dog,happydog,dogImage,database,foodS,foodStock

function preload(){
  dogImage = loadImage("images/dogImage.png");
  happydog = loadImage("images/dogImage1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);
  
  dog = createSprite(250,300);
  dog.addImage(dogImage);
  dog.scale=0.15;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydog)
  }

  drawSprites();
  textSize(20);
  fill("yellow");
  strokeWeight(2);
  stroke("black");
  text("Note:Press Up_Arrow Key To Feed Drago Milk",50,30);
  text("Food Remaining:"+foodS,150,200);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}



