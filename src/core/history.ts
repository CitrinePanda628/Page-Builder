import type { Page } from './types'

/** Every version of the page. past: oldest first. future: what you undid, newest first. */
export interface History {
  past: Page[]
  present: Page
  future: Page[]
}

/** Starts a history with one version, so there is nothing to undo or redo yet. */
export function createHistory(page: Page): History {
  return { past: [], present: page, future: [] }
}

/** Adds a new version after a change. Anything you could redo is forgotten. */
export function addVersion(history: History, page: Page): History {
  if (page === history.present) return history
  return { past: [...history.past, history.present], present: page, future: [] }
}

/** Goes back one version, if there is one. */
export function undo(history: History): History {
  const previous = history.past.at(-1)
  if (previous === undefined) return history
  return {
    past: history.past.slice(0, -1),
    present: previous,
    future: [history.present, ...history.future],
  }
}

/** Goes forward one version, if you undid something. */
export function redo(history: History): History {
  const [next, ...rest] = history.future
  if (next === undefined) return history
  return { past: [...history.past, history.present], present: next, future: rest }
}
