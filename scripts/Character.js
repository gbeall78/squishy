var character = function (cData, startYPosition){
  "use strict";

  // Private variables
  var that                  = {};
  var alive                 = true;
  var img                   = new Image();
  var canvas                = document.createElement("canvas");
  var context               = "";
  
  var drawSpeed            = 100;
  var xPosition            = 0;
  var yPosition            = 0;
  var toggleDirection      = false;
  var spriteMapXPosition    = cData.animation.x
  var spriteMapYPosition    = cData.animation.y

  //Physics & movement settings
  var xVelocity            = 0;
  var yVelocity            = 0;
  var xAcceleration        = 2;
  var yAcceleration        = 2;
  var speedLimit           = 8;
  var friction             = 0.90;
  var rebound              = -0.7;
  var jumpForce            = -20;
  var gravity              = 2;
  var onGround             = true;

  that.left                 = false;
  that.right                = false;
  that.jump                 = false;

  var container = document.getElementById("container");

  // Setup canvas and it's parameters, then create the context.
  canvas.id = cData.name;
  container.appendChild(canvas);
  context = document.getElementById(cData.name).getContext("2d");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
    
  img.src = IMAGE_PATH + cData.imgFile;
  yPosition = startYPosition - cData.animation.height;
  canvas.style.zIndex = "10";

  // Controls where the image is placed on the canvas and the outputs it to the canvas.
  // Placement is determined by keyboard interaction.

  var draw = function(){

    clearViewportValue(
        that.viewport, 
        xPosition, 
        yPosition, 
        cData.animation.width, 
        cData.animation.height, 'player');  //Clear current viewport

    // If no left/right input has been pressed set friction to slow down.
    if(!that.left && !that.right){
      friction = 0.90;
    }else{
      friction = 1;
    }

    // If jump was pressed while on the ground,
    // jump and let everyone know we aren't on the ground.
    // Also cancel friction while in the air (gravity is all
    // that matters).
    if(that.jump && onGround){
      yVelocity += jumpForce;
      onGround = false;
      friction = 1;
    }

    // Increment the acceleration left/right for a smoother experience.
    if(that.left && !that.right){
      xVelocity -= xAcceleration;
    }else if(that.right && !that.left){
      xVelocity += xAcceleration;
    }

    //Apply friction if we are on the ground.
    if(onGround){
      xVelocity *= friction;
      yVelocity = 0;
    }else{
      yVelocity += gravity;
    }

    // Check if we are travelling at the maximum speed and
    // if so refrain from increasing further.
    // For that.jumping be more relaxed
    if(xVelocity > speedLimit){
      xVelocity = speedLimit;
    }else if(xVelocity < -speedLimit){
      xVelocity = -speedLimit;
    }else if(yVelocity > speedLimit * 2){
      yVelocity = speedLimit * 2;
    }

    // Set the new positions.
    var checkMoveX = Math.round(xPosition + xVelocity);
    var checkMoveY = Math.round(yPosition + yVelocity);
    
    var collision   = {"ceiling":undefined, "floor":undefined, "left":undefined, "right":undefined};
    collision = collisionTest(
        that.viewport, 
        checkMoveX, 
        checkMoveY,
        cData.animation.width,
        cData.animation.height);

    // Check whether the new X-position exceeds boundaries.
    // If it does rebound
    if(checkMoveX < 0){
      xVelocity *= rebound;
      xPosition = 0;
    }else if(checkMoveX > canvas.width - cData.animation.width){
      xVelocity *= rebound;
      xPosition = canvas.width - cData.animation.width;
    }else{
      xPosition = checkMoveX;
    }

    // Check whether the new Y-position exceeds boundaries.

    //Hit roof
    if(checkMoveY <= 0){
        yVelocity *= rebound;
        checkMoveY = 0;
    //Landed on floor
    }else if(checkMoveY >= canvas.height - cData.animation.height){
      yVelocity = -gravity;
      onGround = true;
      checkMoveY = canvas.height - cData.animation.height;
    //Hit platform
    }else if(collision.ceiling !== -1){
      yVelocity *= rebound;
      checkMoveY = collision.ceiling;
    }else if(collision.floor !== -1){
      onGround = true;
      yVelocity = -gravity;
      checkMoveY = collision.floor
    }else if(collision.floor == -1){
      onGround = false;
    }
    yPosition = checkMoveY;

    setViewport(
        that.viewport, 
        xPosition, 
        yPosition, 
        cData.animation.width, 
        cData.animation.height, 
        'player');

    // Draw it!!!!!
    context.drawImage(
        img, 
        spriteMapXPosition, 0, cData.animation.width, cData.animation.height, 
        xPosition, yPosition, cData.animation.width, cData.animation.height );
  };

// Cycles through the sprite sheet printing the bounce animation.
// Then calls the draw function to redraw the canvas.
  var bounce = function(){

    //Clear the canvas
    context.clearRect(0, 0, context.canvas.clientWidth, context.canvas.clientHeight);

    //Toggle which way the sprite sheet is being read and as a result the direction of the bounce
    if(spriteMapXPosition <= 240){
      toggleDirection = true;
    }else if(spriteMapXPosition >= 384){
      toggleDirection = false;
    }

    if(toggleDirection){
      spriteMapXPosition += cData.animation.width;
    }else{
      spriteMapXPosition -= cData.animation.width;
    }
    
    // Stop animation if in the air, instead show a single sprite image.
    if(!onGround){
      spriteMapXPosition = 288;
      toggleDirection = false;
    }

    // Draw and recall itself to repeat.
    draw();
    if(alive){
      setTimeout(function(){ bounce(); }, drawSpeed);
    }
  };
  that.bounce = bounce; //Assign the function to that{} to prevent clobbering.

  return that;
}
