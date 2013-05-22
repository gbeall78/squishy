function Character(id, imageFile, startYPosition){
  "use strict";

  var self                  = this;
  this.alive                = true;
  this.img                  = new Image();
  this.id                   = "";
  this.canvas               = document.createElement("canvas");
  this.context              = "";
  this.drawSpeed            = 100;
  this.moveSpeed            = 10;
  this.spriteMapXPosition   = 384;
  this.spriteMapYPosition   = 0;
  this.spriteImageWidth     = 48;
  this.spriteImageHeight    = 48;
  this.xPosition            = 0;
  this.yPosition            = 0;
  this.toggleDirection      = false;

  var container = document.getElementById("container");

  this.id = id;
  this.canvas.id = id;
  container.appendChild(this.canvas);
  this.context = document.getElementById(this.id).getContext("2d");
  this.canvas.width = this.canvas.clientWidth;
  this.canvas.height = this.canvas.clientHeight;
    
  this.img.src = imageFile;
  this.yPosition = startYPosition - this.spriteImageHeight;
  this.context.drawImage(this.img, 384, 0, 48, 48, this.xPosition, this.yPosition, 48, 48);
  this.canvas.style.zIndex = "1";
  self.bounce();

};

Character.prototype.bounce = function(){
  "use strict";

  var self                  = this;
  this.context.clearRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);

  if(this.spriteMapXPosition <= 248){
    this.toggleDirection = true ;
  }else if(this.spriteMapXPosition >= 384){
    this.toggleDirection = false;
  }

  if(this.toggleDirection){
    this.spriteMapXPosition += this.spriteImageWidth;
  }else{
    this.spriteMapXPosition -= this.spriteImageWidth;
  }
  
  this.context.drawImage(this.img, this.spriteMapXPosition, 0, 48, 48, this.xPosition, this.yPosition, 48, 48);
  if(this.alive){
    setTimeout(function(){ self.bounce(); }, this.drawSpeed);
  }
};

Character.prototype.move = function(direction, increment){
  "use strict";
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
};

Character.prototype.right = function(){
  "use strict";
    if( (this.xPosition + 1) < screen.availWidth - this.spriteImageWidth){
      xPosition++;
      this.node.style.left = this.xPosition;
      return true;
    }
    return false;
};

Character.prototype.left = function(){
  "use strict";
    if( (xPosition - 1) > 0){
      xPosition--;
      this.node.style.left = xPosition;
      return true;
    }
    return false;
};

Character.prototype.jump  = function(){
  "use strict";
    yPosition++;
};
