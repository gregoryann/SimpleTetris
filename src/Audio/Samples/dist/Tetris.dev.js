"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLineClearSoundFactory = createLineClearSoundFactory;
exports.createTetrisSound = exports.createAllClearSound = exports.createTripleLineSound = exports.createDoubleLineSound = exports.createSingleLineSound = void 0;

var _SoundGeneration = require("../SoundGeneration");

var _SongGeneration = require("../SongGeneration");

function createLineClearSoundFactory(tones, length) {
  return function () {
    var phase = 0;

    function sample(pos) {
      var toneIndex = Math.floor(pos * tones.length);
      var freq = (0, _SongGeneration.getFrequencyForTone)(tones[toneIndex]);
      phase += (0, _SoundGeneration.getFrequencyDelta)(freq);
      return (0, _SoundGeneration.samplePulse)(phase, 0.5 - pos * 0.2);
    }

    var envelope = [[0, 0], [0.01 / length, 0.3, 0.5], [1 - 0.01 / length, 0.3, 0.5], [1, 0]];
    return (0, _SoundGeneration.lowPassFilter)((0, _SoundGeneration.applyEnvelope)((0, _SoundGeneration.generateSound)(length, sample), envelope), 4200);
  };
}

var createSingleLineSound = createLineClearSoundFactory([-2], 0.1);
exports.createSingleLineSound = createSingleLineSound;
var createDoubleLineSound = createLineClearSoundFactory([-2, 5], 0.2);
exports.createDoubleLineSound = createDoubleLineSound;
var createTripleLineSound = createLineClearSoundFactory([-2, 5, 10], 0.3);
exports.createTripleLineSound = createTripleLineSound;
var createAllClearSound = createLineClearSoundFactory([10, 17, 10, 17, 10, 5, 5, 8, 8], 0.5);
exports.createAllClearSound = createAllClearSound;
var createTetrisSound = createLineClearSoundFactory([-2, 5, -2, 10, 5, 10, 15, 10, 15, 17, 15, 17, 22], 0.6);
exports.createTetrisSound = createTetrisSound;