function Character(id, imageFile){
  "use strict";

  var alive               = true;
  var self                = this;
  this.img                = new Image();
  this.node               = document.createElement("div");
  var drawSpeed           = 100;
  var moveSpeed           = 10;
  var spriteMapXPosition  = 0;
  var spriteMapYPosition  = 0;
  var spriteImageWidth    = 48;
  var spriteImageHeight   = 48;
  var down                = true;
  var xPosition           = 0;
  var yPosition           = 0;

  /*
  this.spawn = function(id, imageFile) {
    this.node.id = id;
    this.node.style.backgroundImage = "url(" + imageFile + ")";
    this.node.style.backgroundPosition = spriteMapXPosition + "px 0px";
  }
  */

  this.spawn = function (gameboard, imageFile) {
    this.img.src = imageFile;
    gameboard.drawImage(this.img, spriteMapXPosition, spriteMapYPosition, spriteImageHeight, spriteImageWidth);
  }

  this.bounce = function(){
    if(spriteMapXPosition <= spriteImageWidth){
      down = true;
    }else if(spriteMapXPosition >= 192){
      down = false;
    }
    
    if(down){
      spriteMapXPosition += spriteImageWidth;
    }else if(!down){
      spriteMapXPosition -= spriteImageWidth;
    }

    this.node.style.backgroundPosition = spriteMapXPosition + "px 0px";
    if(alive){
      setTimeout(function(){ self.bounce(); }, drawSpeed);
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
