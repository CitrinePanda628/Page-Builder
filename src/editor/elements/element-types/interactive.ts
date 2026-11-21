import { ChevronsDownUp, FolderOpen, PanelTop, SquareStack } from 'lucide-react'
import type { ElementType } from './types'

export const INTERACTIVE_TYPES: ElementType[] = [
  {
    type: 'accordion',
    label: 'Accordion',
    group: 'interactive',
    icon: ChevronsDownUp,
    canHoldChildren: true,
    starts: {
      props: { title: 'A question people ask?', open: 'no' },
      styles: {
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: '#e4e4e7',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
      children: [{ type: 'text', props: { text: 'The answer, shown when you open it.' } }],
    },
  },
  {
    type: 'tabs',
    label: 'Tabs',
    group: 'interactive',
    icon: FolderOpen,
    canHoldChildren: true,
    onlyHolds: 'tab',
    starts: {
      children: [
        {
          type: 'tab',
          props: { label: 'First' },
          children: [{ type: 'text', props: { text: 'What the first tab shows.' } }],
        },
        {
          type: 'tab',
          props: { label: 'Second' },
          children: [{ type: 'text', props: { text: 'What the second tab shows.' } }],
        },
      ],
    },
  },
  {
    type: 'tab',
    label: 'Tab',
    group: 'interactive',
    icon: PanelTop,
    canHoldChildren: true,
    onlyInside: 'tabs',
    hidden: true,
    starts: {
      props: { label: 'New tab' },
      children: [{ type: 'text', props: { text: 'What this tab shows.' } }],
    },
  },
  {
    type: 'popup',
    label: 'Popup',
    group: 'interactive',
    icon: SquareStack,
    canHoldChildren: true,
    starts: {
      props: { buttonText: 'Open popup' },
      styles: {
        width: '100%',
        maxWidth: '480px',
        padding: '32px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
      },
      children: [
        { type: 'heading', props: { text: 'Hello!' }, styles: { fontSize: '28px' } },
        {
          type: 'text',
          props: { text: 'A box on top of the page. Close it with × or a click outside.' },
        },
      ],
    },
  },
]
