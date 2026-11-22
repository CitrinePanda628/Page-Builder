import type { MouseEvent } from 'react'
import type { PageElement } from '../../core'

// in preview a link like #menu scrolls to the element named menu
// other links open in a new tab so the editor stays open
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
