export function calculateTotal(items) {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
}

function isValidItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    Number.isFinite(item.id) &&
    typeof item.name === 'string' &&
    Number.isFinite(item.price) &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1
  )
}

// Cart data comes from localStorage, which anyone can edit or corrupt.
// Keep only well-formed items so a bad value can never crash the app.
export function sanitizeCart(saved) {
  return Array.isArray(saved) ? saved.filter(isValidItem) : []
}
