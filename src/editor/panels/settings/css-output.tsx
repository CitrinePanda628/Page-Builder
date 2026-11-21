import { Check, Code, Copy } from 'lucide-react'
import { useState } from 'react'
import type { PageElement } from '../../../core'
import { SettingsGroup } from './settings-group'
import { toCss } from './to-css'

/** The element's styles as you would write them in a .css file. */
export function CssOutput({ element }: { element: PageElement }) {
  const [copied, setCopied] = useState(false)
  const css = toCss(element)

  function copy() {
    void navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <SettingsGroup
      title="CSS code"
      description="Every setting above is a line of CSS. Change one and watch this change."
      icon={Code}
      startsOpen
    >
      <div className="relative">
        <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-relaxed text-emerald-300 ring-1 ring-white/10">
          {css}
        </pre>
        <button
          type="button"
          onClick={copy}
          className="absolute top-2 right-2 flex items-center gap-1 rounded bg-zinc-700 px-2 py-1 text-xs text-white hover:bg-zinc-600"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </SettingsGroup>
  )
}
