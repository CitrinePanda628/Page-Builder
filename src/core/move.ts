import { checkPosition, insertAt, saveElements } from './helpers'
import { getElement, getParent, isInside } from './read'
import type { Page } from './types'

/**
 * Moves an element (with everything inside it) into `newParentId`.
 * `position` means: "put it before the child that is at this position right now".
 */
export function moveElement(page: Page, id: string, newParentId: string, position: number): Page {
  if (id === newParentId || isInside(page, newParentId, id)) {
    throw new Error('An element cannot be moved inside itself.')
  }
  const element = getElement(page, id)
  const oldParent = getParent(page, id)
  const newParent = getElement(page, newParentId)
  checkPosition(newParent, position)

  const withoutElement = oldParent.children.filter((childId) => childId !== id)

  if (oldParent.id === newParent.id) {
    // Taking the element out moved every later child one place to the left.
    const oldPosition = oldParent.children.indexOf(id)
    const target = position > oldPosition ? position - 1 : position
    return saveElements(page, [{ ...oldParent, children: insertAt(withoutElement, target, id) }])
  }

  return saveElements(page, [
    { ...oldParent, children: withoutElement },
    { ...newParent, children: insertAt(newParent.children, position, id) },
    { ...element, parentId: newParentId },
  ])
}
