import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, LayoutGrid } from 'lucide-react'
import { BOXES, buttons, select, slider, text, type StyleGroup } from './types'

const FLEX = { key: 'display', values: ['flex'] }
const FLEX_OR_GRID = { key: 'display', values: ['flex', 'grid'] }
const GRID = { key: 'display', values: ['grid'] }

export const LAYOUT: StyleGroup = {
  title: 'Layout of the children',
  icon: LayoutGrid,
  description: 'How the elements INSIDE this one are arranged. Start with a preset.',
  showFor: BOXES,
  presets: [
    { label: 'Stack', styles: { display: 'flex', flexDirection: 'column', gap: '16px' } },
    {
      label: 'Row',
      styles: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' },
    },
    {
      label: 'Centre',
      styles: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    {
      label: 'Ends apart',
      styles: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
    {
      label: 'Grid of 3',
      styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    },
    {
      label: 'Reset',
      styles: {
        display: '',
        flexDirection: '',
        flexWrap: '',
        justifyContent: '',
        alignItems: '',
        gridTemplateColumns: '',
        gap: '',
      },
    },
  ],
  settings: [
    {
      key: 'display',
      label: 'Arrange as',
      help: 'block: one under the other. flex: in one line. grid: rows and columns. none: hidden.\nTry: flex, then change Direction.',
      control: select(
        { value: 'block', label: 'Under each other' },
        { value: 'flex', label: 'In a line' },
        { value: 'grid', label: 'In a grid' },
        { value: 'inline-block', label: 'Inline box' },
        { value: 'none', label: 'Hidden' },
      ),
    },
    {
      key: 'flexDirection',
      label: 'Direction',
      help: 'Which way the line runs: a row (left to right) or a column (top to bottom).',
      onlyWhen: FLEX,
      control: buttons(
        { value: 'row', label: 'Row', icon: ArrowRight },
        { value: 'column', label: 'Column', icon: ArrowDown },
        { value: 'row-reverse', label: 'Row, reversed', icon: ArrowLeft },
        { value: 'column-reverse', label: 'Column, reversed', icon: ArrowUp },
      ),
    },
    {
      key: 'justifyContent',
      label: 'Justify',
      help: 'Spreads the children ALONG the line.\nTry: Ends apart, for a logo left and a menu right.',
      onlyWhen: FLEX_OR_GRID,
      control: select(
        { value: 'flex-start', label: 'Start' },
        { value: 'center', label: 'Centre' },
        { value: 'flex-end', label: 'End' },
        { value: 'space-between', label: 'Ends apart' },
        { value: 'space-around', label: 'Space around' },
        { value: 'space-evenly', label: 'Even spaces' },
      ),
    },
    {
      key: 'alignItems',
      label: 'Align',
      help: 'Places the children ACROSS the line: in a row, that is up and down.\nTry: Centre in a row.',
      onlyWhen: FLEX_OR_GRID,
      control: select(
        { value: 'stretch', label: 'Stretch' },
        { value: 'flex-start', label: 'Start' },
        { value: 'center', label: 'Centre' },
        { value: 'flex-end', label: 'End' },
        { value: 'baseline', label: 'Text baseline' },
      ),
    },
    {
      key: 'flexWrap',
      label: 'Wrap',
      help: 'When the children do not fit: squeeze on one line, or wrap to a new one.',
      onlyWhen: FLEX,
      control: select({ value: 'nowrap', label: 'One line' }, { value: 'wrap', label: 'Wrap' }),
    },
    {
      key: 'gridTemplateColumns',
      label: 'Columns',
      help: 'The grid\'s columns. 1fr = one share of the space: "2fr 1fr" makes the first twice as wide.',
      onlyWhen: GRID,
      control: text('e.g. 1fr 1fr', [
        '1fr 1fr',
        'repeat(3, 1fr)',
        'repeat(4, 1fr)',
        '2fr 1fr',
        '200px 1fr',
        'repeat(auto-fit, minmax(200px, 1fr))',
      ]),
    },
    {
      key: 'gap',
      label: 'Gap',
      help: 'Space BETWEEN the children, never at the edges.',
      onlyWhen: FLEX_OR_GRID,
      control: slider([0, 80, 1], 'px', ['0', '8px', '16px', '2rem']),
    },
  ],
}
