"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createLeadSound;

var _SoundGeneration = require("../SoundGeneration");

function createEnvelope() {
  var result = [];

  for (var i = 0; i <= 1000; i++) {
    var scale = 0.1 + 0.9 * Math.pow(1 - i / 1000, 6);
    result.push([i / 1000, (0, _SoundGeneration.sampleTriangle)(i % 4 / 4) * scale, 2]);
  }

  return result;
}

var pitchEnvelope = createEnvelope();
var volumeEnvelope = [[0, 0, 2], [0.01, 1, 0.3], [1, 0]];

function createLeadSound(frequency) {
  var p = 0;
  var pitchSampler = new _SoundGeneration.EnvelopeSampler(pitchEnvelope);

  function getSample(t) {
    var offset = pitchSampler.sample(t);
    p += (0, _SoundGeneration.getFrequencyDelta)(Math.pow(2, offset / 12) * frequency);
    return (0, _SoundGeneration.sampleSquare)(p);
  }

  return (0, _SoundGeneration.applyEnvelope)((0, _SoundGeneration.generateSound)(2, getSample), volumeEnvelope);
}