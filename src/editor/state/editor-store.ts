import { create } from 'zustand'
import * as core from '../../core'
import type { History, Page, Props, Styles } from '../../core'
import type { DropTarget } from '../canvas/drop-target'
import { canPlace, getBlueprint } from '../elements/element-types'
import type { Device } from './devices'
import { createStarterPage } from './starter'

export interface EditorStore {
  history: History
  selectedId: string | null
  /** Where a drag would land right now (the blue line). */
  dropTarget: DropTarget | null
  /** The left panel: the block inserter, the list view, or closed. */
  leftPanel: 'blocks' | 'list' | null
  rightPanel: boolean
  sidebarTab: 'block' | 'page'
  /** The block under the mouse, outlined on the canvas and in the list view. */
  hoveredId: string | null
  theme: 'light' | 'dark'
  /** edit: click to select. preview: use the page like a visitor. */
  mode: 'edit' | 'preview'
  /** In Preview: the screen size the page is shown at. */
  device: Device
  /** The field changed last, like "a1b2:styles:color", to group typing into one undo step. */
  lastEdit: string | null

  loadPage: (page: Page) => void
  select: (id: string | null) => void
  deleteSelected: () => void
  undo: () => void
  redo: () => void
  addNewElement: (type: string, target: DropTarget) => void
  moveElementTo: (id: string, target: DropTarget) => void
  setDropTarget: (target: DropTarget | null) => void
  toggleTheme: () => void
  setLeftPanel: (panel: 'blocks' | 'list' | null) => void
  toggleRightPanel: () => void
  setSidebarTab: (tab: 'block' | 'page') => void
  setHovered: (id: string | null) => void
  /** Moves the selected block one place up (-1) or down (1) among its siblings. */
  moveSelected: (step: -1 | 1) => void
  selectParent: () => void
  togglePreview: () => void
  setDevice: (device: Device) => void
  updateProps: (id: string, changes: Props) => void
  updateStyles: (id: string, changes: Styles) => void
}

export const useEditorStore = create<EditorStore>()((set, get) => ({
  history: core.createHistory(createStarterPage()),
  selectedId: null,
  dropTarget: null,
  leftPanel: 'blocks',
  rightPanel: true,
  sidebarTab: 'block',
  hoveredId: null,
  theme: 'light',
  mode: 'edit',
  device: 'desktop',
  lastEdit: null,

  loadPage: (page) => {
    set({ history: core.createHistory(page), selectedId: null, lastEdit: null })
  },

  select: (id) => {
    set({ selectedId: id, sidebarTab: 'block' })
  },

  deleteSelected: () => {
    const { history, selectedId } = get()
    const page = history.present
    if (selectedId === null || selectedId === page.bodyId) return

    const newPage = core.removeElement(page, selectedId)
    saveVersion(newPage, null)
  },

  undo: () => {
    set({ history: core.undo(get().history), selectedId: null, lastEdit: null })
  },

  redo: () => {
    set({ history: core.redo(get().history), selectedId: null, lastEdit: null })
  },

  addNewElement: (type, target) => {
    const page = get().history.present
    const parent = core.getElement(page, target.parentId)
    if (!canPlace(type, parent.type)) return

    const result = core.addBlueprint(page, getBlueprint(type), target.parentId, target.position)
    saveVersion(result.page, result.id)
  },

  moveElementTo: (id, target) => {
    const page = get().history.present
    const newPage = core.moveElement(page, id, target.parentId, target.position)
    saveVersion(newPage, id)
  },

  setDropTarget: (target) => {
    set({ dropTarget: target })
  },

  toggleTheme: () => {
    set({ theme: get().theme === 'light' ? 'dark' : 'light' })
  },

  setLeftPanel: (panel) => {
    set({ leftPanel: panel })
  },

  toggleRightPanel: () => {
    set({ rightPanel: !get().rightPanel })
  },

  setSidebarTab: (tab) => {
    set({ sidebarTab: tab })
  },

  setHovered: (id) => {
    if (id !== get().hoveredId) set({ hoveredId: id })
  },

  moveSelected: (step) => {
    const { history, selectedId } = get()
    const page = history.present
    if (selectedId === null || selectedId === page.bodyId) return

    const parent = core.getParent(page, selectedId)
    const index = parent.children.indexOf(selectedId)
    const newIndex = index + step
    if (newIndex < 0 || newIndex >= parent.children.length) return

    // moveElement puts it before the child at `position`, counted before it is taken out.
    const position = step === 1 ? index + 2 : index - 1
    saveVersion(core.moveElement(page, selectedId, parent.id, position), selectedId)
  },

  selectParent: () => {
    const { history, selectedId } = get()
    const parentId = selectedId ? core.getElement(history.present, selectedId).parentId : null
    if (parentId) get().select(parentId)
  },

  togglePreview: () => {
    set({ mode: get().mode === 'edit' ? 'preview' : 'edit', selectedId: null, hoveredId: null })
  },

  setDevice: (device) => {
    set({ device })
  },

  updateProps: (id, changes) => {
    const newPage = core.updateProps(get().history.present, id, changes)
    saveEdit(newPage, `${id}:props:${Object.keys(changes).join(',')}`)
  },

  updateStyles: (id, changes) => {
    const newPage = core.updateStyles(get().history.present, id, changes)
    saveEdit(newPage, `${id}:styles:${Object.keys(changes).join(',')}`)
  },
}))

function saveVersion(newPage: Page, selectedId: string | null) {
  const { history } = useEditorStore.getState()
  useEditorStore.setState({
    history: core.addVersion(history, newPage),
    selectedId,
    lastEdit: null,
  })
}

// Typing "48px" is four changes; keep them as one undo step while it's the same field.
function saveEdit(newPage: Page, edit: string) {
  const { history, lastEdit } = useEditorStore.getState()
  const newHistory =
    edit === lastEdit ? { ...history, present: newPage } : core.addVersion(history, newPage)
  useEditorStore.setState({ history: newHistory, lastEdit: edit })
}

export function usePage(): Page {
  return useEditorStore((state) => state.history.present)
}

export function useSelectedElement() {
  const page = usePage()
  const selectedId = useEditorStore((state) => state.selectedId)
  return selectedId === null ? null : core.getElement(page, selectedId)
}

export function useIsPreview(): boolean {
  return useEditorStore((state) => state.mode === 'preview')
}
