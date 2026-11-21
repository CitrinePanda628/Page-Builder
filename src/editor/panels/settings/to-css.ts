import type { PageElement, Styles } from '../../../core'
import { toCssName } from '../../ui/css-name'

/**
 * A heading named "title" with { fontSize: '32px' }:
 *   #title {
 *     font-size: 32px;
 *   }
 * Without a name it uses the type: .heading { ... }
 */
export function toCss(element: PageElement): string {
  const selector = element.props.name ? `#${element.props.name}` : `.${element.type}`
  return toBlock(selector, element.styles)
}

function toBlock(selector: string, styles: Styles): string {
  const lines = Object.entries(styles).map(([key, value]) => `  ${toCssName(key)}: ${value};`)
  return lines.length === 0 ? `${selector} {}` : `${selector} {\n${lines.join('\n')}\n}`
}
