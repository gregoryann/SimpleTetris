"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSong;

var _Context = require("../Context");

var _SongGeneration = require("../SongGeneration");

var _Lead = require("./Song1/Lead");

var _Utility = require("../Utility");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function createSong() {
  var bpm, trackBeatCount, sampleCount, _ref, _ref2, channelLead;

  return regeneratorRuntime.async(function createSong$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          bpm = 132;
          trackBeatCount = 12 * 4;
          sampleCount = trackBeatCount * 60 * _Context.TheAudioContext.sampleRate / bpm;
          _context.next = 5;
          return regeneratorRuntime.awrap(Promise.all([_Lead.createLeadTrack].map(function (func) {
            return (0, _SongGeneration.createChannel)(func, sampleCount, bpm);
          })));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          channelLead = _ref2[0];
          return _context.abrupt("return", new _SongGeneration.Song([{
            source: channelLead,
            volume: (0, _Utility.decibelsToAmplitude)(-14),
            sendToReverb: 1
          }]));

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}