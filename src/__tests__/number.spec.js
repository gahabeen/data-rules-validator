import { validate } from '../index'

describe('number', () => {
  it('should test if value is number', () => {
    const value = 3
    const { valid } = validate(value, { number: true }, { type: 'number' })
    expect(valid).toBe(true)
  })

  // numberMin
  it('should validate that value is at least 3 items long', () => {
    const value = 3
    const { valid } = validate(value, { numberMin: 3 }, { type: 'number' })
    expect(valid).toBe(true)
  })

  it('should fail when value is at least 3 items long', () => {
    const value = 2
    const { valid } = validate(value, { numberMin: 3 }, { type: 'number' })
    expect(valid).toBe(false)
  })

  // numberMax
  it('should validate that value is at max 3 items long', () => {
    const value = 3
    const { valid } = validate(value, { numberMax: 3 }, { type: 'number' })
    expect(valid).toBe(true)
  })

  it('should fail when value is at max 3 items long', () => {
    const value = 4
    const { valid } = validate(value, { numberMax: 3 }, { type: 'number' })
    expect(valid).toBe(false)
  })

  // numberEqual
  it('should validate that value is 3 items long', () => {
    const value = 3
    const { valid } = validate(value, { numberEqual: 3 }, { type: 'number' })
    expect(valid).toBe(true)
  })

  it('should fail when value is 3 items long', () => {
    const value = 4
    const { valid } = validate(value, { numberEqual: 3 }, { type: 'number' })
    expect(valid).toBe(false)
  })

  it('should fail when value is 3 items long', () => {
    const value = 2
    const { valid } = validate(value, { numberEqual: 3 }, { type: 'number' })
    expect(valid).toBe(false)
  })
})
