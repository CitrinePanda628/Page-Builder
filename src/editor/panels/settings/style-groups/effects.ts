import { Sparkles } from 'lucide-react'
import { ALL, BOXES, select, slider, text, type StyleGroup } from './types'

export const EFFECTS: StyleGroup = {
  title: 'Effects',
  icon: Sparkles,
  description: 'Shadows, see-through, blur and the mouse pointer.',
  showFor: ALL,
  presets: [],
  settings: [
    {
      key: 'boxShadow',
      label: 'Shadow',
      help: 'x, y, blur, colour. Makes it look raised off the page.',
      control: text('e.g. 0 4px 12px rgb(0 0 0 / 0.15)', [
        'none',
        '0 1px 3px rgb(0 0 0 / 0.12)',
        '0 4px 12px rgb(0 0 0 / 0.15)',
        '0 12px 32px rgb(0 0 0 / 0.2)',
      ]),
    },
    {
      key: 'opacity',
      label: 'Opacity',
      help: '1 is solid, 0 is invisible (but still takes its space).',
      control: slider([0, 1, 0.05], '', ['1', '0.5', '0'], 1),
    },
    {
      key: 'filter',
      label: 'Filter',
      help: 'Changes how it looks, like a photo filter.\nTry: grayscale(1).',
      control: text('e.g. blur(4px)', [
        'none',
        'grayscale(1)',
        'blur(4px)',
        'brightness(1.2)',
        'sepia(1)',
      ]),
    },
    {
      key: 'backdropFilter',
      label: 'Blur behind',
      help: 'Blurs what is BEHIND it. With a see-through background: a frosted glass header.',
      showFor: BOXES,
      control: text('e.g. blur(8px)', ['none', 'blur(8px)', 'blur(16px)']),
    },
    {
      key: 'cursor',
      label: 'Mouse pointer',
      help: 'pointer shows the hand, which says "you can click this".',
      control: select(
        { value: 'default', label: 'Arrow' },
        { value: 'pointer', label: 'Hand' },
        { value: 'text', label: 'Text' },
        { value: 'not-allowed', label: 'Not allowed' },
      ),
    },
  ],
}
