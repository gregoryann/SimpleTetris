"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHardDropSound = createHardDropSound;

var _SoundGeneration = require("../SoundGeneration");

function createHardDropSound() {
  var volumeEnvelope = [[0, 0.5, 0.2], [1, 0]];
  return (0, _SoundGeneration.bandPassFilter)((0, _SoundGeneration.applyEnvelope)((0, _SoundGeneration.generateSound)(0.2, _SoundGeneration.sampleNoise), volumeEnvelope), 2000);
}