import type { Choice } from './choice'
import { withCode } from './css-name'
import { Field, type FieldInfo } from './field'

interface ButtonGroupControlProps {
  info: FieldInfo
  value: string
  // what the element uses now, its button gets a dashed ring while nothing is set
  current: string
  choices: Choice[]
  codeLine: string
  onChange: (value: string) => void
}

// a row of buttons, the set one is filled, click it again to unset it
export function ButtonGroupControl(props: ButtonGroupControlProps) {
  const { info, value, current, choices, codeLine, onChange } = props

  return (
    <Field info={info} isSet={value !== ''} codeLine={codeLine} onReset={() => onChange('')}>
      <div className="flex gap-1 rounded-md border border-edge p-1">
        {choices.map((choice) => (
          <ChoiceButton
            key={choice.value}
            choice={choice}
            look={
              choice.value === value
                ? 'set'
                : !value && choice.value === current
                  ? 'current'
                  : 'off'
            }
            onClick={() => onChange(choice.value === value ? '' : choice.value)}
          />
        ))}
      </div>
    </Field>
  )
}

const LOOKS = {
  set: 'bg-accent font-medium text-on-accent',
  current: 'outline-1 outline-accent outline-dashed text-accent-text',
  off: 'hover:bg-hover',
}

interface ChoiceButtonProps {
  choice: Choice
  look: keyof typeof LOOKS
  onClick: () => void
}

function ChoiceButton({ choice, look, onClick }: ChoiceButtonProps) {
  const Icon = choice.icon

  return (
    <button
      type="button"
      title={withCode(choice.label, choice.value)}
      aria-label={choice.label}
      aria-pressed={look === 'set'}
      onClick={onClick}
      className={`flex flex-1 justify-center rounded py-2 text-sm ${LOOKS[look]}`}
    >
      {Icon ? <Icon size={18} /> : choice.label}
    </button>
  )
}
