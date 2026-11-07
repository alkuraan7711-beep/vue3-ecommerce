import { describe, it, expect } from 'vitest'
import { validateCheckout } from './checkout.js'

const validForm = {
  name: 'Ahmed Ali',
  phone: '01012345678',
  address: '12 Tahrir Street, Cairo'
}

describe('validateCheckout', () => {
  it('returns no errors for a valid form', () => {
    expect(validateCheckout(validForm)).toEqual({})
  })

  it('requires a name of at least 3 characters', () => {
    expect(validateCheckout({ ...validForm, name: '  ab ' }).name).toBeDefined()
  })

  it('accepts phone numbers with spaces, dashes and a plus sign', () => {
    const form = { ...validForm, phone: '+20 101-234-5678' }
    expect(validateCheckout(form).phone).toBeUndefined()
  })

  it('rejects phone numbers with letters or the wrong length', () => {
    expect(validateCheckout({ ...validForm, phone: '0101abc5678' }).phone).toBeDefined()
    expect(validateCheckout({ ...validForm, phone: '12345' }).phone).toBeDefined()
  })

  it('requires an address of at least 10 characters', () => {
    expect(validateCheckout({ ...validForm, address: 'Cairo' }).address).toBeDefined()
  })

  it('reports every invalid field at once', () => {
    const errors = validateCheckout({ name: '', phone: '', address: '' })
    expect(Object.keys(errors)).toEqual(['name', 'phone', 'address'])
  })
})
