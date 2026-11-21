import { PaintBucket } from 'lucide-react'
import { except, text, type StyleGroup } from './types'

export const BACKGROUND: StyleGroup = {
  title: 'Background',
  icon: PaintBucket,
  description: 'What is behind the content: a colour or a gradient.',
  showFor: except('divider'),
  presets: [],
  settings: [
    {
      key: 'backgroundColor',
      label: 'Colour',
      help: 'Fills the element and its padding. transparent lets the parent show through.',
      control: { kind: 'color' },
    },
    {
      key: 'backgroundImage',
      label: 'Gradient',
      help: 'A blend of colours behind the content, on top of the background colour.',
      control: text('e.g. linear-gradient(to right, #6366f1, #ec4899)', [
        'none',
        'linear-gradient(to right, #6366f1, #ec4899)',
        'linear-gradient(to bottom, #fef3c7, #ffffff)',
        'radial-gradient(circle, #fde68a, #f97316)',
      ]),
    },
  ],
}
