var game = (function() {
  "use strict";
  
  var body          = document.getElementsByTagName("body");
  var viewport      = [];   //Contains the locations of currently viewable items
  var platforms     = {};
  var player        = {};

  function getJson(file){
    var request = new XMLHttpRequest();

    request.open("GET", "json/" + file + ".json", false);
    request.send();

    return JSON.parse(request.responseText);
  }


  var setViewport = function(x, y, width, height, value){
    try{
      for(var i = 0; i < width; i++){
        for(var j = 0; j < height; j++){
          viewport[x + i][y + j] = value;
        }
      }
    }catch(e){
      console.log(e);
    }
  }

  return {
    run: function(){

      for(var x = 0; x < VIEWPORT_WIDTH; x++){
        viewport[x] = [];
        for(var y = 0; y < VIEWPORT_HEIGHT; y++){
          viewport[x][y] = '';
        }
      }

      var gameboard = document.getElementById("gameboard").getContext("2d");

      var playerData = getJson("player");
      var level = getJson("level/1");
      
      gameboard.canvas.height = gameboard.canvas.clientHeight;
      gameboard.canvas.width = gameboard.canvas.clientWidth;

      //load level.
      //

      platforms = platform(level.platform);
      platforms.viewport = viewport;

      player = character(playerData, level.floor);
      player.viewport = viewport;
      player.bounce();
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
