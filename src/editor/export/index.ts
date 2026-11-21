import type { Page } from '../../core'
import { getClassNames } from './class-names'
import { toPageCss } from './css'
import { toHtml } from './html'
import { toReact } from './react'

/** One file of the export: its name, and what is in it. */
export interface ExportFile {
  name: string
  language: 'HTML' | 'CSS' | 'React'
  code: string
}

/** Every file the page exports to. The CSS is shared by the HTML and the React version. */
export function exportPage(page: Page): ExportFile[] {
  return [
    { name: 'index.html', language: 'HTML', code: toHtml(page) },
    { name: 'styles.css', language: 'CSS', code: toPageCss(page, getClassNames(page)) },
    { name: 'Page.jsx', language: 'React', code: toReact(page) },
  ]
}
