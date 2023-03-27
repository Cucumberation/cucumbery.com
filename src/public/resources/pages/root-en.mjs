'use strict';

import { JSONGetRequest } from 'https://wany.io/resources/modules/request.mjs';

new (class extends LapisScript {
  load() {
    var features = [
      'various item such explain Add. to the item Out input of the mouse cursor using various explain report get help number there is.',
      'game server Entrance and Exit city output message and beep by designation system - computer Driving speed up raise number there is.',
      'game my conversation or server control typer use city beep by outputting abundant game my the environment to implement number there is.',
      'various disease Disinfection work function provide.',
      "key<span><img src='https://cucumbery.com/resources/pages/root-key.png'></span>Value-Based International Language Support System™ second using various language in the environment normal Phrases output support.",
      'six-sided note API cast support Six-sided notes - in the studio produced six-sided note record play number there is. of record play is connected in generations it is transmitted.',
      "<a href='https://amuject.wany.io/the-big-green-button'>Opening</a>",
      'excellent role play of the game Perform function provided. various the role forcibly designated problem to cause when to god Pray.',
      'this plug-in besides different related plug-in and in conjunction with additional functional activate Noril number there is. Such work is stability not guaranteed not. use guide and notice 1 time more Check it out.',
      "special produce secret add it's possible. produce secret add game-server to accessors additional experience combination provide.",
      'Dead at the time Dead reason any degree Surely to reveal crab great. this plug-ins autopsy function through game-server of accessors temporary life activity stop and around email of life permanent even with extinction respond.',
      'clean window neatly to chat number there is. the characters your sight It messes up.',
      'We always qcombury plug-in to improve and this for part Information want to collect do. this Information through We which hardware need to support hajiwa big the problems where whether and activation player medical charge how much figure out number there is from below collected every Information to see number No.',
      'Custom block Destruction and wreck process the device provided. in eternity About effort is now end face to face.',
      'creative drug of use to encourage for additional drug contact have a chance provided. your eyesight above displayed. this the chance is different association meeting plug-in through to spread number there is.',
      'non-legacy-non-support-non-API to use through user server of the embodiment era background egg number there is. anachronistic act is the world It messes up.',
      'game server paly middle perpetrated case of the damage-entity melancholy numerically indicate.',
      'plug-in command use middle advanced unit space-autocompletion function provide.',
      'user appointed name to specify number there is. designated user appointed appointed designation designation is myriad appointed possible in the realm used.',
    ];
    var usedfeatures = [];

    function randomNumberNotIn(size, list) {
      var r = Math.floor(Math.random() * size + 0.9);

      while (list.includes(r)) {
        r = Math.floor(Math.random() * size + 0.9);
      }

      return r;
    }

    for (var _i = 0, _features = features; _i < _features.length; _i++) {
      var f = _features[_i];
      var r = randomNumberNotIn(features.length - 1, usedfeatures);
      usedfeatures.push(r);
      var e = document.createElement('li');
      e.innerHTML = features[r];
      document.querySelector('#root-description ul').appendChild(e);
    }

    Lapis.setInterval(() => {
      var image = document.querySelector('#root-jhotwt');
      var r = Math.random();
      image.style.transform = 'rotate3d(1, 2, -1, ' + r * 360 + 'deg)';
    }, Math.max(50, Math.random() * 500));
    Lapis.setInterval(() => {
      var image = document.querySelector('#root-jhotwt');
      var r = Math.random();
      image.style.transform = 'rotate3d(1, 2, -1, ' + r * 360 + 'deg)';
    }, Math.max(50, Math.random() * 500));
    Lapis.setInterval(() => {
      if (Math.random() < 0.1) {
        var da = document.querySelector('#root-da');
        da.style.transition = 'left ' + Math.random() + 's ease-in-out';
        da.style.left = Math.random() * 400 - 200 + '%';
      }
    });

    JSONGetRequest(
      'https://api.wany.io/amethy/repository/Cucumbery/dev/latest'
    ).then((res) => {
      console.log(res);
    });
  }

  unload() {}
})();

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(vector) {
    this.x = this.x + vector.x;
    this.y = this.y + vector.y;
  }

  subtract(vector) {
    this.x = this.x - vector.x;
    this.y = this.y - vector.y;
  }

  multiply(vector) {
    this.x = this.x * vector.x;
    this.y = this.y * vector.y;
  }

  divide(vector) {
    this.x = this.x / vector.x;
    this.y = this.y / vector.y;
  }

  normalize() {
    var s = this.speed();
    if (s > 0) {
      this.divide(new Vector(s, s));
    }
  }

  speed() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  angle() {
    return Math.atan2(this.y, this.x);
  }

  distence(vector) {
    return Math.sqrt(
      Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2)
    );
  }

  clone() {
    return new Vector(this.x, this.y);
  }
}

class Ball {
  constructor(element, position, velocity, radius, mass = 1) {
    this.element = element;
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
    this.mass = mass;
    this.boost = new Vector(0, 0);
  }

  move() {
    this.position.add(this.velocity);
  }

  moveElement() {
    this.element.style.left = this.position.x - this.radius + 'px';
    this.element.style.top = this.position.y - this.radius + 'px';
  }

  distence(ball) {
    return this.position.distence(ball.position);
  }

  speed() {
    return this.velocity.speed();
  }

  angle() {
    return this.velocity.angle();
  }

  //collision source: https://github.com/miskimit/miskimit.github.io
  boxCollision(width, height) {
    if (
      this.position.x - this.radius < 0 ||
      this.position.x + this.radius > width
    ) {
      this.velocity.multiply(new Vector(-1, 1));
      if (this.position.x - this.radius + this.velocity.x < 0) {
        this.position.x = this.radius;
      }
      if (this.position.x + this.radius + this.velocity.x > width) {
        this.position.x = width - this.radius;
      }
    }

    if (
      this.position.y - this.radius < 0 ||
      this.position.y + this.radius > height
    ) {
      this.velocity.multiply(new Vector(1, -1));
      if (this.position.y - this.radius + this.velocity.y < 0) {
        this.position.y = this.radius;
      }
      if (this.position.y + this.radius + this.velocity.y > height) {
        this.position.y = height - this.radius;
      }
    }
  }

  staticCollision(ball2) {
    let overlap = this.radius + ball2.radius - this.distence(ball2);
    let theta = Math.atan2(
      this.position.y - ball2.position.y,
      this.position.x - ball2.position.x
    );
    var dx = overlap * Math.cos(theta);
    var dy = overlap * Math.sin(theta);
    this.position.add(new Vector(dx, dy));
    ball2.position.subtract(new Vector(dx, dy));
  }

  cursorShadow(cursor) {
    var shadow = this.element.querySelector('.shadow');
    if (!shadow) {
      return;
    }
    var cx = this.position.x - cursor.x;
    var cy = this.position.y - cursor.y;
    var cr = this.radius - 15;
    shadow.style.left = cx / 20 + cr + 'px';
    shadow.style.top = cy / 20 + cr + 'px';
    var blur = (Math.abs(cx) + Math.abs(cy)) / 2 / 40 + 2;
    var rrr = this.radius - 20;
    var bg = window
      .getComputedStyle(shadow)
      .getPropertyValue('background-color');
    shadow.style.boxShadow = '0px 0px ' + blur + 'px ' + rrr + 'px ' + bg;
  }
}

class BallField {
  constructor() {
    this.balls = new Array();
    this.small;
    this.cursor = new Vector(0, 0);
    this.onResize();
    var _this = this;
    window.addEventListener('resize', function (event) {
      _this.onResize();
    });
    document.addEventListener('keydown', function (event) {
      if (event.altKey && event.key.toLocaleLowerCase() == 'b') {
        var ballsElement = document.querySelector('#root-ballfield .field');
        var nb = document.createElement('div');
        nb.classList.add('ball');
        nb.classList.add('no4');
        nb.style.backgroundColor =
          'rgb(' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 255) +
          ',' +
          Math.floor(Math.random() * 255) +
          ')';
        ballsElement.appendChild(nb);
        _this.newBall(nb, 100);
      } else if (event.altKey && event.key.toLocaleLowerCase() == 'v') {
        var ballsElement = document.querySelector('#root-ballfield .field');
        if (ballsElement.childElementCount <= 3) {
          return;
        }
        ballsElement.removeChild(ballsElement.lastChild);
        _this.balls.pop();
      } else if (event.altKey && event.key.toLocaleLowerCase() == 'h') {
        for (var i = 0; i < 10; i++) {
          var ballsElement = document.querySelector('#root-ballfield .field');
          var nb = document.createElement('div');
          nb.classList.add('ball');
          nb.classList.add('no4');
          nb.style.backgroundColor =
            'rgb(' +
            Math.floor(Math.random() * 255) +
            ',' +
            Math.floor(Math.random() * 255) +
            ',' +
            Math.floor(Math.random() * 255) +
            ')';
          ballsElement.appendChild(nb);
          _this.newBall(nb, 100);
        }
      } else if (event.altKey && event.key.toLocaleLowerCase() == 'g') {
        for (var i = 0; i < 10; i++) {
          var ballsElement = document.querySelector('#root-ballfield .field');
          if (ballsElement.childElementCount <= 3) {
            return;
          }
          ballsElement.removeChild(ballsElement.lastChild);
          _this.balls.pop();
        }
      } /*else if (event.altKey && event.key.toLocaleLowerCase() == 'r') {
        var ballsElement = document.querySelector('#root-ballfield');
        ballsElement.classList.toggle('real');
      }*/
    });
    /*document.addEventListener('mousemove', function (event) {
       _this.cursor = new Vector(event.clientX, event.clientY);
     });*/

    function f() {
      _this.frame();
      window.requestAnimationFrame(f);
    }
    window.requestAnimationFrame(f);

    this.onResize();

    if (Math.random() * 100 < 1.0) {
      document.querySelector('#root-ballfield').classList.toggle('real');
    }

    Lapis.setTimeout(() => {
      _this.onResize();
    }, 500);
  }

  frame() {
    this.collision();
    for (var ball of this.balls) {
      ball.move();
      ball.moveElement();
    }
  }

  collision() {
    var ballsClone = this.balls.filter(() => true);

    for (let n = 0; n < ballsClone.length; n++) {
      for (let m = n + 1; m < ballsClone.length; m++) {
        var ball1 = ballsClone[n];
        var ball2 = ballsClone[m];
        var distence = ball1.distence(ball2);

        if (distence < ball1.radius + ball2.radius) {
          let theta1 = ball1.angle();
          let theta2 = ball2.angle();
          let phi = Math.atan2(
            ball2.position.y - ball1.position.y,
            ball2.position.x - ball1.position.x
          );
          let m1 = ball1.mass;
          let m2 = ball2.mass;
          let v1 = ball1.speed();
          let v2 = ball2.speed();

          let dx1F =
            ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
              2 * m2 * v2 * Math.cos(theta2 - phi)) /
              (m1 + m2)) *
              Math.cos(phi) +
            v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI / 2);
          let dy1F =
            ((v1 * Math.cos(theta1 - phi) * (m1 - m2) +
              2 * m2 * v2 * Math.cos(theta2 - phi)) /
              (m1 + m2)) *
              Math.sin(phi) +
            v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI / 2);
          let dx2F =
            ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
              2 * m1 * v1 * Math.cos(theta1 - phi)) /
              (m1 + m2)) *
              Math.cos(phi) +
            v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI / 2);
          let dy2F =
            ((v2 * Math.cos(theta2 - phi) * (m2 - m1) +
              2 * m1 * v1 * Math.cos(theta1 - phi)) /
              (m1 + m2)) *
              Math.sin(phi) +
            v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI / 2);

          this.balls[n].velocity.x = dx1F;
          this.balls[n].velocity.y = dy1F;
          this.balls[m].velocity.x = dx2F;
          this.balls[m].velocity.y = dy2F;

          this.balls[n].staticCollision(this.balls[m]);
        }
      }

      this.balls[n].boxCollision(window.innerWidth, window.innerHeight);
    }
  }

  onResize() {
    var percent = 25;
    var s = (window.innerWidth + window.innerHeight) / 2;
    var diameter = Math.max((s / 100.0) * percent, 90);
    var radius = diameter / 2;
    for (var ball of this.balls) {
      ball.radius = radius;
      ball.element.style.width = diameter + 'px';
      ball.element.style.height = diameter + 'px';
    }
  }

  newBall(element, radius, mass = 1) {
    var position = new Vector(
      Math.floor(Math.random() * window.innerWidth),
      Math.floor(Math.random() * window.innerHeight)
    );
    var velocity = new Vector(
      Math.max(0.5, Math.random() * 2),
      Math.max(0.5, Math.random() * 2)
    );
    if (Math.random() > 0.5) {
      velocity.multiply(new Vector(-1, 1));
    }
    if (Math.random() > 0.5) {
      velocity.multiply(new Vector(1, -1));
    }
    //var velocity = new Vector(0, 0);
    var b = new Ball(element, position, velocity, radius, mass);

    b.dragmovement = [
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
      new Vector(0, 0),
    ];

    b.lastpos = new Vector(0, 0);

    element.addEventListener('mousedown', function (event) {
      element.classList.add('dragging');
      event.preventDefault();
    });

    document.addEventListener('mouseup', function (event) {
      element.classList.remove('dragging');
    });

    document.addEventListener('mousemove', function (event) {
      if (!element.classList.contains('dragging')) {
        return;
      }
      b.position.x = event.clientX; // + window.pageXOffset;
      b.position.y = event.clientY; // + window.pageYOffset;
      b.dragmovement.pop();
      b.dragmovement.unshift(
        new Vector(event.movementX / 30, event.movementY / 30)
      );
      var movement = b.dragmovement[5].clone();
      movement.add(b.dragmovement[4]);
      movement.add(b.dragmovement[3]);
      b.velocity = movement;
    });

    element.addEventListener(
      'touchstart',
      function (event) {
        element.classList.add('dragging');
        b.lastpos = new Vector(0, 0);
        b.lastpos.x = event.changedTouches[0].clientX;
        +window.pageXOffset;
        b.lastpos.y = event.changedTouches[0].clientY;
        +window.pageYOffset;
        event.preventDefault();
      },
      false
    );

    document.addEventListener(
      'touchmove',
      function (event) {
        if (!element.classList.contains('dragging')) {
          return;
        }
        b.position.x = event.changedTouches[0].clientX; // + window.pageXOffset;
        b.position.y = event.changedTouches[0].clientY; // + window.pageYOffset;
        var move = new Vector(
          (b.position.x - b.lastpos.x) / 10.0,
          (b.position.y - b.lastpos.y) / 10.0
        );
        b.dragmovement.pop();
        b.dragmovement.unshift(move);
        var movement = b.dragmovement[5].clone();
        movement.add(b.dragmovement[4]);
        movement.add(b.dragmovement[3]);
        b.velocity = movement;
        b.lastpos = b.position.clone();
      },
      false
    );

    document.addEventListener(
      'touchcancel',
      function (event) {
        element.classList.remove('dragging');
      },
      false
    );

    document.addEventListener(
      'touchend',
      function (event) {
        element.classList.remove('dragging');
      },
      false
    );

    this.balls.push(b);
    this.onResize();
  }
}

function marquee(msgs, element, speed = 200.0, margin = 100) {
  let pendings = [];
  let msgi = -1;

  function frame() {
    var rect = element.getBoundingClientRect();
    var currents = element.querySelectorAll('*');

    if (pendings.length > 0) {
      if (currents.length > 0) {
        var last = currents[currents.length - 1];
        var lastrect = last.getBoundingClientRect();
        if (rect.right > lastrect.right) {
          appendElement();
        }
      } else {
        appendElement();
      }
    }

    function appendElement() {
      const append = pendings[0];
      pendings.shift();
      element.appendChild(append);
      const appendrect = append.getBoundingClientRect();
      append.style.left = rect.width + margin + 'px';
      const go = (appendrect.width + 100) * -1;
      const length = rect.width - go;
      append.style.transition = 'left ' + length / speed + 's linear';
      Lapis.setTimeout(() => {
        append.style.left = go + 'px';
      }, 1);
    }

    for (var current of currents) {
      var currentrect = current.getBoundingClientRect();
      if (currentrect.right < rect.left) {
        element.removeChild(current);
        pend(msg());
      }
    }
  }

  var intv = Lapis.setInterval(() => {
    frame();
  }, 100);

  function msg() {
    msgi++;
    msgi >= msgs.length ? (msgi = 0) : null;
    return msgs[msgi];
  }

  function pend(text) {
    var p = document.createElement('p');
    p.innerHTML = text;
    pendings.push(p);
  }

  pend(msg());
  pend(msg());
  pend(msg());
  pend(msg());
  pend(msg());
  pend(msg());
  pend(msg());
  pend(msg());
  pend(msg());
  pend(msg());

  return intv;
}
