import { saveElements } from './helpers'
import { getElement } from './read'
import type { Page, Props, Styles } from './types'

/** Changes some props. Props you do not mention stay the same. */
export function updateProps(page: Page, id: string, changes: Props): Page {
  const element = getElement(page, id)
  return saveElements(page, [{ ...element, props: { ...element.props, ...changes } }])
}

/** Changes some styles. An empty value removes the style: { color: '' } removes the colour. */
export function updateStyles(page: Page, id: string, changes: Styles): Page {
  const element = getElement(page, id)
  const styles = withoutEmpty({ ...element.styles, ...changes })
  return saveElements(page, [{ ...element, styles }])
}

function withoutEmpty(styles: Styles): Styles {
  return Object.fromEntries(Object.entries(styles).filter(([, value]) => value !== ''))
}
