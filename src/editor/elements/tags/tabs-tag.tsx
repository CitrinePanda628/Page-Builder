import { useState, type MouseEvent } from 'react'
import { getElement, isInside } from '../../../core'
import { useEditorStore, useIsPreview, usePage } from '../../state/editor-store'
import { getAttributes, type TagProps } from './tag-props'

// a row of tab buttons and the content of the active one
// while editing, the tab that holds the selected element is the active one
export function TabsTag({ element, editorProps, childViews }: TagProps) {
  const { ref, className } = editorProps
  const attributes = getAttributes(element, editorProps)
  const page = usePage()
  const selectedId = useEditorStore((state) => state.selectedId)
  const select = useEditorStore((state) => state.select)
  const isPreview = useIsPreview()
  const [chosen, setChosen] = useState(0)

  const tabs = element.children.map((id) => getElement(page, id))
  const holdsSelection = (tabId: string) =>
    selectedId === tabId || (selectedId !== null && isInside(page, selectedId, tabId))
  const selectedTab = isPreview ? -1 : tabs.findIndex((tab) => holdsSelection(tab.id))
  const active = Math.min(selectedTab >= 0 ? selectedTab : chosen, tabs.length - 1)

  function choose(event: MouseEvent, index: number, tabId: string) {
    event.stopPropagation()
    setChosen(index)
    if (!isPreview) select(tabId)
  }

  return (
    <div ref={ref} className={className} {...attributes}>
      <div role="tablist" className="mb-4 flex gap-1 border-b border-zinc-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={(event) => choose(event, index, tab.id)}
            className={
              index === active
                ? '-mb-px border-b-2 border-current px-4 py-2 font-semibold'
                : 'px-4 py-2 opacity-60 hover:opacity-100'
            }
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      {childViews[active]}
    </div>
  )
}
