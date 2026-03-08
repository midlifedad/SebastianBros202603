import { defineAppSetup } from '@slidev/types'

/**
 * Logitech Spotlight / clicker support:
 * Prevent iframes from capturing keyboard focus so
 * Page Down / Page Up / Arrow keys always control slide navigation.
 */
export default defineAppSetup(({ app }) => {
  if (typeof window !== 'undefined') {
    // Refocus the main document when clicking outside iframes
    window.addEventListener('blur', () => {
      setTimeout(() => {
        if (document.activeElement?.tagName === 'IFRAME') {
          (document.activeElement as HTMLElement).blur()
          window.focus()
        }
      }, 50)
    })

    // Intercept keydown on iframes and forward to slidev navigation
    document.addEventListener('keydown', (e) => {
      // If focus is in an iframe, pull it back
      if (document.activeElement?.tagName === 'IFRAME') {
        window.focus()
      }
    }, true)

    // Prevent iframes from getting focus on click
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IFRAME') {
        e.preventDefault()
        window.focus()
      }
    }, true)
  }
})
