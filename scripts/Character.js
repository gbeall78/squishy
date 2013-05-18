function Character(id, imageFile){
  "use strict";

  var alive               = true;
  var self                = this;
  this.img                = new Image();
  this.node               = document.createElement("div");
  var drawSpeed           = 100;
  var moveSpeed           = 10;
  var spriteMapXPosition  = 384;
  var spriteMapYPosition  = 0;
  var spriteImageWidth    = 48;
  var spriteImageHeight   = 48;
  var xPosition           = 0;
  var yPosition           = 0;
  var toggleDirection     = false;


  /*
  this.spawn = function(id, imageFile) {
    this.node.id = id;
    this.node.style.backgroundImage = "url(" + imageFile + ")";
    this.node.style.backgroundPosition = spriteMapXPosition + "px 0px";
  }
  */

  this.spawn = function (gameboard, imageFile, startPosition) {
    this.img.src = imageFile;
    this.yPosition = startPosition - spriteImageHeight;
    gameboard.drawImage(this.img, 384, 0, 48, 48, xPosition, this.yPosition, 48, 48);
    self.bounce(gameboard);
  }

  this.bounce = function(gameboard){

    gameboard.clearRect(0, 0, gameboard.canvas.clientWidth, gameboard.canvas.clientHeight);

    if(spriteMapXPosition <= 248){
      toggleDirection = true ;
    }else if(spriteMapXPosition >= 384){
      toggleDirection = false;
    }

    if(toggleDirection){
      spriteMapXPosition += spriteImageWidth;
    }else{
      spriteMapXPosition -= spriteImageWidth;
    }
    
    gameboard.drawImage(this.img, spriteMapXPosition, 0, 48, 48, xPosition, this.yPosition, 48, 48);
    if(alive){
      setTimeout(function(){ self.bounce(gameboard); }, drawSpeed);
    }
  };

  this.move = function(direction, increment){
    if(increment <= 0){
      return false;
    }else{
      increment--;
    }

    switch(direction.toLowerCase()){
      case 'right':
        if(!this.right()){
          return false;
        }
        break;
      case 'left':
        if(!this.left()){
          return false;
        }
        break;
      case 'jump':
        if(!this.jump()){
          return false;
        }
        break;
      default:
    }

    if(self.move){
      setTimeout(function(){ self.move(direction, increment); }, moveSpeed);
    }

  }

  this.right = function(){
    if( (xPosition + 1) < screen.availWidth - spriteImageWidth){
      xPosition++;
      this.node.style.left = xPosition;
      return true;
    }
    return false;
  }

  this.left = function(){
    if( (xPosition - 1) > 0){
      xPosition--;
      this.node.style.left = xPosition;
      return true;
    }
    return false;
  }

  this.jump  = function(){
    yPosition++;
  };

}
