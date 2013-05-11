function Character(imageFile){
  "use strict";

  var self                = this;
  var alive               = true;
  var toon                = document.createElement("div");
  var drawSpeed           = 100;
  var xPos                = 0;
  var down                = true;

  var spawn = function(imageFile) {
    toon.id = "player";
    toon.style.backgroundImage = "url(" + imageFile + ")";
    toon.style.backgroundPosition = xPos + "px 0px";
    toon.style.width = 48;
    toon.style.height = 48;
    var body = document.getElementsByTagName("body");
    document.body.appendChild(toon);
  }(imageFile)

  this.bounce = function(){
    if(xPos <= 48){
      down = true;
    }else if(xPos >= 192){
      down = false;
    }
    
    if(down){
      xPos += 48;
    }else if(!down){
      xPos -= 48;
    }

    toon.style.backgroundPosition = xPos + "px 0px";
    if(alive){
      setTimeout(function(){ self.bounce(); }, drawSpeed);
    }
  };

  this.jump  = function(){};
}

function test(){
  var toon1 = new Character(IMAGE_PATH + "smileySprite.png");

  toon1.bounce();
}

//window.onload = test();
