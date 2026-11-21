import { getBranchIds, getElement, type Page, type Styles } from '../../core'
import { toCssName } from '../ui/css-name'
import { BASE_CSS, RESET_CSS } from './base-css'

// Reset, then the base look of each type used, then each element's own rule (last, so it wins).
export function toPageCss(page: Page, classNames: Record<string, string>): string {
  const elements = getBranchIds(page, page.bodyId).map((id) => getElement(page, id))
  const types = new Set(elements.map((element) => element.type))
  const base = Object.keys(BASE_CSS)
    .filter((type) => types.has(type))
    .map((type) => BASE_CSS[type])

  const own: string[] = []
  for (const element of elements) {
    // On <body> rather than .page, so popups moved to <body> still get the font.
    const selector = element.id === page.bodyId ? 'body' : `.${classNames[element.id]}`
    if (Object.keys(element.styles).length > 0) own.push(toRule(selector, element.styles))
  }

  return [RESET_CSS, ...base, ...own].join('\n\n') + '\n'
}

// Shorthands first, so a single side (padding-top) still wins, as it does in the editor.
export function toRule(selector: string, styles: Styles): string {
  const isShorthand = (key: string) => key === 'padding' || key === 'margin'
  const entries = Object.entries(styles).sort(
    ([a], [b]) => Number(isShorthand(b)) - Number(isShorthand(a)),
  )
  const lines = entries.map(([key, value]) => `  ${toCssName(key)}: ${value};`)
  return `${selector} {\n${lines.join('\n')}\n}`
}
