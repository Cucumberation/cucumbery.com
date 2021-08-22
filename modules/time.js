/**
 * time.js
 * 
 * (c) 2020 Wany
 * 
 * @summary time format / calc module
 * @author Wany <sung@wany.io>
 */

 const time = (format, dt) => {

  let datetime;

  if (!dt || dt == "now") { 
    datetime = new Date(); 
  }
  else { 
    datetime = new Date(dt); 
  }

  const now = new Date();

  //year
  const YYYY = datetime.getFullYear().toString();
  const YY = YYYY.substr(-2);

  //month
  const M = datetime.getMonth() + 1;
  const MM = (M < 10 ? "0" : "") + M;

  //day
  const D = datetime.getDate();
  const DD = (D < 10 ? "0" : "") + D;
  const start = new Date(datetime.getFullYear(), 0, 0);
  const diff = (datetime - start) + ((start.getTimezoneOffset() - datetime.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  let DDDa = Math.floor(diff / oneDay);
  DDDa = (DDDa < 10 ? "0" : "") + DDDa;
  DDDa = (DDDa < 100 ? "0" : "") + DDDa;
  const DDD = DDDa;

  //hour
  const h = datetime.getHours();
  const hh = (h < 10 ? "0" : "") + h;

  //minute
  const m = datetime.getMinutes();
  const mm = (m < 10 ? "0" : "") + m;
  const mmmm = (h * 60) + m;

  //second
  const s = datetime.getSeconds();
  const ss = (s < 10 ? "0" : "") + s;
  const sssss = (mmmm * 60) + s;

  //milisecond
  let CCC = datetime.getMilliseconds();
  if (CCC < 10) { CCC = "00" + CCC; }
  else if (CCC < 100) { CCC = "0" + CCC; }
  const CC = CCC.toString().slice(0, -1)

  let KH = "";
  if (1 <= (hh * 1) && (hh * 1) <= 5) { KH = "새벽"; }
  else if (6 <= (hh * 1) && (hh * 1) <= 8) { KH = "아침"; }
  else if (9 <= (hh * 1) && (hh * 1) <= 12) { KH = "낮"; }
  else if (13 <= (hh * 1) && (hh * 1) <= 17) { KH = "오후"; }
  else if (18 <= (hh * 1) && (hh * 1) <= 21) { KH = "저녁"; }
  else if ((22 <= (hh * 1) && (hh * 1) <= 24) || (hh * 1) == 0) { KH = "밤"; }

  const E = datetime.getTime();

  format = format + "";

  format = format.replace(/YYYY/g, YYYY); // 4자리 년도
  format = format.replace(/YY/g, YY); // 2자리 년
  format = format.replace(/MM/g, MM); // 2자리 달 (연 중, 0#)
  format = format.replace(/M/g, M); // 1자리 달 (연 중)
  format = format.replace(/DDD/g, DDD); // 3자리 일 (연 중)
  format = format.replace(/DD/g, DD); // 2자리 일 (월 중, 0#)
  format = format.replace(/D/g, D); // 1자리 일 (월 중)
  format = format.replace(/hh/g, hh); // 2자리 시 (일 중, 0#)
  format = format.replace(/h/g, h); // 1자리 시 (일 중)
  format = format.replace(/mmmm/g, mmmm); // 4자리 분 (일 중, 000#)
  format = format.replace(/mm/g, mm); // 2자리 분 (시 중, 0#)
  format = format.replace(/m/g, m); // 1자리 분 (시 중)
  format = format.replace(/sssss/g, sssss); // 4자리 초 (일 중, 0000#)
  format = format.replace(/ss/g, ss); // 2자리 초 (분 중, 0#)
  format = format.replace(/s/g, s); // 1자리 초 (분 중)
  format = format.replace(/CCC/g, CCC); // 3자리 밀리초 (초 중, 00#)
  format = format.replace(/CC/g, CC); // 2자리 밀리초 (초 중, 0#)
  format = format.replace(/KH/g, KH); // 한글 시간 (일 중)
  format = format.replace(/E/g, E); // datetime.getTime();

  return format;
  
}

const compare = (dtos, dtcs, option) => {

  if (!dtos || dtos == "now") { dto = new Date(); }
  else { dto = new Date(dtos); }
  dtc = new Date(dtcs);

  switch (option.lang) {
    // 영어
    case "en-us": {
      if (dto > dtc) {
        const passedSeconds = parseInt((dto - dtc) / 1000, 10);
  
        if (passedSeconds >= 60 * 60 * 24 * 365) {
          const Y = Math.floor(passedSeconds / (60 * 60 * 24 * 365));
          if (Y == 1) { return Y + " year ago"; }
          else { return Y + " years ago"; }
        }
        else if (passedSeconds >= 60 * 60 * 24 * 30) {
          const M = Math.floor(passedSeconds / (60 * 60 * 24 * 30));
          if (M == 1) { return M + " months ago"; }
          else { return M + " months ago"; }
        }
        else if (passedSeconds >= 60 * 60 * 24) {
          const D = Math.floor(passedSeconds / (60 * 60 * 24));
          if (D == 1) { return D + " day ago"; }
          else { return D + " days ago"; }
        }
        else if (passedSeconds >= 60 * 60) {
          const h = Math.floor(passedSeconds / (60 * 60));
          if (h == 1) { return h + " hour ago"; }
          else { return h + " hours ago"; }
        }
        else {
          if (option.showDetails) {
            if (passedSeconds >= 60) {
              const m = Math.floor(passedSeconds / (60));
              if (m == 1) { return m + " minute ago"; }
              else { return m + " minutes ago"; }
            }
            else {
              const s = passedSeconds;
              if (s == 1) { return s + " second ago"; }
              else { return s + " seconds ago"; }
            }
          }
          else {
            if (passedSeconds >= 60 * 10) {
              const m = Math.floor(passedSeconds / (60));
              if (m == 1) { return m + " minute ago"; }
              else { return m + " minutes ago"; }
            }
            else {
              return "방금 전";
            }
          }
        }
      }
      else {
        return "future";
      }
    }
    // 한국어
    case "ko-kr":
    default: {
      const passedSeconds = parseInt((dto - dtc) / 1000, 10);

      if (passedSeconds >= 0) {
  
        if (passedSeconds >= 60 * 60 * 24 * 365) {
          const Y = Math.floor(passedSeconds / (60 * 60 * 24 * 365));
          if (option.useNumberYear) {
            return Y + "년 전";
          }
          else {
            switch (Y) {
              case 1: { return "작년"; }
              case 2: { return "재작년"; }
              default: { return Y + "년 전"; }
            }
          }
        }
        else if (passedSeconds >= 60 * 60 * 24 * 30) {
          const M = Math.floor(passedSeconds / (60 * 60 * 24 * 30));
          if (option.useNumberMonth) {
            return M + "개월 전";
          }
          else {
            switch (M) {
              case 1: { return "한달 전"; }
              case 2: { return "두달 전"; }
              case 3: { return "세달 전"; }
              case 4: { return "네달 전"; }
              case 5: { return "다섯달 전"; }
              case 6: { return "여섯달 전"; }
              case 7: { return "일곱달 전"; }
              case 8: { return "여덟달 전"; }
              case 9: { return "아홉달 전"; }
              case 10: { return "열달 전"; }
              case 11: { return "열한달 전"; }
              case 12: { return "열두달 전"; }
              default: { return M + "개월 전"; }
            }
          }
        }
        else if (passedSeconds >= 60 * 60 * 24) {
          const D = Math.floor(passedSeconds / (60 * 60 * 24));
          if (option.useNumberDay) {
            return D + "일 전";
          }
          else {
            switch (D) {
              case 1: { return "어제"; }
              case 2: { return "그저께"; }
              case 3: { return "사흘 전"; }
              case 4: { return "나흘 전"; }
              case 5: { return "닷세 전"; }
              case 6: { return "엿세 전"; }
              case 7: { return "이레 전"; }
              case 8: { return "여드레 전"; }
              case 9: { return "아흐레 전"; }
              case 10: { return "열흘 전"; }
              case 15: { return "보름 전"; }
              default: { return D + "일 전"; }
            }
          }
        }
        else if (passedSeconds >= 60 * 60) {
          const h = Math.floor(passedSeconds / (60 * 60));
          return h + "시간 전";
        }
        else {
          if (option.showDetails) {
            if (passedSeconds >= 60) {
              const m = Math.floor(passedSeconds / (60));
              return m + "분 전";
            }
            else {
              const s = passedSeconds;
              return s + "초 전";
            }
          }
          else {
            if (passedSeconds >= 60 * 10) {
              const m = Math.floor(passedSeconds / (60));
              return m + "분 전";
            }
            else if (passedSeconds <= 10) {
              return "지금";
            }
            else {
              return "방금 전";
            }
          }
        }

      }
      else {
        return "미래";
      }
    }
  }
}

const dcompare = (option, dtos, dtcs) => {
  return compare(dtos, dtcs, option);
}

const koreanNumber_count_kor = (number, option) => {

  const o = number % 10;
  const oo = number % 100;
  const ooo = number % 1000;
  
}

const koreanNumber_count_hanja = (number, option) => {

  const o = number % 10;
  const oo = number % 100;
  const ooo = number % 1000;
  
}

const stamp = (type) => {
  switch(type) {
    case "log": {
      return "\x1b[0m\x1b[36m" + time("YYYY-MM-DD hh:mm:ss", new Date()) + "\x1b[0m";
    }
    case "logm": {
      return "[" + time("YYYY-MM-DD hh:mm:ss.CCC", new Date()) + "]: ";
    }
    case "db": {
      return time("YYYY-MM-DD;hh-mm-ss", new Date());
    }
    default: {
      return "[" + time("YYYY-MM-DD hh:mm:ss", new Date()) + "]: ";
    }
  }
}


exports.time = time;
exports.compare = compare;
exports.datetime = time;
exports.datetimeCompare = dcompare;
exports.stamp = stamp;
exports.dbstamp = stamp("db");