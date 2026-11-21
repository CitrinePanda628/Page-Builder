/**
 * Words wrapped in **double stars** are highlighted: shown in bold, in the page's
 * highlight colour (the --highlight setting on the page, or the text's own colour).
 *
 *   splitHighlights('I use **React** daily')  ->  ['I use ', { bold: 'React' }, ' daily']
 */
export type Piece = string | { bold: string }

export function splitHighlights(text: string): Piece[] {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, index): Piece => (index % 2 === 1 ? { bold: part } : part))
    .filter((piece) => piece !== '')
}

/** The CSS for a highlighted word, in the editor (as a Tailwind class) and in the export. */
export const HIGHLIGHT_CLASS = 'font-bold [color:var(--highlight,inherit)]'
export const HIGHLIGHT_CSS = 'strong { font-weight: 700; color: var(--highlight, inherit); }'
