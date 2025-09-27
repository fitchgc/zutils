import { describe, it, expect } from '@jest/globals'
import { curry } from '../src/utils/curry.util'

describe('Curry Utils Tests', () => {
  describe('curry', () => {
    it('should curry a simple function', () => {
      const add = (a: number, b: number) => a + b
      const curriedAdd = curry(add)
      
      expect(curriedAdd(1)(2)).toBe(3)
      expect(curriedAdd(5)(7)).toBe(12)
    })

    it('should allow partial application', () => {
      const add = (a: number, b: number) => a + b
      const curriedAdd = curry(add)
      const add5 = curriedAdd(5)
      
      expect(add5(3)).toBe(8)
      expect(add5(7)).toBe(12)
      expect(add5(0)).toBe(5)
    })

    it('should work with functions of multiple parameters', () => {
      const multiply = (a: number, b: number, c: number) => a * b * c
      const curriedMultiply = curry(multiply)
      
      expect(curriedMultiply(2)(3)(4)).toBe(24)
      expect(curriedMultiply(2, 3)(4)).toBe(24)
      expect(curriedMultiply(2)(3, 4)).toBe(24)
      expect(curriedMultiply(2, 3, 4)).toBe(24)
    })

    it('should preserve function context (this)', () => {
      const obj = {
        value: 10,
        add: function(a: number, b: number) {
          return this.value + a + b
        }
      }
      
      const curriedAdd = curry(obj.add)
      const result = curriedAdd.call(obj, 5, 3)
      
      expect(result).toBe(18)
    })

    it('should handle functions with no parameters', () => {
      const getValue = () => 42
      const curriedGetValue = curry(getValue)
      
      expect(curriedGetValue()).toBe(42)
    })

    it('should handle functions with one parameter', () => {
      const double = (x: number) => x * 2
      const curriedDouble = curry(double)
      
      expect(curriedDouble(5)).toBe(10)
    })

    it('should allow building complex curried functions', () => {
      const formatString = (template: string, value1: string, value2: string) => 
        template.replace('{0}', value1).replace('{1}', value2)
      
      const curriedFormat = curry(formatString)
      const greetingFormatter = curriedFormat('Hello {0}, welcome to {1}!')
      const personalGreeting = greetingFormatter('John')
      
      expect(personalGreeting('our website')).toBe('Hello John, welcome to our website!')
      expect(personalGreeting('the party')).toBe('Hello John, welcome to the party!')
    })

    it('should work with different argument patterns', () => {
      const sum4 = (a: number, b: number, c: number, d: number) => a + b + c + d
      const curriedSum = curry(sum4)
      
      // Different ways to call
      expect(curriedSum(1)(2)(3)(4)).toBe(10)
      expect(curriedSum(1, 2)(3)(4)).toBe(10)
      expect(curriedSum(1)(2, 3)(4)).toBe(10)
      expect(curriedSum(1, 2, 3)(4)).toBe(10)
      expect(curriedSum(1)(2)(3, 4)).toBe(10)
      expect(curriedSum(1, 2)(3, 4)).toBe(10)
      expect(curriedSum(1, 2, 3, 4)).toBe(10)
    })

    it('should return function until all arguments are provided', () => {
      const subtract = (a: number, b: number, c: number) => a - b - c
      const curriedSubtract = curry(subtract)
      
      const step1 = curriedSubtract(10)
      expect(typeof step1).toBe('function')
      
      const step2 = step1(3)
      expect(typeof step2).toBe('function')
      
      const result = step2(2)
      expect(result).toBe(5) // 10 - 3 - 2
    })

    it('should handle edge case with excess arguments', () => {
      const add = (a: number, b: number) => a + b
      const curriedAdd = curry(add)
      
      // Should work even with extra arguments
      expect(curriedAdd(1, 2, 3, 4)).toBe(3) // Only uses first 2 args
    })
  })
})