import type { PageElement, Styles } from '../../../core'
import { useEditorStore } from '../../state/editor-store'
import { ButtonGroupControl } from '../../ui/button-group-control'
import { ColorControl } from '../../ui/color-control'
import { toCssLine, toCssName } from '../../ui/css-name'
import { SelectControl } from '../../ui/select-control'
import { SidesControl } from '../../ui/sides-control'
import { SliderControl } from '../../ui/slider-control'
import { TextControl } from '../../ui/text-control'
import { SettingsGroup } from './settings-group'
import type { StyleGroup, StyleSetting } from './style-groups'

interface StyleGroupViewProps {
  group: StyleGroup
  element: PageElement
  /** What the element uses now, from useCurrentStyles. */
  current: Styles
}

/** One group from style-groups/: presets, then a control per setting that fits this element. */
export function StyleGroupView({ group, element, current }: StyleGroupViewProps) {
  const updateStyles = useEditorStore((state) => state.updateStyles)
  const change = (changes: Styles) => updateStyles(element.id, changes)

  const settings = group.settings.filter((setting) => isShown(setting, element))
  if (settings.length === 0) return null
  const setCount = settings.filter((setting) => isSet(setting, element.styles)).length

  return (
    <SettingsGroup {...group} startsOpen={setCount > 0} setCount={setCount}>
      {group.presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {group.presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => change(preset.styles)}
              className="rounded-full border border-edge px-3 py-1.5 text-sm font-medium hover:border-accent hover:bg-accent-soft hover:text-accent-text"
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
      {settings.map((setting) => (
        <StyleField
          key={setting.key}
          setting={setting}
          styles={element.styles}
          current={current}
          onChange={change}
        />
      ))}
    </SettingsGroup>
  )
}

/** A setting shows when it fits the element type, and its `onlyWhen` is met. */
function isShown({ showFor, onlyWhen }: StyleSetting, element: PageElement): boolean {
  if (showFor && !showFor(element.type)) return false
  return !onlyWhen || onlyWhen.values.includes(element.styles[onlyWhen.key] ?? '')
}

/** padding counts as set when the shorthand or any one side is set. */
function isSet({ key, control }: StyleSetting, styles: Styles): boolean {
  if (control.kind !== 'sides') return Boolean(styles[key])
  return Object.keys(styles).some((name) => name.startsWith(key))
}

interface StyleFieldProps {
  setting: StyleSetting
  styles: Styles
  current: Styles
  onChange: (changes: Styles) => void
}

/** Picks the control for one setting, and gives it the value, what is used now, and the code. */
function StyleField({ setting, styles, current, onChange }: StyleFieldProps) {
  const { key, label, help, control } = setting
  const cssName = toCssName(key)
  const info = { label, code: cssName, help }
  const value = styles[key] ?? ''
  const now = current[key] ?? ''
  const codeLine = toCssLine(cssName, value, now)
  const change = (newValue: string) => onChange({ [key]: newValue })
  const common = { info, value, codeLine, onChange: change }

  switch (control.kind) {
    case 'text':
      return (
        <TextControl
          {...common}
          placeholder={now || control.placeholder}
          keywords={control.keywords}
        />
      )
    case 'select':
      return <SelectControl {...common} current={now} choices={control.choices} />
    case 'buttons':
      return <ButtonGroupControl {...common} current={now} choices={control.choices} />
    case 'slider':
      return (
        <SliderControl
          {...common}
          current={now}
          min={control.min}
          max={control.max}
          step={control.step}
          unit={control.unit}
          startAt={control.startAt}
          keywords={control.keywords}
        />
      )
    case 'color':
      return <ColorControl {...common} current={now} />
    case 'sides':
      return (
        <SidesControl info={info} box={key} styles={styles} current={current} onChange={onChange} />
      )
  }
}
