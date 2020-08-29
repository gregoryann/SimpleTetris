"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAssets = loadAssets;
exports.AllClearSound = exports.TSpinSound = exports.HoldSound = exports.HardDropSound = exports.LineClearSounds = exports.ShiftSound = exports.LockSound = exports.LandSound = exports.RotateSound = exports.Song1 = exports.LogoSprite = exports.GamepadSprite = exports.EyesSprite = exports.TextsSprite = exports.Font = void 0;

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

var _Texts = _interopRequireDefault(require("./Sprites/Texts"));

var _Eyes = _interopRequireDefault(require("./Sprites/Eyes"));

var _Gamepad = _interopRequireDefault(require("./Sprites/Gamepad"));

var _Logo = _interopRequireDefault(require("./Sprites/Logo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function createSpriteAsset(spriteObject) {
  return new Promise(function (resolve) {
    var img = new Image();

    img.onload = function () {
      spriteObject.renderable = img;
      resolve(spriteObject);
    };

    img.src = spriteObject.dataUrl;
  });
}

var Font;
exports.Font = Font;
var TextsSprite;
exports.TextsSprite = TextsSprite;
var EyesSprite;
exports.EyesSprite = EyesSprite;
var GamepadSprite;
exports.GamepadSprite = GamepadSprite;
var LogoSprite;
exports.LogoSprite = LogoSprite;
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
  var _ref, _ref2;

  return regeneratorRuntime.async(function loadAssets$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Promise.all([ShiftSound, RotateSound, LandSound, LockSound, LineClearSounds[0], LineClearSounds[1], LineClearSounds[2], LineClearSounds[3], HardDropSound, HoldSound, TSpinSound, AllClearSound]));

        case 2:
          _context3.next = 4;
          return regeneratorRuntime.awrap(Promise.all([createSpriteAsset(FontAsset), createSpriteAsset(_Texts["default"]), createSpriteAsset(_Eyes["default"]), createSpriteAsset(_Gamepad["default"]), createSpriteAsset(_Logo["default"])]));

        case 4:
          _ref = _context3.sent;
          _ref2 = _slicedToArray(_ref, 4);
          exports.Font = Font = _ref2[0];
          exports.TextsSprite = TextsSprite = _ref2[1];
          exports.EyesSprite = EyesSprite = _ref2[2];
          exports.GamepadSprite = GamepadSprite = _ref2[3];
          _context3.next = 12;
          return regeneratorRuntime.awrap(createReverb());

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap((0, _Song["default"])());

        case 14:
          exports.Song1 = Song1 = _context3.sent;
          Song1.play();
          document.body.classList.remove('loading');

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  });
}