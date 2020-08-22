"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextWidth = getTextWidth;
exports.drawText = drawText;
exports.drawBoldText = drawBoldText;
exports.drawTextCentered = drawTextCentered;
exports.drawBoldTextCentered = drawBoldTextCentered;

var _Assets = require("./Assets");

var _Graphics = require("./Graphics");

var GLYPH_WIDTH = 6;
var GLYPH_HEIGHT = 6;

function getTextWidth(text) {
  var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var extraPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var width = 0;
  var x = 0;

  for (var i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      x += GLYPH_WIDTH + extraPadding;
    } else if (text[i] === '\n') {
      x = 0;
    } else {
      x += GLYPH_WIDTH + extraPadding;
      width = Math.max(x, width);
    }
  }

  return width * scale;
}

function drawText(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var extraPadding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var ox = x;
  var oy = y;
  var px = 0;

  for (var i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      px += GLYPH_WIDTH + extraPadding;
    } else if (text[i] === '\n') {
      px = 0;
      py += GLYPH_HEIGHT + 1;
    } else {
      var index = text.charCodeAt(i) - 43;

      if (index >= 4) {
        index--;
      }

      if (index > 15) {
        index -= 6;
      }

      _Graphics.Graphics.drawImage(_Assets.Font.renderable, index * GLYPH_WIDTH, 0, GLYPH_WIDTH - 1, GLYPH_HEIGHT, ox + scale * px, oy + scale * py, scale * (GLYPH_WIDTH - 1), scale * GLYPH_HEIGHT);

      px += GLYPH_WIDTH + extraPadding;
    }
  }
}

function drawBoldText(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  drawText(text, x, y, scale, 1);
  drawText(text, x + scale, y, scale, 1);
}

function drawTextCentered(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var extraPadding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var width = getTextWidth(text, scale, extraPadding);
  drawText(text, x - width / 2, y, scale, extraPadding);
}

function drawBoldTextCentered(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  drawTextCentered(text, x, y, scale, 1);
  drawTextCentered(text, x + scale, y, scale, 1);
}