import { addElement } from './add'
import { createElement } from './create'
import type { Page, Props, Styles } from './types'

// a nested plan for an element and its children, easier than lots of createElement + addElement calls
export interface Blueprint {
  type: string
  props?: Props
  styles?: Styles
  children?: Blueprint[]
}

// builds it and its children inside parentId, gives back the new page and the id
export function addBlueprint(
  page: Page,
  blueprint: Blueprint,
  parentId: string,
  position?: number,
): { page: Page; id: string } {
  const { type, props, styles, children = [] } = blueprint
  const element = createElement(type, props, styles)
  let newPage = addElement(page, element, parentId, position)

  for (const child of children) {
    newPage = addBlueprint(newPage, child, element.id).page
  }
  return { page: newPage, id: element.id }
}

// a whole page from blueprints, the body's own styles go in bodyStyles
// buildPage([{ type: 'heading', props: { text: 'Hi' } }])
export function buildPage(blueprints: Blueprint[], bodyStyles: Styles = {}): Page {
  const body = createElement('body', {}, bodyStyles)
  let page: Page = { bodyId: body.id, elements: { [body.id]: body } }

  for (const blueprint of blueprints) {
    page = addBlueprint(page, blueprint, page.bodyId).page
  }
  return page
}
