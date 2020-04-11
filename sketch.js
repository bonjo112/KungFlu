let infectedPeople = [];
let  player;
let dx = 5;
let dy = 5;
let movingUp = false;
let movingDown = false;
let movingLeft = false;
let alive = 0, hit = 0;
let movingRight = false;


function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(pushInfectedToArray, 250);
  player = {
    x:width/2,
    y:height/2,
    
    color: "blue",
  };
  
}
function draw() {
  background("white");
  displayInfected();
  notInfected();
  playerWalk();
  speed();
  infectedWalk();
  hitDetecc();
  //toiletPaper();
  
}
function displayInfected() {
  noStroke();
  for (let i=0; i<infectedPeople.length; i++) {
    fill(infectedPeople[i].color);
    stroke(5);
    circle(infectedPeople[i].x, infectedPeople[i].y,infectedPeople[i].radius );

  }
}


 function notInfected(){
  
   fill(player.color);
   circle(player.x,player.y, 20);
   
}
 


function infectedWalk() {
  for (let i=0; i<infectedPeople.length; i++) {
    let x = infectedPeople[i].z;
    let y = infectedPeople[i].w;
    infectedPeople[i].x += x;
    infectedPeople[i].y += y;
  }
  
}
function playerWalk() {
  if (keyIsPressed && keyCode === 87) {
    movingUp = true;
  }
  if (keyIsPressed && keyCode === 65) {
    movingLeft = true;
  }
  if (keyIsPressed && keyCode === 83) {
    movingDown = true;
  }
  if (keyIsPressed && keyCode === 68) {
    movingRight = true;
  }
  if (!keyIsPressed) {
    movingUp = false;
  }
  if (!keyIsPressed) {
    movingLeft = false;
  }
  if (!keyIsPressed) {
    movingDown = false;
  }
  if (!keyIsPressed) {
    movingRight = false;
  }
}
function speed(){
  if (movingUp) {
    player.y -= dy;
  }
  if (movingLeft) {
    player.x -= dx;
  }
  if (movingDown) {
    player.y += dy;
  }
  if (movingRight) {
    player.x += dx;
  }
}


function hitDetecc(){
  for (let i=0; i<infectedPeople.length; i++) { 
    if(dist(infectedPeople[i].x, infectedPeople[i].y, player.x, player.y) < infectedPeople[i].radius + 10){
      player.color = "red";
      if (player.color = "red"){
        setTimeout(function(){ alert("Aww shucks you got the rona!"); }, 500);
         
      }
    }
    else {
     alive = alive+1;
    }
  }
}   

function pushInfectedToArray() {
  let infected = {
    x: random(width),
    y: random(height),
    z: random(-10,10),
    w : random(-10,10),
    radius : random(20,50),
    color: "green",
  };
  infectedPeople.push(infected);
}

