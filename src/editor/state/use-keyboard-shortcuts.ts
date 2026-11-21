import { useEffect } from 'react'
import { useEditorStore } from './editor-store'

/**
 * Delete or Backspace: delete. Ctrl+Z: undo. Ctrl+Shift+Z: redo (Cmd on a Mac).
 * Escape: leave preview, or unselect. Off while you type in a box.
 */
export function useKeyboardShortcuts(): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { target } = event
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return
      }

      const { mode, togglePreview, select, deleteSelected, undo, redo } = useEditorStore.getState()
      const withCtrl = event.ctrlKey || event.metaKey

      if (event.key === 'Escape') {
        if (mode === 'preview') togglePreview()
        else select(null)
      } else if (mode === 'preview') {
        return
      } else if (event.key === 'Delete' || event.key === 'Backspace') {
        deleteSelected()
      } else if (withCtrl && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        if (event.shiftKey) redo()
        else undo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
}
