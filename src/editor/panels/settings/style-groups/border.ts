import { SquareRoundCorner } from 'lucide-react'
import { ALL, select, slider, type StyleGroup } from './types'

export const BORDER: StyleGroup = {
  title: 'Border and corners',
  icon: SquareRoundCorner,
  description: 'A border only shows when it has a style. Set that first.',
  showFor: ALL,
  presets: [
    {
      label: 'Thin line',
      styles: { borderStyle: 'solid', borderWidth: '1px', borderColor: '#e4e4e7' },
    },
    { label: 'Card', styles: { borderRadius: '16px', boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)' } },
    { label: 'Pill', styles: { borderRadius: '9999px' } },
  ],
  settings: [
    {
      key: 'borderStyle',
      label: 'Style',
      help: 'The kind of line. In CSS often written all at once: border: 2px solid black.',
      control: select(
        { value: 'none', label: 'None' },
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'dotted', label: 'Dotted' },
        { value: 'double', label: 'Double' },
      ),
    },
    {
      key: 'borderWidth',
      label: 'Width',
      help: 'How thick the line is.',
      control: slider([0, 20, 1], 'px', ['thin', 'medium', 'thick']),
    },
    {
      key: 'borderColor',
      label: 'Colour',
      help: 'The line colour. Empty: the text colour.',
      control: { kind: 'color' },
    },
    {
      key: 'borderRadius',
      label: 'Round corners',
      help: '8px: soft. 9999px: a pill. 50%: a circle on a square.',
      control: slider([0, 100, 1], 'px', ['0', '8px', '16px', '9999px', '50%']),
    },
  ],
}
