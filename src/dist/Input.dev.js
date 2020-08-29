"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _constants = require("./constants");

var Input = {
  current: {},
  previous: {},
  gamepad: null,
  reset: function reset() {
    Input.current = {};
    Input.previous = {};
  },
  isPressed: function isPressed(button) {
    return Input.gamepad.buttons[button].pressed;
  },
  getAnyKey: function getAnyKey() {
    return Object.values(Input.current).some(function (val) {
      return val;
    });
  },
  getNoKeyPress: function getNoKeyPress() {
    return Object.values(Input.current).every(function (val) {
      return !val;
    });
  },
  getKey: function getKey(input) {
    return !!Input.current[input];
  },
  getKeyDown: function getKeyDown(input) {
    return !!Input.current[input] && !Input.previous[input];
  },
  getKeyUp: function getKeyUp(input) {
    return !Input.current[input] && !!Input.previous[input];
  },
  preUpdate: function preUpdate() {
    if (Input.gamepad) {
      Input.current[_constants.KEY_LEFT] = Input.gamepad.axes[0] < -0.3 || Input.isPressed(14);
      Input.current[_constants.KEY_RIGHT] = Input.gamepad.axes[0] > 0.3 || Input.isPressed(15);
      Input.current[_constants.KEY_UP] = Input.gamepad.axes[1] < -0.3 || Input.isPressed(12);
      Input.current[_constants.KEY_DOWN] = Input.gamepad.axes[1] > 0.3 || Input.isPressed(13);
      Input.current[_constants.KEY_ROTATE_CW] = Input.isPressed(1) || Input.isPressed(3);
      Input.current[_constants.KEY_ROTATE_CCW] = Input.isPressed(0) || Input.isPressed(2);
      Input.current[KEY_HOLD] = Input.isPressed(4) || Input.isPressed(5) || Input.isPressed(6) || Input.isPressed(7);
    }
  },
  postUpdate: function postUpdate() {
    [_constants.KEY_LEFT, _constants.KEY_RIGHT, _constants.KEY_UP, _constants.KEY_DOWN, _constants.KEY_ROTATE_CCW, _constants.KEY_ROTATE_CW, KEY_HOLD].forEach(function (key) {
      Input.previous[key] = Input.current[key];
    });
  }
};
exports.Input = Input;
document.addEventListener('keydown', function (_ref) {
  var keyCode = _ref.keyCode;
  Input.previous[keyCode] = Input.current[keyCode];
  Input.current[keyCode] = true;
}, false);
document.addEventListener('keyup', function (_ref2) {
  var keyCode = _ref2.keyCode;
  Input.previous[keyCode] = Input.current[keyCode];
  Input.current[keyCode] = false;
}, false);
window.addEventListener('gamepadconnected', function (event) {
  if (!Input.gamepad) {
    // So that closure compiler recognizes it as an extern
    Input.gamepad = event['gamepad'];
  }
});