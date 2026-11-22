import { checkPosition, insertAt, saveElements } from './helpers'
import { getElement } from './read'
import type { Page, PageElement } from './types'

// puts a new element inside a parent, it goes last unless you give a position
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
