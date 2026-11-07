// localStorage can throw (private mode, blocked storage, full quota) and its
// content can be invalid JSON. These helpers make sure the app keeps working.
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage is unavailable: the app still works, it just won't remember.
  }
}
