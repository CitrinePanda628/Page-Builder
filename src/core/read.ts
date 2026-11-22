import type { Page, PageElement } from './types'

// finds an element by id, throws if it isn't there
export function getElement(page: Page, id: string): PageElement {
  const element = page.elements[id]
  if (!element) throw new Error(`There is no element with id "${id}".`)
  return element
}

// the element this one sits in, throws for the body
export function getParent(page: Page, id: string): PageElement {
  const parentId = getElement(page, id).parentId
  if (parentId === null) throw new Error('The body is not inside anything.')
  return getElement(page, parentId)
}

// true if id is somewhere inside containerId, at any depth
export function isInside(page: Page, id: string, containerId: string): boolean {
  let parentId = getElement(page, id).parentId
  while (parentId !== null) {
    if (parentId === containerId) return true
    parentId = getElement(page, parentId).parentId
  }
  return false
}

// the id plus the ids of everything inside it
export function getBranchIds(page: Page, id: string): string[] {
  const children = getElement(page, id).children
  return [id, ...children.flatMap((childId) => getBranchIds(page, childId))]
}
