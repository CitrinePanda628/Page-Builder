import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
  type DragMoveEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useState, type ReactNode } from 'react'
import { getElement, type Page } from '../../core'
import { canPlace, getElementType } from '../elements/element-types'
import { useEditorStore } from '../state/editor-store'
import { canMoveTo, getDropTarget, type DropTarget } from './drop-target'

// what's being dragged: a new element from the Add panel, or one already on the page
export type DragData = { kind: 'new'; type: string } | { kind: 'move'; id: string }

// drag and drop for everything inside it, the store only gets the result
export function DragAndDrop({ children }: { children: ReactNode }) {
  // wait for 6px of movement so a normal click still selects
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const [label, setLabel] = useState('')

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current as DragData
    const page = useEditorStore.getState().history.present
    const type = data.kind === 'new' ? data.type : getElement(page, data.id).type
    setLabel(getElementType(type).label)
  }

  function handleDragMove(event: DragMoveEvent) {
    const { history, dropTarget, setDropTarget } = useEditorStore.getState()
    const target = findTarget(event, history.present)
    // only tell the store when the place changes, not on every pixel
    if (target?.parentId !== dropTarget?.parentId || target?.position !== dropTarget?.position) {
      setDropTarget(target)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { history, addNewElement, moveElementTo, setDropTarget } = useEditorStore.getState()
    const target = findTarget(event, history.present)
    const data = event.active.data.current as DragData

    if (target !== null) {
      if (data.kind === 'new') addNewElement(data.type, target)
      else moveElementTo(data.id, target)
    }
    setDropTarget(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={innermostUnderPointer}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onDragCancel={() => useEditorStore.getState().setDropTarget(null)}
    >
      {children}
      <DragOverlay dropAnimation={null}>
        <div className="w-fit rounded-lg bg-accent px-4 py-2 font-medium text-on-accent shadow-xl">
          {label}
        </div>
      </DragOverlay>
    </DndContext>
  )
}

// where the drop would land now, null if nowhere or into itself
function findTarget(event: DragMoveEvent, page: Page): DropTarget | null {
  const { over, activatorEvent, delta } = event
  if (over === null || !(activatorEvent instanceof MouseEvent)) return null

  // pointer now = where it started + how far it moved
  const pointerY = activatorEvent.clientY + delta.y
  const ratio = (pointerY - over.rect.top) / over.rect.height
  const target = getDropTarget(page, String(over.id), ratio)

  const data = event.active.data.current as DragData
  if (data.kind === 'move') return canMoveTo(page, data.id, target) ? target : null

  const parentType = getElement(page, target.parentId).type
  return canPlace(data.type, parentType) ? target : null
}

// the pointer is over a few elements at once (heading, section, body), pick the smallest
const innermostUnderPointer: CollisionDetection = (args) => {
  const area = (id: string | number) => {
    const rect = args.droppableRects.get(id)
    return rect ? rect.width * rect.height : Infinity
  }
  return pointerWithin(args).sort((a, b) => area(a.id) - area(b.id))
}
