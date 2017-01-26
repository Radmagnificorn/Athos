/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _PageManager = __webpack_require__(1);

	var _PageManager2 = _interopRequireDefault(_PageManager);

	var _DisplayControl = __webpack_require__(3);

	var _DisplayControl2 = _interopRequireDefault(_DisplayControl);

	var _Utils = __webpack_require__(2);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function (document, PageManager, DisplayControl, window) {

	    var comicPanel = document.getElementById("comicPanel");
	    var prevButton = document.getElementById("prevButton");
	    var nextButton = document.getElementById("nextButton");

	    var dispProps = {
	        loopVideo: true,
	        autoplayVideo: true,
	        height: '100%',
	        width: '100%'
	    };

	    var startPage = _Utils2.default.getPageFromUrl(window.location.href) || { chapter: 'chapter1', page: 0 };

	    var displayControl = new DisplayControl(comicPanel, dispProps);
	    var pageManager = new PageManager('./pages', startPage.chapter, startPage.page);

	    pageManager.addRenderer(displayControl);

	    comicPanel.addEventListener("click", function () {
	        pageManager.next();
	    }, false);

	    prevButton.addEventListener("click", function () {
	        pageManager.previous();
	    }, false);

	    nextButton.addEventListener("click", function () {
	        pageManager.next();
	    }, false);

	    document.addEventListener("keyup", function (e) {
	        var keycode = e.keyCode;
	        if (keycode === 37) {
	            pageManager.previous();
	        }
	        if (keycode === 39) {
	            pageManager.next();
	        }
	    }, false);
	})(document, _PageManager2.default, _DisplayControl2.default, window);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(2);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PageManager = function () {
	    function PageManager(baseDir, chapterUrl, pageNo) {
	        _classCallCheck(this, PageManager);

	        this.baseDir = baseDir;
	        this.pageDir = chapterUrl ? chapterUrl : '';
	        this.currentPage = pageNo ? pageNo : 0;
	        this.loadChapter(this.pageDir, pageNo);
	    }

	    _createClass(PageManager, [{
	        key: 'addRenderer',
	        value: function addRenderer(displayRenderer) {
	            this.renderer = displayRenderer;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            if (this.renderer) {
	                this.renderer.render(this.getPageUrl());
	            }

	            this.pushCurrentState();
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            if (this.currentPage < this.pages.length - 1) {
	                this.currentPage++;
	                this.render();
	            } else {
	                if (this.nextChapter) {
	                    this.loadChapter(this.nextChapter, 'first');
	                }
	            }
	            return this.getPageUrl();
	        }
	    }, {
	        key: 'previous',
	        value: function previous() {
	            if (this.currentPage > 0) {
	                this.currentPage--;
	                this.render();
	            } else {
	                if (this.prevChapter) {
	                    this.loadChapter(this.prevChapter, 'last');
	                }
	            }
	            return this.getPageUrl();
	        }
	    }, {
	        key: 'pushCurrentState',
	        value: function pushCurrentState() {
	            history.pushState({
	                chapter: this.pageDir,
	                page: this.currentPage
	            }, null, '#' + this.pageDir + '~' + this.currentPage);
	        }
	    }, {
	        key: 'loadChapter',
	        value: function loadChapter(chapterUrl, page) {
	            var _this = this;

	            _Utils2.default.loadChapterManifest(this.baseDir + "/" + chapterUrl).then(function (manifest) {
	                _this.pageDir = chapterUrl;
	                _this.nextChapter = manifest.nextChapter;
	                _this.prevChapter = manifest.prevChapter;
	                _this.pages = manifest.pages;

	                var pageInt = parseInt(page);
	                if (pageInt) {
	                    _this.currentPage = pageInt;
	                } else {
	                    switch (page) {
	                        case "first":
	                            _this.currentPage = 0;
	                            break;
	                        case "last":
	                            _this.currentPage = manifest.pages.length - 1;
	                            break;
	                        default:
	                            _this.currentPage = 0;
	                    }
	                }

	                _this.render();
	            });
	        }
	    }, {
	        key: 'getChapterPath',
	        value: function getChapterPath() {
	            return this.baseDir + "/" + this.pageDir;
	        }
	    }, {
	        key: 'getPageUrl',
	        value: function getPageUrl() {
	            return this.getChapterPath() + "/" + this.pages[this.currentPage];
	        }
	    }]);

	    return PageManager;
	}();

	exports.default = PageManager;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    _createClass(Utils, null, [{
	        key: 'loadChapterManifest',
	        value: function loadChapterManifest(url) {
	            return new Promise(function (resolve) {
	                var request = new XMLHttpRequest();
	                request.open('GET', url + '/manifest.json', true);

	                request.onload = function () {
	                    if (request.status >= 200 && request.status < 400) {
	                        resolve(JSON.parse(request.responseText));
	                    } else {
	                        console.log("unable to load chapter manifest");
	                    }
	                };

	                request.onerror = function () {
	                    console.log("error retrieving manifest from server");
	                };

	                request.send();
	            });
	        }
	    }, {
	        key: 'getPageFromUrl',
	        value: function getPageFromUrl(url) {
	            var page = null;
	            var locString = url.split('#')[1];
	            if (locString) {
	                var parsedLoc = locString.split('~');
	                page = {
	                    chapter: parsedLoc[0],
	                    page: parsedLoc[1]
	                };
	            }

	            return page;
	        }
	    }]);

	    return Utils;
	}();

	exports.default = Utils;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DisplayControl = function () {
	    function DisplayControl(target, properties) {
	        _classCallCheck(this, DisplayControl);

	        this.properties = properties;
	        target.style.position = 'relative';
	        this.panel = target;
	    }

	    _createClass(DisplayControl, [{
	        key: 'createImageDisplay',
	        value: function createImageDisplay(path) {
	            var props = this.properties;
	            var imageDisplay = document.createElement('img');
	            imageDisplay.style.display = 'block';
	            imageDisplay.style.height = props.height;
	            imageDisplay.style.width = props.width;
	            imageDisplay.style.position = 'absolute';
	            imageDisplay.style.top = '0';
	            imageDisplay.style.left = '0';
	            imageDisplay.src = path;

	            var loadedPromise = new Promise(function (resolve) {
	                imageDisplay.addEventListener("loaded", function () {
	                    resolve();
	                }, false);
	            });

	            return { component: imageDisplay, loaded: loadedPromise };
	        }
	    }, {
	        key: 'createVideoDisplay',
	        value: function createVideoDisplay(path) {
	            var props = this.properties;
	            var videoDisplay = document.createElement('video');
	            videoDisplay.style.display = 'block';
	            videoDisplay.style.height = props.height;
	            videoDisplay.style.width = props.width;
	            videoDisplay.style.position = 'absolute';
	            videoDisplay.style.top = '0';
	            videoDisplay.style.left = '0';
	            videoDisplay.loop = props.loopVideo ? props.loopVideo : true;
	            videoDisplay.autoplay = props.autoplayVideo ? props.autoplayVideo : true;
	            videoDisplay.src = path;

	            var loadedPromise = new Promise(function (resolve) {
	                videoDisplay.addEventListener("loadeddata", function () {
	                    resolve();
	                }, false);
	            });

	            return { component: videoDisplay, loaded: loadedPromise };
	        }
	    }, {
	        key: 'render',
	        value: function render(url) {
	            var pageExt = this.getExtension(url);
	            var display = void 0;
	            switch (pageExt) {
	                case "png":
	                    display = this.createImageDisplay(url);
	                    break;
	                case "mp4":
	                    display = this.createVideoDisplay(url);
	                    break;
	                default:
	                    alert("File type not supported: " + pageExt);
	            }

	            var oldDisplay = this.currentDisplay;
	            this.currentDisplay = display;

	            this.panel.appendChild(this.currentDisplay.component);

	            this.currentDisplay.loaded.then(function () {
	                if (oldDisplay) {
	                    oldDisplay.component.remove();
	                }
	            });
	        }
	    }, {
	        key: 'getExtension',
	        value: function getExtension(url) {
	            var extPattern = /\.[0-9a-z]+$/;
	            var extMatches = url.match(extPattern);
	            var extension = '';
	            if (extMatches) {
	                extension = extMatches[0].substr(1);
	            }
	            return extension;
	        }
	    }]);

	    return DisplayControl;
	}();

	exports.default = DisplayControl;

/***/ }
/******/ ]);