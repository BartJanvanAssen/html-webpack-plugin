/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./example.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/jade/lib/runtime.js":
/*!*****************************************************************************************!*\
  !*** /__REPO_PATH__/node_modules/jade/lib/runtime.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Merge two attribute objects giving precedence\n * to values in object `b`. Classes are special-cased\n * allowing for arrays and merging/joining appropriately\n * resulting in a string.\n *\n * @param {Object} a\n * @param {Object} b\n * @return {Object} a\n * @api private\n */\n\nexports.merge = function merge(a, b) {\n  if (arguments.length === 1) {\n    var attrs = a[0];\n    for (var i = 1; i < a.length; i++) {\n      attrs = merge(attrs, a[i]);\n    }\n    return attrs;\n  }\n  var ac = a['class'];\n  var bc = b['class'];\n\n  if (ac || bc) {\n    ac = ac || [];\n    bc = bc || [];\n    if (!Array.isArray(ac)) ac = [ac];\n    if (!Array.isArray(bc)) bc = [bc];\n    a['class'] = ac.concat(bc).filter(nulls);\n  }\n\n  for (var key in b) {\n    if (key != 'class') {\n      a[key] = b[key];\n    }\n  }\n\n  return a;\n};\n\n/**\n * Filter null `val`s.\n *\n * @param {*} val\n * @return {Boolean}\n * @api private\n */\n\nfunction nulls(val) {\n  return val != null && val !== '';\n}\n\n/**\n * join array as classes.\n *\n * @param {*} val\n * @return {String}\n */\nexports.joinClasses = joinClasses;\nfunction joinClasses(val) {\n  return (Array.isArray(val) ? val.map(joinClasses) :\n    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :\n    [val]).filter(nulls).join(' ');\n}\n\n/**\n * Render the given classes.\n *\n * @param {Array} classes\n * @param {Array.<Boolean>} escaped\n * @return {String}\n */\nexports.cls = function cls(classes, escaped) {\n  var buf = [];\n  for (var i = 0; i < classes.length; i++) {\n    if (escaped && escaped[i]) {\n      buf.push(exports.escape(joinClasses([classes[i]])));\n    } else {\n      buf.push(joinClasses(classes[i]));\n    }\n  }\n  var text = joinClasses(buf);\n  if (text.length) {\n    return ' class=\"' + text + '\"';\n  } else {\n    return '';\n  }\n};\n\n\nexports.style = function (val) {\n  if (val && typeof val === 'object') {\n    return Object.keys(val).map(function (style) {\n      return style + ':' + val[style];\n    }).join(';');\n  } else {\n    return val;\n  }\n};\n/**\n * Render the given attribute.\n *\n * @param {String} key\n * @param {String} val\n * @param {Boolean} escaped\n * @param {Boolean} terse\n * @return {String}\n */\nexports.attr = function attr(key, val, escaped, terse) {\n  if (key === 'style') {\n    val = exports.style(val);\n  }\n  if ('boolean' == typeof val || null == val) {\n    if (val) {\n      return ' ' + (terse ? key : key + '=\"' + key + '\"');\n    } else {\n      return '';\n    }\n  } else if (0 == key.indexOf('data') && 'string' != typeof val) {\n    if (JSON.stringify(val).indexOf('&') !== -1) {\n      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +\n                   'will be escaped to `&amp;`');\n    };\n    if (val && typeof val.toISOString === 'function') {\n      console.warn('Jade will eliminate the double quotes around dates in ' +\n                   'ISO form after 2.0.0');\n    }\n    return ' ' + key + \"='\" + JSON.stringify(val).replace(/'/g, '&apos;') + \"'\";\n  } else if (escaped) {\n    if (val && typeof val.toISOString === 'function') {\n      console.warn('Jade will stringify dates in ISO form after 2.0.0');\n    }\n    return ' ' + key + '=\"' + exports.escape(val) + '\"';\n  } else {\n    if (val && typeof val.toISOString === 'function') {\n      console.warn('Jade will stringify dates in ISO form after 2.0.0');\n    }\n    return ' ' + key + '=\"' + val + '\"';\n  }\n};\n\n/**\n * Render the given attributes object.\n *\n * @param {Object} obj\n * @param {Object} escaped\n * @return {String}\n */\nexports.attrs = function attrs(obj, terse){\n  var buf = [];\n\n  var keys = Object.keys(obj);\n\n  if (keys.length) {\n    for (var i = 0; i < keys.length; ++i) {\n      var key = keys[i]\n        , val = obj[key];\n\n      if ('class' == key) {\n        if (val = joinClasses(val)) {\n          buf.push(' ' + key + '=\"' + val + '\"');\n        }\n      } else {\n        buf.push(exports.attr(key, val, false, terse));\n      }\n    }\n  }\n\n  return buf.join('');\n};\n\n/**\n * Escape the given string of `html`.\n *\n * @param {String} html\n * @return {String}\n * @api private\n */\n\nvar jade_encode_html_rules = {\n  '&': '&amp;',\n  '<': '&lt;',\n  '>': '&gt;',\n  '\"': '&quot;'\n};\nvar jade_match_html = /[&<>\"]/g;\n\nfunction jade_encode_char(c) {\n  return jade_encode_html_rules[c] || c;\n}\n\nexports.escape = jade_escape;\nfunction jade_escape(html){\n  var result = String(html).replace(jade_match_html, jade_encode_char);\n  if (result === '' + html) return html;\n  else return result;\n};\n\n/**\n * Re-throw the given `err` in context to the\n * the jade in `filename` at the given `lineno`.\n *\n * @param {Error} err\n * @param {String} filename\n * @param {String} lineno\n * @api private\n */\n\nexports.rethrow = function rethrow(err, filename, lineno, str){\n  if (!(err instanceof Error)) throw err;\n  if ((typeof window != 'undefined' || !filename) && !str) {\n    err.message += ' on line ' + lineno;\n    throw err;\n  }\n  try {\n    str = str || __webpack_require__(/*! fs */ 0).readFileSync(filename, 'utf8')\n  } catch (ex) {\n    rethrow(err, null, lineno)\n  }\n  var context = 3\n    , lines = str.split('\\n')\n    , start = Math.max(lineno - context, 0)\n    , end = Math.min(lines.length, lineno + context);\n\n  // Error context\n  var context = lines.slice(start, end).map(function(line, i){\n    var curr = i + start + 1;\n    return (curr == lineno ? '  > ' : '    ')\n      + curr\n      + '| '\n      + line;\n  }).join('\\n');\n\n  // Alter exception message\n  err.path = filename;\n  err.message = (filename || 'Jade') + ':' + lineno\n    + '\\n' + context + '\\n\\n' + err.message;\n  throw err;\n};\n\nexports.DebugItem = function DebugItem(lineno, filename) {\n  this.lineno = lineno;\n  this.filename = filename;\n}\n\n\n//////////////////\n// WEBPACK FOOTER\n// /__REPO_PATH__/node_modules/jade/lib/runtime.js\n// module id = ../../node_modules/jade/lib/runtime.js\n// module chunks = main\n\n//# sourceURL=webpack:////__REPO_PATH__/node_modules/jade/lib/runtime.js?");

/***/ }),

/***/ "./example.js":
/*!********************!*\
  !*** ./example.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n__webpack_require__(/*! ./main.css */ \"./main.css\");\n// Use the same template for the frontend code\nvar template = __webpack_require__(/*! ./time.jade */ \"./time.jade\");\n\nsetInterval(function () {\n  var div = document.getElementById('main');\n  div.innerHTML = template({ time: new Date() });\n  div.style.color = 'navy';\n}, 1000);\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./example.js\n// module id = ./example.js\n// module chunks = main\n\n//# sourceURL=webpack:///./example.js?");

/***/ }),

/***/ "./logo.png":
/*!******************!*\
  !*** ./logo.png ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"0714810ae3fb211173e2964249507195.png\";\n\n//////////////////\n// WEBPACK FOOTER\n// ./logo.png\n// module id = ./logo.png\n// module chunks = main\n\n//# sourceURL=webpack:///./logo.png?");

/***/ }),

/***/ "./main.css":
/*!******************!*\
  !*** ./main.css ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//////////////////\n// WEBPACK FOOTER\n// ./main.css\n// module id = ./main.css\n// module chunks = main\n\n//# sourceURL=webpack:///./main.css?");

/***/ }),

/***/ "./time.jade":
/*!*******************!*\
  !*** ./time.jade ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var jade = __webpack_require__(/*! /__REPO_PATH__/node_modules/jade/lib/runtime.js */ \"../../node_modules/jade/lib/runtime.js\");\n\nmodule.exports = function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (time) {\nbuf.push(\"<!-- this partial is used for frontend and backend--><div class=\\\"time\\\"> <b>Current time</b><p>\" + (jade.escape((jade_interp = time.toISOString()) == null ? '' : jade_interp)) + \"</p></div><img\" + (jade.attr(\"src\", \"\" + (__webpack_require__(/*! ./logo.png */ \"./logo.png\")) + \"\", true, true)) + \">\");}.call(this,\"time\" in locals_for_with?locals_for_with.time:typeof time!==\"undefined\"?time:undefined));;return buf.join(\"\");\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./time.jade\n// module id = ./time.jade\n// module chunks = main\n\n//# sourceURL=webpack:///./time.jade?");

/***/ }),

/***/ 0:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* (ignored) */\n\n//////////////////\n// WEBPACK FOOTER\n// fs (ignored)\n// module id = 0\n// module chunks = main\n\n//# sourceURL=webpack:///fs_(ignored)?");

/***/ })

/******/ });