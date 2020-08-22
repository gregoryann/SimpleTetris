"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = start;

var _globals = require("./globals");

var _Input = require("./Input");

var _Assets = require("./Assets");

var _SceneManager = require("./SceneManager");

function tick() {
  requestAnimationFrame(tick);

  if (_globals.TheSceneManager.step()) {
    return;
  }

  step();

  _Input.Input.postUpdate();

  render();
}

function step() {
  _globals.TheWorld.step();

  (0, _globals.updateFrame)();
}

function render() {
  _globals.TheWorld.render();
}

function start(setup) {
  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _Assets.loadAssets)());

        case 2:
          (0, _globals.setTheSceneManager)(new _SceneManager.SceneManager());
          _context.next = 5;
          return regeneratorRuntime.awrap(setup());

        case 5:
          tick();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}