"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeTetromino = makeTetromino;
exports.Tetromino = void 0;

var _constants = require("../constants");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tetromino =
/*#__PURE__*/
function () {
  function Tetromino() {
    _classCallCheck(this, Tetromino);

    this.rotation = 0;
    this.x = 0;
    this.y = 0;
    this.scared = false;
    this.eyesIndex = 0;
    this.eyeDirection = [0, 0];
    this.eyeUpdateTimer = 0;
    this.randomness = 0.01;
  }

  _createClass(Tetromino, [{
    key: "move",
    value: function move(dx, dy) {
      this.x += dx;
      this.y += dy;
    }
  }, {
    key: "rotateCW",
    value: function rotateCW() {
      this.rotation = (this.rotation + 1) % 4;
    }
  }, {
    key: "rotateCCW",
    value: function rotateCCW() {
      this.rotation = (this.rotation + 3) % 4;
    }
  }, {
    key: "updateEyes",
    value: function updateEyes() {
      this.eyeUpdateTimer++;

      if (this.eyeUpdateTimer > 60 && Math.random() < this.randomness) {
        if (this.eyesIndex) {
          this.eyesIndex = 0;
        } else {
          // Blink
          if (Math.random() < 0.4) {
            this.eyeUpdateTimer = 50;
            this.randomness = 1;
            this.eyesIndex = 1;
            return;
          }
        }

        this.eyeUpdateTimer = 0;
        this.randomness = 0.01;
        this.eyeDirection = [Math.random() * 4 - 2, Math.random() * 4 - 2];
      }
    }
  }, {
    key: "getEyesPosition",
    value: function getEyesPosition() {
      return this.getBlockPositions()[1];
    }
  }, {
    key: "lookDown",
    value: function lookDown() {
      this.eyeDirection = [0, 2];
      this.eyeUpdateTimer = 30;
      this.randomness = 1;
    }
  }, {
    key: "getId",
    value: function getId() {// abstract function
    }
  }, {
    key: "getColor",
    value: function getColor() {// abstract function
    }
  }, {
    key: "getBlockPositions",
    value: function getBlockPositions() {// abstract function
    }
  }, {
    key: "getWallKicksCW",
    value: function getWallKicksCW() {// abstract function
    }
  }, {
    key: "getWallKicksCCW",
    value: function getWallKicksCCW() {// abstract function
    }
  }]);

  return Tetromino;
}();

exports.Tetromino = Tetromino;

function makeTetromino(id, positions, wallKicks) {
  return (
    /*#__PURE__*/
    function (_Tetromino) {
      _inherits(_class, _Tetromino);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "getId",
        value: function getId() {
          return id;
        }
      }, {
        key: "getColor",
        value: function getColor() {
          return _constants.COLORS[id];
        }
      }, {
        key: "getBlockPositions",
        value: function getBlockPositions() {
          var _this = this;

          return positions[this.rotation].map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                x = _ref2[0],
                y = _ref2[1];

            return [_this.x + x, _this.y + y];
          });
        }
      }, {
        key: "getWallKicksCW",
        value: function getWallKicksCW() {
          return wallKicks[this.rotation];
        }
      }, {
        key: "getWallKicksCCW",
        value: function getWallKicksCCW() {
          return wallKicks[(this.rotation + 3) % 4].map(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                x = _ref4[0],
                y = _ref4[1];

            return [-x, -y];
          });
        }
      }]);

      return _class;
    }(Tetromino)
  );
}