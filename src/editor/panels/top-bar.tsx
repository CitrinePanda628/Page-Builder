import { Eye, ListTree, Moon, PanelRight, Plus, Redo2, Sun, Undo2 } from 'lucide-react'
import { useEditorStore } from '../state/editor-store'
import { IconButton, Logo, TextButton } from './buttons'
import { PreviewBar } from './preview-bar'

export function TopBar() {
  const leftPanel = useEditorStore((state) => state.leftPanel)
  const setLeftPanel = useEditorStore((state) => state.setLeftPanel)
  const rightPanel = useEditorStore((state) => state.rightPanel)
  const toggleRightPanel = useEditorStore((state) => state.toggleRightPanel)
  const canUndo = useEditorStore((state) => state.history.past.length > 0)
  const canRedo = useEditorStore((state) => state.history.future.length > 0)
  const undo = useEditorStore((state) => state.undo)
  const redo = useEditorStore((state) => state.redo)
  const theme = useEditorStore((state) => state.theme)
  const toggleTheme = useEditorStore((state) => state.toggleTheme)
  const isPreview = useEditorStore((state) => state.mode === 'preview')
  const togglePreview = useEditorStore((state) => state.togglePreview)

  if (isPreview) return <PreviewBar />

  const isInserterOpen = leftPanel === 'blocks'

  return (
    <header className="col-span-full flex items-center border-b border-line bg-panel">
      <Logo />

      <div className="flex items-center gap-1 px-3">
        <button
          type="button"
          title={isInserterOpen ? 'Close the block inserter' : 'Add a block'}
          aria-label="Block inserter"
          aria-pressed={isInserterOpen}
          onClick={() => setLeftPanel(isInserterOpen ? null : 'blocks')}
          className={`mr-2 flex size-9 items-center justify-center rounded text-on-accent ${isInserterOpen ? 'bg-ink' : 'bg-accent'}`}
        >
          <Plus size={22} className={`transition-transform ${isInserterOpen ? 'rotate-45' : ''}`} />
        </button>
        <IconButton label="Undo (Ctrl+Z)" onClick={undo} disabled={!canUndo}>
          <Undo2 size={20} />
        </IconButton>
        <IconButton label="Redo (Ctrl+Shift+Z)" onClick={redo} disabled={!canRedo}>
          <Redo2 size={20} />
        </IconButton>
        <IconButton
          label="List view"
          pressed={leftPanel === 'list'}
          onClick={() => setLeftPanel(leftPanel === 'list' ? null : 'list')}
        >
          <ListTree size={20} />
        </IconButton>
      </div>

      <div className="ml-auto flex items-center gap-2 px-3">
        <IconButton label={theme === 'light' ? 'Dark mode' : 'Light mode'} onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
        <TextButton look="secondary" onClick={togglePreview}>
          <Eye size={18} />
          Preview
        </TextButton>
        <IconButton label="Settings" pressed={rightPanel} onClick={toggleRightPanel}>
          <PanelRight size={20} />
        </IconButton>
      </div>
    </header>
  )
}
