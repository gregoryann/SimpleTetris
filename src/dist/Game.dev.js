"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

var _Input = require("./Input");

var _Level = require("./Level");

var _PauseScreen = require("./PauseScreen");

var _globals = require("./globals");

var Game = {
  scene: new _PauseScreen.PauseScreen(new _Level.Level()),
  start: function start() {
    Game.tick();
  },
  tick: function tick() {
    requestAnimationFrame(Game.tick);

    _Input.Input.preUpdate();

    Game.scene.step();

    _Input.Input.postUpdate();

    Game.scene.render();

    if (_globals.nextScene) {
      Game.scene = _globals.nextScene;
      (0, _globals.setScene)(null);
    }
  }
};
exports.Game = Game;