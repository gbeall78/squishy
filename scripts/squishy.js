var game = ( function() {
  "use strict";
  
  var body          = document.getElementsByTagName("body");
  var player        = {};

  function getLevel(level){
    var request = new XMLHttpRequest();

    request.open("GET", "json/level" + level + ".json", false);
    request.send();

    return JSON.parse(request.responseText);
  }

  return {
    run: function(){
      var gameboard = document.getElementById("gameboard").getContext("2d");

      var level = getLevel(1);
      
      gameboard.canvas.height = gameboard.canvas.clientHeight;
      gameboard.canvas.width = gameboard.canvas.clientWidth;

      //load level.

      player = new Character("player", IMAGE_PATH + "smileySprite.png", level.floor);
      
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
