const windows = new Map()

export function openDemoWindow(url, name, opts = {}) {
  const existing = windows.get(name)
  if (existing && !existing.closed) {
    existing.focus()
    return existing
  }

  const { width = 1280, height = 800 } = opts
  const left = Math.round((screen.width - width) / 2)
  const top = Math.round((screen.height - height) / 2)
  const features = `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=yes,status=no`

  const win = window.open(url, name, features)
  if (win) windows.set(name, win)
  return win
}

export function focusDemoWindow(name) {
  const win = windows.get(name)
  if (win && !win.closed) {
    win.focus()
    return true
  }
  return false
}

export function focusPresentation() {
  window.focus()
}

export function closeAll() {
  windows.forEach(win => { if (!win.closed) win.close() })
  windows.clear()
}
