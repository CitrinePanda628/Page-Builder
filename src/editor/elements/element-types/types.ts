import type { LucideIcon } from 'lucide-react'
import type { Blueprint } from '../../../core'

export interface ElementType {
  type: string
  // name on the Add panel tile
  label: string
  group: 'layout' | 'content' | 'interactive'
  icon: LucideIcon
  canHoldChildren: boolean
  // what a new one starts with: props, styles and children
  starts: Omit<Blueprint, 'type'>
  // can only sit directly inside this type (a tab only inside tabs)
  onlyInside?: string
  // only this type can sit directly inside it (only tabs inside tabs)
  onlyHolds?: string
  // not shown in the Add panel (tabs get an Add a tab button)
  hidden?: boolean
}
