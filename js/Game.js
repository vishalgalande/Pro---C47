class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");   
    this.speed = 3;
  }
  
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
 
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start()
  {
    player = new Player();
    playerCount = player.getCount()

    form = new Form()
    form.display()

    jet1 = createSprite(random(150,170),random(100,170),20,20)
    jet1.addImage("whiteJet",whiteJet)
    jet1.scale = 2;
    //jet1.rotation += 10

    jet2 = createSprite(random(50,90),random(100,170),20,20)
    jet2.addImage("blackJet",blackJet)
    jet2.scale = 2;

    jets = [jet1,jet2]
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

     //C39
     this.resetTitle.html("Reset Game");
     this.resetTitle.class("resetText");
     this.resetTitle.position(width / 2 + 200, 40);
 
     this.resetButton.class("resetButton");
     this.resetButton.position(width / 2 + 230, 100);
     this.resetButton.size(50,50)
 
     //this.leadeboardTitle.html("Leaderboard");
     //this.leadeboardTitle.class("resetText");
     //this.leadeboardTitle.position(width / 3 - 60, 40);
 
      //this.leader1.class("leadersText");
      //this.leader1.position(width / 3 - 50, 80);
 
      //this.leader2.class("leadersText");
      //this.leader2.position(width / 3 - 50, 130);
  }

  play()
  {
    //var whiteJ = jet1
    this.handleElements()
    this.handleResetButton()

    Player.getPlayersInfo()

    drawSprites()

    var index = 0;
    for(var plr in allPlayers)
    {
      index = index + 1;

      var x = allPlayers[plr].positionX;
      var y = height - allPlayers[plr].positionY;
      var ang = allPlayers[plr].angle;

      jets[index-1].position.x = x;
      jets[index-1].position.y = y;

      jets[index-1].rotation = ang
    }
    
    //player.playerRotation()
    this.handlePlayerControls()
    //player.constrainToMap()
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }
  
  handlePlayerControls()
  {
    /*if(keyDown(LEFT_ARROW)){
      player.positionX -= 10;
      player.update()
    }
    if(keyDown(RIGHT_ARROW)){
      player.positionX += 10;
      player.update()
    }*/
    if(keyIsDown(RIGHT_ARROW))
    {
      player.angle += 6 + HALF_PI;
    }

    if(keyIsDown(LEFT_ARROW))
    {
      player.angle -= 6 + HALF_PI;
    }

    if(keyDown(UP_ARROW)){
      
        player.positionX += this.speed * sin(player.angle );
        player.positionY += this.speed * cos(player.angle);
        player.update()
    }

    
  }

  /*keyPressed() {
    if (keyCode === RIGHT_ARROW) {
      blackJet.rotateAmount = rotateSpeed;
    } else if (keyCode === LEFT_ARROW) {
      blackJet.rotateAmount = -rotateSpeed;
    } else if (keyCode === 68) {
      // d
      whiteJet.rotateAmount = rotateSpeed;
    } else if (keyCode === 65) { 
      // a
      whiteJet.rotateAmount = -rotateSpeed;
    }
  }
  
  keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      blackJet.rotateAmount = 0;
    } else if (keyCode === 65 || keyCode === 68) {
      whiteJet.rotateAmount = 0;
    }
  }
  */


}
