"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSoundToBuffer = addSoundToBuffer;
exports.addNotes = addNotes;
exports.getOffsetForBeat = getOffsetForBeat;
exports.getFrequencyForTone = getFrequencyForTone;
exports.repeatNotes = repeatNotes;
exports.addOctave = addOctave;
exports.zipRhythmAndNotes = zipRhythmAndNotes;
exports.offsetNotes = offsetNotes;
exports.createChannel = createChannel;
exports.Song = void 0;

var _Context = require("./Context");

var _utils = require("../utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function addSoundToBuffer(sourceData, targetData, offset) {
  if (!Array.isArray(sourceData)) {
    sourceData = [sourceData];
  }

  if (!Array.isArray(targetData)) {
    targetData = [targetData];
  }

  for (var i = 0; i < targetData.length; i++) {
    var sourceDataBuffer = sourceData[i % sourceData.length];
    var targetDataBuffer = targetData[i % targetData.length];
    var maxJ = Math.min(offset + sourceDataBuffer.length, targetDataBuffer.length);

    for (var j = offset; j < maxJ; j++) {
      targetDataBuffer[j] += sourceDataBuffer[j - offset];
    }
  }
}

function addNotes(notes, output, instrument, bpm) {
  var bufferCache = {};
  notes.forEach(function (note) {
    var key = note.slice(1).join('|');

    if (!bufferCache[key]) {
      bufferCache[key] = instrument.apply(void 0, [getFrequencyForTone(note[1])].concat(_toConsumableArray(note.slice(2))));
    }

    addSoundToBuffer(bufferCache[key], output, getOffsetForBeat(note[0], bpm));
  });
}

function getOffsetForBeat(n, bpm) {
  return Math.round(_Context.TheAudioContext.sampleRate * n * 60 / bpm);
}

function getFrequencyForTone(n) {
  return 440 * Math.pow(2, n / 12);
}

function repeatNotes(x, length, repeat) {
  var result = [];

  var _loop = function _loop(i) {
    x.forEach(function (_ref) {
      var _ref2 = _toArray(_ref),
          b = _ref2[0],
          args = _ref2.slice(1);

      result.push([b + length * i].concat(_toConsumableArray(args)));
    });
  };

  for (var i = 0; i < repeat; i++) {
    _loop(i);
  }

  return result;
}

function addOctave(notes) {
  for (var i = 0, l = notes.length; i < l; i++) {
    var _notes$i = _toArray(notes[i]),
        offset = _notes$i[0],
        note = _notes$i[1],
        rest = _notes$i.slice(2);

    notes.push([offset, note + 12].concat(_toConsumableArray(rest)));
  }

  return notes;
}

function zipRhythmAndNotes(rhythm, notes) {
  return rhythm.map(function (beat, index) {
    return [beat, notes[index]];
  });
}

function offsetNotes(notes, amount) {
  notes.forEach(function (note) {
    note[0] += amount;
  });
  return notes;
}

function createChannel(trackFunction, sampleCount, bpm) {
  var channel, buffer;
  return regeneratorRuntime.async(function createChannel$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          channel = _Context.TheAudioContext.createBufferSource();
          channel.loop = true;
          buffer = _Context.TheAudioContext.createBuffer(1, sampleCount, _Context.TheAudioContext.sampleRate);
          trackFunction(buffer.getChannelData(0), bpm);
          channel.buffer = buffer;
          _context.next = 7;
          return regeneratorRuntime.awrap((0, _utils.waitForNextFrame)());

        case 7:
          return _context.abrupt("return", channel);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

var Song =
/*#__PURE__*/
function () {
  function Song(channels) {
    _classCallCheck(this, Song);

    var master = _Context.TheAudioContext.createGain();

    this.channels = channels.map(function (channel) {
      var sourceNode = channel.source;

      var gainNode = _Context.TheAudioContext.createGain();

      gainNode.gain.value = channel.volume;
      sourceNode.connect(gainNode);
      gainNode.connect(master);

      if (channel.sendToReverb) {
        var gain = _Context.TheAudioContext.createGain();

        gain.gain.value = channel.sendToReverb;
        gainNode.connect(gain);
        gain.connect(_Context.TheReverbDestination);
      }

      return {
        source: sourceNode,
        volumeParam: gainNode.gain
      };
    });
    master.connect(_Context.TheAudioDestination);
  }

  _createClass(Song, [{
    key: "setVolume",
    value: function setVolume(channel, volume) {
      var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      this.channels[channel].volumeParam.linearRampToValueAtTime(volume, _Context.TheAudioContext.currentTime + time);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.channels.forEach(function (channel) {
        channel.source.playbackRate.setValueAtTime(1, _Context.TheAudioContext.currentTime);
        channel.source.playbackRate.linearRampToValueAtTime(0.0001, _Context.TheAudioContext.currentTime + 1);
      });
    }
  }, {
    key: "play",
    value: function play() {
      this.channels.forEach(function (channel) {
        channel.source.start();
      });
    }
  }]);

  return Song;
}();

exports.Song = Song;