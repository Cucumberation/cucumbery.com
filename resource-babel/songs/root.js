

function getSongsList() {
  new APIGetRequest("https://cucumbery.com/api/songs2", {
  }).on("success", res => {
    document.querySelector("#form .left").innerHTML = "";
    for (var file of res.data) {
      var e = document.createElement("div");
      e.classList.add("nbsfile");
      var html = "";
      html += "<div>" + file.name + "</div>"
      html += "<div>" + Math.floor(file.size / 1024) + "KB</div>"
      e.innerHTML = html;
      e.setAttribute("name", file.name)
      e.addEventListener("dblclick", event => {
        var target = event.target;
        while (!target.classList.contains("nbsfile")) {
          target = target.parentElement;
        }
        var name = target.getAttribute("name");
        new FileGetRequest("https://cucumbery.com/api/songs/" + name, {
        }).on("success", res => {
          saveBlob(res, name);
        }).send();
      });
      document.querySelector("#form .left").appendChild(e);
    }
  }).send();
}

document.querySelector("#input-upload").addEventListener("click", event => {
  var files = document.querySelector("#input-file").files;
  for (var file of files) {
    var req = new FilePostRequest("https://cucumbery.com/api/songs/upload", {
      file: file,
    }).on("success", res => {
      document.querySelector("#input-file").clear();
      getSongsList();
      new FloatMessage("업로드가 완료되었습니다");
    }).on("error", res => {
      new FloatMessage("업로드가 망했습니다; 왜냐하면 " + res.message, error);
    }).send();
  }
});

getSongsList();

function saveBlob(blob, fileName) {
  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  a.dispatchEvent(new MouseEvent('click'));
}

