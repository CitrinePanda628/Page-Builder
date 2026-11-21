import { Check, Copy, Download, X } from 'lucide-react'
import { useState } from 'react'
import { exportPage, type ExportFile } from '../export'
import { usePage } from '../state/editor-store'

const HOW_TO_USE: Record<ExportFile['language'], string> = {
  HTML: 'Put index.html and styles.css in one folder, then open index.html in a browser.',
  CSS: 'The look of every element. Both the HTML and the React version use this file.',
  React: 'In a React project, put Page.jsx and styles.css in src/, then render <Page />.',
}

/** A window with the page's code: HTML, CSS and React, to copy or download. */
export function ExportDialog({ onClose }: { onClose: () => void }) {
  const page = usePage()
  const files = exportPage(page)
  const [chosen, setChosen] = useState(0)
  const [copied, setCopied] = useState(false)
  const file = files[chosen] ?? files[0]
  if (!file) return null

  function copy(code: string) {
    void navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8"
    >
      <div
        role="dialog"
        aria-label="Export"
        onClick={(event) => event.stopPropagation()}
        className="flex h-full max-h-[56rem] w-full max-w-5xl flex-col rounded-2xl bg-panel text-ink shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line px-6 py-4">
          <h2 className="text-lg font-semibold">Export the code</h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="ml-auto rounded-lg p-2 hover:bg-hover"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-2 border-b border-line px-6 py-3">
          {files.map((each, index) => (
            <button
              key={each.name}
              type="button"
              aria-pressed={index === chosen}
              onClick={() => setChosen(index)}
              className={`rounded-lg px-4 py-2 font-medium ${index === chosen ? 'bg-accent text-on-accent' : 'hover:bg-hover'}`}
            >
              {each.language}
              <span className="ml-2 font-mono text-xs opacity-75">{each.name}</span>
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <ActionButton onClick={() => copy(file.code)} icon={copied ? Check : Copy}>
              {copied ? 'Copied' : 'Copy'}
            </ActionButton>
            <ActionButton onClick={() => download(file)} icon={Download}>
              Download
            </ActionButton>
          </div>
        </div>

        <p className="px-6 pt-3 text-sm text-muted">{HOW_TO_USE[file.language]}</p>
        <pre className="m-6 mt-3 flex-1 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-relaxed text-emerald-300">
          {file.code}
        </pre>
      </div>
    </div>
  )
}

interface ActionButtonProps {
  onClick: () => void
  icon: typeof Copy
  children: string
}

function ActionButton({ onClick, icon: Icon, children }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border border-edge px-3 py-2 font-medium hover:border-accent hover:bg-accent-soft hover:text-accent-text"
    >
      <Icon size={16} />
      {children}
    </button>
  )
}

/** Saves the file to the computer: a link to the text, clicked once. */
function download(file: ExportFile) {
  const url = URL.createObjectURL(new Blob([file.code], { type: 'text/plain' }))
  const link = document.createElement('a')
  link.href = url
  link.download = file.name
  link.click()
  URL.revokeObjectURL(url)
}
