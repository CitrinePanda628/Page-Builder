import { Move } from 'lucide-react'
import { NOT_BODY, select, text, type StyleGroup } from './types'

export const PLACE: StyleGroup = {
  title: 'Place in its parent',
  icon: Move,
  description: 'How THIS element sits inside its parent. Most of these need a flex or grid parent.',
  showFor: NOT_BODY,
  presets: [
    { label: 'Push right', styles: { marginLeft: 'auto' } },
    { label: 'Push left', styles: { marginRight: 'auto' } },
    {
      label: 'Centre',
      styles: { width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' },
    },
    { label: 'Full width', styles: { width: '100%' } },
    { label: 'Grow', styles: { flexGrow: '1' } },
  ],
  settings: [
    {
      key: 'alignSelf',
      label: 'Align self',
      help: "The parent's Align, for this one child only.",
      control: select(
        { value: 'flex-start', label: 'Start' },
        { value: 'center', label: 'Centre' },
        { value: 'flex-end', label: 'End' },
        { value: 'stretch', label: 'Stretch' },
      ),
    },
    {
      key: 'flexGrow',
      label: 'Grow',
      help: '1: takes the free space in the line. 0: stays as small as its content.',
      control: select(
        { value: '0', label: "Don't grow" },
        { value: '1', label: 'Fill the space' },
        { value: '2', label: 'Double share' },
      ),
    },
    {
      key: 'flexShrink',
      label: 'Shrink',
      help: '0: never squeezed smaller than its size, even when the line is full.',
      control: select({ value: '1', label: 'May shrink' }, { value: '0', label: "Don't shrink" }),
    },
    {
      key: 'order',
      label: 'Order',
      help: 'Moves it in the line without moving it in List view. Lower comes first.\nTry: -1.',
      control: text('e.g. -1, 1', ['-1', '0', '1']),
    },
  ],
}
