class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    //this.imageNo = this.playerCount;
    
    this.angle = 0;
    
    this.rotateAmount = 0;
    //this.angle = Math.atan2(mouseY-this.positionY, mouseX-this.positionX);
    //this.vectorX = camera.offsetX + canvas.width / 2 - mouseX;
    //this.vectorY = camera.offsetY + canvas.height / 2 - mouseY;

    //this.length = Math.sqrt(this.vectorX * this.vectorX + this.vectorY * this.vectorY);
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
    });
  }
 

  //Bp
  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  //Bp
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

 getDistance()
 {
   database.ref("players/player" + this.index).on("value", data =>{
     var data = data.val()
     this.positionX = data.positionX;
     this.positionY = data.positionY;
     //this.image = data.image;
   })
 }

  //Bp
  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }

  update()
  {
    database.ref("players/player" + this.index).update({
      positionX : this.positionX,
      positionY : this.positionY,
      angle : this.angle
    })

  }

  /*playerRotation()
  {
    if (length > 0) {
      this.vectorX /= length;
      this.vectorY /= length;

      this.angle = Math.atan2(vectorY, vectorX) + (90 * Math.PI) / 180;
    }

    
  }*/
  
/*
  updateInGame()
  {
    this.goTheWayWereFacing();
    //this.constrainToMap();
    
    // increment the angle each frame
    this.angle += this.rotateAmount;
  }

  draw() {
    // the push/pop is to prevent the rotation from happening to other stuff!
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    // the plus HALF_PI bit is because I drew the images upside down, sorry!
    rotate(this.angle + HALF_PI);
    
    //image(this.image, 0, 0);
    pop();
  }*/
}
