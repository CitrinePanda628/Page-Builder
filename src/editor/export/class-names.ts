import { getElement, type Page } from '../../core'

/**
 * A CSS class name for every element, in page order:
 *   an element with a name uses it:  'menu'
 *   the others: type + a number:     'heading-1', 'heading-2', 'button-1'
 * The body is always 'page'. No two elements get the same class.
 */
export function getClassNames(page: Page): Record<string, string> {
  const names: Record<string, string> = { [page.bodyId]: 'page' }
  const used = new Set(['page'])
  const counts: Record<string, number> = {}

  function claim(wanted: string): string {
    let name = wanted
    for (let n = 2; used.has(name); n++) name = `${wanted}-${n}`
    used.add(name)
    return name
  }

  function numbered(type: string): string {
    counts[type] = (counts[type] ?? 0) + 1
    return claim(`${type}-${counts[type]}`)
  }

  function visit(id: string) {
    const element = getElement(page, id)
    const fromName = toClassName(element.props.name ?? '')
    names[id] = fromName ? claim(fromName) : numbered(element.type)
    element.children.forEach(visit)
  }

  getElement(page, page.bodyId).children.forEach(visit)
  return names
}

/** 'Our Menu!' → 'our-menu'. Only letters, digits, - and _ are safe in a class name. */
export function toClassName(name: string): string {
  const clean = name
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return /^[0-9]/.test(clean) ? `el-${clean}` : clean
}
