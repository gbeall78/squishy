function Character(id, imageFile, startYPosition){
  "use strict";

  var self                  = this;
  this.alive                = true;
  this.img                  = new Image();
  this.id                   = "";
  this.canvas               = document.createElement("canvas");
  this.context              = "";
  this.drawSpeed            = 100;
  this.spriteMapXPosition   = 384;
  this.spriteMapYPosition   = 0;
  this.spriteImageWidth     = 48;
  this.spriteImageHeight    = 48;
  this.xPosition            = 0;
  this.yPosition            = 0;
  this.xVelocity            = 0;
  this.yVelocity            = 0;
  this.xAcceleration        = 1;
  this.yAcceleration        = 0.2;
  this.speedLimit           = 5;
  this.rebound              = -0.7;
  this.gravity              = 0.3;
  this.toggleDirection      = false;
  this.left                 = false;
  this.right                = false;
  this.jump                 = false;
  this.onGround             = undefined;

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
  this.bounce();

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
  
  this.draw();
  if(this.alive){
    setTimeout(function(){ self.bounce(); }, this.drawSpeed);
  }
};

Character.prototype.draw = function(){
  "use strict";

  if(!this.left && !this.right){
    this.xVelocity = 0;
  }else if(this.left && !this.right){
    this.xVelocity -= this.xAcceleration;
  }else if(this.right && !this.left){
    this.xVelocity += this.xAcceleration;
  }

  if(this.xVelocity > this.speedLimit){
    this.xVelocity = this.speedLimit;
  }else if(this.xVelocity < -this.speedLimit){
    this.xVelocity = -this.speedLimit;
  }

  var checkMoveX = this.xPosition + this.xVelocity;

  if(checkMoveX >= 0 && checkMoveX <= this.canvas.width - this.spriteImageWidth){
    this.xPosition = checkMoveX;
  }

  this.context.drawImage(this.img, this.spriteMapXPosition, 0, 48, 48, this.xPosition, this.yPosition, 48, 48);
};
