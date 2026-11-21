import { ChevronDown, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface SettingsGroupProps {
  title: string
  description: string
  icon: LucideIcon
  startsOpen: boolean
  /** How many settings in it have a value. Left out: no count. */
  setCount?: number
  children: ReactNode
}

/** A panel of settings that opens and closes when you click its title. */
export function SettingsGroup(props: SettingsGroupProps) {
  const { title, description, icon: Icon, startsOpen, setCount, children } = props

  return (
    <details open={startsOpen} className="group border-b border-line">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-semibold hover:text-accent">
        <Icon size={18} className="shrink-0" />
        {title}
        {setCount !== undefined && <SetCount count={setCount} />}
        <ChevronDown
          size={18}
          className="ml-auto text-muted transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="flex flex-col gap-5 px-4 pt-1 pb-5">
        <p className="text-sm text-muted">{description}</p>
        {children}
      </div>
    </details>
  )
}

function SetCount({ count }: { count: number }) {
  return count > 0 ? (
    <span className="rounded-full bg-good-soft px-2 py-0.5 text-xs font-medium text-good">
      {count} set
    </span>
  ) : (
    <span className="rounded-full border border-dashed border-edge px-2 py-0.5 text-xs font-normal text-muted">
      all default
    </span>
  )
}
