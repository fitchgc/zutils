// src/utils/date.util.ts
var ONE_DAY = 24 * 60 * 60 * 1e3;
var ONE_DAY_SECONDS = 24 * 60 * 60;
var formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 + "").padStart(2, "0");
  const day = (date.getDate() + "").padStart(2, "0");
  return `${year}${month}${day}`;
};
var yesterday = (date) => {
  date = date || /* @__PURE__ */ new Date();
  date.setDate(date.getDate() - 1);
  return date;
};
var nextday = (date) => {
  date = date || /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + 1);
  return date;
};
function daysBetween(date1, date2) {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  const diffInDays = Math.round(diffInMs / ONE_DAY);
  return diffInDays;
}
var getDayBegin = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
};
var getNDayAgo = (n, begin) => {
  const date = new Date(Date.now() - n * 24 * 60 * 60 * 1e3);
  if (begin) {
    return getDayBegin(date);
  } else {
    return date;
  }
};
var getMonthBegin = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
};
function timeBeforeDay(day) {
  let time = Date.now();
  return time - day * ONE_DAY;
}
function calcBetweenDays(time1, time2) {
  let v1 = Math.floor(time1 / ONE_DAY);
  let v2 = Math.floor(time2 / ONE_DAY);
  return Math.abs(v1 - v2);
}
function isToday(time) {
  return (/* @__PURE__ */ new Date()).toDateString() === new Date(time).toDateString();
}
function todayStart() {
  return new Date((/* @__PURE__ */ new Date()).toLocaleDateString()).getTime();
}
function todayEnd() {
  return todayStart() + ONE_DAY - 1;
}
function getThisWeekData() {
  return weekData(0);
}
function weekData(n) {
  const weekData2 = { startDay: "", endDay: "" };
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + 7 * n - date.getDay() + 1);
  weekData2.startDay = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  date.setDate(date.getDate() + 6);
  weekData2.endDay = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return weekData2;
}
var second2str = (sec, showSeconds) => {
  showSeconds = typeof showSeconds !== "undefined" ? showSeconds : true;
  var d = 0;
  if (sec >= ONE_DAY_SECONDS) {
    d = Math.floor(sec / ONE_DAY_SECONDS);
    sec = sec % ONE_DAY_SECONDS;
  }
  var t = sec % 60;
  var n = Math.floor(sec / 3600);
  var i = (sec % 3600 - t) / 60;
  if (showSeconds) {
    return (d > 0 ? d + "D " : "") + (n > 9 ? "" + n : "0" + n) + ":" + (i > 9 ? i : "0" + i) + ":" + (t > 9 ? t : "0" + t);
  } else {
    return (d > 0 ? d + "D " : "") + (n > 9 ? "" + n : "0" + n) + ":" + (i > 9 ? i : "0" + i);
  }
};
export {
  ONE_DAY,
  ONE_DAY_SECONDS,
  calcBetweenDays,
  daysBetween,
  formatDate,
  getDayBegin,
  getMonthBegin,
  getNDayAgo,
  getThisWeekData,
  isToday,
  nextday,
  second2str,
  timeBeforeDay,
  todayEnd,
  todayStart,
  weekData,
  yesterday
};
//# sourceMappingURL=date.util.js.map