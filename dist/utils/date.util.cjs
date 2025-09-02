var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/date.util.ts
var date_util_exports = {};
__export(date_util_exports, {
  ONE_DAY: () => ONE_DAY,
  ONE_DAY_SECONDS: () => ONE_DAY_SECONDS,
  calcBetweenDays: () => calcBetweenDays,
  daysBetween: () => daysBetween,
  formatDate: () => formatDate,
  getDayBegin: () => getDayBegin,
  getMonthBegin: () => getMonthBegin,
  getNDayAgo: () => getNDayAgo,
  getThisWeekData: () => getThisWeekData,
  isToday: () => isToday,
  nextday: () => nextday,
  second2str: () => second2str,
  timeBeforeDay: () => timeBeforeDay,
  todayEnd: () => todayEnd,
  todayStart: () => todayStart,
  weekData: () => weekData,
  yesterday: () => yesterday
});
module.exports = __toCommonJS(date_util_exports);
var ONE_DAY = 24 * 60 * 60 * 1e3;
var ONE_DAY_SECONDS = 24 * 60 * 60;
var formatDate = /* @__PURE__ */ __name((date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 + "").padStart(2, "0");
  const day = (date.getDate() + "").padStart(2, "0");
  return `${year}${month}${day}`;
}, "formatDate");
var yesterday = /* @__PURE__ */ __name((date) => {
  date = date || /* @__PURE__ */ new Date();
  date.setDate(date.getDate() - 1);
  return date;
}, "yesterday");
var nextday = /* @__PURE__ */ __name((date) => {
  date = date || /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + 1);
  return date;
}, "nextday");
function daysBetween(date1, date2) {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  const diffInDays = Math.round(diffInMs / ONE_DAY);
  return diffInDays;
}
__name(daysBetween, "daysBetween");
var getDayBegin = /* @__PURE__ */ __name((date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year, month, day);
}, "getDayBegin");
var getNDayAgo = /* @__PURE__ */ __name((n, begin) => {
  const date = new Date(Date.now() - n * 24 * 60 * 60 * 1e3);
  if (begin) {
    return getDayBegin(date);
  } else {
    return date;
  }
}, "getNDayAgo");
var getMonthBegin = /* @__PURE__ */ __name((date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
}, "getMonthBegin");
function timeBeforeDay(day) {
  let time = Date.now();
  return time - day * ONE_DAY;
}
__name(timeBeforeDay, "timeBeforeDay");
function calcBetweenDays(time1, time2) {
  let v1 = Math.floor(time1 / ONE_DAY);
  let v2 = Math.floor(time2 / ONE_DAY);
  return Math.abs(v1 - v2);
}
__name(calcBetweenDays, "calcBetweenDays");
function isToday(time) {
  return (/* @__PURE__ */ new Date()).toDateString() === new Date(time).toDateString();
}
__name(isToday, "isToday");
function todayStart() {
  return new Date((/* @__PURE__ */ new Date()).toLocaleDateString()).getTime();
}
__name(todayStart, "todayStart");
function todayEnd() {
  return todayStart() + ONE_DAY - 1;
}
__name(todayEnd, "todayEnd");
function getThisWeekData() {
  return weekData(0);
}
__name(getThisWeekData, "getThisWeekData");
function weekData(n) {
  const weekData2 = {
    startDay: "",
    endDay: ""
  };
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + 7 * n - date.getDay() + 1);
  weekData2.startDay = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  date.setDate(date.getDate() + 6);
  weekData2.endDay = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  return weekData2;
}
__name(weekData, "weekData");
var second2str = /* @__PURE__ */ __name((sec, showSeconds) => {
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
}, "second2str");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=date.util.cjs.map