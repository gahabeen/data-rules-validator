import { validate } from '../index'

describe('shared', () => {
  it('should should validate value is mandatory for a text', () => {
    const value = 'Hello'
    const { valid } = validate(value, { mandatory: true })
    expect(valid).toBe(true)
  })

  it('should should validate value is mandatory for a number', () => {
    const value = 3
    const { valid } = validate(value, { mandatory: true })
    expect(valid).toBe(true)
  })

  it('should should validate value is mandatory for an array', () => {
    const value = ['ok']
    const { valid } = validate(value, { mandatory: true })
    expect(valid).toBe(true)
  })
})
