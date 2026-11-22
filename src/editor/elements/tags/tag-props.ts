import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { MouseEvent, ReactNode } from 'react'
import type { PageElement } from '../../../core'
import { expandStyles } from '../expand-styles'

// what the canvas adds to a tag so you can click and drag it
export interface EditorProps {
  ref: (node: HTMLElement | null) => void
  // outline classes: selected, empty, being dragged
  className: string
  onClick: (event: MouseEvent) => void
  onMouseOver: (event: MouseEvent) => void
  listeners: DraggableSyntheticListeners
}

export interface TagProps {
  element: PageElement
  editorProps: EditorProps
  // one view per child, with the blue drop line before it if there is one
  childViews: ReactNode[]
  // the blue drop line after the last child, or null
  endLine: ReactNode
}

// every tag gets these, draggable={false} stops the browser's own link dragging fighting ours
export function getAttributes(element: PageElement, editorProps: EditorProps) {
  const { onClick, onMouseOver, listeners } = editorProps
  return {
    id: element.props.name || undefined,
    style: expandStyles(element.styles),
    onClick,
    onMouseOver,
    ...listeners,
    'data-element-id': element.id,
    draggable: false,
  }
}
