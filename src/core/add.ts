import { checkPosition, insertAt, saveElements } from './helpers'
import { getElement } from './read'
import type { Page, PageElement } from './types'

/**
 * Puts a new element inside a parent element.
 * Without `position` it goes last; with `position` it goes there (0 = first).
 */
export function addElement(
  page: Page,
  element: PageElement,
  parentId: string,
  position?: number,
): Page {
  const parent = getElement(page, parentId)
  const at = position ?? parent.children.length
  checkPosition(parent, at)

  return saveElements(page, [
    { ...parent, children: insertAt(parent.children, at, element.id) },
    { ...element, parentId },
  ])
}
