'use strict';

import { JSONGetRequest } from 'https://wany.io/resources/modules/request.mjs';

new (class extends LapisScript {
  load() {
    var features = [
      '각종 아이템 따위의 설명을 추가합니다. 아이템에 외부 입력 마우스의 커서를 사용하여 다양한 설명을 보고 도움받을 수 있습니다.',
      '게임 서버 입장 그리고 퇴장 시 출력되는 메시지를 및 알림음을 지정하여 시스템-컴퓨터의 구동 속도를 높일 수 있습니다.',
      '게임 내 대화 혹은 서버 제어 입력자 사용 시 알림음을 출력하여 풍부한 게임 내 환경을 구현할 수 있습니다.',
      '각종 병충해 소독 작업 기능을 제공합니다.',
      "열쇠<span><img src='https://cucumbery.com/resources/pages/root-key.png'></span>값기반국제언어지원시스템™ 을 사용하여 다양한 언어 환경에서 정상적인 문구 출력을 지원합니다.",
      '육면음표체 API 를 지원하여 육면음표-작업실에서 제작한 육면음표 기록을 재생할 수 있습니다. 기록의 재생은 연결된 세대에 전해집니다.',
      "<a href='https://amuject.wany.io/the-big-green-button'>閭뚣겓壤㏂겘_ゃ걚_묆굦_</a>",
      '훌륭한 역할극 게임의 수행 기능이 제공됩니다. 다양한 역할이 강제로 지정되어 문제를 야기할 때에는 신께 기도하십시오.',
      '이 플러그-인 외에도 다른 관련 플러그-인과 연동하여 추가적인 기능의 활성화를 노릴 수 있습니다. 이러한 작업은 안정성을 보장하지 않습니다. 사용 가이드 및 주의사항을 1회 이상 확인하십시오.',
      '특수한 제작 비법의 추가가 가능합니다. 제작 비법 추가는 게임-서버 접속자들에게 추가적인 경험 조합을 제공합니다.',
      '사망 시에는 사망 사유를 어느 정도 확실하게 밝혀두는 게 좋습니다. 이 플러그-인은 부검 기능을 통해 게임-서버 접속자들의 일시적인 생명 활동 정지 및 주변 가상 생명체의 영구적인 소멸에도 대응합니다.',
      '청소창을 단정하게 채팅할 수 있습니다. 문자들은 당신의 시야를 어지럽힙니다.',
      '저희는 항상 큐컴버리 플러그-인을 개선하고자 하며 이를 위해 일부 정보를 수집하고자 합니다. 이 정보를 통하여 저희는 어떤 하드웨어를 지원해야 하는지와 큰 문제점들이 어디에 있는지, 그리고 활성 플레이어 수가 얼마인지를 파악할 수 있읍니다. 아래에서 수집되는 모든 정보를 보실 수 없읍니다.',
      '사용자-정의 블록 파괴 및 잔해 처리 장치가 제공됩니다. 영원에 대한 노력은 이제서야 끝을 마주합니다.',
      '창조적 약물 사용의 장려를 위해 추가적인 약물 접촉 기회가 제공됩니다. 당신의 시야 위에 표시됩니다. 이 기회는 다른 연합회의 플러그-인을 통해 퍼져나갈 수 있습니다.',
      '비레거시-비지원-비API 사용을 통해 사용자 서버 구현체의 시대적 배경을 알 수 있습니다. 시대착오적인 행위는 세상을 어지럽힙니다.',
      '게임 서버 플레이 중 가해한 경우 피해-독립체의 우울을 수치적으로 나타냅니다.',
      '플러그-인 명령어 사용 중 발전된 단위공백-자동완성 기능을 제공합니다.',
      '사용자 지정 호칭을 지정할 수 있습니다. 지정된 지정 호칭은 무수한 지정가능영역에서 사용됩니다.',
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
