var boardWidth = 320;
var boardHeight = 460;
var bwPixels = boardWidth + "px";
var bhPixels = boardHeight + "px";
var redBallHor = 60;
var redBallVer = 160;
var redBallRad = 10;
var howFast = 3;
var blueBoxHor = 270;
var blueBoxVer = 150;
var collisionCount = 0;

// Namespace for SVG.
svgNS = "http://www.w3.org/2000/svg";

// Covers all bases for various browser support.
  var requestAnimationFrame = 
    window.requestAnimationFrame || 
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || 
    window.msRequestAnimationFrame;  

// Event listeners
// Page load event listener
window.addEventListener(
  "load", getLoaded, false);

// Mouse down event listener
window.addEventListener(
  "mousedown", redBallJump, false);
    
// Run this when the page loads.
function getLoaded(){

  // Make sure we are loaded.
  console.log("Page loaded!");     

  // Create SVG parent element.
  myBoard = document.createElementNS(svgNS, "svg");
  myBoard.style.setProperty("width",bwPixels);
  myBoard.style.setProperty("height",bhPixels);
  myBoard.style.setProperty("top","0px");
  myBoard.style.setProperty("left","0px");
  myBoard.style.setProperty("position","absolute");
   
  // You must append the board to the body.
  document.getElementById("pageBody").
       appendChild(myBoard);
       
  // Create blue box.
  blueBox = document.createElementNS(svgNS, "rect");
    
  // Width,  height, radius, and color of box.
  blueBox.x.baseVal.valueAsString = 
    blueBoxHor + "px";
  blueBox.y.baseVal.valueAsString = 
    blueBoxVer + "px";
  blueBox.width.baseVal.valueAsString = 
    "20px";
  blueBox.height.baseVal.valueAsString = 
    "20px";        
  blueBox.style.
    setProperty("fill","blue","");
    
  // Attach the box to the game board.
  myBoard.appendChild(blueBox);

  // Create red ball.
  redBall = document.createElementNS(svgNS, "circle");
    
  // Width,  height, radius, and color of ball.
  redBall.cx.baseVal.valueAsString = 
    redBallHor + "px";
  redBall.cy.baseVal.valueAsString = 
    redBallVer + "px";
  redBall.r.baseVal.valueAsString = 
    redBallRad + "px";
  redBall.style.
    setProperty("fill","red","");
    
  // Attach the ball to the game board.
  myBoard.appendChild(redBall);
  
  // Create ground.
  myGround = 
    document.createElementNS(svgNS, "rect");
    
  // Width,  height, radius, and color of box.
  myGround.x.baseVal.valueAsString = 
    "0px";
  myGround.y.baseVal.valueAsString = 
    "170px";
  myGround.width.baseVal.valueAsString = 
    "320px";
  myGround.height.baseVal.valueAsString = 
    "230px";        
  myGround.style.
    setProperty("fill","chocolate","");
    
  // Attach the box to the game board.
  myBoard.appendChild(myGround);

  // Start the main loop. 
  doMainLoop();
}

// Game loop
function doMainLoop() {
  // Loop within the loop.
  // Outer loop
  // Runs every 1/3 second.
  loopTimer = setTimeout(function() {
  
    // Inner loop
    // Runs as fast as it can.
    animTimer = requestAnimationFrame(doMainLoop);
    
    // Drawing code goes here
    console.log("Moving the box.");
    
    // Move the box
    moveBlueBox();
    
  }, 1000 / howFast); // Delay / how fast      
}
      
// Move the blue box here.
function moveBlueBox() {
  
    // Subtract 10 from box horizontal value.
    blueBoxHor = blueBoxHor - 20;

// Draw the new blue box.
    blueBox.x.baseVal.valueAsString = blueBoxHor + "px"; 

    // If the blue box hits the left edge, restart.
    if (blueBoxHor < 10) 
      blueBoxHor = 270;    

    // Get bounding box of box.
    bbBox = blueBox.getBBox();
    //console.log(bbBox.x);

    // Get bounding box of ball.
    bbBall = redBall.getBBox();
    //console.log(bbBall.x);

    // Is there an x collision?
    if (bbBall.x + 20 == bbBox.x) {

      // Is there a y collision?
      if (bbBall.y == bbBox.y) {        
        // Collision!
        blueBoxHor = 270;
        collisionCount += 1;
        
        var span = document.getElementById('counter');
        
        while (span.firstChild) {
          span.removeChild(span.firstChild);
        };
        
        span.appendChild(document.createTextNode(collisionCount));
  }
}   
}

// Make the red ball jump up.
function redBallJump() {

// Calculate red ball jump and move it.
redBallVer = redBallVer - 50;   

// Draw the new red ball.
redBall.cy.baseVal.valueAsString = 
    redBallVer + "px";       

console.log("Ball up.");

// Make the red ball fall after one second.
redBallTimer = setTimeout(redBallFall, 1000);      
}  

// Make the red ball fall down.
function redBallFall() {

// Calculate the redBox fall and move it.
redBallVer = redBallVer + 50;  

// Draw the new red box.
redBall.cy.baseVal.valueAsString = 
    redBallVer + "px";     
console.log("Ball down.");   
}
