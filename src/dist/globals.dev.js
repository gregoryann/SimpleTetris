"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setScene = setScene;
exports.resetScore = resetScore;
exports.addToScore = addToScore;
exports.resetLineClears = resetLineClears;
exports.addLineClears = addLineClears;
exports.currentLevel = exports.lineClears = exports.currentScore = void 0;
var currentScore = 0;
exports.currentScore = currentScore;
var lineClears = 0;
exports.lineClears = lineClears;
var currentLevel = 1;
exports.currentLevel = currentLevel;

function setScene(scene) {
  currentScene = scene;
}

function resetScore() {
  exports.currentScore = currentScore = 0;
}

function addToScore(amount) {
  exports.currentScore = currentScore = currentScore + amount;
}

function resetLineClears() {
  exports.lineClears = lineClears = 0;
  exports.currentLevel = currentLevel = 1;
}

function addLineClears(amount) {
  exports.lineClears = lineClears = lineClears + amount;
  exports.currentLevel = currentLevel = Math.floor(lineClears / 10) + 1;
}