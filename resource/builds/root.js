"use strict";

function load() {
  new APIGetRequest("https://cucumbery.com/api/builds/release/latest?api=1.17", {}).on(200, function (res) {
    document.querySelector("#latest .release .filename").innerHTML = res.data.version;
    document.querySelector("#latest .release .desc .api").innerHTML = res.data.pluginAPI;
    document.querySelector("#latest .release .desc .ago").innerHTML = compare("now", res.data.builddate, {
      lang: "en-us"
    });
    document.querySelector("#latest .release .download").href = "https://cucumbery.com/api/builds/release/" + res.data.version + "/download";
  }).send();
  new APIGetRequest("https://cucumbery.com/api/builds/dev/latest?api=1.17", {}).on(200, function (res) {
    document.querySelector("#latest .dev .filename").innerHTML = res.data.version;
    document.querySelector("#latest .dev .desc .api").innerHTML = res.data.pluginAPI;
    document.querySelector("#latest .dev .desc .ago").innerHTML = compare("now", res.data.builddate, {
      lang: "en-us"
    });
    document.querySelector("#latest .dev .download").href = "https://cucumbery.com/api/builds/dev/" + res.data.version + "/download";
  }).send();
}

load();

function compare(dtos, dtcs, option) {
  var dto;
  var dtc;

  if (!dtos || dtos == "now") {
    dto = new Date();
  } else {
    dto = new Date(dtos);
  }

  dtc = new Date(dtcs);

  switch (option.lang) {
    // 영어
    case "en-us":
      {
        if (dto > dtc) {
          var passedSeconds = parseInt((dto - dtc) / 1000, 10);

          if (passedSeconds >= 60 * 60 * 24 * 365) {
            var Y = Math.floor(passedSeconds / (60 * 60 * 24 * 365));

            if (Y == 1) {
              return Y + " year ago";
            } else {
              return Y + " years ago";
            }
          } else if (passedSeconds >= 60 * 60 * 24 * 30) {
            var M = Math.floor(passedSeconds / (60 * 60 * 24 * 30));

            if (M == 1) {
              return M + " months ago";
            } else {
              return M + " months ago";
            }
          } else if (passedSeconds >= 60 * 60 * 24) {
            var D = Math.floor(passedSeconds / (60 * 60 * 24));

            if (D == 1) {
              return D + " day ago";
            } else {
              return D + " days ago";
            }
          } else if (passedSeconds >= 60 * 60) {
            var h = Math.floor(passedSeconds / (60 * 60));

            if (h == 1) {
              return h + " hour ago";
            } else {
              return h + " hours ago";
            }
          } else {
            if (option.showDetails) {
              if (passedSeconds >= 60) {
                var m = Math.floor(passedSeconds / 60);

                if (m == 1) {
                  return m + " minute ago";
                } else {
                  return m + " minutes ago";
                }
              } else {
                var s = passedSeconds;

                if (s == 1) {
                  return s + " second ago";
                } else {
                  return s + " seconds ago";
                }
              }
            } else {
              if (passedSeconds >= 60 * 10) {
                var _m = Math.floor(passedSeconds / 60);

                if (_m == 1) {
                  return _m + " minute ago";
                } else {
                  return _m + " minutes ago";
                }
              } else {
                return "방금 전";
              }
            }
          }
        } else {
          return "future";
        }
      }
    // 한국어

    case "ko-kr":
    default:
      {
        var _passedSeconds = parseInt((dto - dtc) / 1000, 10);

        if (_passedSeconds >= 0) {
          if (_passedSeconds >= 60 * 60 * 24 * 365) {
            var _Y = Math.floor(_passedSeconds / (60 * 60 * 24 * 365));

            if (option.useNumberYear) {
              return _Y + "년 전";
            } else {
              switch (_Y) {
                case 1:
                  {
                    return "작년";
                  }

                case 2:
                  {
                    return "재작년";
                  }

                default:
                  {
                    return _Y + "년 전";
                  }
              }
            }
          } else if (_passedSeconds >= 60 * 60 * 24 * 30) {
            var _M = Math.floor(_passedSeconds / (60 * 60 * 24 * 30));

            if (option.useNumberMonth) {
              return _M + "개월 전";
            } else {
              switch (_M) {
                case 1:
                  {
                    return "한달 전";
                  }

                case 2:
                  {
                    return "두달 전";
                  }

                case 3:
                  {
                    return "세달 전";
                  }

                case 4:
                  {
                    return "네달 전";
                  }

                case 5:
                  {
                    return "다섯달 전";
                  }

                case 6:
                  {
                    return "여섯달 전";
                  }

                case 7:
                  {
                    return "일곱달 전";
                  }

                case 8:
                  {
                    return "여덟달 전";
                  }

                case 9:
                  {
                    return "아홉달 전";
                  }

                case 10:
                  {
                    return "열달 전";
                  }

                case 11:
                  {
                    return "열한달 전";
                  }

                case 12:
                  {
                    return "열두달 전";
                  }

                default:
                  {
                    return _M + "개월 전";
                  }
              }
            }
          } else if (_passedSeconds >= 60 * 60 * 24) {
            var _D = Math.floor(_passedSeconds / (60 * 60 * 24));

            if (option.useNumberDay) {
              return _D + "일 전";
            } else {
              switch (_D) {
                case 1:
                  {
                    return "어제";
                  }

                case 2:
                  {
                    return "그저께";
                  }

                case 3:
                  {
                    return "사흘 전";
                  }

                case 4:
                  {
                    return "나흘 전";
                  }

                case 5:
                  {
                    return "닷세 전";
                  }

                case 6:
                  {
                    return "엿세 전";
                  }

                case 7:
                  {
                    return "이레 전";
                  }

                case 8:
                  {
                    return "여드레 전";
                  }

                case 9:
                  {
                    return "아흐레 전";
                  }

                case 10:
                  {
                    return "열흘 전";
                  }

                case 15:
                  {
                    return "보름 전";
                  }

                default:
                  {
                    return _D + "일 전";
                  }
              }
            }
          } else if (_passedSeconds >= 60 * 60) {
            var _h = Math.floor(_passedSeconds / (60 * 60));

            return _h + "시간 전";
          } else {
            if (option.showDetails) {
              if (_passedSeconds >= 60) {
                var _m2 = Math.floor(_passedSeconds / 60);

                return _m2 + "분 전";
              } else {
                var _s = _passedSeconds;
                return _s + "초 전";
              }
            } else {
              if (_passedSeconds >= 60 * 10) {
                var _m3 = Math.floor(_passedSeconds / 60);

                return _m3 + "분 전";
              } else if (_passedSeconds <= 10) {
                return "지금";
              } else {
                return "방금 전";
              }
            }
          }
        } else {
          return "미래";
        }
      }
  }
}