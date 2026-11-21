import { MousePointerClick } from 'lucide-react'
import { useEditorStore, usePage } from '../state/editor-store'
import { SettingsPanel } from './settings/settings-panel'

const TABS = [
  { tab: 'page', label: 'Page' },
  { tab: 'block', label: 'Block' },
] as const

/** The right sidebar: the selected block's settings, or the whole page's. */
export function Sidebar() {
  const page = usePage()
  const selectedId = useEditorStore((state) => state.selectedId)
  const tab = useEditorStore((state) => state.sidebarTab)
  const setTab = useEditorStore((state) => state.setSidebarTab)

  return (
    <aside className="flex min-h-0 flex-col border-l border-line bg-panel">
      <div className="flex border-b border-line px-2">
        {TABS.map(({ tab: value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`-mb-px border-b-2 px-3 py-3 text-sm font-medium ${tab === value ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-accent'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {tab === 'page' && <SettingsPanel elementId={page.bodyId} />}
        {tab === 'block' && selectedId && <SettingsPanel elementId={selectedId} />}
        {tab === 'block' && !selectedId && <NothingSelected />}
      </div>
    </aside>
  )
}

function NothingSelected() {
  return (
    <div className="flex flex-col items-center gap-3 p-8 text-center text-sm text-muted">
      <MousePointerClick size={32} />
      <p className="font-medium text-ink">No block selected</p>
      <p>Click a block on the page to see how it is made, and change it.</p>
    </div>
  )
}
