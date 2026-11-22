import type { Page } from './types'

// past is oldest first, future is what you undid, newest first
export interface History {
  past: Page[]
  present: Page
  future: Page[]
}

// starts with one version so there's nothing to undo yet
export function createHistory(page: Page): History {
  return { past: [], present: page, future: [] }
}

// adds a version after a change and forgets anything you could redo
export function addVersion(history: History, page: Page): History {
  if (page === history.present) return history
  return { past: [...history.past, history.present], present: page, future: [] }
}

export function undo(history: History): History {
  const previous = history.past.at(-1)
  if (previous === undefined) return history
  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  }
}

export function redo(history: History): History {
  const [next, ...rest] = history.future
  if (next === undefined) return history
  return { past: [...history.past, history.present], present: next, future: rest }
}
