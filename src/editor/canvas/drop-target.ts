import { getElement, getParent, isInside, type Page } from '../../core'
import { canHoldChildren, canPlace } from '../elements/element-types'

/** Where an element lands: inside `parentId`, at `position` (0 = first). */
export interface DropTarget {
  parentId: string
  position: number
}

/**
 * Where a drop lands when the pointer is over element `overId`.
 * `ratio`: how far down that element the pointer is (0 = top edge, 1 = bottom edge).
 *   over the body, or the middle half of a container → inside it, at the end
 *   top half of anything else → before it;  bottom half → after it
 */
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

/** A click on an Add tile: into the selected container, or else at the end of the page. */
export function getClickTarget(page: Page, selectedId: string | null): DropTarget {
  const selected = selectedId === null ? null : getElement(page, selectedId)
  const parent =
    selected && canHoldChildren(selected.type) ? selected : getElement(page, page.bodyId)
  return { parentId: parent.id, position: parent.children.length }
}

/** False if the element would end up inside itself, or in a place its type does not allow. */
export function canMoveTo(page: Page, movingId: string, target: DropTarget): boolean {
  const moving = getElement(page, movingId)
  const parent = getElement(page, target.parentId)
  const intoItself = movingId === target.parentId || isInside(page, target.parentId, movingId)
  return !intoItself && canPlace(moving.type, parent.type)
}
