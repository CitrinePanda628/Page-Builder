import { createId } from './create-id'
import type { Page, PageElement, Props, Styles } from './types'

export function createElement(type: string, props: Props = {}, styles: Styles = {}): PageElement {
  return { id: createId(), type, parentId: null, children: [], props, styles }
}

export function createPage(): Page {
  const body = createElement('body')
  return { bodyId: body.id, elements: { [body.id]: body } }
}
