import type { ReactNode } from 'react'
import { FieldLabel } from './field-label'

/** The name, the code name and the help text of one setting. */
export interface FieldInfo {
  label: string
  /** The name in code: 'justify-content', 'href'. Empty for none. */
  code: string
  help: string
}

interface FieldProps {
  info: FieldInfo
  /** True when this element has its own value for it. */
  isSet: boolean
  /** The code this setting makes, like "justify-content: center;". */
  codeLine: string
  onReset: () => void
  children: ReactNode
}

/**
 * One setting: its label with a Set / Default mark, the control, and the code under it.
 * Every control in this folder uses it.
 */
export function Field({ info, isSet, codeLine, onReset, children }: FieldProps) {
  return (
    <div className="relative">
      <FieldLabel info={info} isSet={isSet} onReset={onReset} />
      {children}
      <code
        className={`mt-1.5 block truncate rounded bg-hover px-2 py-1 font-mono text-xs ${isSet ? 'text-good' : 'text-muted italic'}`}
        title={codeLine}
      >
        {codeLine}
      </code>
    </div>
  )
}

/** The look of every text box and dropdown. */
export const INPUT_CLASS =
  'rounded-md border border-edge bg-panel px-3 py-2 placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent-soft focus:outline-none'
