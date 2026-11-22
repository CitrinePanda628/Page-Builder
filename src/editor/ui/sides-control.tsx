import type { Styles } from '../../core'
import { expandBox } from '../elements/expand-styles'
import { Field, INPUT_CLASS, type FieldInfo } from './field'

const SIDES = ['Top', 'Right', 'Bottom', 'Left']

interface SidesControlProps {
  info: FieldInfo
  // 'padding' or 'margin'
  box: string
  styles: Styles
  // what the element uses now per side: { paddingTop: '32px', ... }
  current: Styles
  onChange: (changes: Styles) => void
}

// four boxes laid out like the sides of a box, 16 becomes 16px when you leave one
export function SidesControl({ info, box, styles, current, onChange }: SidesControlProps) {
  // each side: its own value, else its part of the shorthand ('32px' → all four)
  const fromShorthand = expandBox(styles[box] ?? '')
  const sides = SIDES.map((side, index) => styles[`${box}${side}`] ?? fromShorthand[index] ?? '')
  const now = SIDES.map((side) => current[`${box}${side}`] ?? '0px')
  const isSet = sides.some((side) => side !== '')

  // padding: 8px 16px 8px 16px;  (top right bottom left)
  const shown = sides.map((side, index) => side || now[index])
  const codeLine = isSet
    ? `${box}: ${shown.join(' ')};`
    : `${box}: ${now.join(' ')};  /* default */`

  const changeSide = (side: string, value: string) => onChange({ [`${box}${side}`]: value })

  function addUnit(side: string, value: string) {
    if (/^\d+(\.\d+)?$/.test(value) && value !== '0') changeSide(side, `${value}px`)
  }

  function reset() {
    const cleared: Styles = { [box]: '' }
    for (const side of SIDES) cleared[`${box}${side}`] = ''
    onChange(cleared)
  }

  const input = (side: string) => {
    const index = SIDES.indexOf(side)
    return (
      <input
        aria-label={`${info.label} ${side.toLowerCase()}`}
        value={sides[index]}
        placeholder={now[index]}
        onChange={(event) => changeSide(side, event.target.value)}
        onBlur={(event) => addUnit(side, event.target.value)}
        className={`w-20 text-center ${INPUT_CLASS}`}
      />
    )
  }

  return (
    <Field info={info} isSet={isSet} codeLine={codeLine} onReset={reset}>
      <div className="grid grid-cols-3 place-items-center gap-1 rounded-md border border-dashed border-edge p-2">
        <span />
        {input('Top')}
        <span />
        {input('Left')}
        <span className="text-xs text-muted uppercase">{box}</span>
        {input('Right')}
        <span />
        {input('Bottom')}
        <span />
      </div>
    </Field>
  )
}
