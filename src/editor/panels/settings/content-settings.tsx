import { FileText, Plus } from 'lucide-react'
import type { PageElement } from '../../../core'
import { useEditorStore } from '../../state/editor-store'
import { ButtonGroupControl } from '../../ui/button-group-control'
import { TextControl } from '../../ui/text-control'
import { CONTENT_FIELDS, NAME_FIELD, type ContentField } from './content-fields'
import { SettingsGroup } from './settings-group'

// the element's own content with the html each box makes, plus its name
export function ContentSettings({ element }: { element: PageElement }) {
  if (element.parentId === null) return null
  const fields = [...(CONTENT_FIELDS[element.type] ?? []), NAME_FIELD]
  const setCount = fields.filter((field) => element.props[field.key]).length

  return (
    <SettingsGroup
      title="Content"
      description="What it says or shows, and the HTML it makes."
      icon={FileText}
      startsOpen
      setCount={setCount}
    >
      {fields.map((field) => (
        <ContentBox key={field.key} element={element} field={field} />
      ))}
      {(element.type === 'tabs' || element.type === 'tab') && <AddTabButton element={element} />}
    </SettingsGroup>
  )
}

function ContentBox({ element, field }: { element: PageElement; field: ContentField }) {
  const updateProps = useEditorStore((state) => state.updateProps)
  const value = element.props[field.key] ?? ''
  const onChange = (newValue: string) => updateProps(element.id, { [field.key]: newValue })
  const info = { label: field.label, code: field.code, help: field.help }
  const codeLine = value ? field.html(value) : `<!-- no ${field.label.toLowerCase()} -->`

  if (field.kind === 'yesno') {
    const choices = [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ]
    return (
      <ButtonGroupControl
        info={info}
        value={value}
        current="no"
        choices={choices}
        codeLine={field.html(value)}
        onChange={onChange}
      />
    )
  }

  return (
    <TextControl
      info={info}
      value={value}
      placeholder={field.placeholder}
      codeLine={codeLine}
      multiline={field.kind === 'lines'}
      onChange={onChange}
    />
  )
}

// tabs only hold tabs, so a new tab comes from this button and not the Add panel
function AddTabButton({ element }: { element: PageElement }) {
  const addNewElement = useEditorStore((state) => state.addNewElement)
  const page = useEditorStore((state) => state.history.present)
  const tabs = element.type === 'tabs' ? element : page.elements[element.parentId ?? '']
  if (!tabs) return null

  return (
    <button
      type="button"
      onClick={() => addNewElement('tab', { parentId: tabs.id, position: tabs.children.length })}
      className="flex w-fit items-center gap-2 rounded-lg border border-edge px-3 py-2 font-medium hover:border-accent hover:bg-accent-soft hover:text-accent-text"
    >
      <Plus size={16} />
      Add a tab
    </button>
  )
}
