import type { Choice } from './choice'
import { withCode } from './css-name'
import { Field, INPUT_CLASS, type FieldInfo } from './field'

interface SelectControlProps {
  info: FieldInfo
  value: string
  /** What the element uses now, shown on the "Default" choice. */
  current: string
  choices: Choice[]
  codeLine: string
  onChange: (value: string) => void
}

/** A dropdown. Each choice shows its name and its CSS value: "Start / flex-start". */
export function SelectControl(props: SelectControlProps) {
  const { info, value, current, choices, codeLine, onChange } = props

  return (
    <Field info={info} isSet={value !== ''} codeLine={codeLine} onReset={() => onChange('')}>
      <select
        aria-label={info.label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full ${INPUT_CLASS}`}
      >
        <option value="">{current ? `Default (now: ${current})` : 'Default (not set)'}</option>
        {choices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {withCode(choice.label, choice.value)}
          </option>
        ))}
      </select>
    </Field>
  )
}
