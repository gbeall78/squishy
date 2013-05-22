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

  //Physic settings
  this.xVelocity            = 0;
  this.yVelocity            = 0;
  this.xAcceleration        = 2;
  this.yAcceleration        = 2;
  this.speedLimit           = 8;
  this.friction             = 0.90;
  this.rebound              = -0.7;
  this.jumpForce            = -20;
  this.gravity              = 2;
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
  this.canvas.style.zIndex = "1";
  this.bounce();
};

Character.prototype.bounce = function(){
  "use strict";

  var self                  = this;
  this.context.clearRect(0, 0, this.context.canvas.clientWidth, this.context.canvas.clientHeight);

  if(this.spriteMapXPosition <= 240){
    this.toggleDirection = true;
  }else if(this.spriteMapXPosition >= 384){
    this.toggleDirection = false;
  }

  if(this.toggleDirection){
    this.spriteMapXPosition += this.spriteImageWidth;
  }else{
    this.spriteMapXPosition -= this.spriteImageWidth;
  }
  
  if(!this.onGround){
    this.spriteMapXPosition = 288;
    this.toggleDirection = false;
  }

  this.draw();
  if(this.alive){
    setTimeout(function(){ self.bounce(); }, this.drawSpeed);
  }
};

Character.prototype.draw = function(){
  "use strict";
  var friction;

  if(!this.left && !this.right){
    friction = this.friction;
  }else{
    friction = 1;
  }

  if(this.jump && this.onGround){
    this.yVelocity += this.jumpForce;
    this.onGround = false;
    friction = 1;
  }

  if(this.left && !this.right){
    this.xVelocity -= this.xAcceleration;
  }else if(this.right && !this.left){
    this.xVelocity += this.xAcceleration;
  }

  if(this.onGround){
    this.xVelocity *= friction;
  }
  this.yVelocity += this.gravity;

  if(this.xVelocity > this.speedLimit){
    this.xVelocity = this.speedLimit;
  }else if(this.xVelocity < -this.speedLimit){
    this.xVelocity = -this.speedLimit;
  }else if(this.yVelocity > this.speedLimit * 2){
    this.yVelocity = this.speedLimit * 2;
  }

  var checkMoveX = this.xPosition + this.xVelocity;
  var checkMoveY = this.yPosition + this.yVelocity;

  if(checkMoveX < 0){
    this.xVelocity *= this.rebound;
    this.xPosition = 0;
  }else if(checkMoveX > this.canvas.width - this.spriteImageWidth){
    this.xVelocity *= this.rebound;
    this.xPosition = this.canvas.width - this.spriteImageWidth;
  }else{
    this.xPosition = checkMoveX;
  }

  if(checkMoveY < 0){
    this.yVelocity *= this.rebound;
    this.yPosition = 0;
  }else if(checkMoveY > this.canvas.height - this.spriteImageHeight){
    this.yPosition = this.canvas.height - this.spriteImageHeight;
    this.yVelocity = -this.gravity;
    this.onGround = true;
  }else{
    this.yPosition = checkMoveY;
  }

  this.context.drawImage(
      this.img, 
      this.spriteMapXPosition, 0, this.spriteImageWidth, this.spriteImageHeight, 
      this.xPosition, this.yPosition, this.spriteImageWidth, this.spriteImageHeight
  );
};
