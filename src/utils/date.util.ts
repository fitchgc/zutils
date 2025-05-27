export const ONE_DAY = 24 * 60 * 60 * 1000
export const ONE_DAY_SECONDS = 24 * 60 * 60

// format the date to the format we want
export const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  return `${year}${month}${day}`
}

// get formated datestring of yesterday
export const yesterday = (date?: Date) => {
  date = date || new Date()
  date.setDate(date.getDate() - 1)
  return date
}

export const nextday = (date?: Date) => {
  date = date || new Date()
  date.setDate(date.getDate() + 1)
  return date
}

// calc days between two Date
export function daysBetween(date1: Date, date2: Date) {
  // hours*minutes*seconds*milliseconds
  const diffInMs = Math.abs(date1.getTime() - date2.getTime())
  const diffInDays = Math.round(diffInMs / ONE_DAY)
  return diffInDays
}

// get begin of one day
export const getDayBegin = (date: Date): Date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return new Date(year, month, day)
}

// get begin of n day ago
export const getNDayAgo = (n: number, begin: boolean): Date => {
  const date = new Date(Date.now() - n * 24 * 60 * 60 * 1000)
  if (begin) {
    return getDayBegin(date)
  } else {
    return date
  }
}

// get begin of this month
export const getMonthBegin = (date: Date): Date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month, 1)
}

/**
 * Get the time n days ago
 * @param {number} day
 * @return {number}
 */
export function timeBeforeDay(day: number): number {
  let time = Date.now()
  return time - day * ONE_DAY
}

// Calculate the number of days between two timestamps
export function calcBetweenDays(time1: number, time2: number) {
  let v1 = Math.floor(time1 / ONE_DAY)
  let v2 = Math.floor(time2 / ONE_DAY)
  return Math.abs(v1 - v2)
}

/**
 * check if the time is today
 * @param {number} time
 * @return {boolean}
 */
export function isToday(time: number): boolean {
  return new Date().toDateString() === new Date(time).toDateString()
}

/**
 * Get the start time of today
 * @return {number}
 */
export function todayStart(): number {
  return new Date(new Date().toLocaleDateString()).getTime()
}

/**
 * Get the end time of today
 * @return {number}
 */
export function todayEnd(): number {
  return todayStart() + ONE_DAY - 1
}

/**
 * Get the first and last day of this week (starting from Monday)
 * @return {{startDay: string, endDay: string}}
 */
export function getThisWeekData(): { startDay: string; endDay: string } {
  return weekData(0)
}

/**
 * Get the start and end dates of the Monday and Sunday of the previous or next n weeks.
 * @param {number} n  0 for the current week, 1 for the next week, -1 for the previous week
 * @return {{startDay: string, endDay: string}}
 */
export function weekData(n: number): { startDay: string; endDay: string } {
  const weekData = { startDay: '', endDay: '' }
  const date = new Date()

  date.setDate(date.getDate() + 7 * n - date.getDay() + 1)
  weekData.startDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  date.setDate(date.getDate() + 6)
  weekData.endDay = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  return weekData
}

/**
 * Format seconds into a string in the format hh:mm:ss
 * @param {number} sec
 * @param {boolean} showSeconds Whether to display seconds
 */
export const second2str = (sec: number, showSeconds: boolean) => {
  showSeconds = typeof showSeconds !== 'undefined' ? showSeconds : true
  var d = 0
  if (sec >= ONE_DAY_SECONDS) {
    d = Math.floor(sec / ONE_DAY_SECONDS)
    sec = sec % ONE_DAY_SECONDS
  }
  var t = sec % 60
  var n = Math.floor(sec / 3600)
  var i = ((sec % 3600) - t) / 60
  if (showSeconds) {
    return (
      (d > 0 ? d + 'D ' : '') + (n > 9 ? '' + n : '0' + n) + ':' + (i > 9 ? i : '0' + i) + ':' + (t > 9 ? t : '0' + t)
    )
  } else {
    return (d > 0 ? d + 'D ' : '') + (n > 9 ? '' + n : '0' + n) + ':' + (i > 9 ? i : '0' + i)
  }
}
