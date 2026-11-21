import type { Page } from '../../core'
import { getClassNames } from './class-names'
import { indent, printJsx } from './markup'
import { toPageTree } from './page-tree'

/** The page as one React component, Page.jsx. Its CSS is in styles.css (see css.ts). */
export function toReact(page: Page): string {
  const { root, state, needsPortal } = toPageTree(page, getClassNames(page), 'react')

  const lines = [
    ...(state.length > 0 ? ["import { useState } from 'react'"] : []),
    ...(needsPortal ? ["import { createPortal } from 'react-dom'"] : []),
    "import './styles.css'",
    '',
    'export default function Page() {',
    ...indent(state),
    ...(state.length > 0 ? [''] : []),
    '  return (',
    ...indent(printJsx(root), '    '),
    '  )',
    '}',
  ]
  return lines.join('\n') + '\n'
}
