import type { Page, PageElement } from './types'

/** Finds an element by its id. Throws an error if the page has no such element. */
export function getElement(page: Page, id: string): PageElement {
  const element = page.elements[id]
  if (!element) throw new Error(`There is no element with id "${id}".`)
  return element
}

/** Finds the element that this one sits inside. Throws for the body, which has none. */
export function getParent(page: Page, id: string): PageElement {
  const parentId = getElement(page, id).parentId
  if (parentId === null) throw new Error('The body is not inside anything.')
  return getElement(page, parentId)
}

/** True if element `id` is somewhere inside `containerId`, at any depth. */
export function isInside(page: Page, id: string, containerId: string): boolean {
  let parentId = getElement(page, id).parentId
  while (parentId !== null) {
    if (parentId === containerId) return true
    parentId = getElement(page, parentId).parentId
  }
  return false
}

/** The id of an element plus the ids of everything inside it (its "branch"). */
export function getBranchIds(page: Page, id: string): string[] {
  const children = getElement(page, id).children
  return [id, ...children.flatMap((childId) => getBranchIds(page, childId))]
}
