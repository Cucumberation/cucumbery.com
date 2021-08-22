


var features = [
  "각종 아이템 따위의 설명을 추가합니다. 아이템에 외부 입력 마우스의 커서를 사용하여 다양한 설명을 보고 도움받을 수 있습니다.",
  "게임 서버 입장 그리고 퇴장 시 출력되는 메시지를 및 알림음을 지정하여 시스템-컴퓨터의 구동 속도를 높일 수 있습니다.",
  "게임 내 대화 혹은 서버 제어 입력자 사용 시 알림음을 출력하여 풍부한 게임 내 환경을 구현할 수 있습니다.",
  "각종 병충해 소독 작업 기능을 제공합니다.",
  "열쇠<span><img src='https://cucumbery.com/image/asdasd.png'></span>값기반국제언어지원시스템™ 을 사용하여 다양한 언어 환경에서 정상적인 문구 출력을 지원합니다.",
  "육면음표체 API 를 지원하여 육면음표 스튜디오 시설에서 제작한 육면음표 기록을 재생할 수 있습니다. 기록의 재생은 연결된 세대에 전해집니다.",
  "<a id='gotogreen' href='https://wany.io/a/the-big-green-button'>閭뚣겓壤㏂겘_ゃ걚_묆굦_</a>",
  "훌륭한 역할극 게임의 수행 기능이 제공됩니다. 다양한 역할이 강제로 지정되어 문제를 야기할 때에는 신께 기도하십시오.",
  "이 플러그-인 외에도 다른 관련 플러그-인과 연동하여 추가적인 기능의 활성화를 노릴 수 있습니다. 이러한 작업은 안정성을 보장하지 않습니다. 사용 가이드 및 주의사항을 1회 이상 확입하십시오.",
  "특수한 제작 비법의 추가가 가능합니다. 제작 비법 추가는 게임-서버 접속자들에게 추가적인 경험 조합을 제공합니다.",
  "사망 시에는 사망 사유를 어느 정도 확실하게 밝혀두는 게 좋습니다. 이 플러그-인은 부검 기능을 통해 게임-서버 접속자들의 일시적인 생명 활동 정지 및 주변 가상 생명체의 영구적인 소멸에도 대응합니다.",
  "청소창을 단정하게 채팅할 수 있습니다. 문자들은 당신의 시야를 어지럽힙니다.",
  "저희는 항상 큐컴버리 플러그-인을 개선하고자 하며 이를 위해 일부 정보를 수집하고자 합니다. 이 정보를 통하여 저희는 어떤 하드웨어를 지원해야 하는지와 큰 문제점들이 어디에 있는지, 그리고 활성 플레이어 수가 얼마인지를 파악할 수 있읍니다. 아래에서 수집되는 모든 정보를 보실 수 없읍니다.",
]

var usedfeatures = [];

function randomNumberNotIn(size, list) {
  var r = Math.floor((Math.random() * size) + 0.9);
  while(list.includes(r)) {
    r = Math.floor((Math.random() * size) + 0.9);
  }
  return r;
}

for (var f of features) {
  var r = randomNumberNotIn(features.length - 1, usedfeatures);
  usedfeatures.push(r);
  var e = document.createElement("li");
  e.innerHTML = features[r];
  document.querySelector("#intro ul").appendChild(e);
}

setInterval(() => {
  var image = document.querySelector("#jhotwt");
  var r = Math.random();
  image.style.transform = "rotate3d(1, 2, -1, " + (r * 360) + "deg)";
  /*if (0 <= r && r < 0.3) {
    // Do Nothing
  }
  else if (0.3 <= r && r < 0.6 ) {
    image.style.transform = "rotateY(180deg)";
  }
  else if (0.6  <= r && r <= 1) {
    image.style.transform = "rotateY(0deg)";
  }*/
}, Math.max(50, Math.random() * 500)); 

function moveDa() {
  var da = document.querySelector("#da");
  da.style.transition = "left " + Math.random() + "s ease-in-out";
  da.style.left = ((Math.random() * 400) - 200) + "%";
  setTimeout(() => {
    moveDa();
  }, Math.max(50, Math.random() * 500))
}
moveDa();

setInterval(() => {
  var image = document.querySelector("#jhotwt");
  var r = Math.random();
  image.style.transform = "rotate3d(1, 2, -1, " + (r * 360) + "deg)";
  /*if (0 <= r && r < 0.3) {
    // Do Nothing
  }
  else if (0.3 <= r && r < 0.6 ) {
    image.style.transform = "rotateY(180deg)";
  }
  else if (0.6  <= r && r <= 1) {
    image.style.transform = "rotateY(0deg)";
  }*/
}, Math.max(50, Math.random() * 500)); 
