import type { ReactNode } from 'react'

interface IconButtonProps {
  // read out by screen readers and shown on hover
  label: string
  onClick: () => void
  disabled?: boolean
  // highlighted when its panel is open
  pressed?: boolean
  children: ReactNode
}

export function IconButton({ label, onClick, disabled, pressed, children }: IconButtonProps) {
  const look = pressed ? 'bg-ink text-panel' : 'hover:bg-hover hover:text-accent'

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      disabled={disabled}
      className={`flex size-9 items-center justify-center rounded ${look} disabled:pointer-events-none disabled:opacity-30`}
    >
      {children}
    </button>
  )
}

interface TextButtonProps {
  onClick: () => void
  // primary is filled blue, secondary is outlined
  look: 'primary' | 'secondary'
  children: ReactNode
}

const LOOKS = {
  primary: 'bg-accent text-on-accent hover:opacity-90',
  secondary: 'border border-accent text-accent hover:bg-accent-soft',
}

export function TextButton({ onClick, look, children }: TextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 items-center gap-2 rounded px-3 text-sm font-medium ${LOOKS[look]}`}
    >
      {children}
    </button>
  )
}

export function Logo() {
  return (
    <div
      title="Page Builder by Fayz Muhammad"
      className="flex size-15 shrink-0 items-center justify-center bg-ink text-lg font-black tracking-tight text-panel"
    >
      FM
    </div>
  )
}
