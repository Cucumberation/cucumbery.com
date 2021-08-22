

class EventClass {

  constructor() {
    this.onObject = new Object();
    return this;
  }

  on(event, listener) {
    if ((typeof listener) != "function") { throw new Error("EventClass.on => listener must typeof function"); }
    if (!this.onObject[event]) {
      this.onObject[event] = new Array();
    }
    this.onObject[event].push(listener);
    return this;
  }

  onEvent(event, ...calls) {
    if (event == "error" && !this.onObject[event]) {
      console.warn(...calls);
    }
    if (this.onObject[event]) { 
      for (const f of this.onObject[event]) { 
        f (...calls); 
      }
    }
  }

}