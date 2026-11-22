// css styles the js way: { color: 'brown', fontSize: '32px' }
export type Styles = Record<string, string>

// content like { text: 'Fresh bread' } or { href: '#menu' }
export type Props = Record<string, string>

export interface PageElement {
  id: string
  type: string
  // null for the body, it sits in nothing
  parentId: string | null
  children: string[]
  props: Props
  styles: Styles
}

export interface Page {
  bodyId: string
  elements: Record<string, PageElement>
}
