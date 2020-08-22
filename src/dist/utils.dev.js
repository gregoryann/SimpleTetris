"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = sign;
exports.clamp = clamp;
exports.approach = approach;
exports.overlapping = overlapping;
exports.manhattanDistance = manhattanDistance;
exports.distanceSquared = distanceSquared;
exports.randomInt = randomInt;
exports.hasTag = hasTag;
exports.generateImage = generateImage;
exports.renderSolidSquare = renderSolidSquare;
exports.makeColorWithAlpha = makeColorWithAlpha;
exports.waitForNextFrame = waitForNextFrame;
exports.debug = debug;
exports.forRectangularRegion = exports.getCellY = exports.getCellX = void 0;

var _constants = require("./constants");

var _globals = require("./globals");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sign(x) {
  if (x > 0) return 1;
  if (x < 0) return -1;
  return 0;
}

function clamp(x, min, max) {
  return Math.min(Math.max(x, min), max);
}

function approach(x, target, acc) {
  return x > target ? Math.max(x - acc, target) : Math.min(x + acc, target);
}

function overlapping(rect1, rect2) {
  return rect1.x + rect1.width > rect2.x && rect1.x < rect2.x + rect2.width && rect1.y + rect1.height > rect2.y && rect1.y < rect2.y + rect2.height;
}

function manhattanDistance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function distanceSquared(x1, y1, x2, y2) {
  var dx = Math.abs(x1 - x2);
  var dy = Math.abs(y1 - y2);
  return dx * dx + dy * dy;
}

function randomInt(upper) {
  return Math.floor(upper * Math.random());
}
/**
 * Tiling utilities
 */


var getCellX = function getCellX(x) {
  return Math.floor(x / _constants.TILE_SIZE);
};

exports.getCellX = getCellX;
var getCellY = getCellX;
exports.getCellY = getCellY;

var forRectangularRegion = function forRectangularRegion(x0, y0, x1, y1, callback) {
  for (var yi = y0; yi <= y1; yi++) {
    for (var xi = x0; xi <= x1; xi++) {
      callback(xi, yi);
    }
  }
};
/**
 * Entity system utilities
 */


exports.forRectangularRegion = forRectangularRegion;

function hasTag(obj, tag) {
  return !!(obj.tags & tag);
}
/**
 * Image generation utilities
 */


function generateImage(width, height, callback) {
  var canvas, blob;
  return regeneratorRuntime.async(function generateImage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          _context.next = 5;
          return regeneratorRuntime.awrap(callback(canvas.getContext('2d')));

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return canvas.toBlob(resolve);
          }));

        case 7:
          blob = _context.sent;
          return _context.abrupt("return", new Promise(function (resolve) {
            var img = new Image();

            img.onload = function () {
              return resolve(img);
            };

            img.src = URL.createObjectURL(blob);
          }));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function renderSolidSquare(ctx, x, y) {
  ctx.fillStyle = makeColorWithAlpha(_globals.TheColorScheme.fg, 0.94 - 0.01 + Math.random() * 0.02);
  ctx.fillRect(x * _constants.TILE_SIZE, y * _constants.TILE_SIZE, _constants.TILE_SIZE, _constants.TILE_SIZE);
}
/**
 * Color utilities
 */


function makeColorWithAlpha(color, alpha) {
  var _$exec = /^(\w+)\((.*)\)$/.exec(color),
      _$exec2 = _slicedToArray(_$exec, 3),
      _ = _$exec2[0],
      type = _$exec2[1],
      args = _$exec2[2];

  return "".concat(type, "(").concat(args, ",").concat(alpha, ")");
}
/**
 * Waiting for the next frame is useful for preventing the browser to hang
 * while the assets are being generated
 */


function waitForNextFrame() {
  return regeneratorRuntime.async(function waitForNextFrame$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(new Promise(function (resolve) {
            return requestAnimationFrame(resolve);
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}
/**
 * Debugging utilities
 */


function debug(thing) {
  console.log(_globals.frame, thing);
}