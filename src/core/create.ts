import { createId } from './create-id'
import type { Page, PageElement, Props, Styles } from './types'

/** A new element that is not on a page yet. */
export function createElement(type: string, props: Props = {}, styles: Styles = {}): PageElement {
  return { id: createId(), type, parentId: null, children: [], props, styles }
}

/** A new page: a body with nothing inside. */
export function createPage(): Page {
  const body = createElement('body')
  return { bodyId: body.id, elements: { [body.id]: body } }
}
