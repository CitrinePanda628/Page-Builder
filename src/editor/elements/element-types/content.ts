import { Heading, LinkIcon, List, Mail, Minus, MousePointerClick, Quote, Type } from 'lucide-react'
import type { ElementType } from './types'

export const CONTENT_TYPES: ElementType[] = [
  {
    type: 'heading',
    label: 'Heading',
    group: 'content',
    icon: Heading,
    canHoldChildren: false,
    starts: { props: { text: 'New heading' }, styles: { fontSize: '32px' } },
  },
  {
    type: 'text',
    label: 'Text',
    group: 'content',
    icon: Type,
    canHoldChildren: false,
    starts: { props: { text: 'New text' } },
  },
  {
    type: 'button',
    label: 'Button',
    group: 'content',
    icon: MousePointerClick,
    canHoldChildren: false,
    starts: { props: { text: 'Click me' } },
  },
  {
    type: 'link',
    label: 'Link',
    group: 'content',
    icon: LinkIcon,
    canHoldChildren: false,
    starts: {
      props: { text: 'A link', href: 'https://example.com' },
      styles: { color: '#2563eb' },
    },
  },
  {
    type: 'list',
    label: 'List',
    group: 'content',
    icon: List,
    canHoldChildren: false,
    starts: { props: { items: 'First thing\nSecond thing\nThird thing' } },
  },
  {
    type: 'quote',
    label: 'Quote',
    group: 'content',
    icon: Quote,
    canHoldChildren: false,
    starts: { props: { text: 'A short quote.', author: 'Someone' } },
  },
  {
    type: 'divider',
    label: 'Divider',
    group: 'content',
    icon: Minus,
    canHoldChildren: false,
    starts: { styles: { borderColor: '#d4d4d8', marginTop: '24px', marginBottom: '24px' } },
  },
  {
    type: 'form',
    label: 'Contact form',
    group: 'content',
    icon: Mail,
    canHoldChildren: false,
    starts: { props: { buttonText: 'Send' } },
  },
]
