"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Graphics = exports.Canvas = void 0;
var Canvas = document.querySelector('canvas');
exports.Canvas = Canvas;
var Graphics = Canvas.getContext('2d');
exports.Graphics = Graphics;
Graphics.imageSmoothingEnabled = false;