



setInterval(() => {
  var image = document.querySelector("#jhotwt");
  var r = (new Date().getTime() % 3600) / 10;
  image.style.transform = "rotate3d(1, 2, -1, " + r + "deg)";
  image.style.filter = "hue-rotate(" + (Math.random() * 360) + "deg)";
}, 10); 

function moveDa() {
  var da = document.querySelector("#da");
  da.style.transition = "left " + Math.random() + "s ease-in-out";
  da.style.left = ((Math.random() * 400) - 200) + "%";
  setTimeout(() => {
    moveDa();
  }, Math.max(50, Math.random() * 500))
}
moveDa();
