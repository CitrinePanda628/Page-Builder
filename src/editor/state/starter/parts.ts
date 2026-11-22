import type { Blueprint, Props, Styles } from '../../../core'

// shortcuts for writing the blocks of the starting page

// greys for text and lines, and greens from very light to very dark
export const COLORS = {
  ink: '#18181b',
  muted: '#52525b',
  white: '#ffffff',
  line: '#e4e4e7',
}

export const GREENS = {
  wash: '#f0fdf4', // section backgrounds
  soft: '#dcfce7', // cards and highlights
  edge: '#bbf7d0', // borders
  bright: '#22c55e',
  leaf: '#16a34a', // dates and tech lists
  main: '#15803d', // buttons
  deep: '#166534', // small headings
  forest: '#14532d', // big headings
}

export function heading(text: string, styles: Styles = {}): Blueprint {
  return { type: 'heading', props: { text }, styles }
}

export function text(words: string, styles: Styles = {}): Blueprint {
  return { type: 'text', props: { text: words }, styles }
}

/** A paragraph with each sentence on its own line (white-space: pre-line keeps the line breaks). */
export function para(sentences: string[], styles: Styles = {}): Blueprint {
  return text(sentences.join('\n'), { whiteSpace: 'pre-line', ...styles })
}

export function link(words: string, href: string, styles: Styles = {}): Blueprint {
  return { type: 'link', props: { text: words, href }, styles }
}

export function list(items: string[], styles: Styles = {}): Blueprint {
  return { type: 'list', props: { items: items.join('\n') }, styles }
}

// any block that holds others: box('row', { gap: '8px' }, [...children])
export function box(
  type: string,
  styles: Styles,
  children: Blueprint[],
  props: Props = {},
): Blueprint {
  return { type, props, styles, children }
}

// a section with a name so links can jump to it (#projects)
export function section(name: string, styles: Styles, children: Blueprint[]): Blueprint {
  return box('section', { padding: '88px 20px', scrollMarginTop: '64px', ...styles }, children, {
    name,
  })
}

// keeps content in a centred column
export function column(children: Blueprint[], maxWidth = '1000px'): Blueprint {
  return box(
    'stack',
    { display: 'flex', flexDirection: 'column', gap: '20px', maxWidth, margin: '0 auto' },
    children,
  )
}

export function title(words: string): Blueprint {
  return heading(words, {
    fontSize: '36px',
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    color: GREENS.forest,
  })
}

// the short paragraph under a section title
export function intro(...sentences: string[]): Blueprint {
  return para(sentences, {
    color: COLORS.muted,
    fontSize: '18px',
    lineHeight: '1.6',
    maxWidth: '760px',
  })
}

// a white card with a thin grey border
export function card(children: Blueprint[], styles: Styles = {}): Blueprint {
  return box(
    'stack',
    {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '24px',
      backgroundColor: COLORS.white,
      borderRadius: '12px',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: GREENS.edge,
      ...styles,
    },
    children,
  )
}
