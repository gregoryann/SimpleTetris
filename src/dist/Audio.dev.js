"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playSample = playSample;

var _Context = require("./Audio/Context");

function playSample(sample) {
  var volume,
      toReverb,
      source,
      gainNode,
      _args = arguments;
  return regeneratorRuntime.async(function playSample$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          volume = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
          toReverb = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
          source = _Context.TheAudioContext.createBufferSource();
          _context.next = 5;
          return regeneratorRuntime.awrap(sample);

        case 5:
          source.buffer = _context.sent;

          if (toReverb) {
            source.connect(_Context.TheReverbDestination);
          }

          if (volume !== 1) {
            gainNode = _Context.TheAudioContext.createGain();
            gainNode.gain.setValueAtTime(volume, 0);
            source.connect(gainNode);

            source.onended = function () {
              return gainNode.disconnect(_Context.TheAudioDestination);
            };

            gainNode.connect(_Context.TheAudioDestination);
          } else {
            source.connect(_Context.TheAudioDestination);
          }

          source.start();

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}