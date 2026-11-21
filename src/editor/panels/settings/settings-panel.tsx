import { ArrowUpFromLine, Trash2 } from 'lucide-react'
import { TypeIcon } from '../../elements/type-icon'
import { useEditorStore, usePage } from '../../state/editor-store'
import { IconButton } from '../buttons'
import { ContentSettings } from './content-settings'
import { CssOutput } from './css-output'
import { StyleGroupView } from './style-group-view'
import { STYLE_GROUPS } from './style-groups'
import { useCurrentStyles } from './use-current-styles'

/**
 * Everything you can change about one block. The key gives every block a fresh panel,
 * so its groups open and close to match it.
 */
export function SettingsPanel({ elementId }: { elementId: string }) {
  return <ElementSettings key={elementId} elementId={elementId} />
}

function ElementSettings({ elementId }: { elementId: string }) {
  const page = usePage()
  const current = useCurrentStyles(elementId)
  const deleteSelected = useEditorStore((state) => state.deleteSelected)
  const selectParent = useEditorStore((state) => state.selectParent)
  const element = page.elements[elementId]
  if (!element) return null

  const isBody = element.parentId === null
  const groups = STYLE_GROUPS.filter((group) => group.showFor(element.type))

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-line p-4">
        <TypeIcon type={element.type} size={24} />
        <div className="mr-auto">
          <h2 className="font-semibold capitalize">{isBody ? 'Page' : element.type}</h2>
          {element.props.name && (
            <p className="font-mono text-xs text-muted">#{element.props.name}</p>
          )}
        </div>
        {!isBody && (
          <>
            <IconButton label="Select the parent block" onClick={selectParent}>
              <ArrowUpFromLine size={18} />
            </IconButton>
            <IconButton label="Delete" onClick={deleteSelected}>
              <Trash2 size={18} />
            </IconButton>
          </>
        )}
      </div>
      <Legend />
      <ContentSettings element={element} />
      {groups.map((group) => (
        <StyleGroupView key={group.title} group={group} element={element} current={current} />
      ))}
      <CssOutput element={element} />
    </div>
  )
}

function Legend() {
  return (
    <p className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3 text-xs text-muted">
      <span className="rounded-full bg-good-soft px-2 py-0.5 text-good">● Set</span>
      has its own value
      <span className="rounded-full border border-dashed border-edge px-2 py-0.5">Default</span>
      uses the grey value
    </p>
  )
}
