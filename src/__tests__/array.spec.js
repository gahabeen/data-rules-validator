import { validate } from '../index'

describe('array', () => {
  it('should test if value is array', () => {
    const value = ['Hello']
    const { valid } = validate(value, { array: true }, { type: 'array' })
    expect(valid).toBe(true)
  })

  // arrayMin
  it('should validate that value is at least 3 items long', () => {
    const value = [1, 2, 3]
    const { valid } = validate(value, { arrayMin: 3 }, { type: 'array' })
    expect(valid).toBe(true)
  })

  it('should fail when value is at least 3 items long', () => {
    const value = [1, 2]
    const { valid } = validate(value, { arrayMin: 3 }, { type: 'array' })
    expect(valid).toBe(false)
  })

  // arrayMax
  it('should validate that value is at max 3 items long', () => {
    const value = [1, 2, 3]
    const { valid } = validate(value, { arrayMax: 3 }, { type: 'array' })
    expect(valid).toBe(true)
  })

  it('should fail when value is at max 3 items long', () => {
    const value = [1, 2, 3, 4]
    const { valid } = validate(value, { arrayMax: 3 }, { type: 'array' })
    expect(valid).toBe(false)
  })

  // arrayLength
  it('should validate that value is 3 items long', () => {
    const value = [1, 2, 3]
    const { valid } = validate(value, { arrayLength: 3 }, { type: 'array' })
    expect(valid).toBe(true)
  })

  it('should fail when value is 3 items long', () => {
    const value = [1, 2, 3, 4]
    const { valid } = validate(value, { arrayLength: 3 }, { type: 'array' })
    expect(valid).toBe(false)
  })

  it('should fail when value is 3 items long', () => {
    const value = [1, 2]
    const { valid } = validate(value, { arrayLength: 3 }, { type: 'array' })
    expect(valid).toBe(false)
  })
})
