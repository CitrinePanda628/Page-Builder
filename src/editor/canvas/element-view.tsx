import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Fragment, type MouseEvent } from 'react'
import { getElement } from '../../core'
import { ElementTag } from '../elements/element-tag'
import { canHoldChildren } from '../elements/element-types'
import { useEditorStore, useIsPreview, usePage } from '../state/editor-store'
import type { DragData } from './drag-and-drop'
import { followLink } from './follow-link'

// draws one element and all of its children
export function ElementView({ elementId }: { elementId: string }) {
  const page = usePage()
  const selectedId = useEditorStore((state) => state.selectedId)
  const dropTarget = useEditorStore((state) => state.dropTarget)
  const hoveredId = useEditorStore((state) => state.hoveredId)
  const select = useEditorStore((state) => state.select)
  const setHovered = useEditorStore((state) => state.setHovered)
  const isPreview = useIsPreview()

  const element = getElement(page, elementId)
  const isBody = element.parentId === null
  const isContainer = canHoldChildren(element.type)

  const data: DragData = { kind: 'move', id: element.id }
  const drop = useDroppable({ id: element.id })
  const drag = useDraggable({ id: element.id, data, disabled: isBody || isPreview })

  function handleClick(event: MouseEvent) {
    event.stopPropagation() // the parents are under the pointer too
    if (isPreview) {
      followLink(event, element)
      return
    }
    event.preventDefault() // a link or a summary must not do its normal thing while editing
    select(element.id)
  }

  const className = [
    isBody ? 'min-h-[calc(100vh-8rem)]' : '',
    isPreview ? '' : getEditClasses(element.children.length === 0 && isContainer && !isBody),
    getOutline(element.id === selectedId, element.id === hoveredId && !isPreview),
    drag.isDragging ? 'opacity-40' : '',
  ].join(' ')

  // the blue line between children, -1 for none
  const lineAt = dropTarget?.parentId === element.id ? dropTarget.position : -1

  const childViews = element.children.map((childId, index) => (
    <Fragment key={childId}>
      {lineAt === index && <DropLine />}
      <ElementView elementId={childId} />
    </Fragment>
  ))

  return (
    <ElementTag
      element={element}
      editorProps={{
        ref: (node) => {
          drop.setNodeRef(node)
          drag.setNodeRef(node)
        },
        className,
        onClick: handleClick,
        onMouseOver: (event) => {
          event.stopPropagation() // only the innermost block under the mouse
          if (!isPreview) setHovered(element.id)
        },
        listeners: drag.listeners,
      }}
      childViews={childViews}
      endLine={isContainer && lineAt === element.children.length ? <DropLine /> : null}
    />
  )
}

function getOutline(isSelected: boolean, isHovered: boolean): string {
  if (isSelected) return 'outline-2 outline-offset-0 outline-accent outline-solid'
  if (isHovered) return 'outline-1 outline-offset-0 outline-accent outline-solid'
  return ''
}

// an empty container gets a dashed outline and some height to drop into
function getEditClasses(isEmptyContainer: boolean): string {
  const empty = 'min-h-24 outline-2 -outline-offset-4 outline-green-300 outline-dashed'
  return `cursor-pointer ${isEmptyContainer ? empty : ''}`
}

// shows where a drop will land, takes up no room (-my-0.5 on h-1)
function DropLine() {
  return <div className="pointer-events-none -my-0.5 h-1 rounded-full bg-accent" />
}
