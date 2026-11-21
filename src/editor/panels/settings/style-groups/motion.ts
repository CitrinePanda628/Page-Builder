import { Wand2 } from 'lucide-react'
import { NOT_BODY, text, type StyleGroup } from './types'

export const MOTION: StyleGroup = {
  title: 'Move',
  icon: Wand2,
  description: 'Turn, grow or shift it, without moving anything around it.',
  showFor: NOT_BODY,
  presets: [],
  settings: [
    {
      key: 'transform',
      label: 'Transform',
      help: 'Turns, scales or moves it, without moving anything around it.\nTry: rotate(-3deg).',
      control: text('e.g. scale(1.05)', [
        'none',
        'scale(1.05)',
        'rotate(-3deg)',
        'translateY(-4px)',
      ]),
    },
    {
      key: 'transformOrigin',
      label: 'Turn around',
      help: 'The point it turns and grows around.',
      control: text('e.g. center', ['center', 'top left', 'bottom']),
    },
  ],
}
