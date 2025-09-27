import { describe, it, expect } from '@jest/globals'
import {
  ONE_DAY,
  ONE_DAY_SECONDS,
  formatDate,
  yesterday,
  nextday,
  daysBetween,
  getDayBegin,
  getNDayAgo,
  getMonthBegin,
  timeBeforeDay,
  calcBetweenDays,
  isToday,
  todayStart,
  todayEnd,
  getThisWeekData,
  weekData,
  second2str
} from '../src/utils/date.util'

describe('Date Utils Tests', () => {
  describe('constants', () => {
    it('should have correct day constants', () => {
      expect(ONE_DAY).toBe(24 * 60 * 60 * 1000)
      expect(ONE_DAY_SECONDS).toBe(24 * 60 * 60)
    })
  })

  describe('formatDate', () => {
    it('should format date to YYYYMMDD', () => {
      const date = new Date('2023-06-15')
      expect(formatDate(date)).toBe('20230615')
    })

    it('should pad single digit months and days', () => {
      const date = new Date('2023-01-05')
      expect(formatDate(date)).toBe('20230105')
    })
  })

  describe('yesterday', () => {
    it('should return previous day for given date', () => {
      const date = new Date('2023-06-15')
      const result = yesterday(date)
      expect(result.getDate()).toBe(14)
    })

    it('should handle month boundary', () => {
      const date = new Date('2023-06-01')
      const result = yesterday(date)
      expect(result.getDate()).toBe(31)
      expect(result.getMonth()).toBe(4) // May
    })
  })

  describe('nextday', () => {
    it('should return next day for given date', () => {
      const date = new Date('2023-06-15')
      const result = nextday(date)
      expect(result.getDate()).toBe(16)
    })
  })

  describe('daysBetween', () => {
    it('should calculate days between two dates', () => {
      const date1 = new Date('2023-06-15')
      const date2 = new Date('2023-06-20')
      expect(daysBetween(date1, date2)).toBe(5)
    })

    it('should handle negative differences', () => {
      const date1 = new Date('2023-06-20')
      const date2 = new Date('2023-06-15')
      expect(daysBetween(date1, date2)).toBe(5)
    })

    it('should return 0 for same date', () => {
      const date = new Date('2023-06-15')
      expect(daysBetween(date, date)).toBe(0)
    })
  })

  describe('getDayBegin', () => {
    it('should return start of day', () => {
      const date = new Date('2023-06-15T15:30:45')
      const result = getDayBegin(date)
      expect(result.getHours()).toBe(0)
      expect(result.getMinutes()).toBe(0)
      expect(result.getSeconds()).toBe(0)
      expect(result.getMilliseconds()).toBe(0)
      expect(result.getDate()).toBe(15)
    })
  })

  describe('getMonthBegin', () => {
    it('should return first day of month', () => {
      const date = new Date('2023-06-15')
      const result = getMonthBegin(date)
      expect(result.getDate()).toBe(1)
      expect(result.getMonth()).toBe(5) // June
      expect(result.getFullYear()).toBe(2023)
    })
  })

  describe('calcBetweenDays', () => {
    it('should calculate days between timestamps', () => {
      const time1 = new Date('2023-06-15').getTime()
      const time2 = new Date('2023-06-20').getTime()
      expect(calcBetweenDays(time1, time2)).toBe(5)
    })

    it('should handle negative differences', () => {
      const time1 = new Date('2023-06-20').getTime()
      const time2 = new Date('2023-06-15').getTime()
      expect(calcBetweenDays(time1, time2)).toBe(5)
    })
  })

  describe('second2str', () => {
    it('should format seconds to HH:MM:SS with seconds', () => {
      expect(second2str(3661, true)).toBe('01:01:01') // 1 hour, 1 minute, 1 second
      expect(second2str(3600, true)).toBe('01:00:00') // 1 hour
      expect(second2str(61, true)).toBe('00:01:01') // 1 minute, 1 second
      expect(second2str(1, true)).toBe('00:00:01') // 1 second
    })

    it('should format seconds to HH:MM without seconds', () => {
      expect(second2str(3661, false)).toBe('01:01')
      expect(second2str(3600, false)).toBe('01:00')
      expect(second2str(61, false)).toBe('00:01')
    })

    it('should handle days in formatting', () => {
      const oneDayInSeconds = ONE_DAY_SECONDS
      expect(second2str(oneDayInSeconds + 3661, true)).toBe('1D 01:01:01')
      expect(second2str(oneDayInSeconds + 3661, false)).toBe('1D 01:01')
    })

    it('should pad single digits with zeros', () => {
      expect(second2str(3665, true)).toBe('01:01:05') // 1 hour, 1 minute, 5 seconds
      expect(second2str(305, true)).toBe('00:05:05') // 5 minutes, 5 seconds
      expect(second2str(5, true)).toBe('00:00:05') // 5 seconds
    })

    it('should handle zero seconds', () => {
      expect(second2str(0, true)).toBe('00:00:00')
      expect(second2str(0, false)).toBe('00:00')
    })
  })
})