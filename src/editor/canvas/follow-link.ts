import type { MouseEvent } from 'react'
import type { PageElement } from '../../core'

/**
 * In preview, a link to #menu scrolls to the element named "menu" (its HTML id).
 * Other links open in a new tab, so the editor stays open.
 */
export function followLink(event: MouseEvent, element: PageElement) {
  if (element.type !== 'link') return
  event.preventDefault()

  const href = element.props.href ?? ''
  if (href.startsWith('#')) {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  } else if (href !== '') {
    window.open(href, '_blank', 'noopener')
  }
}
