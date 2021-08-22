"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getSongsList() {
  new APIGetRequest("https://cucumbery.com/api/songs2", {}).on("success", function (res) {
    document.querySelector("#form .left").innerHTML = "";

    var _iterator = _createForOfIteratorHelper(res.data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var file = _step.value;
        var e = document.createElement("div");
        e.classList.add("nbsfile");
        var html = "";
        html += "<div>" + file.name + "</div>";
        html += "<div>" + Math.floor(file.size / 1024) + "KB</div>";
        e.innerHTML = html;
        e.setAttribute("name", file.name);
        e.addEventListener("dblclick", function (event) {
          var target = event.target;

          while (!target.classList.contains("nbsfile")) {
            target = target.parentElement;
          }

          var name = target.getAttribute("name");
          new FileGetRequest("https://cucumbery.com/api/songs/" + name, {}).on("success", function (res) {
            saveBlob(res, name);
          }).send();
        });
        document.querySelector("#form .left").appendChild(e);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }).send();
}

document.querySelector("#input-upload").addEventListener("click", function (event) {
  var files = document.querySelector("#input-file").files;

  var _iterator2 = _createForOfIteratorHelper(files),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var file = _step2.value;
      var req = new FilePostRequest("https://cucumbery.com/api/songs/upload", {
        file: file
      }).on("success", function (res) {
        document.querySelector("#input-file").clear();
        getSongsList();
        new FloatMessage("업로드가 완료되었습니다");
      }).on("error", function (res) {
        new FloatMessage("업로드가 망했습니다; 왜냐하면 " + res.message, error);
      }).send();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
});
getSongsList();

function saveBlob(blob, fileName) {
  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  a.dispatchEvent(new MouseEvent('click'));
}