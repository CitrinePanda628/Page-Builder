import type { LucideIcon } from 'lucide-react'

/** One choice in a dropdown or a row of buttons: value 'space-between', label 'Ends apart'. */
export interface Choice {
  value: string
  label: string
  /** Shown on a button instead of the label. */
  icon?: LucideIcon
}
