import { validate } from '../index'

describe('text', () => {
  // text
  it('should validate that value is text', () => {
    const value = 'Hello'
    const { valid } = validate(value, { text: true }, { type: 'text' })
    expect(valid).toBe(true)
  })

  it('should fail when value is text', () => {
    const value = 3
    const { valid } = validate(value, { text: true }, { type: 'text' })
    expect(valid).toBe(false)
    // expect(texts[0]).toEqual(fr.text({ label: 'Le champs' }))
  })

  // textMin
  it('should validate that value is at least 3 characters long', () => {
    const value = 'Hel'
    const { valid } = validate(value, { textMin: 3 }, { type: 'text' })
    expect(valid).toBe(true)
  })

  it('should fail when value is at least 3 characters long', () => {
    const value = 'He'
    const { valid } = validate(value, { textMin: 3 }, { type: 'text' })
    expect(valid).toBe(false)
  })

  // textMax
  it('should validate that value is at max 3 characters long', () => {
    const value = 'Hel'
    const { valid } = validate(value, { textMax: 3 }, { type: 'text' })
    expect(valid).toBe(true)
  })

  it('should fail when value is at max 3 characters long', () => {
    const value = 'Hell'
    const { valid } = validate(value, { textMax: 3 }, { type: 'text' })
    expect(valid).toBe(false)
  })

  // textLength
  it('should validate that value is 3 characters long', () => {
    const value = 'Hel'
    const { valid } = validate(value, { textLength: 3 }, { type: 'text' })
    expect(valid).toBe(true)
  })

  it('should fail when value is 3 characters long', () => {
    const value = 'Hell'
    const { valid } = validate(value, { textLength: 3 }, { type: 'text' })
    expect(valid).toBe(false)
  })

  it('should fail when value is 3 characters long', () => {
    const value = 'He'
    const { valid } = validate(value, { textLength: 3 }, { type: 'text' })
    expect(valid).toBe(false)
  })
})
