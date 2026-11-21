/** CSS styles, the JavaScript way: { color: 'brown', fontSize: '32px' } */
export type Styles = Record<string, string>

/** Content: { text: 'Fresh bread' }, { href: '#menu' } */
export type Props = Record<string, string>

export interface PageElement {
  id: string
  type: string
  /** null for the body, which sits inside nothing. */
  parentId: string | null
  children: string[]
  props: Props
  styles: Styles
}

export interface Page {
  bodyId: string
  elements: Record<string, PageElement>
}
