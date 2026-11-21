import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { MouseEvent, ReactNode } from 'react'
import type { PageElement } from '../../../core'
import { expandStyles } from '../expand-styles'

/** What the canvas adds to an element's tag, so you can click and drag it. */
export interface EditorProps {
  ref: (node: HTMLElement | null) => void
  /** Outline classes: selected, empty, being dragged. */
  className: string
  onClick: (event: MouseEvent) => void
  onMouseOver: (event: MouseEvent) => void
  listeners: DraggableSyntheticListeners
}

export interface TagProps {
  element: PageElement
  editorProps: EditorProps
  /** One view per child (with the blue drop line before it, if any). */
  childViews: ReactNode[]
  /** The blue drop line after the last child, or null. */
  endLine: ReactNode
}

// What every tag gets. draggable={false} stops the browser's own link dragging fighting ours.
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
