"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawText = drawText;
exports.drawBoldText = drawBoldText;

var _Assets = require("./Assets");

var _Graphics = require("./Graphics");

var GLYPH_WIDTH = 6;
var GLYPH_HEIGHT = 6;

function drawText(text, x, y) {
  var extraPadding = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var px = x;
  var py = y;

  for (var i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      px += GLYPH_WIDTH + extraPadding;
    } else if (text[i].match(/\n|#/)) {
      px = x;
      py += GLYPH_HEIGHT + 1;
    } else {
      var index = text.charCodeAt(i) - 43;

      if (index >= 5) {
        index -= 4;
      }

      if (index > 10) {
        index -= 7;
      }

      _Graphics.Graphics.drawImage(_Assets.Font.renderable, index * GLYPH_WIDTH, 0, GLYPH_WIDTH - 1, GLYPH_HEIGHT, px, py, GLYPH_WIDTH - 1, GLYPH_HEIGHT);

      px += GLYPH_WIDTH + extraPadding;
    }
  }
}

function drawBoldText(text, x, y) {
  drawText(text, x, y, 1);
  drawText(text, x + 1, y, 1);
}