declare const ONE_DAY: number;
declare const ONE_DAY_SECONDS: number;
declare const formatDate: (date: Date) => string;
declare const yesterday: (date?: Date) => Date;
declare const nextday: (date?: Date) => Date;
declare function daysBetween(date1: Date, date2: Date): number;
declare const getDayBegin: (date: Date) => Date;
declare const getNDayAgo: (n: number, begin: boolean) => Date;
declare const getMonthBegin: (date: Date) => Date;
/**
 * Get the time n days ago
 * @param {number} day
 * @return {number}
 */
declare function timeBeforeDay(day: number): number;
declare function calcBetweenDays(time1: number, time2: number): number;
/**
 * check if the time is today
 * @param {number} time
 * @return {boolean}
 */
declare function isToday(time: number): boolean;
/**
 * Get the start time of today
 * @return {number}
 */
declare function todayStart(): number;
/**
 * Get the end time of today
 * @return {number}
 */
declare function todayEnd(): number;
/**
 * Get the first and last day of this week (starting from Monday)
 * @return {{startDay: string, endDay: string}}
 */
declare function getThisWeekData(): {
    startDay: string;
    endDay: string;
};
/**
 * Get the start and end dates of the Monday and Sunday of the previous or next n weeks.
 * @param {number} n  0 for the current week, 1 for the next week, -1 for the previous week
 * @return {{startDay: string, endDay: string}}
 */
declare function weekData(n: number): {
    startDay: string;
    endDay: string;
};
/**
 * Format seconds into a string in the format hh:mm:ss
 * @param {number} sec
 * @param {boolean} showSeconds Whether to display seconds
 */
declare const second2str: (sec: number, showSeconds: boolean) => string;

export { ONE_DAY, ONE_DAY_SECONDS, calcBetweenDays, daysBetween, formatDate, getDayBegin, getMonthBegin, getNDayAgo, getThisWeekData, isToday, nextday, second2str, timeBeforeDay, todayEnd, todayStart, weekData, yesterday };
