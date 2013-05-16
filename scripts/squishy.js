var game = ( function() {
  "use strict";
  
  var body          = document.getElementsByTagName("body");
  var player        = new Character();

  return {
    run: function(){
      var gameboard = document.querySelector("canvas").getContext("2d");
      
      player.spawn(gameboard, IMAGE_PATH + "smileySprite.png");
      
      //player.spawn("player_1", IMAGE_PATH + "smileySprite.png");
      //player.bounce();  //This should be move into the Character class.
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
