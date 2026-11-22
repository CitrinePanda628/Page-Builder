import type { LucideIcon } from 'lucide-react'
import type { Styles } from '../../../../core'
import type { Choice } from '../../../ui/choice'

// how a style is edited, keywords are ready-made values shown as small buttons
export type Control =
  | { kind: 'text'; placeholder: string; keywords: string[] }
  | { kind: 'select'; choices: Choice[] }
  | { kind: 'buttons'; choices: Choice[] }
  | {
      kind: 'slider'
      min: number
      max: number
      step: number
      unit: string
      keywords: string[]
      // where the slider sits while the style is empty
      startAt: number
    }
  | { kind: 'color' }
  | { kind: 'sides' }

export interface StyleSetting {
  // the css property the react way: 'justifyContent' for justify-content
  key: string
  label: string
  // shown on the (i): what it does and something to try
  help: string
  control: Control
  // only shown while another style has one of these values
  onlyWhen?: { key: string; values: string[] }
  // only for these element types (see only and except below), empty means all
  showFor?: TypeRule
}

// a button that sets several styles at once
export interface Preset {
  label: string
  styles: Styles
}

export interface StyleGroup {
  title: string
  icon: LucideIcon
  description: string
  // which element types see this group
  showFor: TypeRule
  presets: Preset[]
  settings: StyleSetting[]
}

// says which element types a group or setting fits
export type TypeRule = (type: string) => boolean

export const ALL: TypeRule = () => true
export const NOT_BODY: TypeRule = (type) => type !== 'body'

// only('row', 'stack'): just these types
export function only(...types: string[]): TypeRule {
  return (type) => types.includes(type)
}

// except('divider'): every type but these
export function except(...types: string[]): TypeRule {
  return (type) => !types.includes(type)
}

// elements that hold others and arrange them (not tabs or accordions, they arrange their own)
export const BOXES = only(
  'body',
  'section',
  'columns',
  'box',
  'row',
  'stack',
  'grid',
  'tab',
  'popup',
)

// shortcuts for writing the controls

export function text(placeholder: string, keywords: string[] = []): Control {
  return { kind: 'text', placeholder, keywords }
}

export function select(...choices: Choice[]): Control {
  return { kind: 'select', choices }
}

export function buttons(...choices: Choice[]): Control {
  return { kind: 'buttons', choices }
}

export function slider(
  [min, max, step]: [number, number, number],
  unit: string,
  keywords: string[] = [],
  startAt = min,
): Control {
  return { kind: 'slider', min, max, step, unit, keywords, startAt }
}
