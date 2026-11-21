import { getElement } from '../../core'
import { TypeIcon } from '../elements/type-icon'
import { useEditorStore, usePage } from '../state/editor-store'

/** The page as an indented list. Pointing at a row outlines the block on the page. */
export function ListView() {
  const page = usePage()
  const setHovered = useEditorStore((state) => state.setHovered)

  return (
    <div className="p-2" onMouseLeave={() => setHovered(null)}>
      <ListRow elementId={page.bodyId} depth={0} />
    </div>
  )
}

function ListRow({ elementId, depth }: { elementId: string; depth: number }) {
  const page = usePage()
  const selectedId = useEditorStore((state) => state.selectedId)
  const hoveredId = useEditorStore((state) => state.hoveredId)
  const select = useEditorStore((state) => state.select)
  const setHovered = useEditorStore((state) => state.setHovered)

  const element = getElement(page, elementId)
  const look =
    element.id === selectedId
      ? 'bg-accent text-on-accent'
      : element.id === hoveredId
        ? 'bg-hover text-accent'
        : 'hover:bg-hover'

  return (
    <>
      <button
        type="button"
        onClick={() => select(element.id)}
        onMouseEnter={() => setHovered(element.id)}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        className={`flex w-full items-center gap-2 rounded py-1.5 pr-2 text-left text-sm ${look}`}
      >
        <TypeIcon type={element.type} size={16} />
        <span className="capitalize">{element.type}</span>
        {element.props.name && (
          <span className="truncate font-mono text-xs opacity-70">#{element.props.name}</span>
        )}
      </button>
      {element.children.map((childId) => (
        <ListRow key={childId} elementId={childId} depth={depth + 1} />
      ))}
    </>
  )
}
