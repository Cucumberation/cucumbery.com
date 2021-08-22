/**
 * request.js
 * 
 * (c) 2020-2021 Wnynya
 * 
 * @summary some request classes
 * @author Wany <wnynya@gmail.com>
*/

class Request extends EventClass {

  constructor(url, data, isJSON = false) {
    super();
    this.onObject = new Object();

    this.url = url;
    this.data = data;
    this.isJSON = isJSON;

    var _this = this;

    this.xhr = new XMLHttpRequest();
    this.xhr.withCredentials = true;
    this.openXMLHttpRequest();
    this.xhr.onreadystatechange = (event) => {
      _this.onXMLHttpRequestRSC(event);
    }

    return this;
  }

  on(event, listener) {
    if ((typeof listener) != "function") { throw new Error("Request.on => listener must typeof function"); }
    if (!this.onObject[event]) {
      this.onObject[event] = new Array();
    }
    this.onObject[event].push(listener);
    return this;
  }

  onEvent(event, call) {
    if (event == "error" && !this.onObject[event]) {
      console.warn(call);
    }
    if (this.onObject[event]) { 
      for (const f of this.onObject[event]) { 
        f (call); 
      }
    }
  }

  onXMLHttpRequestRSC(event) {
    if (this.xhr.readyState == 4) {
      var status = this.xhr.status;

      var res = this.xhr.responseText;
      if (this.isJSON) {
        try {
          res = JSON.parse(res);
        }
        catch (error) {
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
}

class APIGetRequest extends Request {

  openXMLHttpRequest() {
    this.isJSON = true;
    this.xhr.open("GET", this.url);
  }

  send() {
    this.xhr.send();
    return this;
  }

}

class APIPostRequest extends Request {

  openXMLHttpRequest() {
    this.isJSON = true;
    this.xhr.open("POST", this.url);
    this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  }

  send() {
    this.xhr.send(JSON.stringify(this.data));
    return this;
  }

}

class APIPatchRequest extends Request {

  openXMLHttpRequest() {
    this.isJSON = true;
    this.xhr.open("PATCH", this.url);
    this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  }

  send() {
    this.xhr.send(JSON.stringify(this.data));
    return this;
  }

}

class APIPutRequest extends Request {

  openXMLHttpRequest() {
    this.isJSON = true;
    this.xhr.open("PUT", this.url);
    this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  }

  send() {
    this.xhr.send(JSON.stringify(this.data));
    return this;
  }

}

class APIDeleteRequest extends Request {

  openXMLHttpRequest() {
    this.isJSON = true;
    this.xhr.open("DELETE", this.url);
    this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  }

  send() {
    this.xhr.send(JSON.stringify(this.data));
    return this;
  }

}

class WebSocketClient extends EventClass {

  constructor (host, autoReconnect = false) {
    super();
    this.onObject = new Object();

    if (!host) { throw new Error("WebSocketClient.constructor => host does not exist."); }
    if ((typeof host) != "string") { throw new Error("WebSocketClient.constructor => host must typeof string."); }

    this.host = host;
    this.socket = null;
    this.connected = false;
    this.paused = false;
    this.closed = false;

    this.autoReconnect = autoReconnect;
    this.autoReconnectLoop = null;
  }

  connect() {
    if (this.socket || this.connected) { return; }
    this.closed = false;
    try { 
      this.socket = new WebSocket(this.host); 

      this.onEvent("connect", { host: this.host });

      this.socket.onopen = (event) => {
        this.connected = true;
        event.host = this.host;
        this.onEvent("open", event);
        this.autoReconnectClose();
      }

      this.socket.onmessage = (event) => {
        event.host = this.host;
        var object = null;
        try {
          object = JSON.parse(event.data);
          if (object.event == "init") {
            this.onEvent("init", event, object, object.event, object.message, object.data);
            return;
          }
          this.onEvent("message", event, object, object.event, object.message, object.data);
          return;
        } catch (error) {
          this.onEvent("message", event, object, null, null, null);
          return;
        }
      }

      this.socket.onclose = (event) => {
        this.connected = false;
        event.host = this.host;
        delete this.socket;
        this.onEvent("close", event);
        this.autoReconnectOpen();
      }

      this.socket.onerror = (event) => {
        this.onEvent("error", event);
      }

    } catch (error) { throw error; }
    return this;
  }

  close() {
    if (!this.socket) { return; }
    this.closed = true;
    this.socket.close();
    return this;
  }

  send(message) {
    if (!this.socket) { return; }
    if (typeof message == "object") {
      message = JSON.stringify(message);
    }
    this.socket.send(message + "");
    return this;
  }

  addon(name, object) {
    const x = ["on", "connect", "send", "addon"];
    if (x.includes(name)) { throw "addon name blacklist: " + x; }
    this[name] = object;
    return this;
  }

  autoReconnectOpen() {
    this.autoReconnectLoop = setInterval(() => {
      if (this.autoReconnect && !this.connected && !this.paused && !this.closed) {
        this.connect();
      }
    }, 2000);
  }

  autoReconnectClose() {
    clearInterval(this.autoReconnectLoop);
  }

}

class RequestOld extends EventClass {

  constructor(url, data, isJSON = false) {
    super();
    var _this = this;
    this.onObject = new Object();

    this.url = url;
    this.data = data;
    this.isJSON = isJSON;

    this.makeXMLHttpRequest();
    return this;
  }

  on(event, listener) {
    if ((typeof listener) != "function") { throw new Error("Request.on => listener must typeof function"); }
    if (!this.onObject[event]) {
      this.onObject[event] = new Array();
    }
    this.onObject[event].push(listener);
    return this;
  }

  onEvent(event, call) {
    if (event == "error" && !this.onObject[event]) {
      console.warn(call);
    }
    if (this.onObject[event]) { 
      for (const f of this.onObject[event]) { 
        f (call); 
      }
    }
  }
}

class GetRequest extends RequestOld {

  makeXMLHttpRequest() {
    var _this = this;

    this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", this.url);
    this.xhr.onreadystatechange = function (event) {
      if (_this.xhr.readyState == 4) {
        var res = _this.xhr.responseText;
        if (_this.isJSON) {
          try {
            res = JSON.parse(res);
          }
          catch (error) {
            _this.onEvent("error", error);
            return;
          }
        }
        _this.onEvent("response", res);
        _this.onEvent("res", res);
        return;
      }
    }
  }

  send() {
    this.xhr.send();
    return this;
  }

}

class PostRequest extends RequestOld {

  makeXMLHttpRequest() {
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
          }
          catch (error) {
            _this.onEvent("error", error);
            return;
          }
        }
        _this.onEvent("response", res);
        _this.onEvent("res", res);
        if (res.event == "error") {
          _this.onEvent("error", res.data);
          return;
        }
        else if (res.event == "success" || res.event == "ok") {
          _this.onEvent("success", res.data);
          _this.onEvent("ok", res.data);
          return;
        }
        else if (res.event == "failed") {
          _this.onEvent("failed", res.data);
          return;
        }
        return;
      }
    }
  }

  send() {
    this.xhr.send(JSON.stringify(this.data));
    return this;
  }

}