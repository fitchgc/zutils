import { describe, expect } from '@jest/globals'
import { convert } from '../src/utils/number.util'

describe('Number Utils Tests', () => {
  it('should return true for voucher code', async () => {
    let alphabet = '3fBCM8j17XNA9xYun4wmLWep2oHFlhPcgyEJskqOz6GK0UtV5ZRaDSvrTbidQI'
    let id1 = '95c9a166b7bd65'
    let val1 = convert({ numStr: id1, base: 16, to: 52, alphabet })
    let id2 = '95c9a166b7bd66'
    let val2 = convert({ numStr: id2, base: 16, to: 52, alphabet })
    // expect(result).toBe(true)
  })
})
