import type { LucideIcon } from 'lucide-react'

// one choice in a dropdown or a row of buttons: value 'space-between', label 'Ends apart'
export interface Choice {
  value: string
  label: string
  // shown on a button instead of the label
  icon?: LucideIcon
}
