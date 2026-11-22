import { useEffect, useState } from 'react'
import type { Styles } from '../../../core'
import { usePage } from '../../state/editor-store'
import { toCssName } from '../../ui/css-name'
import { STYLE_GROUPS } from './style-groups'

const SIDES = ['Top', 'Right', 'Bottom', 'Left']

// every style the panel can show, with padding and margin as their four sides
const KEYS = STYLE_GROUPS.flatMap((group) => group.settings.map((setting) => setting.key)).flatMap(
  (key) => (key === 'padding' || key === 'margin' ? SIDES.map((side) => key + side) : [key]),
)

// the editor changes these itself on the canvas (the hand pointer, the dashed empty box)
const EDITOR_ONLY = new Set(['cursor', 'minHeight'])

// what the selected element really uses right now, read from the browser
//  { justifyContent: 'normal', fontSize: '18px', color: 'rgb(28, 25, 23)', ... }
// that includes defaults and values from its parents, and it's read again after every change
export function useCurrentStyles(elementId: string): Styles {
  const page = usePage()
  const [current, setCurrent] = useState<Styles>({})

  useEffect(() => {
    // wait a frame so the page on screen already shows the latest change
    const frame = requestAnimationFrame(() => setCurrent(readStyles(elementId)))
    return () => cancelAnimationFrame(frame)
  }, [page, elementId])

  return current
}

function readStyles(elementId: string): Styles {
  const node = document.querySelector(`[data-element-id="${elementId}"]`)
  if (!node) return {}
  const computed = getComputedStyle(node)
  const values: Styles = {}
  for (const key of KEYS) {
    values[key] = EDITOR_ONLY.has(key) ? '' : computed.getPropertyValue(toCssName(key))
  }
  return values
}
