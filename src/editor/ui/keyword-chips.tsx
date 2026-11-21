interface KeywordChipsProps {
  keywords: string[]
  /** The current value: its chip is highlighted. */
  value: string
  onPick: (keyword: string) => void
}

/** Small buttons with ready-made values, like 'auto' or 'x-large'. */
export function KeywordChips({ keywords, value, onPick }: KeywordChipsProps) {
  if (keywords.length === 0) return null

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {keywords.map((keyword) => (
        <button
          key={keyword}
          type="button"
          onClick={() => onPick(keyword)}
          className={`rounded-md px-2 py-0.5 font-mono text-xs ${keyword === value ? 'bg-accent text-on-accent' : 'bg-hover hover:bg-accent-soft hover:text-accent-text'}`}
        >
          {keyword}
        </button>
      ))}
    </div>
  )
}
