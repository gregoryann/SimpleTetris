"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sampleSine = sampleSine;
exports.sampleSawtooth = sampleSawtooth;
exports.sampleTriangle = sampleTriangle;
exports.sampleSquare = sampleSquare;
exports.samplePulse = samplePulse;
exports.sampleNoise = sampleNoise;
exports.sampleEnvelope = sampleEnvelope;
exports.lowPassFilter = lowPassFilter;
exports.highPassFilter = highPassFilter;
exports.bandPassFilter = bandPassFilter;
exports.distort = distort;
exports.sumSounds = sumSounds;
exports.multiplySounds = multiplySounds;
exports.generateSound = generateSound;
exports.applyEnvelope = applyEnvelope;
exports.getFrequencyDelta = getFrequencyDelta;
Object.defineProperty(exports, "EnvelopeSampler", {
  enumerable: true,
  get: function get() {
    return _utils.EnvelopeSampler;
  }
});

var _Context = require("./Context");

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sampleSine(position) {
  return Math.sin(2 * Math.PI * position);
}

function sampleSawtooth(position) {
  return position % 1 * 2 - 1;
}

function sampleTriangle(position) {
  return Math.abs(position % 1 * 2 - 1) * 2 - 1;
}

function sampleSquare(position) {
  return samplePulse(position, 0.5);
}

function samplePulse(position, length) {
  return (position % 1 < length) * 2 - 1;
}

function sampleNoise() {
  return Math.random() * 2 - 1;
}

function sampleEnvelope(position, envelope) {
  for (var i = 0; i < envelope.length - 1; i++) {
    var _envelope$i = _slicedToArray(envelope[i], 3),
        t1 = _envelope$i[0],
        v1 = _envelope$i[1],
        _envelope$i$ = _envelope$i[2],
        curve = _envelope$i$ === void 0 ? 1 : _envelope$i$;

    var _envelope = _slicedToArray(envelope[i + 1], 2),
        t2 = _envelope[0],
        v2 = _envelope[1];

    if (t1 <= position && position < t2) {
      var t = (position - t1) / (t2 - t1);

      if (curve > 1) {
        t = Math.pow(t, curve);
      } else {
        t = 1 - Math.pow(1 - t, 1 / curve);
      }

      return v1 + t * (v2 - v1);
    }
  }

  return envelope[envelope.length - 1][1];
}

function ensureEnvelope(envelopeOrValue) {
  if (typeof envelopeOrValue === 'number') {
    return [[0, envelopeOrValue], [1, envelopeOrValue]];
  }

  return envelopeOrValue;
}

function coefficients(b0, b1, b2, a0, a1, a2) {
  return [b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0];
}

function getHighPassCoefficients(frequency, Q) {
  var n = Math.tan(Math.PI * frequency / _Context.TheAudioContext.sampleRate);
  var nSquared = n * n;
  var invQ = 1 / Q;
  var c1 = 1 / (1 + invQ * n + nSquared);
  return coefficients(c1, c1 * -2, c1, 1, c1 * 2 * (nSquared - 1), c1 * (1 - invQ * n + nSquared));
}

function getLowPassCoefficients(frequency, Q) {
  var n = 1 / Math.tan(Math.PI * frequency / _Context.TheAudioContext.sampleRate);
  var nSquared = n * n;
  var invQ = 1 / Q;
  var c1 = 1 / (1 + invQ * n + nSquared);
  return coefficients(c1, c1 * 2, c1, 1, c1 * 2 * (1 - nSquared), c1 * (1 - invQ * n + nSquared));
}

function getBandPassCoefficients(frequency, Q) {
  var n = 1 / Math.tan(Math.PI * frequency / _Context.TheAudioContext.sampleRate);
  var nSquared = n * n;
  var invQ = 1 / Q;
  var c1 = 1 / (1 + invQ * n + nSquared);
  return coefficients(c1 * n * invQ, 0, -c1 * n * invQ, 1, c1 * 2 * (1 - nSquared), c1 * (1 - invQ * n + nSquared));
}

function filter(buffer, coeffFunction, frequencies, Qs) {
  var lv1 = 0;
  var lv2 = 0;

  for (var i = 0; i < buffer.length; ++i) {
    var freq = sampleEnvelope(i / (buffer.length - 1), frequencies);
    var Q = sampleEnvelope(i / (buffer.length - 1), Qs);
    var coeffs = coeffFunction(freq, Q);
    var inV = buffer[i];
    var outV = inV * coeffs[0] + lv1;
    buffer[i] = outV;
    lv1 = inV * coeffs[1] - outV * coeffs[3] + lv2;
    lv2 = inV * coeffs[2] - outV * coeffs[4];
  }

  return buffer;
}

function lowPassFilter(buffer, frequencies) {
  var Q = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.SQRT1_2;
  return filter(buffer, getLowPassCoefficients, ensureEnvelope(frequencies), ensureEnvelope(Q));
}

function highPassFilter(buffer, frequencies) {
  var Q = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.SQRT1_2;
  return filter(buffer, getHighPassCoefficients, ensureEnvelope(frequencies), ensureEnvelope(Q));
}

function bandPassFilter(buffer, frequencies) {
  var Q = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.SQRT1_2;
  return filter(buffer, getBandPassCoefficients, ensureEnvelope(frequencies), ensureEnvelope(Q));
}

function distort(buffer, amount) {
  for (var i = 0; i < buffer.length; i++) {
    buffer[i] *= amount;
    if (buffer[i] < -1) buffer[i] = -1;else if (buffer[i] > 1) buffer[i] = 1;else buffer[i] = Math.sin(buffer[i] * Math.PI / 2);
    buffer[i] /= amount;
  }

  return buffer;
}

function combineSounds(buffers, func) {
  var maxLength = 0;
  buffers.forEach(function (buffer) {
    maxLength = Math.max(maxLength, buffer.length);
  });
  var outputBuffer = new Float32Array(maxLength);
  buffers.forEach(function (buffer, j) {
    for (var i = 0; i < buffer.length; i++) {
      func(outputBuffer, j, buffer, i, buffers.length);
    }
  });
  return outputBuffer;
}

function sumSounds(buffers) {
  return combineSounds(buffers, function (data, bufferIndex, bufferData, sampleIndex, bufferCount) {
    data[sampleIndex] += bufferData[sampleIndex] / bufferCount;
  });
}

function multiplySounds(buffers) {
  return combineSounds(buffers, function (data, bufferIndex, bufferData, sampleIndex, bufferCount) {
    if (bufferIndex === 0) {
      data[sampleIndex] = 1;
    }

    data[sampleIndex] *= bufferData[sampleIndex] / bufferCount;
  });
}

function generateSound(length, sampleFunction) {
  var buffer = new Float32Array(length * _Context.TheAudioContext.sampleRate);

  for (var i = 0; i < buffer.length; i++) {
    buffer[i] = sampleFunction(i / buffer.length, i / _Context.TheAudioContext.sampleRate);
  }

  return buffer;
}

function applyEnvelope(buffer, envelope) {
  for (var i = 0; i < buffer.length; i++) {
    buffer[i] *= sampleEnvelope(i / buffer.length, envelope);
  }

  return buffer;
}

function getFrequencyDelta(freq) {
  return freq / _Context.TheAudioContext.sampleRate;
}