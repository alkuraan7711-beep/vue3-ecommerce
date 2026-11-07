export function validateCheckout({ name, phone, address }) {
  const errors = {}

  if (name.trim().length < 3) {
    errors.name = 'Enter your full name (at least 3 characters).'
  }

  const digits = phone.replace(/[\s()+-]/g, '')
  if (!/^\d{10,15}$/.test(digits)) {
    errors.phone = 'Enter a valid phone number (10 to 15 digits).'
  }

  if (address.trim().length < 10) {
    errors.address = 'Enter your full address (at least 10 characters).'
  }

  return errors
}
