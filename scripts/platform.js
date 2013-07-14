var platform = function(id, data, viewport){
  "use strict";

  var that        = {};
  var canvas      = document.createElement("canvas");
  var context     = "";

  document.getElementById("container").appendChild(canvas);
  canvas.id = "platform";
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  canvas.style.zIndex = 1;
  context = document.getElementById(canvas.id).getContext("2d");

  context.fillStyle = data.style;
  context.fillRect(data.x, data.y, data.l, data.h);
  setViewport(viewport, data.x, data.y, data.l, data.h, "platform");

  var centerX = function(){
    return data.x + data.w / 2;
  }
  that.centerX = centerX;

  var centerY = function(){
    return data.y + data.h / 2;
  }
  that.centerY = centerY;

  var halfWidth = function(){
    return data.w / 2;
  }
  that.halfWidth = halfWidth;

  var halfHeight = function(){
    return data.h / 2;
  }
  that.halfHeight = halfHeight;

  return that;
}
