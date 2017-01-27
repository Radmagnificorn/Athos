/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _PageManager = __webpack_require__(183);
	
	var _PageManager2 = _interopRequireDefault(_PageManager);
	
	var _DisplayControl = __webpack_require__(186);
	
	var _DisplayControl2 = _interopRequireDefault(_DisplayControl);
	
	var _Utils = __webpack_require__(184);
	
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

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(184);
	
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

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(185);
	
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
	        key: 'loadChapter',
	        value: function loadChapter(chapterId) {
	            fetch("/chapters/" + chapterId).then(function (response) {
	                response.text().then();
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

/***/ 185:
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]
	
	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }
	
	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var oldValue = this.map[name]
	    this.map[name] = oldValue ? oldValue+','+value : value
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    name = normalizeName(name)
	    return this.has(name) ? this.map[name] : null
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value)
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this)
	      }
	    }
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }
	
	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)
	
	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }
	
	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }
	
	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }
	
	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	
	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = String(input)
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split(/\r?\n/).forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },

/***/ 186:
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

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWQyMWNhYmUxMzUyZmQ5N2E3MWU/OWU1MCIsIndlYnBhY2s6Ly8vLi9BcHAvbmF2LmpzIiwid2VicGFjazovLy8uL0FwcC9QYWdlTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9BcHAvVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vQXBwL0Rpc3BsYXlDb250cm9sLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiUGFnZU1hbmFnZXIiLCJEaXNwbGF5Q29udHJvbCIsIndpbmRvdyIsImNvbWljUGFuZWwiLCJnZXRFbGVtZW50QnlJZCIsInByZXZCdXR0b24iLCJuZXh0QnV0dG9uIiwiZGlzcFByb3BzIiwibG9vcFZpZGVvIiwiYXV0b3BsYXlWaWRlbyIsImhlaWdodCIsIndpZHRoIiwic3RhcnRQYWdlIiwiZ2V0UGFnZUZyb21VcmwiLCJsb2NhdGlvbiIsImhyZWYiLCJjaGFwdGVyIiwicGFnZSIsImRpc3BsYXlDb250cm9sIiwicGFnZU1hbmFnZXIiLCJhZGRSZW5kZXJlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJuZXh0IiwicHJldmlvdXMiLCJlIiwia2V5Y29kZSIsImtleUNvZGUiLCJiYXNlRGlyIiwiY2hhcHRlclVybCIsInBhZ2VObyIsInBhZ2VEaXIiLCJjdXJyZW50UGFnZSIsImxvYWRDaGFwdGVyIiwiZGlzcGxheVJlbmRlcmVyIiwicmVuZGVyZXIiLCJyZW5kZXIiLCJnZXRQYWdlVXJsIiwicHVzaEN1cnJlbnRTdGF0ZSIsInBhZ2VzIiwibGVuZ3RoIiwibmV4dENoYXB0ZXIiLCJwcmV2Q2hhcHRlciIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJsb2FkQ2hhcHRlck1hbmlmZXN0IiwidGhlbiIsIm1hbmlmZXN0IiwicGFnZUludCIsInBhcnNlSW50IiwiZ2V0Q2hhcHRlclBhdGgiLCJVdGlscyIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsIm9ubG9hZCIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImNvbnNvbGUiLCJsb2ciLCJvbmVycm9yIiwic2VuZCIsImNoYXB0ZXJJZCIsImZldGNoIiwicmVzcG9uc2UiLCJ0ZXh0IiwibG9jU3RyaW5nIiwic3BsaXQiLCJwYXJzZWRMb2MiLCJ0YXJnZXQiLCJwcm9wZXJ0aWVzIiwic3R5bGUiLCJwb3NpdGlvbiIsInBhbmVsIiwicGF0aCIsInByb3BzIiwiaW1hZ2VEaXNwbGF5IiwiY3JlYXRlRWxlbWVudCIsImRpc3BsYXkiLCJ0b3AiLCJsZWZ0Iiwic3JjIiwibG9hZGVkUHJvbWlzZSIsImNvbXBvbmVudCIsImxvYWRlZCIsInZpZGVvRGlzcGxheSIsImxvb3AiLCJhdXRvcGxheSIsInBhZ2VFeHQiLCJnZXRFeHRlbnNpb24iLCJjcmVhdGVJbWFnZURpc3BsYXkiLCJjcmVhdGVWaWRlb0Rpc3BsYXkiLCJhbGVydCIsIm9sZERpc3BsYXkiLCJjdXJyZW50RGlzcGxheSIsImFwcGVuZENoaWxkIiwicmVtb3ZlIiwiZXh0UGF0dGVybiIsImV4dE1hdGNoZXMiLCJtYXRjaCIsImV4dGVuc2lvbiIsInN1YnN0ciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDdENBOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsRUFBQyxVQUFVQSxRQUFWLEVBQW9CQyxXQUFwQixFQUFpQ0MsY0FBakMsRUFBaURDLE1BQWpELEVBQXlEOztBQUV0RCxTQUFJQyxhQUFhSixTQUFTSyxjQUFULENBQXdCLFlBQXhCLENBQWpCO0FBQ0Es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QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNULCtFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUFhLGNBQWpCO0FBQ0EsaUJBQUlDLGFBQWFuRCxJQUFJb0QsS0FBSixDQUFVRixVQUFWLENBQWpCO0FBQ0EsaUJBQUlHLFlBQVksRUFBaEI7QUFDQSxpQkFBSUYsVUFBSixFQUFnQjtBQUNaRSw2QkFBWUYsV0FBVyxDQUFYLEVBQWNHLE1BQWQsQ0FBcUIsQ0FBckIsQ0FBWjtBQUNIO0FBQ0Qsb0JBQU9ELFNBQVA7QUFDSDs7Ozs7O21CQS9FZ0J2RyxjIiwiZmlsZSI6InBsYXllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZDIxY2FiZTEzNTJmZDk3YTcxZSIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vUGFnZU1hbmFnZXIuanMnO1xyXG5pbXBvcnQgRGlzcGxheUNvbnRyb2wgZnJvbSAnLi9EaXNwbGF5Q29udHJvbC5qcyc7XHJcbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzLmpzJztcclxuXHJcbihmdW5jdGlvbiAoZG9jdW1lbnQsIFBhZ2VNYW5hZ2VyLCBEaXNwbGF5Q29udHJvbCwgd2luZG93KSB7XHJcblxyXG4gICAgbGV0IGNvbWljUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbWljUGFuZWxcIik7XHJcbiAgICBsZXQgcHJldkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJldkJ1dHRvblwiKTtcclxuICAgIGxldCBuZXh0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXh0QnV0dG9uXCIpO1xyXG5cclxuICAgIGxldCBkaXNwUHJvcHMgPSB7XHJcbiAgICAgICAgbG9vcFZpZGVvOiB0cnVlLFxyXG4gICAgICAgIGF1dG9wbGF5VmlkZW86IHRydWUsXHJcbiAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgd2lkdGg6ICcxMDAlJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgc3RhcnRQYWdlID0gVXRpbHMuZ2V0UGFnZUZyb21Vcmwod2luZG93LmxvY2F0aW9uLmhyZWYpIHx8IHtjaGFwdGVyOiAnY2hhcHRlcjEnLCBwYWdlOiAwfTtcclxuXHJcbiAgICBsZXQgZGlzcGxheUNvbnRyb2wgPSBuZXcgRGlzcGxheUNvbnRyb2woY29taWNQYW5lbCwgZGlzcFByb3BzKTtcclxuICAgIGxldCBwYWdlTWFuYWdlciA9IG5ldyBQYWdlTWFuYWdlcignLi9wYWdlcycsIHN0YXJ0UGFnZS5jaGFwdGVyLCBzdGFydFBhZ2UucGFnZSk7XHJcblxyXG4gICAgcGFnZU1hbmFnZXIuYWRkUmVuZGVyZXIoZGlzcGxheUNvbnRyb2wpO1xyXG5cclxuICAgIGNvbWljUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwYWdlTWFuYWdlci5uZXh0KCk7XHJcbiAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgcHJldkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBhZ2VNYW5hZ2VyLnByZXZpb3VzKCk7XHJcbiAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgbmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBhZ2VNYW5hZ2VyLm5leHQoKTtcclxuICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQga2V5Y29kZSA9IGUua2V5Q29kZTtcclxuICAgICAgICBpZiAoa2V5Y29kZSA9PT0gMzcpIHtcclxuICAgICAgICAgICAgcGFnZU1hbmFnZXIucHJldmlvdXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGtleWNvZGUgPT09IDM5KSB7XHJcbiAgICAgICAgICAgIHBhZ2VNYW5hZ2VyLm5leHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9LCBmYWxzZSk7XHJcbn0pKGRvY3VtZW50LCBQYWdlTWFuYWdlciwgRGlzcGxheUNvbnRyb2wsIHdpbmRvdyk7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL0FwcC9uYXYuanMiLCJpbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3RvcihiYXNlRGlyLCBjaGFwdGVyVXJsLCBwYWdlTm8pIHtcclxuICAgICAgICB0aGlzLmJhc2VEaXIgPSBiYXNlRGlyO1xyXG4gICAgICAgIHRoaXMucGFnZURpciA9IGNoYXB0ZXJVcmwgPyBjaGFwdGVyVXJsIDogJyc7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2VObyA/IHBhZ2VObyA6IDA7XHJcbiAgICAgICAgdGhpcy5sb2FkQ2hhcHRlcih0aGlzLnBhZ2VEaXIsIHBhZ2VObyk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUmVuZGVyZXIoZGlzcGxheVJlbmRlcmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IGRpc3BsYXlSZW5kZXJlcjtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5nZXRQYWdlVXJsKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wdXNoQ3VycmVudFN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA8IHRoaXMucGFnZXMubGVuZ3RoLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSsrO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5leHRDaGFwdGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDaGFwdGVyKHRoaXMubmV4dENoYXB0ZXIsICdmaXJzdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2VVcmwoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmV2aW91cygpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZS0tO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXZDaGFwdGVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRDaGFwdGVyKHRoaXMucHJldkNoYXB0ZXIsICdsYXN0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZVVybCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1c2hDdXJyZW50U3RhdGUoKSB7XHJcbiAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoYXB0ZXI6IHRoaXMucGFnZURpcixcclxuICAgICAgICAgICAgICAgIHBhZ2U6IHRoaXMuY3VycmVudFBhZ2VcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbnVsbCxcclxuICAgICAgICAgICAgYCMke3RoaXMucGFnZURpcn1+JHt0aGlzLmN1cnJlbnRQYWdlfWBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRDaGFwdGVyKGNoYXB0ZXJVcmwsIHBhZ2UpIHtcclxuICAgICAgICBVdGlscy5sb2FkQ2hhcHRlck1hbmlmZXN0KHRoaXMuYmFzZURpciArIFwiL1wiICsgY2hhcHRlclVybCkudGhlbigobWFuaWZlc3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlRGlyID0gY2hhcHRlclVybDtcclxuICAgICAgICAgICAgdGhpcy5uZXh0Q2hhcHRlciA9IG1hbmlmZXN0Lm5leHRDaGFwdGVyO1xyXG4gICAgICAgICAgICB0aGlzLnByZXZDaGFwdGVyID0gbWFuaWZlc3QucHJldkNoYXB0ZXI7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZXMgPSBtYW5pZmVzdC5wYWdlcztcclxuXHJcbiAgICAgICAgICAgIGxldCBwYWdlSW50ID0gcGFyc2VJbnQocGFnZSk7XHJcbiAgICAgICAgICAgIGlmIChwYWdlSW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZUludDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGFnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmaXJzdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxhc3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IG1hbmlmZXN0LnBhZ2VzLmxlbmd0aC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFwdGVyUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYXNlRGlyICsgXCIvXCIgKyB0aGlzLnBhZ2VEaXIgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFBhZ2VVcmwoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q2hhcHRlclBhdGgoKSArIFwiL1wiICsgdGhpcy5wYWdlc1t0aGlzLmN1cnJlbnRQYWdlXTtcclxuICAgIH1cclxuXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vQXBwL1BhZ2VNYW5hZ2VyLmpzIiwiaW1wb3J0ICd3aGF0d2ctZmV0Y2gnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG5cclxuICAgIHN0YXRpYyBsb2FkQ2hhcHRlck1hbmlmZXN0KHVybCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCArICcvbWFuaWZlc3QuanNvbicsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidW5hYmxlIHRvIGxvYWQgY2hhcHRlciBtYW5pZmVzdFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3IgcmV0cmlldmluZyBtYW5pZmVzdCBmcm9tIHNlcnZlclwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkQ2hhcHRlcihjaGFwdGVySWQpIHtcclxuICAgICAgICBmZXRjaChcIi9jaGFwdGVycy9cIiArIGNoYXB0ZXJJZCkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0UGFnZUZyb21VcmwodXJsKSB7XHJcbiAgICAgICAgbGV0IHBhZ2UgPSBudWxsO1xyXG4gICAgICAgIGxldCBsb2NTdHJpbmcgPSB1cmwuc3BsaXQoJyMnKVsxXTtcclxuICAgICAgICBpZiAobG9jU3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJzZWRMb2MgPSBsb2NTdHJpbmcuc3BsaXQoJ34nKTtcclxuICAgICAgICAgICAgcGFnZSA9IHtcclxuICAgICAgICAgICAgICAgIGNoYXB0ZXI6IHBhcnNlZExvY1swXSxcclxuICAgICAgICAgICAgICAgIHBhZ2U6IHBhcnNlZExvY1sxXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGFnZTtcclxuICAgIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9BcHAvVXRpbHMuanMiLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gICAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gICAgXVxuXG4gICAgdmFyIGlzRGF0YVZpZXcgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICAgIH1cblxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG5cbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXVxuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSsnLCcrdmFsdWUgOiB2YWx1ZVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChuYW1lKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IGl0ZW1zLnB1c2godmFsdWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICAgIH1cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG4gIH1cblxuICBmdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7IGJvZHk6IHRoaXMuX2JvZHlJbml0IH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gICAgcmF3SGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gMTg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BsYXlDb250cm9sIHtcclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgcHJvcGVydGllcykge1xyXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICB0aGlzLnBhbmVsID0gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUltYWdlRGlzcGxheShwYXRoKSB7XHJcbiAgICAgICAgbGV0IHByb3BzID0gdGhpcy5wcm9wZXJ0aWVzO1xyXG4gICAgICAgIGxldCBpbWFnZURpc3BsYXkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWFnZURpc3BsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgaW1hZ2VEaXNwbGF5LnN0eWxlLmhlaWdodCA9IHByb3BzLmhlaWdodDtcclxuICAgICAgICBpbWFnZURpc3BsYXkuc3R5bGUud2lkdGggPSBwcm9wcy53aWR0aDtcclxuICAgICAgICBpbWFnZURpc3BsYXkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIGltYWdlRGlzcGxheS5zdHlsZS50b3AgPSAnMCc7XHJcbiAgICAgICAgaW1hZ2VEaXNwbGF5LnN0eWxlLmxlZnQgPSAnMCc7XHJcbiAgICAgICAgaW1hZ2VEaXNwbGF5LnNyYyA9IHBhdGg7XHJcblxyXG4gICAgICAgIGxldCBsb2FkZWRQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgaW1hZ2VEaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRcIiwgZnVuY3Rpb24gKCkge3Jlc29sdmUoKTt9LCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7Y29tcG9uZW50OiBpbWFnZURpc3BsYXksIGxvYWRlZDogbG9hZGVkUHJvbWlzZX07XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVmlkZW9EaXNwbGF5KHBhdGgpIHtcclxuICAgICAgICBsZXQgcHJvcHMgPSB0aGlzLnByb3BlcnRpZXM7XHJcbiAgICAgICAgbGV0IHZpZGVvRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgdmlkZW9EaXNwbGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHZpZGVvRGlzcGxheS5zdHlsZS5oZWlnaHQgPSBwcm9wcy5oZWlnaHQ7XHJcbiAgICAgICAgdmlkZW9EaXNwbGF5LnN0eWxlLndpZHRoID0gcHJvcHMud2lkdGg7XHJcbiAgICAgICAgdmlkZW9EaXNwbGF5LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICB2aWRlb0Rpc3BsYXkuc3R5bGUudG9wID0gJzAnO1xyXG4gICAgICAgIHZpZGVvRGlzcGxheS5zdHlsZS5sZWZ0ID0gJzAnO1xyXG4gICAgICAgIHZpZGVvRGlzcGxheS5sb29wID0gcHJvcHMubG9vcFZpZGVvID8gcHJvcHMubG9vcFZpZGVvIDogdHJ1ZTtcclxuICAgICAgICB2aWRlb0Rpc3BsYXkuYXV0b3BsYXkgPSBwcm9wcy5hdXRvcGxheVZpZGVvID8gcHJvcHMuYXV0b3BsYXlWaWRlbyA6IHRydWU7XHJcbiAgICAgICAgdmlkZW9EaXNwbGF5LnNyYyA9IHBhdGg7XHJcblxyXG4gICAgICAgIGxldCBsb2FkZWRQcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgdmlkZW9EaXNwbGF5LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZWRkYXRhXCIsIGZ1bmN0aW9uICgpIHtyZXNvbHZlKCk7fSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge2NvbXBvbmVudDogdmlkZW9EaXNwbGF5LCBsb2FkZWQ6IGxvYWRlZFByb21pc2V9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcih1cmwpIHtcclxuICAgICAgICBsZXQgcGFnZUV4dCA9IHRoaXMuZ2V0RXh0ZW5zaW9uKHVybCk7XHJcbiAgICAgICAgbGV0IGRpc3BsYXk7XHJcbiAgICAgICAgc3dpdGNoIChwYWdlRXh0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwbmdcIjpcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSB0aGlzLmNyZWF0ZUltYWdlRGlzcGxheSh1cmwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtcDRcIjpcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkgPSB0aGlzLmNyZWF0ZVZpZGVvRGlzcGxheSh1cmwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkZpbGUgdHlwZSBub3Qgc3VwcG9ydGVkOiBcIiArIHBhZ2VFeHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9sZERpc3BsYXkgPSB0aGlzLmN1cnJlbnREaXNwbGF5O1xyXG4gICAgICAgIHRoaXMuY3VycmVudERpc3BsYXkgPSBkaXNwbGF5O1xyXG5cclxuICAgICAgICB0aGlzLnBhbmVsLmFwcGVuZENoaWxkKHRoaXMuY3VycmVudERpc3BsYXkuY29tcG9uZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50RGlzcGxheS5sb2FkZWQudGhlbiggZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAob2xkRGlzcGxheSkge1xyXG4gICAgICAgICAgICAgICAgb2xkRGlzcGxheS5jb21wb25lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRFeHRlbnNpb24odXJsKSB7XHJcbiAgICAgICAgbGV0IGV4dFBhdHRlcm4gPSAvXFwuWzAtOWEtel0rJC87XHJcbiAgICAgICAgbGV0IGV4dE1hdGNoZXMgPSB1cmwubWF0Y2goZXh0UGF0dGVybik7XHJcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9ICcnO1xyXG4gICAgICAgIGlmIChleHRNYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9IGV4dE1hdGNoZXNbMF0uc3Vic3RyKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9BcHAvRGlzcGxheUNvbnRyb2wuanMiXSwic291cmNlUm9vdCI6IiJ9