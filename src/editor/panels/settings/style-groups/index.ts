import { BACKGROUND } from './background'
import { BORDER } from './border'
import { EFFECTS } from './effects'
import { LAYOUT } from './layout'
import { MOTION } from './motion'
import { PLACE } from './place'
import { POSITION } from './position'
import { SIZE } from './size'
import { SPACING } from './spacing'
import { TEXT } from './text'
import type { StyleGroup } from './types'

export type { Control, StyleGroup, StyleSetting } from './types'

// every group of style settings in the settings panel order, one file each
export const STYLE_GROUPS: StyleGroup[] = [
  LAYOUT,
  PLACE,
  SPACING,
  SIZE,
  TEXT,
  BACKGROUND,
  BORDER,
  EFFECTS,
  MOTION,
  POSITION,
]
