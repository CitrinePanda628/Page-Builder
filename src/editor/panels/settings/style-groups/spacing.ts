import { Scan } from 'lucide-react'
import { ALL, type StyleGroup } from './types'

export const SPACING: StyleGroup = {
  title: 'Spacing',
  icon: Scan,
  description: 'Padding: space INSIDE the edge. Margin: space OUTSIDE it.',
  showFor: ALL,
  presets: [],
  settings: [
    {
      key: 'padding',
      label: 'Padding',
      help: 'Space between the edge and the content. The background fills it.\nA number means px: 16 = 16px.',
      control: { kind: 'sides' },
    },
    {
      key: 'margin',
      label: 'Margin',
      help: 'Space outside the edge, pushing others away.\nTry: auto on the left pushes it right.',
      control: { kind: 'sides' },
    },
  ],
}
