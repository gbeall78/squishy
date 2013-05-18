var game = ( function() {
  "use strict";
  
  var body          = document.getElementsByTagName("body");
  var player        = new Character();

  function getLevel(level){
    var request = new XMLHttpRequest();
    var data    = {};
    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == 200){
         data = JSON.parse(request.responseText);
         return data;
      }
    }

    request.open("GET", "json/level" + level + ".json", true);
    request.send();
  }

  return {
    run: function(){
      var gameboard = document.querySelector("canvas").getContext("2d");

      var level = getLevel(1);
      
      gameboard.canvas.height = gameboard.canvas.clientHeight;
      gameboard.canvas.width = gameboard.canvas.clientWidth;

      player.spawn(gameboard, IMAGE_PATH + "smileySprite.png", level.floor);
      
      //player.spawn("player_1", IMAGE_PATH + "smileySprite.png");
      //player.bounce(gameboard);  //This should be move into the Character class.
      //document.body.appendChild(player.node);
    },
    userInput: function(input){
      switch(input.which){
        case 37:  //left arrow
        case 65:  //a key
          player.move('Left', 16);
          break;
        case 39:  //right arrow
        case 68:  //d key
          player.move('Right', 16);
          break;
        case 32:
          player.move('jump', 32);
        default:
      }
    }
  }
}() );

window.onkeydown = function(e){ game.userInput(e) };
