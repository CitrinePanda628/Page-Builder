import { FileText, type LucideIcon } from 'lucide-react'
import type { Blueprint } from '../../../core'
import { CONTENT_TYPES } from './content'
import { INTERACTIVE_TYPES } from './interactive'
import { LAYOUT_TYPES } from './layout'
import type { ElementType } from './types'

export type { ElementType } from './types'

/** Every element type, in the order of the Add panel. */
export const ELEMENT_TYPES: ElementType[] = [
  ...LAYOUT_TYPES,
  ...CONTENT_TYPES,
  ...INTERACTIVE_TYPES,
]

export function getElementType(type: string): ElementType {
  const found = ELEMENT_TYPES.find((elementType) => elementType.type === type)
  if (!found) throw new Error(`There is no element type "${type}".`)
  return found
}

/** The body is not in the list, so it gets its own icon and tint. */
export function getIcon(type: string): LucideIcon {
  return type === 'body' ? FileText : getElementType(type).icon
}

export function canHoldChildren(type: string): boolean {
  return type === 'body' || getElementType(type).canHoldChildren
}

/**
 * A new element of this type, as a blueprint: { type: 'row', styles: {...}, children: [...] }.
 * Each child starts from its own type's defaults, and what the parent says wins:
 *   2 Columns has children [{ type: 'section' }] → each section gets padding: 32px.
 */
export function getBlueprint(type: string): Blueprint {
  const { children = [], ...rest } = getElementType(type).starts
  return {
    type,
    ...rest,
    children: children.map((child) => ({ ...getBlueprint(child.type), ...child })),
  }
}

/** True if an element of `type` may sit directly inside an element of `parentType`. */
export function canPlace(type: string, parentType: string): boolean {
  if (!canHoldChildren(parentType)) return false
  const parentRule = parentType === 'body' ? undefined : getElementType(parentType).onlyHolds
  const ownRule = type === 'body' ? undefined : getElementType(type).onlyInside
  return (
    (parentRule === undefined || parentRule === type) &&
    (ownRule === undefined || ownRule === parentType)
  )
}
