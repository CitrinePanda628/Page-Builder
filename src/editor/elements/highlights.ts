// words in **double stars** are shown bold in the page's highlight colour
// splitHighlights('I use **React** daily')  ->  ['I use ', { bold: 'React' }, ' daily']
export type Piece = string | { bold: string }

export function splitHighlights(text: string): Piece[] {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, index): Piece => (index % 2 === 1 ? { bold: part } : part))
    .filter((piece) => piece !== '')
}

// the css for a highlighted word, as a Tailwind class
export const HIGHLIGHT_CLASS = 'font-bold [color:var(--highlight,inherit)]'
export const HIGHLIGHT_CSS = 'strong { font-weight: 700; color: var(--highlight, inherit); }'
