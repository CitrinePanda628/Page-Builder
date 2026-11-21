import type { LucideIcon } from 'lucide-react'
import type { Styles } from '../../../../core'
import type { Choice } from '../../../ui/choice'

/** How a style is edited. `keywords` are ready-made values shown as small buttons. */
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
      /** Where the slider sits while the style is empty. */
      startAt: number
    }
  | { kind: 'color' }
  | { kind: 'sides' }

export interface StyleSetting {
  /** The CSS property, the React way: 'justifyContent' for justify-content. */
  key: string
  label: string
  /** Shown on the (i): what it does, and something to try. */
  help: string
  control: Control
  /** Only shown while another style has one of these values. */
  onlyWhen?: { key: string; values: string[] }
  /** Only shown for these element types (see `only` and `except` below). Empty: all. */
  showFor?: TypeRule
}

/** A button that sets several styles at once. */
export interface Preset {
  label: string
  styles: Styles
}

export interface StyleGroup {
  title: string
  icon: LucideIcon
  description: string
  /** Which element types see this group. */
  showFor: TypeRule
  presets: Preset[]
  settings: StyleSetting[]
}

/** Says for which element types a group or setting makes sense: (type) => true or false. */
export type TypeRule = (type: string) => boolean

export const ALL: TypeRule = () => true
export const NOT_BODY: TypeRule = (type) => type !== 'body'

/** only('row', 'stack'): just these types. */
export function only(...types: string[]): TypeRule {
  return (type) => types.includes(type)
}

/** except('divider'): every type but these. */
export function except(...types: string[]): TypeRule {
  return (type) => !types.includes(type)
}

/** Elements that hold others and arrange them (not tabs or accordions, which arrange their own). */
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

// Short ways to write the controls.

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
