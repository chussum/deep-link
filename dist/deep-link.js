(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DeepLink", [], factory);
	else if(typeof exports === 'object')
		exports["DeepLink"] = factory();
	else
		root["DeepLink"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Event Register Function
var addEvent = function addEvent(element, eventName, fn) {
  if (element.addEventListener) {
    element.addEventListener(eventName, fn, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, fn);
  } else {
    element['on' + eventName] = fn;
  }
};

var DeepLink =
// constructor
function DeepLink(options) {
  var _this = this;

  _classCallCheck(this, DeepLink);

  this.options = options;

  // binding function.
  this.register = function (el, options) {
    if (!options.openOnlyStore && typeof options.appScheme === 'undefined') {
      throw Error('appScheme is a required param value.');
    }
    addEvent(el, 'click', function (e) {
      e && e.preventDefault();
      if (options.openOnlyStore === true) {
        _this.openStore();
      } else {
        _this.openApp(options);
      }
    });
  };

  // open the app.
  this.openApp = function (options) {
    if (typeof options.appScheme === 'undefined') {
      throw Error('appScheme is a required param value.');
    }

    var ua = navigator.userAgent.toLowerCase();
    var isIPhone = /iphone|ipad|ipod/.test(ua);
    var isAndroid = ~ua.indexOf('android');
    if (isIPhone || isAndroid) {
      var interval = void 0;
      var timer = void 0;
      var clearTimers = function clearTimers() {
        clearInterval(interval);
        clearTimeout(timer);
      };
      var checkAppInterval = function checkAppInterval() {
        if (document.webkitHidden || document.hidden) {
          clearTimers();
        }
      };
      interval = setInterval(checkAppInterval, 200);
      timer = setTimeout(function () {
        return _this.openStore;
      }, 1000);
      options.appScheme && (document.location.href = options.appScheme);
    } else {
      options.webUrl && (document.location.href = options.webUrl);
    }
  };

  // open the store.
  this.openStore = function () {
    var ua = navigator.userAgent.toLowerCase();
    var isIPhone = /iphone|ipad|ipod/.test(ua);
    var appStoreLink = isIPhone ? _this.options.appStore : _this.options.playStore;
    appStoreLink && (document.location.href = appStoreLink);
  };
};

exports.default = DeepLink;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=deep-link.js.map