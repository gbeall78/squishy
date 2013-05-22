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

    userInput: function(e){
      switch(e.which){
        case 37:  //left arrow
        case 65:  //a key
          player.left = true;
          break;
        case 39:  //right arrow
        case 68:  //d key
          player.right = true;
          break;
        case 32:
          player.jump = true;
        default:
      }
    },

    noUserInput: function(e){
      switch(e.which){
        case 37:  //left arrow
        case 65:  //a key
          player.left = false;
          break;
        case 39:  //right arrow
        case 68:  //d key
          player.right = false;
          break;
        case 32:
          player.jump = false;
        default:
      }
    }
  }
}() );

window.addEventListener("keydown",  function(e) { game.userInput(e); }, false);
window.addEventListener("keyup",  function(e) { game.noUserInput(e); }, false);
