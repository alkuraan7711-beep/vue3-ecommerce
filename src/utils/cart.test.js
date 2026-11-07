import { describe, it, expect } from 'vitest'
import { calculateTotal, sanitizeCart } from './cart.js'

describe('calculateTotal', () => {
  it('calculates the total price', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 3 }
    ]

    expect(calculateTotal(items)).toBe(350)
  })

  it('returns 0 for an empty cart', () => {
    expect(calculateTotal([])).toBe(0)
  })
})

describe('sanitizeCart', () => {
  const validItem = { id: 1, name: 'Phone', price: 100, quantity: 2 }

  it('keeps valid items', () => {
    expect(sanitizeCart([validItem])).toEqual([validItem])
  })

  it('returns an empty cart when the data is not an array', () => {
    expect(sanitizeCart(null)).toEqual([])
    expect(sanitizeCart({ id: 1 })).toEqual([])
    expect(sanitizeCart('oops')).toEqual([])
  })

  it('drops malformed items', () => {
    const broken = [
      null,
      { id: 2, name: 'No price', quantity: 1 },
      { ...validItem, quantity: 0 },
      { ...validItem, quantity: 1.5 },
      { ...validItem, id: 'abc' }
    ]

    expect(sanitizeCart([validItem, ...broken])).toEqual([validItem])
  })
})
