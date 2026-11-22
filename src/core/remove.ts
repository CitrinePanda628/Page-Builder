import { getBranchIds, getParent } from './read'
import type { Page } from './types'

// removes an element and everything in it, the body can't be removed
export function removeElement(page: Page, id: string): Page {
  const parent = getParent(page, id)
  const elements = { ...page.elements }

  for (const removedId of getBranchIds(page, id)) delete elements[removedId]
  elements[parent.id] = { ...parent, children: parent.children.filter((childId) => childId !== id) }

  return { ...page, elements }
}
