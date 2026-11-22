import { X } from 'lucide-react'
import { useEditorStore } from '../state/editor-store'
import { BlockInserter } from './block-inserter'
import { IconButton } from './buttons'
import { ListView } from './list-view'

const TABS = [
  { panel: 'blocks', label: 'Blocks' },
  { panel: 'list', label: 'List view' },
] as const

export function LeftPanel() {
  const leftPanel = useEditorStore((state) => state.leftPanel)
  const setLeftPanel = useEditorStore((state) => state.setLeftPanel)

  return (
    <aside className="flex min-h-0 flex-col border-r border-line bg-panel">
      <div className="flex items-center border-b border-line pr-2 pl-4">
        {TABS.map(({ panel, label }) => (
          <button
            key={panel}
            type="button"
            onClick={() => setLeftPanel(panel)}
            className={`-mb-px border-b-2 px-3 py-3 text-sm font-medium ${leftPanel === panel ? 'border-accent text-ink' : 'border-transparent text-muted hover:text-accent'}`}
          >
            {label}
          </button>
        ))}
        <span className="ml-auto">
          <IconButton label="Close" onClick={() => setLeftPanel(null)}>
            <X size={18} />
          </IconButton>
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        {leftPanel === 'list' ? <ListView /> : <BlockInserter />}
      </div>
    </aside>
  )
}
