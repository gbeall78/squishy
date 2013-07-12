var platform = function(data){
  "use strict";

  var that        = {};
  var canvas      = document.createElement("canvas");
  var context     = "";
  var i           ;

  document.getElementById("container").appendChild(canvas);
  canvas.id = "platform";
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  canvas.style.zIndex = 1;
  context = document.getElementById(canvas.id).getContext("2d");

  for(i = 1; data[i] != undefined; i++){
    context.fillStyle = data[i].style;
    context.fillRect(data[i].x,data[i].y,data[i].l,data[i].h);
  }

  return that;
}
