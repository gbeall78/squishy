var setViewport = function(viewport, x, y, width, height, value){
  "use strict";

  try{
    for(var i = 0; i < width; i++){
      for(var j = 0; j < height; j++){
        if(viewport[x + i][y + j] === ''){
          viewport[x + i][y + j] = value;
          if(value == 'player'){
            //console.log("viewport[" . x + i . "][" . y + j . "]");
          }
        }
      }
    }
  }catch(e){
    console.log(e);
  }
}

var clearViewportValue = function(viewport, x, y, width, height, value){
  "use strict";

  try{
    for(var i = 0; i < width; i++){
      for(var j = 0; j < height; j++){
        if(viewport[x + i][y + j] === value){
          viewport[x + i][y + j] = '';
        }
      }
    }
  }catch(e){
    console.log(e);
  }
}

var collisionTest = function(viewport, x, y, width, height){
  "use strict";

  var test  = {"ceiling":-1,"floor":-1,"left":-1,"right":-1};


  if(viewport[0] === undefined){
    throw "viewport not defined";
  }

  if(x < 0){
    x = 0;
  }else if(x > viewport.length - 1){
    x = viewport.length - 1;
  }

  if(y < 0){
    y = 0;
  }else if(y > viewport[0].length - 1){
    y = viewport[0].length - 1;
  }

  try{

    //Check the top and bottom edges
    for(var i = 0; i < width; i++){
      if(viewport[x + i][y] !== ''){
        test.ceiling = y;
        break;
      }else if(viewport[x + i][y + height] !== ''){
        test.floor = y;
        break;
      }
    }

    //Check the left and right edges
    for(var i = 0; i < height; i++){
      if(viewport[x][y + i] === ''){
        test.left = x;
        break;
      }else if(viewport[x + height][y + i] === ''){
        test.right = x - width;
        break;
      }
    }

  }catch(e){
    console.log(e);
  }

  return test;
}
