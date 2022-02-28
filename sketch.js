var canvas;
var jet1 , jet2;
var backgroundImage, bgImg, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers;
var jets = [];
var rotateSpeed;
var edges


//BP
function preload() {
  backgroundImage = loadImage("assets/background.jpg");
  blackJet = loadImage("assets/black-jet.png");
  whiteJet = loadImage("assets/white-jet.png");
  //track = loadImage("../assets/track.jpg");
}

//BP
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  edges = createEdgeSprite()
  angleMode(DEGREES)
  game = new Game();
  game.getState();
  game.start();
  rotateSpeed = 0.05;
}

//BP
function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
  jet1.bounceOff(edges);
  jet2.bounceOff(edges);
  

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

