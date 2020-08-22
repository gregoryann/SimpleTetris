"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAssets = loadAssets;
exports.AllClearSound = exports.TSpinSound = exports.HoldSound = exports.HardDropSound = exports.LineClearSounds = exports.ShiftSound = exports.LockSound = exports.LandSound = exports.RotateSound = exports.Song1 = void 0;

var _utils = require("./utils");

var _Rotate = require("./Audio/Samples/Rotate");

var _Context = require("./Audio/Context");

var _Land = require("./Audio/Samples/Land");

var _Lock = require("./Audio/Samples/Lock");

var _Shift = require("./Audio/Samples/Shift");

var _Tetris = require("./Audio/Samples/Tetris");

var _HardDrop = require("./Audio/Samples/HardDrop");

var _ReverbIR = require("./Audio/Samples/ReverbIR");

var _Hold = _interopRequireDefault(require("./Audio/Samples/Hold"));

var _TSpin = require("./Audio/Samples/TSpin");

var _Song = _interopRequireDefault(require("./Audio/Songs/Song1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createAudioSampleAsset(createSampleFunction) {
  var array, result;
  return regeneratorRuntime.async(function createAudioSampleAsset$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          array = createSampleFunction();
          result = _Context.TheAudioContext.createBuffer(1, array.length, _Context.TheAudioContext.sampleRate);
          result.getChannelData(0).set(array);
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _utils.waitForNextFrame)());

        case 5:
          return _context.abrupt("return", result);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

var Song1;
exports.Song1 = Song1;
var RotateSound = createAudioSampleAsset(_Rotate.createRotateSound);
exports.RotateSound = RotateSound;
var LandSound = createAudioSampleAsset(_Land.createLandSound);
exports.LandSound = LandSound;
var LockSound = createAudioSampleAsset(_Lock.createLockSound);
exports.LockSound = LockSound;
var ShiftSound = createAudioSampleAsset(_Shift.createShiftSound);
exports.ShiftSound = ShiftSound;
var LineClearSounds = [createAudioSampleAsset(_Tetris.createSingleLineSound), createAudioSampleAsset(_Tetris.createDoubleLineSound), createAudioSampleAsset(_Tetris.createTripleLineSound), createAudioSampleAsset(_Tetris.createTetrisSound)];
exports.LineClearSounds = LineClearSounds;
var HardDropSound = createAudioSampleAsset(_HardDrop.createHardDropSound);
exports.HardDropSound = HardDropSound;
var HoldSound = createAudioSampleAsset(_Hold["default"]);
exports.HoldSound = HoldSound;
var TSpinSound = createAudioSampleAsset(_TSpin.createTSpinSound);
exports.TSpinSound = TSpinSound;
var AllClearSound = createAudioSampleAsset(_Tetris.createAllClearSound);
exports.AllClearSound = AllClearSound;

function createReverb() {
  var reverb, ir, irBuffer;
  return regeneratorRuntime.async(function createReverb$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          reverb = _Context.TheAudioContext.createConvolver();
          ir = (0, _ReverbIR.createReverbIR)();
          irBuffer = _Context.TheAudioContext.createBuffer(2, ir[0].length, _Context.TheAudioContext.sampleRate);
          irBuffer.getChannelData(0).set(ir[0]);
          irBuffer.getChannelData(1).set(ir[1]);
          reverb.buffer = irBuffer;
          (0, _Context.setReverbDestination)(reverb);
          _context2.next = 9;
          return regeneratorRuntime.awrap((0, _utils.waitForNextFrame)());

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function loadAssets() {
  return regeneratorRuntime.async(function loadAssets$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Promise.all([ShiftSound, RotateSound, LandSound, LockSound, LineClearSounds[0], LineClearSounds[1], LineClearSounds[2], LineClearSounds[3], HardDropSound, HoldSound, TSpinSound, AllClearSound]));

        case 2:
          _context3.next = 4;
          return regeneratorRuntime.awrap(createReverb());

        case 4:
          _context3.next = 6;
          return regeneratorRuntime.awrap((0, _Song["default"])());

        case 6:
          exports.Song1 = Song1 = _context3.sent;
          Song1.play();
          document.body.classList.remove('loading');

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
}