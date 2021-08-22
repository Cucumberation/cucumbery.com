"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * request.js
 * 
 * (c) 2020-2021 Wany
 * 
 * @summary some request classes
 * @author Wany <sung@wany.io>
*/
var Request = /*#__PURE__*/function (_EventClass) {
  _inherits(Request, _EventClass);

  var _super = _createSuper(Request);

  function Request(url, data) {
    var _this2;

    var isJSON = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Request);

    _this2 = _super.call(this);
    _this2.onObject = new Object();
    _this2.url = url;
    _this2.data = data;
    _this2.isJSON = isJSON;

    var _this = _assertThisInitialized(_this2);

    _this2.xhr = new XMLHttpRequest();
    _this2.xhr.withCredentials = true;

    _this2.openXMLHttpRequest();

    _this2.xhr.onreadystatechange = function (event) {
      _this.onXMLHttpRequestRSC(event);
    };

    return _possibleConstructorReturn(_this2, _assertThisInitialized(_this2));
  }

  _createClass(Request, [{
    key: "on",
    value: function on(event, listener) {
      if (typeof listener != "function") {
        throw new Error("Request.on => listener must typeof function");
      }

      if (!this.onObject[event]) {
        this.onObject[event] = new Array();
      }

      this.onObject[event].push(listener);
      return this;
    }
  }, {
    key: "onEvent",
    value: function onEvent(event, call) {
      if (event == "error" && !this.onObject[event]) {
        console.warn(call);
      }

      if (this.onObject[event]) {
        var _iterator = _createForOfIteratorHelper(this.onObject[event]),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var f = _step.value;
            f(call);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    }
  }, {
    key: "onXMLHttpRequestRSC",
    value: function onXMLHttpRequestRSC(event) {
      if (this.xhr.readyState == 4) {
        var status = this.xhr.status;
        var res = this.xhr.responseText;

        if (this.isJSON) {
          try {
            res = JSON.parse(res);
          } catch (error) {
            this.onEvent("error", error);
            return;
          }
        }

        this.onEvent(status, res);

        if (400 <= status && status < 500) {
          if (!this.onObject[status]) {
            this.onEvent("error", res);
          }
        }

        if (500 <= status && status < 600) {
          if (!this.onObject[status]) {
            this.onEvent("error", res);
          }
        }

        if (res.event) {
          this.onEvent(res.event, res);
        }

        this.onEvent("response", res);
        return;
      }
    }
  }]);

  return Request;
}(EventClass);

var APIGetRequest = /*#__PURE__*/function (_Request) {
  _inherits(APIGetRequest, _Request);

  var _super2 = _createSuper(APIGetRequest);

  function APIGetRequest() {
    _classCallCheck(this, APIGetRequest);

    return _super2.apply(this, arguments);
  }

  _createClass(APIGetRequest, [{
    key: "openXMLHttpRequest",
    value: function openXMLHttpRequest() {
      this.isJSON = true;
      this.xhr.open("GET", this.url);
    }
  }, {
    key: "send",
    value: function send() {
      this.xhr.send();
      return this;
    }
  }]);

  return APIGetRequest;
}(Request);

var APIPostRequest = /*#__PURE__*/function (_Request2) {
  _inherits(APIPostRequest, _Request2);

  var _super3 = _createSuper(APIPostRequest);

  function APIPostRequest() {
    _classCallCheck(this, APIPostRequest);

    return _super3.apply(this, arguments);
  }

  _createClass(APIPostRequest, [{
    key: "openXMLHttpRequest",
    value: function openXMLHttpRequest() {
      this.isJSON = true;
      this.xhr.open("POST", this.url);
      this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
  }, {
    key: "send",
    value: function send() {
      this.xhr.send(JSON.stringify(this.data));
      return this;
    }
  }]);

  return APIPostRequest;
}(Request);

var APIPatchRequest = /*#__PURE__*/function (_Request3) {
  _inherits(APIPatchRequest, _Request3);

  var _super4 = _createSuper(APIPatchRequest);

  function APIPatchRequest() {
    _classCallCheck(this, APIPatchRequest);

    return _super4.apply(this, arguments);
  }

  _createClass(APIPatchRequest, [{
    key: "openXMLHttpRequest",
    value: function openXMLHttpRequest() {
      this.isJSON = true;
      this.xhr.open("PATCH", this.url);
      this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
  }, {
    key: "send",
    value: function send() {
      this.xhr.send(JSON.stringify(this.data));
      return this;
    }
  }]);

  return APIPatchRequest;
}(Request);

var APIPutRequest = /*#__PURE__*/function (_Request4) {
  _inherits(APIPutRequest, _Request4);

  var _super5 = _createSuper(APIPutRequest);

  function APIPutRequest() {
    _classCallCheck(this, APIPutRequest);

    return _super5.apply(this, arguments);
  }

  _createClass(APIPutRequest, [{
    key: "openXMLHttpRequest",
    value: function openXMLHttpRequest() {
      this.isJSON = true;
      this.xhr.open("PUT", this.url);
      this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
  }, {
    key: "send",
    value: function send() {
      this.xhr.send(JSON.stringify(this.data));
      return this;
    }
  }]);

  return APIPutRequest;
}(Request);

var APIDeleteRequest = /*#__PURE__*/function (_Request5) {
  _inherits(APIDeleteRequest, _Request5);

  var _super6 = _createSuper(APIDeleteRequest);

  function APIDeleteRequest() {
    _classCallCheck(this, APIDeleteRequest);

    return _super6.apply(this, arguments);
  }

  _createClass(APIDeleteRequest, [{
    key: "openXMLHttpRequest",
    value: function openXMLHttpRequest() {
      this.isJSON = true;
      this.xhr.open("DELETE", this.url);
      this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
  }, {
    key: "send",
    value: function send() {
      this.xhr.send(JSON.stringify(this.data));
      return this;
    }
  }]);

  return APIDeleteRequest;
}(Request);

var WebSocketClient = /*#__PURE__*/function (_EventClass2) {
  _inherits(WebSocketClient, _EventClass2);

  var _super7 = _createSuper(WebSocketClient);

  function WebSocketClient(host) {
    var _this3;

    var autoReconnect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, WebSocketClient);

    _this3 = _super7.call(this);
    _this3.onObject = new Object();

    if (!host) {
      throw new Error("WebSocketClient.constructor => host does not exist.");
    }

    if (typeof host != "string") {
      throw new Error("WebSocketClient.constructor => host must typeof string.");
    }

    _this3.host = host;
    _this3.socket = null;
    _this3.connected = false;
    _this3.paused = false;
    _this3.closed = false;
    _this3.autoReconnect = autoReconnect;
    _this3.autoReconnectLoop = null;
    return _this3;
  }

  _createClass(WebSocketClient, [{
    key: "connect",
    value: function connect() {
      var _this4 = this;

      if (this.socket || this.connected) {
        return;
      }

      this.closed = false;

      try {
        this.socket = new WebSocket(this.host);
        this.onEvent("connect", {
          host: this.host
        });

        this.socket.onopen = function (event) {
          _this4.connected = true;
          event.host = _this4.host;

          _this4.onEvent("open", event);

          _this4.autoReconnectClose();
        };

        this.socket.onmessage = function (event) {
          event.host = _this4.host;
          var object = null;

          try {
            object = JSON.parse(event.data);

            if (object.event == "init") {
              _this4.onEvent("init", event, object, object.event, object.message, object.data);

              return;
            }

            _this4.onEvent("message", event, object, object.event, object.message, object.data);

            return;
          } catch (error) {
            _this4.onEvent("message", event, object, null, null, null);

            return;
          }
        };

        this.socket.onclose = function (event) {
          _this4.connected = false;
          event.host = _this4.host;
          delete _this4.socket;

          _this4.onEvent("close", event);

          _this4.autoReconnectOpen();
        };

        this.socket.onerror = function (event) {
          _this4.onEvent("error", event);
        };
      } catch (error) {
        throw error;
      }

      return this;
    }
  }, {
    key: "close",
    value: function close() {
      if (!this.socket) {
        return;
      }

      this.closed = true;
      this.socket.close();
      return this;
    }
  }, {
    key: "send",
    value: function send(message) {
      if (!this.socket) {
        return;
      }

      if (_typeof(message) == "object") {
        message = JSON.stringify(message);
      }

      this.socket.send(message + "");
      return this;
    }
  }, {
    key: "addon",
    value: function addon(name, object) {
      var x = ["on", "connect", "send", "addon"];

      if (x.includes(name)) {
        throw "addon name blacklist: " + x;
      }

      this[name] = object;
      return this;
    }
  }, {
    key: "autoReconnectOpen",
    value: function autoReconnectOpen() {
      var _this5 = this;

      this.autoReconnectLoop = setInterval(function () {
        if (_this5.autoReconnect && !_this5.connected && !_this5.paused && !_this5.closed) {
          _this5.connect();
        }
      }, 2000);
    }
  }, {
    key: "autoReconnectClose",
    value: function autoReconnectClose() {
      clearInterval(this.autoReconnectLoop);
    }
  }]);

  return WebSocketClient;
}(EventClass);

var RequestOld = /*#__PURE__*/function (_EventClass3) {
  _inherits(RequestOld, _EventClass3);

  var _super8 = _createSuper(RequestOld);

  function RequestOld(url, data) {
    var _this6;

    var isJSON = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, RequestOld);

    _this6 = _super8.call(this);

    var _this = _assertThisInitialized(_this6);

    _this6.onObject = new Object();
    _this6.url = url;
    _this6.data = data;
    _this6.isJSON = isJSON;

    _this6.makeXMLHttpRequest();

    return _possibleConstructorReturn(_this6, _assertThisInitialized(_this6));
  }

  _createClass(RequestOld, [{
    key: "on",
    value: function on(event, listener) {
      if (typeof listener != "function") {
        throw new Error("Request.on => listener must typeof function");
      }

      if (!this.onObject[event]) {
        this.onObject[event] = new Array();
      }

      this.onObject[event].push(listener);
      return this;
    }
  }, {
    key: "onEvent",
    value: function onEvent(event, call) {
      if (event == "error" && !this.onObject[event]) {
        console.warn(call);
      }

      if (this.onObject[event]) {
        var _iterator2 = _createForOfIteratorHelper(this.onObject[event]),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var f = _step2.value;
            f(call);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }]);

  return RequestOld;
}(EventClass);

var GetRequest = /*#__PURE__*/function (_RequestOld) {
  _inherits(GetRequest, _RequestOld);

  var _super9 = _createSuper(GetRequest);

  function GetRequest() {
    _classCallCheck(this, GetRequest);

    return _super9.apply(this, arguments);
  }

  _createClass(GetRequest, [{
    key: "makeXMLHttpRequest",
    value: function makeXMLHttpRequest() {
      var _this = this;

      this.xhr = new XMLHttpRequest();
      this.xhr.open("GET", this.url);

      this.xhr.onreadystatechange = function (event) {
        if (_this.xhr.readyState == 4) {
          var res = _this.xhr.responseText;

          if (_this.isJSON) {
            try {
              res = JSON.parse(res);
            } catch (error) {
              _this.onEvent("error", error);

              return;
            }
          }

          _this.onEvent("response", res);

          _this.onEvent("res", res);

          return;
        }
      };
    }
  }, {
    key: "send",
    value: function send() {
      this.xhr.send();
      return this;
    }
  }]);

  return GetRequest;
}(RequestOld);

var PostRequest = /*#__PURE__*/function (_RequestOld2) {
  _inherits(PostRequest, _RequestOld2);

  var _super10 = _createSuper(PostRequest);

  function PostRequest() {
    _classCallCheck(this, PostRequest);

    return _super10.apply(this, arguments);
  }

  _createClass(PostRequest, [{
    key: "makeXMLHttpRequest",
    value: function makeXMLHttpRequest() {
      var _this = this;

      this.xhr = new XMLHttpRequest();
      this.xhr.open("POST", this.url);
      this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      this.xhr.onreadystatechange = function (event) {
        if (_this.xhr.readyState == 4) {
          var res = _this.xhr.responseText;

          if (_this.isJSON) {
            try {
              res = JSON.parse(res);
            } catch (error) {
              _this.onEvent("error", error);

              return;
            }
          }

          _this.onEvent("response", res);

          _this.onEvent("res", res);

          if (res.event == "error") {
            _this.onEvent("error", res.data);

            return;
          } else if (res.event == "success" || res.event == "ok") {
            _this.onEvent("success", res.data);

            _this.onEvent("ok", res.data);

            return;
          } else if (res.event == "failed") {
            _this.onEvent("failed", res.data);

            return;
          }

          return;
        }
      };
    }
  }, {
    key: "send",
    value: function send() {
      this.xhr.send(JSON.stringify(this.data));
      return this;
    }
  }]);

  return PostRequest;
}(RequestOld);