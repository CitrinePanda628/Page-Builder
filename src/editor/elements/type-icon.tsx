import { createElement } from 'react'
import { getIcon } from './element-types'

/** The icon of a block type, as used in the inserter, list view and toolbars. */
export function TypeIcon({ type, size = 16 }: { type: string; size?: number }) {
  return createElement(getIcon(type), { size, className: 'shrink-0' })
}
