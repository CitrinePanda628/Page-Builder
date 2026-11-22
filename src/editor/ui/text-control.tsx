import { Field, INPUT_CLASS, type FieldInfo } from './field'
import { KeywordChips } from './keyword-chips'

interface TextControlProps {
  info: FieldInfo
  value: string
  // grey text while the box is empty: what's used now, or an example
  placeholder: string
  codeLine: string
  keywords?: string[]
  // a bigger box where Enter starts a new line
  multiline?: boolean
  onChange: (value: string) => void
}

export function TextControl(props: TextControlProps) {
  const { info, value, placeholder, codeLine, keywords = [], multiline = false, onChange } = props
  const box = { 'aria-label': info.label, value, placeholder, className: `w-full ${INPUT_CLASS}` }

  return (
    <Field info={info} isSet={value !== ''} codeLine={codeLine} onReset={() => onChange('')}>
      {multiline ? (
        <textarea {...box} rows={4} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input {...box} onChange={(event) => onChange(event.target.value)} />
      )}
      <KeywordChips keywords={keywords} value={value} onPick={onChange} />
    </Field>
  )
}
