"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawAt = drawAt;
exports.drawSprite = drawSprite;
exports.Graphics = exports.Canvas = void 0;
var Canvas = document.querySelector('canvas');
exports.Canvas = Canvas;
var Graphics = Canvas.getContext('2d');
exports.Graphics = Graphics;
Graphics.imageSmoothingEnabled = false;

function drawAt(x, y, callback) {
  Graphics.save();
  Graphics.translate(x, y);
  callback();
  Graphics.restore();
}

function drawSprite(obj, x, y) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var scaleX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  var scaleY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
  var rotation = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  drawAt(x, y, function () {
    Graphics.rotate(rotation);
    Graphics.scale(scaleX, scaleY);
    var frame = obj.frames[index];
    Graphics.drawImage(obj.renderable, frame.x, frame.y, frame.w, frame.h, -frame.oX, -frame.oY, frame.w, frame.h);
  });
}