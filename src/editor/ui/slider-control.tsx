import { Field, INPUT_CLASS, type FieldInfo } from './field'
import { KeywordChips } from './keyword-chips'

interface SliderControlProps {
  info: FieldInfo
  /** '12px', or a keyword such as 'large'. */
  value: string
  /** What the element uses now, like '16px'. */
  current: string
  min: number
  max: number
  step: number
  /** Added after the number: 'px', '%', or '' for none. */
  unit: string
  startAt: number
  keywords: string[]
  codeLine: string
  onChange: (value: string) => void
}

/** A quick slider, plus a box that takes any value: '48px', '3rem', 'large'. */
export function SliderControl(props: SliderControlProps) {
  const { info, value, current, min, max, step, unit, startAt, keywords, codeLine, onChange } =
    props
  // parseFloat('12px') is 12. Not set: the slider shows what is used now.
  const number = parseFloat(value || current)
  const position = Number.isNaN(number) ? startAt : number

  return (
    <Field info={info} isSet={value !== ''} codeLine={codeLine} onReset={() => onChange('')}>
      <div className="flex items-center gap-3">
        <input
          type="range"
          aria-label={`${info.label} slider`}
          min={min}
          max={max}
          step={step}
          value={position}
          onChange={(event) => onChange(`${event.target.value}${unit}`)}
          className={`w-full ${value ? 'accent-accent' : 'opacity-50'}`}
        />
        <input
          aria-label={info.label}
          value={value}
          placeholder={current || `${startAt}${unit}`}
          onChange={(event) => onChange(event.target.value)}
          className={`w-24 shrink-0 text-right ${INPUT_CLASS}`}
        />
      </div>
      <KeywordChips keywords={keywords} value={value} onPick={onChange} />
    </Field>
  )
}
