"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createHoldSound;

var _SoundGeneration = require("../SoundGeneration");

var _SongGeneration = require("../SongGeneration");

function createHoldSound() {
  var volumeEnvelope = [[0, 0, 0.5], [0.1, 0.5, 0.2], [1, 0]];
  var filterEnvelope = [[0, 2000, 0.2], [1, 800]];
  return (0, _SoundGeneration.bandPassFilter)((0, _SoundGeneration.applyEnvelope)((0, _SoundGeneration.generateSound)(0.2, _SoundGeneration.sampleNoise), volumeEnvelope), filterEnvelope);
}