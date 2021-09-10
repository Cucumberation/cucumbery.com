

function getSongsList() {
  new APIGetRequest("https://cucumbery.com/api/songs", {
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
        });
      });
      document.querySelector("#form .left").appendChild(e);
    }
  });
}

document.querySelector("#input-upload").addEventListener("click", event => {
  const files = document.querySelector("#input-file").files;
  if (!files || files.length == 0) {
    document.querySelector("#input-file").click();
  }
  else {
    for (const file of files) {

      new FilePostRequest("https://cucumbery.com/api/songs", {
        file: file,
      }).on("success", res => {
        document.querySelector("#input-file").clear();
        getSongsList();
        new FloatMessage("업로드가 완료되었습니다");
      }).on("error", res => {
        new FloatMessage("업로드가 망했습니다; 왜냐하면 " + res.message, error);
      });
  
    }
  }
});

getSongsList();

function saveBlob(blob, fileName) {
  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  a.download = fileName;
  a.dispatchEvent(new MouseEvent('click'));
}

