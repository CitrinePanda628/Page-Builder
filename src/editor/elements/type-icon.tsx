import { createElement } from 'react'
import { getIcon } from './element-types'

export function TypeIcon({ type, size = 16 }: { type: string; size?: number }) {
  return createElement(getIcon(type), { size, className: 'shrink-0' })
}
