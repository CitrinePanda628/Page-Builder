import { HIGHLIGHT_CLASS, splitHighlights } from './highlights'

// text with its **highlighted** words drawn as <strong>
export function Highlighted({ text }: { text: string }) {
  return splitHighlights(text).map((piece, index) =>
    typeof piece === 'string' ? (
      piece
    ) : (
      <strong key={index} className={HIGHLIGHT_CLASS}>
        {piece.bold}
      </strong>
    ),
  )
}
