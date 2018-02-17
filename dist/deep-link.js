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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

// Find Frame Function
var loadFrame = function loadFrame(id, appScheme) {
  var iFrame = document.getElementById(id);
  if (iFrame) {
    document.body.removeChild(iFrame);
  }
  if (appScheme) {
    iFrame = document.createElement('iframe');
    iFrame.id = 'for-android-deeplink';
    iFrame.style.width = 0;
    iFrame.style.height = 0;
    iFrame.style.visibility = 'hidden';
    iFrame.onLoad = function () {
      iFrame.src = appScheme;
    };
    document.body.appendChild(iFrame);
  }
};

// Redirect Function
var redirectTo = function redirectTo(url) {
  url && (document.location.href = url);
};

// Validation
var validate = function validate(options) {
  if (typeof options.appScheme === 'undefined') {
    throw Error('appScheme is a required param value.');
  }
};

var DeepLink =

// constructor
function DeepLink(configs) {
  var _this = this;

  _classCallCheck(this, DeepLink);

  this.configs = {};

  this.register = function (el, options) {
    validate(options);
    addEvent(el, 'click', function (e) {
      e && e.preventDefault();
      if (options.openOnlyStore === true) {
        _this.openStore();
      } else {
        _this.openApp(options);
      }
    });
  };

  this.openApp = function (params) {
    validate(params);

    var options = _extends({
      openStoreWhenNoInstalledTheApp: true,
      alsoUseWebUrlOnMobile: true
    }, params);

    var ua = navigator.userAgent.toLowerCase();
    var isIPhone = /iphone|ipad|ipod/.test(ua);
    var isAndroid = !!~ua.indexOf('android');
    var isMobile = isIPhone || isAndroid;

    // on Desktop
    if (isMobile === false) {
      redirectTo(options.webUrl);
      return;
    }

    // on Mobile
    if (options.openStoreWhenNoInstalledTheApp === true) {
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
        return _this.openStore();
      }, 1000);
    }

    if (isAndroid === true) {
      loadFrame('for-android-deeplink', options.appScheme);
    } else {
      redirectTo(options.appScheme);
    }

    if (options.alsoUseWebUrlOnMobile === false) {
      return;
    }

    if (options.openStoreWhenNoInstalledTheApp === true) {
      setTimeout(function () {
        return redirectTo(options.webUrl);
      }, 2200);
    } else {
      redirectTo(options.webUrl);
    }
  };

  this.openStore = function () {
    var ua = navigator.userAgent.toLowerCase();
    var isIPhone = /iphone|ipad|ipod/.test(ua);
    var appStoreLink = isIPhone ? _this.configs.appStore : _this.configs.playStore;
    redirectTo(appStoreLink);
  };

  this.configs = configs;
}

// binding function.


// open the app.


// open the store.
;

exports.default = DeepLink;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=deep-link.js.map