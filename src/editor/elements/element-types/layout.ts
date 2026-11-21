import { Box, Columns2, Columns3, Rows3, Square, StretchHorizontal } from 'lucide-react'
import type { ElementType } from './types'

export const LAYOUT_TYPES: ElementType[] = [
  {
    type: 'section',
    label: 'Section',
    group: 'layout',
    icon: Square,
    canHoldChildren: true,
    starts: { styles: { padding: '32px' } },
  },
  {
    type: 'columns',
    label: '2 Columns',
    group: 'layout',
    icon: Columns2,
    canHoldChildren: true,
    starts: {
      styles: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
      children: [{ type: 'section' }, { type: 'section' }],
    },
  },
  {
    type: 'box',
    label: 'Box',
    group: 'layout',
    icon: Box,
    canHoldChildren: true,
    starts: {},
  },
  {
    type: 'row',
    label: 'Row',
    group: 'layout',
    icon: StretchHorizontal,
    canHoldChildren: true,
    starts: {
      styles: { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' },
    },
  },
  {
    type: 'stack',
    label: 'Stack',
    group: 'layout',
    icon: Rows3,
    canHoldChildren: true,
    starts: { styles: { display: 'flex', flexDirection: 'column', gap: '16px' } },
  },
  {
    type: 'grid',
    label: 'Grid',
    group: 'layout',
    icon: Columns3,
    canHoldChildren: true,
    starts: {
      styles: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
    },
  },
]
