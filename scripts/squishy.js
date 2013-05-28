var game = (function() {
  "use strict";
  
  var body          = document.getElementsByTagName("body");
  var player        = {};

  function getJson(file){
    var request = new XMLHttpRequest();

    request.open("GET", "json/" + file + ".json", false);
    request.send();

    return JSON.parse(request.responseText);
  }

  return {
    run: function(){
      var gameboard = document.getElementById("gameboard").getContext("2d");

      var playerData = getJson("player");
      var level = getJson("level/1");
      
      gameboard.canvas.height = gameboard.canvas.clientHeight;
      gameboard.canvas.width = gameboard.canvas.clientWidth;

      //load level.

      player = new Character(playerData, level.floor);
      
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
          break;
        default:
          break;
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
          break;
        default:
          break;
      }
    }
  };
}());

window.addEventListener("keydown",  function(e) { game.userInput(e); }, false);
window.addEventListener("keyup",  function(e) { game.noUserInput(e); }, false);
