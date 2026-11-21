import { ArrowDown, ArrowUp, ArrowUpFromLine, Trash2 } from 'lucide-react'
import { useEffect, useLayoutEffect, useState, type ReactNode, type RefObject } from 'react'
import { TypeIcon } from '../elements/type-icon'
import { useEditorStore, usePage } from '../state/editor-store'

type Spot = { top: number; left: number }

/**
 * The toolbar on the selected block: its type, move up and down, select the parent, delete.
 * It floats over the page, because some tags cannot hold anything (an <hr>, an <input>).
 */
export function SelectionLabel({ pageRef }: { pageRef: RefObject<HTMLDivElement | null> }) {
  const page = usePage()
  const selectedId = useEditorStore((state) => state.selectedId)
  const moveSelected = useEditorStore((state) => state.moveSelected)
  const selectParent = useEditorStore((state) => state.selectParent)
  const deleteSelected = useEditorStore((state) => state.deleteSelected)
  const [spot, setSpot] = useState<Spot | null>(null)

  // Bring the selected block into view, e.g. after a click in the list view.
  useEffect(() => {
    findNode(selectedId)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selectedId])

  useLayoutEffect(() => {
    const pageBox = pageRef.current
    const node = findNode(selectedId)
    if (!pageBox || !node || selectedId === page.bodyId) {
      setSpot(null)
      return
    }

    function measure() {
      if (!pageBox || !node) return
      const outer = pageBox.getBoundingClientRect()
      const inner = node.getBoundingClientRect()
      setSpot({ top: inner.top - outer.top, left: inner.left - outer.left })
    }
    measure()

    // Sizes change (typing, fonts loading) and sticky blocks move while scrolling.
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    observer.observe(pageBox)
    window.addEventListener('scroll', measure, true)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', measure, true)
    }
  }, [page, selectedId, pageRef])

  if (spot === null || selectedId === null) return null
  const element = page.elements[selectedId]
  if (!element) return null
  // Too close to the top of the page: show the toolbar inside the block instead of above it.
  const placement = spot.top > 52 ? '-translate-y-[calc(100%+8px)]' : 'translate-y-2'

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className={`absolute z-[60] flex items-stretch overflow-hidden rounded border border-ink bg-panel text-ink shadow-lg ${placement}`}
      style={{ top: spot.top, left: Math.max(spot.left, 8) }}
    >
      <span className="flex items-center gap-1.5 border-r border-line px-2 text-sm">
        <TypeIcon type={element.type} size={16} />
        <span className="capitalize">{element.type}</span>
        {element.props.name && <span className="text-muted">#{element.props.name}</span>}
      </span>
      <ToolbarIcon label="Move up" onClick={() => moveSelected(-1)}>
        <ArrowUp size={16} />
      </ToolbarIcon>
      <ToolbarIcon label="Move down" onClick={() => moveSelected(1)}>
        <ArrowDown size={16} />
      </ToolbarIcon>
      <ToolbarIcon label="Select the parent block" onClick={selectParent}>
        <ArrowUpFromLine size={16} />
      </ToolbarIcon>
      <ToolbarIcon label="Delete" onClick={deleteSelected}>
        <Trash2 size={16} />
      </ToolbarIcon>
    </div>
  )
}

function ToolbarIcon(props: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={props.label}
      aria-label={props.label}
      onClick={props.onClick}
      className="flex size-9 items-center justify-center hover:bg-hover hover:text-accent"
    >
      {props.children}
    </button>
  )
}

/** Searches the whole document: an open popup is drawn outside the page. */
function findNode(id: string | null) {
  if (id === null) return null
  return document.querySelector(`[data-element-id="${id}"]`)
}
