import { describe, expect, it } from 'vitest'
import {
  addElement,
  addVersion,
  buildPage,
  createElement,
  createHistory,
  createId,
  createPage,
  getElement,
  moveElement,
  removeElement,
  undo,
  updateStyles,
} from './core'
import { getDropTarget } from './editor/canvas/drop-target'
import { ELEMENT_TYPES, canPlace } from './editor/elements/element-types'
import { expandBox } from './editor/elements/expand-styles'
import { CONTENT_FIELDS } from './editor/panels/settings/content-fields'
import { STYLE_GROUPS } from './editor/panels/settings/style-groups'
import { toCssLine } from './editor/ui/css-name'
import { toCss } from './editor/panels/settings/to-css'
import { splitHighlights } from './editor/elements/highlights'
import { createStarterPage } from './editor/state/starter'
import { useEditorStore } from './editor/state/editor-store'

// A small page to test with:
//   body
//   └── section
//       ├── heading
//       ├── text
//       └── button
function makeSamplePage() {
  const section = createElement('section')
  const heading = createElement('heading', { text: 'Hello' })
  const text = createElement('text')
  const button = createElement('button')

  let page = createPage()
  page = addElement(page, section, page.bodyId)
  page = addElement(page, heading, section.id)
  page = addElement(page, text, section.id)
  page = addElement(page, button, section.id)
  return { page, section, heading, text, button }
}

describe('core', () => {
  it('createId makes 16 characters of 0-9 and a-f', () => {
    expect(createId()).toMatch(/^[0-9a-f]{16}$/)
  })

  it('addElement puts an element inside its parent, without changing the old page', () => {
    const { page, section, heading, text, button } = makeSamplePage()
    const intro = createElement('text')
    const newPage = addElement(page, intro, section.id, 0)

    expect(getElement(newPage, section.id).children).toEqual([
      intro.id,
      heading.id,
      text.id,
      button.id,
    ])
    expect(getElement(page, section.id).children).toEqual([heading.id, text.id, button.id])
  })

  it('removeElement removes the element and everything inside it', () => {
    const { page, section, heading } = makeSamplePage()
    const newPage = removeElement(page, section.id)

    expect(getElement(newPage, newPage.bodyId).children).toEqual([])
    expect(newPage.elements[heading.id]).toBeUndefined()
  })

  it('moveElement moves an element down within the same parent', () => {
    const { page, section, heading, text, button } = makeSamplePage()
    const newPage = moveElement(page, heading.id, section.id, 2) // before the button

    expect(getElement(newPage, section.id).children).toEqual([text.id, heading.id, button.id])
  })

  it('updateStyles sets a style, and an empty string removes it', () => {
    const { page, heading } = makeSamplePage()
    const red = updateStyles(page, heading.id, { color: 'red' })
    const cleared = updateStyles(red, heading.id, { color: '' })

    expect(getElement(red, heading.id).styles).toEqual({ color: 'red' })
    expect(getElement(cleared, heading.id).styles).toEqual({})
  })

  it('undo goes back to the previous version', () => {
    const { page, heading } = makeSamplePage()
    const history = addVersion(createHistory(page), removeElement(page, heading.id))

    expect(undo(history).present).toBe(page)
  })
})

describe('editor store', () => {
  it('deletes the selected element, and undo brings it back', () => {
    const { page, heading } = makeSamplePage()
    const { loadPage, select, deleteSelected, undo } = useEditorStore.getState()

    loadPage(page)
    select(heading.id)
    deleteSelected()
    expect(useEditorStore.getState().history.present.elements[heading.id]).toBeUndefined()

    undo()
    expect(useEditorStore.getState().history.present.elements[heading.id]).toBeDefined()
  })

  it('adds 2 Columns with two sections inside, and selects it', () => {
    const { page, section } = makeSamplePage()
    const { loadPage, addNewElement } = useEditorStore.getState()

    loadPage(page)
    addNewElement('columns', { parentId: section.id, position: 0 })

    const { history, selectedId } = useEditorStore.getState()
    const columns = Object.values(history.present.elements).find((e) => e.type === 'columns')
    expect(columns?.children).toHaveLength(2)
    expect(getElement(history.present, section.id).children[0]).toBe(columns?.id)
    expect(selectedId).toBe(columns?.id)
  })
})

describe('editing in the settings panel', () => {
  it('typing into one box is one undo step', () => {
    const { page, heading } = makeSamplePage()
    const { loadPage, updateStyles, undo } = useEditorStore.getState()

    loadPage(page)
    updateStyles(heading.id, { fontSize: '4' }) // typing "48px", one key at a time
    updateStyles(heading.id, { fontSize: '48' })
    updateStyles(heading.id, { fontSize: '48px' })
    undo()

    expect(useEditorStore.getState().history.present).toBe(page)
  })

  it('expandBox reads a padding or margin shorthand like CSS does', () => {
    expect(expandBox('16px')).toEqual(['16px', '16px', '16px', '16px'])
    expect(expandBox('16px 32px')).toEqual(['16px', '32px', '16px', '32px'])
  })
})

describe('getDropTarget', () => {
  it('top half of an element: drop before it', () => {
    const { page, section, text } = makeSamplePage()
    expect(getDropTarget(page, text.id, 0.2)).toEqual({ parentId: section.id, position: 1 })
  })

  it('middle of a section: drop inside it, at the end', () => {
    const { page, section } = makeSamplePage()
    expect(getDropTarget(page, section.id, 0.5)).toEqual({ parentId: section.id, position: 3 })
  })
})

describe('Part 10: blueprints and interactive elements', () => {
  it('buildPage builds nested blueprints, children in order', () => {
    const page = buildPage([{ type: 'row', children: [{ type: 'heading' }, { type: 'text' }] }])
    const row = getElement(page, getElement(page, page.bodyId).children[0] ?? '')
    const types = row.children.map((id) => getElement(page, id).type)

    expect(types).toEqual(['heading', 'text'])
  })

  it('a new 2 Columns has two sections with their own padding', () => {
    const { page } = makeSamplePage()
    const { loadPage, addNewElement } = useEditorStore.getState()

    loadPage(page)
    addNewElement('columns', { parentId: page.bodyId, position: 0 })

    const { history, selectedId } = useEditorStore.getState()
    const columns = getElement(history.present, selectedId ?? '')
    const first = getElement(history.present, columns.children[0] ?? '')
    expect(first.styles).toEqual({ padding: '32px' })
  })

  it('a tab only goes inside tabs, and tabs hold only tabs', () => {
    expect(canPlace('tab', 'tabs')).toBe(true)
    expect(canPlace('tab', 'section')).toBe(false)
    expect(canPlace('heading', 'tabs')).toBe(false)
    expect(canPlace('heading', 'tab')).toBe(true)
  })

  it('the CSS code uses the name when there is one', () => {
    const { heading } = makeSamplePage()
    const named = { ...heading, props: { name: 'title' }, styles: { fontSize: '32px' } }

    expect(toCss(named)).toBe('#title {\n  font-size: 32px;\n}')
  })

  it('the starter page uses every element type', () => {
    const page = createStarterPage()
    const used = new Set(Object.values(page.elements).map((element) => element.type))

    for (const { type } of ELEMENT_TYPES) expect(used).toContain(type)
  })
})

describe('Part 11: highlighted words', () => {
  it('words in **two stars** are highlighted in the editor', () => {
    expect(splitHighlights('I use **React** daily')).toEqual([
      'I use ',
      { bold: 'React' },
      ' daily',
    ])
  })
})

describe('Part 12: a clearer settings panel', () => {
  it('shows only the style groups that fit the element', () => {
    const titlesFor = (type: string) =>
      STYLE_GROUPS.filter((group) => group.showFor(type)).map((group) => group.title)

    expect(titlesFor('heading')).not.toContain('Layout of the children')
    expect(titlesFor('row')).toContain('Layout of the children')
    expect(titlesFor('divider')).not.toContain('Text')
  })

  it('every setting shows its CSS: the value set, or the default in use', () => {
    expect(toCssLine('justify-content', 'center', 'normal')).toBe('justify-content: center;')
    expect(toCssLine('justify-content', '', 'normal')).toBe(
      'justify-content: normal;  /* default */',
    )
  })

  it('every content box shows its HTML', () => {
    const goesTo = CONTENT_FIELDS.link?.find((field) => field.key === 'href')
    expect(goesTo?.html('#menu')).toBe('<a href="#menu">')
  })

  it('images and videos are gone', () => {
    const types = ELEMENT_TYPES.map((type) => type.type)
    expect(types).not.toContain('image')
    expect(types).not.toContain('video')
  })
})

describe('Part 13: the block toolbar', () => {
  it('moves the selected block up and down among its siblings', () => {
    const { page, section, heading, text } = makeSamplePage()
    const { loadPage, select, moveSelected } = useEditorStore.getState()

    loadPage(page)
    select(text.id)
    moveSelected(-1)
    const order = () => getElement(useEditorStore.getState().history.present, section.id).children

    expect(order().slice(0, 2)).toEqual([text.id, heading.id])
    moveSelected(1)
    expect(order().slice(0, 2)).toEqual([heading.id, text.id])
  })

  it('selects the parent block', () => {
    const { page, section, heading } = makeSamplePage()
    const { loadPage, select, selectParent } = useEditorStore.getState()

    loadPage(page)
    select(heading.id)
    selectParent()
    expect(useEditorStore.getState().selectedId).toBe(section.id)
  })
})
