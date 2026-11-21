import { Field, INPUT_CLASS, type FieldInfo } from './field'

interface ColorControlProps {
  info: FieldInfo
  value: string
  /** What the element uses now, like 'rgb(28, 25, 23)'. */
  current: string
  codeLine: string
  onChange: (value: string) => void
}

/** A colour picker, and a box for any colour: #ff0000, red, rgb(...). */
export function ColorControl({ info, value, current, codeLine, onChange }: ColorControlProps) {
  return (
    <Field info={info} isSet={value !== ''} codeLine={codeLine} onReset={() => onChange('')}>
      <div className="flex gap-2">
        <input
          type="color"
          aria-label={`${info.label} picker`}
          value={toHex(value || current)}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-12 shrink-0 cursor-pointer rounded-md border border-edge"
        />
        <input
          aria-label={info.label}
          value={value}
          placeholder={current || 'e.g. #2563eb, red, transparent'}
          onChange={(event) => onChange(event.target.value)}
          className={`w-full ${INPUT_CLASS}`}
        />
      </div>
    </Field>
  )
}

/**
 * The picker only understands #rrggbb:
 *   '#ea580c' → '#ea580c'      'rgb(28, 25, 23)' → '#1c1917'      'red' → '#000000' (unknown)
 */
function toHex(color: string): string {
  if (/^#[0-9a-f]{6}$/i.test(color)) return color
  const parts = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!parts) return '#000000'
  const hex = parts.slice(1, 4).map((part) => Number(part).toString(16).padStart(2, '0'))
  return `#${hex.join('')}`
}
