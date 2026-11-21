import { useDraggable } from '@dnd-kit/core'
import type { DragData } from '../canvas/drag-and-drop'
import { getClickTarget } from '../canvas/drop-target'
import { ELEMENT_TYPES, type ElementType } from '../elements/element-types'
import { useEditorStore } from '../state/editor-store'

const GROUPS = [
  { group: 'layout', title: 'Layout' },
  { group: 'content', title: 'Text and content' },
  { group: 'interactive', title: 'Interactive' },
] as const

/** Every block you can add: drag one onto the page, or click it. */
export function BlockInserter() {
  return (
    <div className="p-4">
      {GROUPS.map(({ group, title }) => {
        const types = ELEMENT_TYPES.filter((type) => type.group === group && !type.hidden)
        if (types.length === 0) return null
        return (
          <section key={group} className="mb-6">
            <h3 className="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
              {title}
            </h3>
            <div className="grid grid-cols-3 gap-1">
              {types.map((type) => (
                <BlockTile key={type.type} elementType={type} />
              ))}
            </div>
          </section>
        )
      })}
      <p className="text-sm text-muted">Drag a block onto the page, or click it.</p>
    </div>
  )
}

function BlockTile({ elementType }: { elementType: ElementType }) {
  const data: DragData = { kind: 'new', type: elementType.type }
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: `new-${elementType.type}`,
    data,
  })
  const Icon = elementType.icon

  function addAtSelection() {
    const { history, selectedId, addNewElement } = useEditorStore.getState()
    addNewElement(elementType.type, getClickTarget(history.present, selectedId))
  }

  return (
    <button
      type="button"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={addAtSelection}
      className="flex flex-col items-center gap-2 rounded px-1 py-3 text-ink hover:bg-hover hover:text-accent"
    >
      <Icon size={24} />
      <span className="text-center text-xs leading-tight">{elementType.label}</span>
    </button>
  )
}
