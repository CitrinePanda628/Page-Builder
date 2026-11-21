import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Type } from 'lucide-react'
import { buttons, except, select, slider, text, type StyleGroup } from './types'

export const TEXT: StyleGroup = {
  title: 'Text',
  icon: Type,
  description: 'Set it on a section, and everything inside gets it too (it is inherited).',
  showFor: except('divider'),
  presets: [],
  settings: [
    {
      key: 'textAlign',
      label: 'Align',
      help: 'Where the lines sit. Also moves buttons and links, which sit in the line like words.',
      control: buttons(
        { value: 'left', label: 'Left', icon: AlignLeft },
        { value: 'center', label: 'Centre', icon: AlignCenter },
        { value: 'right', label: 'Right', icon: AlignRight },
        { value: 'justify', label: 'Justify', icon: AlignJustify },
      ),
    },
    {
      key: 'color',
      label: 'Colour',
      help: 'The text colour: #2563eb, red, or rgb(0 0 0 / 0.6) for 60% black.',
      control: { kind: 'color' },
    },
    {
      key: 'fontSize',
      label: 'Size',
      help: "16px is normal text. rem follows the reader's browser setting: 2rem = twice normal.",
      control: slider([8, 120, 1], 'px', ['small', 'large', 'x-large', '2rem', '3rem'], 16),
    },
    {
      key: 'fontWeight',
      label: 'Weight',
      help: 'How thick the letters are: 400 is normal, 700 is bold.',
      control: select(
        { value: '300', label: 'Light' },
        { value: 'normal', label: 'Normal (400)' },
        { value: '500', label: 'Medium' },
        { value: '600', label: 'Semibold' },
        { value: 'bold', label: 'Bold (700)' },
        { value: '900', label: 'Black' },
      ),
    },
    {
      key: 'fontFamily',
      label: 'Font',
      help: 'A list: the browser uses the first font it has.',
      control: select(
        { value: 'system-ui, sans-serif', label: 'Sans serif' },
        { value: 'Georgia, serif', label: 'Serif' },
        { value: '"Trebuchet MS", sans-serif', label: 'Trebuchet' },
        { value: 'ui-monospace, monospace', label: 'Monospace' },
        { value: 'cursive', label: 'Handwriting' },
      ),
    },
    {
      key: 'lineHeight',
      label: 'Line height',
      help: 'Space between lines, times the font size. 1.5 is comfortable.',
      control: slider([0.8, 3, 0.1], '', ['1', '1.5', '2'], 1.5),
    },
    {
      key: 'letterSpacing',
      label: 'Letter spacing',
      help: 'Extra space between letters.\nTry: 0.1em on a short UPPERCASE label.',
      control: slider([-2, 20, 0.5], 'px', ['normal', '0.1em', '-1px'], 0),
    },
    {
      key: 'textTransform',
      label: 'Capitals',
      help: 'Changes how letters show, not what you typed.',
      control: select(
        { value: 'none', label: 'As typed' },
        { value: 'uppercase', label: 'UPPERCASE' },
        { value: 'lowercase', label: 'lowercase' },
        { value: 'capitalize', label: 'Each Word' },
      ),
    },
    {
      key: 'fontStyle',
      label: 'Style',
      help: 'italic leans the letters, for emphasis.',
      control: buttons({ value: 'normal', label: 'Normal' }, { value: 'italic', label: 'Italic' }),
    },
    {
      key: 'textDecoration',
      label: 'Line',
      help: "A line under or through the text. none removes a link's underline.",
      control: select(
        { value: 'none', label: 'None' },
        { value: 'underline', label: 'Underline' },
        { value: 'line-through', label: 'Strike through' },
      ),
    },
    {
      key: 'textShadow',
      label: 'Text shadow',
      help: 'x, y, blur, colour. Helps light text on a photo stay readable.',
      control: text('e.g. 0 2px 8px rgb(0 0 0 / 0.5)', [
        'none',
        '0 2px 8px rgb(0 0 0 / 0.5)',
        '2px 2px 0 #f59e0b',
      ]),
    },
    {
      key: 'whiteSpace',
      label: 'Line breaks',
      help: 'nowrap keeps the text on one line, however long.',
      control: select({ value: 'normal', label: 'Wrap' }, { value: 'nowrap', label: 'One line' }),
    },
  ],
}
