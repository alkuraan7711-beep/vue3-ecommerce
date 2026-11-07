import { describe, it, expect } from 'vitest'
import { formatPrice } from './format.js'

describe('formatPrice', () => {
  it('adds thousands separators and the currency', () => {
    expect(formatPrice(35000)).toBe('35,000 EGP')
  })

  it('handles small amounts', () => {
    expect(formatPrice(900)).toBe('900 EGP')
  })
})
