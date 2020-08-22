"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReverbDestination = setReverbDestination;
exports.TheReverbDestination = exports.TheAudioDestination = exports.TheAudioContext = void 0;
var TheAudioContext = new AudioContext();
exports.TheAudioContext = TheAudioContext;
var TheAudioDestination = TheAudioContext.createDynamicsCompressor();
exports.TheAudioDestination = TheAudioDestination;
TheAudioDestination.knee.setValueAtTime(40, 0);
TheAudioDestination.threshold.setValueAtTime(-12, 0);
TheAudioDestination.connect(TheAudioContext.destination);
var TheReverbDestination;
exports.TheReverbDestination = TheReverbDestination;

function setReverbDestination(reverb) {
  exports.TheReverbDestination = TheReverbDestination = TheAudioContext.createGain();
  TheReverbDestination.gain.value = 0.7;
  TheReverbDestination.connect(reverb);
  reverb.connect(TheAudioDestination);
}