import { getElement, getParent, isInside, type Page } from '../../core'
import { canHoldChildren, canPlace } from '../elements/element-types'

// where an element lands: inside parentId at position (0 = first)
export interface DropTarget {
  parentId: string
  position: number
}

// where a drop lands when the pointer is over overId, ratio is how far down it the pointer is (0 top, 1 bottom)
// over the body or the middle half of a container: inside it, at the end
// top half of anything else: before it, bottom half: after it
export function getDropTarget(page: Page, overId: string, ratio: number): DropTarget {
  const over = getElement(page, overId)
  const isMiddle = ratio > 0.25 && ratio < 0.75

  if (over.parentId === null || (canHoldChildren(over.type) && isMiddle)) {
    return { parentId: over.id, position: over.children.length }
  }

  const parent = getParent(page, overId)
  const index = parent.children.indexOf(overId)
  return { parentId: parent.id, position: ratio < 0.5 ? index : index + 1 }
}

// clicking an Add tile: into the selected container, else at the end of the page
export function getClickTarget(page: Page, selectedId: string | null): DropTarget {
  const selected = selectedId === null ? null : getElement(page, selectedId)
  const parent =
    selected && canHoldChildren(selected.type) ? selected : getElement(page, page.bodyId)
  return { parentId: parent.id, position: parent.children.length }
}

// false if it'd end up inside itself or somewhere its type isn't allowed
export function canMoveTo(page: Page, movingId: string, target: DropTarget): boolean {
  const moving = getElement(page, movingId)
  const parent = getElement(page, target.parentId)
  const intoItself = movingId === target.parentId || isInside(page, target.parentId, movingId)
  return !intoItself && canPlace(moving.type, parent.type)
}
