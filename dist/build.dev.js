"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var rollup = require('rollup');

var fs = require('fs');

var tempfile = require('tempfile');

var ClosureCompiler = require('google-closure-compiler').compiler;

var rollupPluginJson = require('rollup-plugin-json');

var rollupPluginUrl = require('rollup-plugin-url');

var childProcess = require('child_process');

var minifyHtml = require('html-minifier').minify;

function asyncCompile(compiler) {
  return new Promise(function (resolve) {
    return compiler.run(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return resolve(args);
    });
  });
}

var closureCompilerPlugin = {
  name: 'closure-compiler',
  transformBundle: function transformBundle(code) {
    var jsFilename, mapFilename, compiler, _ref, _ref2, exitCode, stdOut, stdErr;

    return regeneratorRuntime.async(function transformBundle$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jsFilename = tempfile();
            mapFilename = tempfile();
            fs.writeFileSync(jsFilename, code);
            compiler = new ClosureCompiler({
              js: jsFilename,
              create_source_map: mapFilename,
              process_common_js_modules: true,
              language_out: 'ECMASCRIPT_NEXT',
              compilation_level: 'ADVANCED'
            });
            _context.next = 6;
            return regeneratorRuntime.awrap(asyncCompile(compiler));

          case 6:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 3);
            exitCode = _ref2[0];
            stdOut = _ref2[1];
            stdErr = _ref2[2];

            if (!(exitCode != 0)) {
              _context.next = 13;
              break;
            }

            throw new Error("closure compiler exited ".concat(exitCode, ": ").concat(stdErr));

          case 13:
            return _context.abrupt("return", {
              code: stdOut,
              map: JSON.parse(fs.readFileSync(mapFilename))
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var transformConstToLet = {
  transformBundle: function transformBundle(code) {
    return code.replace(/\bconst\b/g, 'let');
  }
}; // Rename certain words and rewrite patterns which closure compiler usually doesn't mangle, such that
// it actually does mangle them.

var preMangle = {
  transformBundle: function transformBundle(code) {
    code = code.replace(/"maps":/g, 'maps:');
    code = code.replace(/"entities":/g, 'entities:');

    for (var _i2 = 0, _arr2 = ['frames', 'facing', 'detach', 'step', 'entities', 'maps', 'rotation', 'duration']; _i2 < _arr2.length; _i2++) {
      var word = _arr2[_i2];
      code = code.replace(new RegExp("\\b".concat(word, "\\b"), 'g'), 'M' + word);
    }

    return code;
  }
};
var plugins = [rollupPluginJson(), rollupPluginUrl({
  limit: Infinity
}), transformConstToLet, preMangle, closureCompilerPlugin];
var inputOptions = {
  input: 'src/entry.js',
  plugins: plugins
};
var outputOptions = {
  file: 'dist/build.js',
  format: 'es'
};

function advZipWindows() {
  return new Promise(function (resolve, reject) {
    var command = ".\\bin\\advzip.exe -4 -a ./dist/dist.zip ./dist/index.html";
    childProcess.exec(command, {
      cwd: __dirname
    }, function (error, stdout, stderr) {
      if (error) {
        return reject(stderr);
      }

      resolve(stdout);
    });
  });
}

function advZipFallback() {
  return new Promise(function (resolve, reject) {
    var command = "advzip -4 -a ./dist/dist.zip ./dist/index.html";
    childProcess.exec(command, {
      cwd: __dirname
    }, function (error, stdout, stderr) {
      if (error) {
        return reject(stderr);
      }

      resolve(stdout);
    });
  });
}

function build() {
  var bundle, _ref3, code, minifiedHtml, newScriptTag, finalFileSize, limit;

  return regeneratorRuntime.async(function build$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(rollup.rollup(inputOptions));

        case 2:
          bundle = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(bundle.generate(outputOptions));

        case 5:
          _ref3 = _context2.sent;
          code = _ref3.code;
          minifiedHtml = minifyHtml(fs.readFileSync('index.html', {
            encoding: 'utf-8'
          }), {
            collapseWhitespace: true,
            minifyCSS: true,
            removeAttributeQuotes: true
          });
          newScriptTag = "<script>".concat(code, "</script>");
          minifiedHtml = minifiedHtml.replace(/<script[^>]+><\/script>/, function (m) {
            return newScriptTag;
          });
          fs.writeFileSync('dist/index.html', minifiedHtml, {
            encoding: 'utf-8'
          });
          _context2.prev = 11;
          _context2.next = 14;
          return regeneratorRuntime.awrap(advZipWindows());

        case 14:
          _context2.next = 27;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](11);
          _context2.prev = 18;
          _context2.next = 21;
          return regeneratorRuntime.awrap(advZipFallback());

        case 21:
          _context2.next = 27;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t1 = _context2["catch"](18);
          console.log('Could not zip index.html using advzip. Does the advzip binary even exist?');
          return _context2.abrupt("return");

        case 27:
          finalFileSize = fs.readFileSync('./dist/dist.zip').byteLength;
          console.log('Final file size:', finalFileSize);
          limit = 13 * 1024;

          if (finalFileSize > limit) {
            console.error("That's ".concat(finalFileSize - limit, " too many bytes!"));
          }

        case 31:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[11, 16], [18, 23]]);
}

build();