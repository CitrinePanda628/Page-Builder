import type { PageElement, Styles } from '../../../core'
import { toCssName } from '../../ui/css-name'

// a heading named "title" with { fontSize: '32px' } gives
//  #title {
//    font-size: 32px;
//  }
// without a name it uses the type instead: .heading { ... }
export function toCss(element: PageElement): string {
  const selector = element.props.name ? `#${element.props.name}` : `.${element.type}`
  return toBlock(selector, element.styles)
}

function toBlock(selector: string, styles: Styles): string {
  const lines = Object.entries(styles).map(([key, value]) => `  ${toCssName(key)}: ${value};`)
  return lines.length === 0 ? `${selector} {}` : `${selector} {\n${lines.join('\n')}\n}`
}
