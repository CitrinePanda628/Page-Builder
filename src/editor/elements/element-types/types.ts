import type { LucideIcon } from 'lucide-react'
import type { Blueprint } from '../../../core'

export interface ElementType {
  type: string
  /** The name on the Add panel tile. */
  label: string
  group: 'layout' | 'content' | 'interactive'
  icon: LucideIcon
  canHoldChildren: boolean
  /** What a new one starts with: props, styles and children. */
  starts: Omit<Blueprint, 'type'>
  /** It may only sit directly inside this type (a tab only inside tabs). */
  onlyInside?: string
  /** Only this type may sit directly inside it (only tabs inside tabs). */
  onlyHolds?: string
  /** Not shown in the Add panel (tabs get an "Add a tab" button instead). */
  hidden?: boolean
}
