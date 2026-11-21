import { Crosshair } from 'lucide-react'
import { BOXES, NOT_BODY, select, text, type StyleGroup } from './types'

const PLACED = { key: 'position', values: ['relative', 'absolute', 'fixed', 'sticky'] }

export const POSITION: StyleGroup = {
  title: 'Position and scrolling',
  icon: Crosshair,
  description:
    'Lift it out of the normal flow: nudge it, pin it, or make it stick while scrolling.',
  showFor: NOT_BODY,
  presets: [
    { label: 'Sticky at top', styles: { position: 'sticky', top: '0', zIndex: '10' } },
    {
      label: 'Pin bottom right',
      styles: { position: 'fixed', right: '24px', bottom: '24px', zIndex: '20' },
    },
    { label: 'Badge in corner', styles: { position: 'absolute', top: '-10px', right: '-10px' } },
    {
      label: 'Reset',
      styles: { position: '', top: '', right: '', bottom: '', left: '', zIndex: '' },
    },
  ],
  settings: [
    {
      key: 'position',
      label: 'Position',
      help: 'relative: nudge it.\nabsolute: place it inside the nearest positioned parent.\nfixed: stays put while the page scrolls.\nsticky: scrolls, then sticks at Top.',
      control: select(
        { value: 'static', label: 'Normal' },
        { value: 'relative', label: 'Nudge' },
        { value: 'absolute', label: 'Place in parent' },
        { value: 'fixed', label: 'Pin to the screen' },
        { value: 'sticky', label: 'Stick when scrolling' },
      ),
    },
    {
      key: 'top',
      label: 'Top',
      help: 'Distance from the top. For sticky: where it sticks (0 = at the very top).',
      onlyWhen: PLACED,
      control: text('e.g. 0, 20px', ['0', 'auto', '20px']),
    },
    {
      key: 'right',
      label: 'Right',
      help: 'Distance from the right.',
      onlyWhen: PLACED,
      control: text('e.g. 0, 20px', ['0', 'auto', '20px']),
    },
    {
      key: 'bottom',
      label: 'Bottom',
      help: 'Distance from the bottom.',
      onlyWhen: PLACED,
      control: text('e.g. 0, 20px', ['0', 'auto', '20px']),
    },
    {
      key: 'left',
      label: 'Left',
      help: 'Distance from the left.',
      onlyWhen: PLACED,
      control: text('e.g. 0, 20px', ['0', 'auto', '20px']),
    },
    {
      key: 'zIndex',
      label: 'On top',
      help: 'When positioned blocks overlap, the higher number is drawn on top.\nOnly works when Position is not Normal.',
      onlyWhen: PLACED,
      control: text('e.g. 10', ['auto', '1', '10', '100']),
    },
    {
      key: 'scrollMarginTop',
      label: 'Gap when jumped to',
      help: 'Space kept above it when a #link scrolls to it, so a sticky header does not cover it.',
      showFor: BOXES,
      control: text('e.g. 80px', ['0', '80px', '120px']),
    },
  ],
}
