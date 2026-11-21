import type { Page } from '../../core'
import { getClassNames } from './class-names'
import { indent, printHtml } from './markup'
import { toPageTree } from './page-tree'

/** The page as a complete HTML file. Its CSS is in styles.css (see css.ts). */
export function toHtml(page: Page): string {
  const { root, needsScript } = toPageTree(page, getClassNames(page), 'html')

  const lines = [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="utf-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1" />',
    '    <title>My page</title>',
    '    <link rel="stylesheet" href="styles.css" />',
    '  </head>',
    '  <body>',
    ...indent(printHtml(root), '    '),
    ...(needsScript ? indent(SCRIPT.split('\n'), '    ') : []),
    '  </body>',
    '</html>',
  ]
  return lines.join('\n') + '\n'
}

/** Makes tabs switch and popups open and close. Only added when the page has them. */
const SCRIPT = `<script>
  // Tabs: a click on a tab button shows its panel and hides the others.
  document.querySelectorAll('[data-tabs]').forEach((tabs) => {
    const buttons = tabs.querySelectorAll(':scope > [role=tablist] > button')
    const panels = tabs.querySelectorAll(':scope > [data-panel]')
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        buttons.forEach((other, i) => other.setAttribute('aria-selected', String(i === index)))
        panels.forEach((panel, i) => (panel.hidden = i !== index))
      })
    })
  })

  // Popups: the button opens the overlay after it; × or a click outside the box closes it.
  // The overlay moves to the end of <body>, so no parent can trap its position: fixed.
  document.querySelectorAll('[data-open-popup]').forEach((button) => {
    const overlay = button.nextElementSibling
    document.body.append(overlay)
    button.addEventListener('click', () => (overlay.hidden = false))
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay || event.target.closest('[data-close-popup]')) {
        overlay.hidden = true
      }
    })
  })
</script>`
