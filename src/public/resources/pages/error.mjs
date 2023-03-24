'use strict';

new (class extends LapisScript {
  load() {
    Lapis.setInterval(() => {
      var image = document.querySelector('#error-jhotwt');
      var r = (new Date().getTime() % 3600) / 10;
      image.style.transform = 'rotate3d(1, 2, -1, ' + r + 'deg)';
      image.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';

      if (Math.random() < 0.1) {
        var da = document.querySelector('#error-da');
        da.style.transition = 'left ' + Math.random() + 's ease-in-out';
        da.style.left = Math.random() * 400 - 200 + '%';
      }
    }, 10);
  }

  unload() {}
})();
