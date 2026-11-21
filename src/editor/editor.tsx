import { Canvas } from './canvas/canvas'
import { DragAndDrop } from './canvas/drag-and-drop'
import { LeftPanel } from './panels/left-panel'
import { Sidebar } from './panels/sidebar'
import { TopBar } from './panels/top-bar'
import { useEditorStore } from './state/editor-store'
import { useKeyboardShortcuts } from './state/use-keyboard-shortcuts'

/** The whole editor: top bar, left panel, the page, and the settings sidebar. */
export function Editor() {
  useKeyboardShortcuts()
  const theme = useEditorStore((state) => state.theme)
  const isPreview = useEditorStore((state) => state.mode === 'preview')
  const leftPanel = useEditorStore((state) => state.leftPanel)
  const rightPanel = useEditorStore((state) => state.rightPanel)
  const showLeft = leftPanel !== null && !isPreview
  const showRight = rightPanel && !isPreview

  // The width of each column changes while the app runs, so it is a style.
  const columns = [showLeft ? '300px' : '', '1fr', showRight ? '360px' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`h-screen bg-panel text-ink ${theme === 'dark' ? 'dark' : ''}`}>
      <DragAndDrop>
        <div
          className="grid h-full grid-rows-[60px_minmax(0,1fr)]"
          style={{ gridTemplateColumns: columns }}
        >
          <TopBar />
          {showLeft && <LeftPanel />}
          <Canvas />
          {showRight && <Sidebar />}
        </div>
      </DragAndDrop>
    </div>
  )
}
