"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTextWidth = getTextWidth;
exports.getBoldTextWidth = getBoldTextWidth;
exports.drawText = drawText;
exports.drawBoldText = drawBoldText;
exports.drawTextCentered = drawTextCentered;
exports.drawBoldTextCentered = drawBoldTextCentered;
exports.specialGlyphs = exports.GLYPH_HEIGHT = exports.GLYPH_WIDTH = void 0;

var _Assets = require("./Assets");

var _Graphics = require("./Graphics");

var GLYPH_WIDTH = 6;
exports.GLYPH_WIDTH = GLYPH_WIDTH;
var GLYPH_HEIGHT = 6;
exports.GLYPH_HEIGHT = GLYPH_HEIGHT;

function getTextWidth(text) {
  return text.length * GLYPH_WIDTH;
}

function getBoldTextWidth(text) {
  return text.length * (GLYPH_WIDTH + 1);
}

var specialGlyphs = {
  '.': [0, 2],
  ':': [2, 2],
  '!': [4, 2],
  '+': [6, 6],
  '-': [12, 6],
  ',': [18, 3]
};
exports.specialGlyphs = specialGlyphs;

function drawText(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var extraPadding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var ox = x;
  var oy = y;
  var px = 0;
  var py = 0;

  for (var i = 0; i < text.length; i++) {
    if (text[i] === ' ') {
      px += GLYPH_WIDTH + extraPadding;
    } else if (text[i] === '\n') {
      px = 0;
      py += GLYPH_HEIGHT + 2;
    } else {
      var custom = specialGlyphs[text[i]];
      var offset = void 0;
      var width = GLYPH_WIDTH;

      if (custom) {
        offset = custom[0];
        width = custom[1];
      } else if (text[i] < 'A') {
        offset = 25 + (text.charCodeAt(i) - 48) * GLYPH_WIDTH;
      } else {
        offset = 85 + (text.charCodeAt(i) - 65) * GLYPH_WIDTH;
      }

      _Graphics.Graphics.drawImage(_Assets.Font.renderable, offset, 0, width - 1, GLYPH_HEIGHT, ox + scale * px, oy + scale * py, scale * (width - 1), scale * GLYPH_HEIGHT);

      px += width + extraPadding;
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
  drawText(text, x - getTextWidth(text) / 2, y, scale);
}

function drawBoldTextCentered(text, x, y) {
  var scale = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  drawBoldText(text, x - getBoldTextWidth(text) / 2, y, scale);
}