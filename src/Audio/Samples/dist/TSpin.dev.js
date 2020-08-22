"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTSpinSound = createTSpinSound;

var _SoundGeneration = require("../SoundGeneration");

var _SongGeneration = require("../SongGeneration");

function createTSpinSound() {
  var volumeEnvelope = [[0.0, 0, 2], [0.1, 0.5], [0.5, 0.5], [0.51, 0], [0.6, 0], [0.61, 0.5], [0.9, 0.5], [1.0, 0.0]];
  var pitchEnvelope = new _SoundGeneration.EnvelopeSampler([[0, 5], [0.3, 12], [0.6, 11], [0.6, 10]]);
  var phase = 0;

  function sampleSkewedSine(t) {
    t %= 1;
    t = (3 - 2 * t) * t * t;
    return (0, _SoundGeneration.sampleSine)(t);
  }

  function sample(t) {
    phase += (0, _SoundGeneration.getFrequencyDelta)((0, _SongGeneration.getFrequencyForTone)(pitch));
    return sampleSkewedSine(phase);
  }

  return (0, _SoundGeneration.applyEnvelope)((0, _SoundGeneration.generateSound)(0.25, sample), volumeEnvelope);
}