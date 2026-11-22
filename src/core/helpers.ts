import type { Page, PageElement } from './types'

// copy of the list with item added at position
export function insertAt(list: string[], position: number, item: string): string[] {
  return [...list.slice(0, position), item, ...list.slice(position)]
}

// copy of the page with these elements added or replaced
export function saveElements(page: Page, changed: PageElement[]): Page {
  const elements = { ...page.elements }
  for (const element of changed) elements[element.id] = element
  return { ...page, elements }
}

// throws if position isn't a valid spot inside parent
export function checkPosition(parent: PageElement, position: number): void {
  if (position < 0 || position > parent.children.length) {
    throw new Error(`Position ${position} does not exist inside "${parent.type}".`)
  }
}
