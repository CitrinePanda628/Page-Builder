import type { Page, PageElement } from './types'

/** Returns a copy of `list` with `item` put in at `position`. The original list is not changed. */
export function insertAt(list: string[], position: number, item: string): string[] {
  return [...list.slice(0, position), item, ...list.slice(position)]
}

/** Returns a copy of the page with these elements added or replaced. */
export function saveElements(page: Page, changed: PageElement[]): Page {
  const elements = { ...page.elements }
  for (const element of changed) elements[element.id] = element
  return { ...page, elements }
}

/** Throws if `position` is not a place where a child can go inside `parent`. */
export function checkPosition(parent: PageElement, position: number): void {
  if (position < 0 || position > parent.children.length) {
    throw new Error(`Position ${position} does not exist inside "${parent.type}".`)
  }
}
