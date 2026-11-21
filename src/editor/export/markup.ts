// One tree, printed twice: as HTML (printHtml) and as JSX (printJsx).
export interface Tag {
  tag: string
  attrs: Record<string, Value>
  children: Child[]
}

// React only: a JavaScript expression, e.g. onClick={() => setOpen(true)}
export interface Code {
  code: string
}

// React only: {when && (...)}, or {when && createPortal(..., document.body)} with `portal`.
export interface Shown {
  when: string
  node: Tag
  portal?: boolean
}

export type Value = string | true | Code | undefined
export type Child = Tag | Shown | string

export function tag(name: string, attrs: Record<string, Value>, children: Child[] = []): Tag {
  return { tag: name, attrs, children }
}

const VOID = new Set(['img', 'hr', 'input'])

const JSX_NAMES: Record<string, string> = { class: 'className', allowfullscreen: 'allowFullScreen' }

// ---------- HTML ----------

export function printHtml(node: Tag): string[] {
  const open = `<${node.tag}${htmlAttrs(node.attrs)}>`
  if (VOID.has(node.tag)) return [open]
  if (isMixedText(node)) return [open + node.children.map(htmlChild).join('') + `</${node.tag}>`]
  return wrap(open, `</${node.tag}>`, node.children.map(htmlChild))
}

function htmlChild(child: Child): string[] {
  if (typeof child === 'string') return [escapeHtml(child)]
  if ('when' in child) return printHtml(child.node)
  return printHtml(child)
}

function htmlAttrs(attrs: Record<string, Value>): string {
  return Object.entries(attrs)
    .map(([name, value]) => {
      if (value === undefined || typeof value === 'object') return ''
      return value === true ? ` ${name}` : ` ${name}="${escapeHtml(value)}"`
    })
    .join('')
}

export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

// ---------- JSX ----------

export function printJsx(node: Tag): string[] {
  const open = `<${node.tag}${jsxAttrs(node.attrs)}`
  if (VOID.has(node.tag)) return [`${open} />`]
  if (isMixedText(node))
    return [`${open}>` + node.children.map(jsxChild).join('') + `</${node.tag}>`]
  return wrap(`${open}>`, `</${node.tag}>`, node.children.map(jsxChild))
}

function jsxChild(child: Child): string[] {
  if (typeof child === 'string') return [jsxText(child)]
  if ('when' in child) {
    const [start, end] = child.portal ? ['createPortal(', ', document.body)'] : ['(', ')']
    return [`{${child.when} && ${start}`, ...indent(printJsx(child.node)), `${end}}`]
  }
  return printJsx(child)
}

function jsxAttrs(attrs: Record<string, Value>): string {
  return Object.entries(attrs)
    .map(([name, value]) => {
      const jsxName = JSX_NAMES[name] ?? name
      if (value === undefined) return ''
      if (value === true) return ` ${jsxName}`
      if (typeof value === 'object') return ` ${jsxName}={${value.code}}`
      return ` ${jsxName}=${JSON.stringify(value)}`
    })
    .join('')
}

// { } < > & would mean something in JSX, so such text goes in {"..."}.
function jsxText(text: string): string {
  return /[{}<>&\n]/.test(text) ? `{${JSON.stringify(text)}}` : text
}

// ---------- shared ----------

/**
 * Text with **highlighted** words in it: 'I use ', <strong>React</strong>, ' daily'.
 * It is printed on one line, because a line break there would show up as a space.
 */
function isMixedText(node: Tag): boolean {
  return (
    node.children.length > 1 &&
    node.children.every(
      (child) => typeof child === 'string' || ('tag' in child && child.tag === 'strong'),
    )
  )
}

function wrap(open: string, close: string, children: string[][]): string[] {
  const lines = children.flat()
  if (lines.length === 0) return [`${open}${close}`]
  if (lines.length === 1 && !lines[0]?.startsWith('<') && !lines[0]?.startsWith('{'))
    return [`${open}${lines[0]}${close}`]
  return [open, ...indent(lines), close]
}

export function indent(lines: string[], by = '  '): string[] {
  return lines.map((line) => by + line)
}
