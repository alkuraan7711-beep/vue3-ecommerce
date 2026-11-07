export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">' +
      '<rect width="400" height="300" fill="#f3f4f6"/>' +
      '<text x="200" y="158" font-family="sans-serif" font-size="18" text-anchor="middle" fill="#9ca3af">Image unavailable</text>' +
      '</svg>'
  )

// Used as @error on <img>. The dataset flag stops an infinite loop
// if the placeholder itself ever fails to load.
export function handleImageError(event) {
  const img = event.target
  if (img.dataset.fallback) return
  img.dataset.fallback = 'true'
  img.src = PLACEHOLDER_IMAGE
}
