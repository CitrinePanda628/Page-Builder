import { Info } from 'lucide-react'
import type { FieldInfo } from './field'

interface FieldLabelProps {
  info: FieldInfo
  isSet: boolean
  onReset: () => void
}

// "Label / code-name", the (i) with help on hover, a Set or Default mark, and Reset
export function FieldLabel({ info, isSet, onReset }: FieldLabelProps) {
  const { label, code, help } = info

  return (
    <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-muted">
      <span>
        {label}
        {code && (
          <span className="ml-1 font-mono text-xs font-normal whitespace-nowrap">/ {code}</span>
        )}
      </span>
      <span className="group/help">
        <button
          type="button"
          aria-label={`What does ${label} do?`}
          className="cursor-help rounded-full hover:text-accent focus:text-accent"
        >
          <Info size={15} />
        </button>
        {/* relative to the whole control so it's as wide as the panel */}
        <span
          role="tooltip"
          className="invisible absolute inset-x-0 top-7 z-30 rounded-lg bg-ink p-3 text-sm leading-relaxed font-normal whitespace-pre-line text-panel shadow-xl group-focus-within/help:visible group-hover/help:visible"
        >
          {help}
        </span>
      </span>
      <span className="ml-auto flex items-center gap-1">
        <StatusMark isSet={isSet} />
        {isSet && (
          <button
            type="button"
            onClick={onReset}
            className="rounded px-1.5 text-xs hover:bg-danger-soft hover:text-danger"
          >
            Reset
          </button>
        )}
      </span>
    </div>
  )
}

// Set: this element has its own value. Default: it uses what the browser or its parent gives
function StatusMark({ isSet }: { isSet: boolean }) {
  return isSet ? (
    <span className="flex items-center gap-1 rounded-full bg-good-soft px-2 py-0.5 text-xs text-good">
      <span className="size-1.5 rounded-full bg-current" />
      Set
    </span>
  ) : (
    <span className="rounded-full border border-dashed border-edge px-2 py-0.5 text-xs font-normal">
      Default
    </span>
  )
}
