import { Ruler } from 'lucide-react'
import { ALL, BOXES, select, text, type StyleGroup } from './types'

export const SIZE: StyleGroup = {
  title: 'Size',
  icon: Ruler,
  description: 'Empty means: the content decides.',
  showFor: ALL,
  presets: [],
  settings: [
    {
      key: 'width',
      label: 'Width',
      help: '% is a share of the parent. fit-content: as wide as what is inside.',
      control: text('e.g. 300px, 50%', ['auto', '100%', '50%', 'fit-content']),
    },
    {
      key: 'height',
      label: 'Height',
      help: 'Usually best left empty, so it grows with the content.',
      control: text('e.g. 200px', ['auto', '100%', '100vh']),
    },
    {
      key: 'minWidth',
      label: 'Min width',
      help: 'Never narrower than this.',
      control: text('e.g. 200px', ['0', '200px', 'min-content']),
    },
    {
      key: 'minHeight',
      label: 'Min height',
      help: 'At least this tall, taller if needed.\nTry: 100vh for a section that fills the screen.',
      control: text('e.g. 400px', ['100vh', '50vh', '400px']),
    },
    {
      key: 'maxWidth',
      label: 'Max width',
      help: 'Never wider than this.\nTry: 65ch keeps text easy to read.',
      control: text('e.g. 700px', ['none', '65ch', '700px', '1100px']),
    },
    {
      key: 'maxHeight',
      label: 'Max height',
      help: 'Never taller than this. Pair it with Overflow: scroll.',
      control: text('e.g. 300px', ['none', '300px', '50vh']),
    },
    {
      key: 'aspectRatio',
      label: 'Shape',
      help: 'Width to height. 16 / 9 is widescreen, 1 is a square.',
      showFor: BOXES,
      control: text('e.g. 16 / 9', ['1', '4 / 3', '16 / 9']),
    },
    {
      key: 'overflow',
      label: 'Overflow',
      help: 'What happens to content bigger than the box.\nOnly works when the box has a fixed Height or Max height.\nTry: #overflow-demo in the playground.',
      control: select(
        { value: 'visible', label: 'Spill out' },
        { value: 'hidden', label: 'Cut off' },
        { value: 'auto', label: 'Scroll' },
      ),
    },
  ],
}
