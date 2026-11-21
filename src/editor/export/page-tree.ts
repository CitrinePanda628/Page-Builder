import { getElement, type Page, type PageElement } from '../../core'
import { splitHighlights } from '../elements/highlights'
import { BASE_CSS } from './base-css'
import { tag, type Child, type Tag } from './markup'

export type Target = 'html' | 'react'

export interface PageTree {
  root: Tag
  state: string[]
  needsScript: boolean
  needsPortal: boolean
}

// Same job as element-tag.tsx, minus the editor bits. Only tabs and popups differ per target.
export function toPageTree(
  page: Page,
  classNames: Record<string, string>,
  target: Target,
): PageTree {
  const result: PageTree = {
    root: tag('div', {}),
    state: [],
    needsScript: false,
    needsPortal: false,
  }
  let tabsCount = 0
  let popupCount = 0

  /** class="pb-button button-1": the base look (if the type has one), then its own class. */
  function attrs(element: PageElement) {
    const base = BASE_CSS[element.type] ? `pb-${element.type} ` : ''
    return { class: base + classNames[element.id], id: element.props.name || undefined }
  }

  /** **Highlighted** words become <strong>. */
  function highlighted(text: string): Child[] {
    return splitHighlights(text).map((piece) =>
      typeof piece === 'string' ? piece : tag('strong', {}, [piece.bold]),
    )
  }

  function children(element: PageElement): Child[] {
    return element.children.flatMap((id) => toTags(getElement(page, id)))
  }

  function toTags(element: PageElement): Child[] {
    const { props } = element
    const text = props.text ?? ''

    switch (element.type) {
      case 'heading':
        return [tag('h1', attrs(element), [text])]
      case 'text':
        return [tag('p', attrs(element), highlighted(text))]
      case 'button':
        return [tag('button', { ...attrs(element), type: 'button' }, [text])]
      case 'link':
        return [tag('a', { ...attrs(element), href: props.href }, [text])]
      case 'list':
        return [
          tag(
            'ul',
            attrs(element),
            (props.items ?? '').split('\n').map((item) => tag('li', {}, highlighted(item))),
          ),
        ]
      case 'quote':
        return [
          tag('blockquote', attrs(element), [
            tag('p', {}, [text]),
            ...(props.author ? [tag('footer', {}, [`— ${props.author}`])] : []),
          ]),
        ]
      case 'divider':
        return [tag('hr', attrs(element))]
      case 'form':
        return [
          tag('form', attrs(element), [
            tag('input', { name: 'name', placeholder: 'Your name' }),
            tag('input', { name: 'email', type: 'email', placeholder: 'Your email' }),
            tag('button', { class: 'pb-button', type: 'submit' }, [props.buttonText ?? 'Send']),
          ]),
        ]
      case 'accordion':
        return [
          tag('details', { ...attrs(element), open: props.open === 'yes' || undefined }, [
            tag('summary', {}, [
              props.title ?? '',
              tag('span', { class: 'pb-accordion-icon' }, ['+']),
            ]),
            tag('div', { class: 'pb-accordion-body' }, children(element)),
          ]),
        ]
      case 'tabs':
        tabsCount += 1
        return [toTabs(element, tabsCount)]
      case 'popup':
        popupCount += 1
        return toPopup(element, popupCount)
      default:
        // body, section, row, tab...: a box that holds other elements.
        return [tag('div', attrs(element), children(element))]
    }
  }

  // HTML: all panels rendered, the script toggles `hidden`. React: one useState per tab group.
  function toTabs(element: PageElement, n: number): Tag {
    const tabs = element.children.map((id) => getElement(page, id))
    const active = `activeTab${n}`
    if (target === 'react') result.state.push(`const [${active}, set${cap(active)}] = useState(0)`)
    else result.needsScript = true

    const buttons = tabs.map((tab, index) =>
      tag(
        'button',
        target === 'react'
          ? {
              type: 'button',
              role: 'tab',
              'aria-selected': { code: `${active} === ${index}` },
              onClick: { code: `() => set${cap(active)}(${index})` },
            }
          : { type: 'button', role: 'tab', 'aria-selected': String(index === 0) },
        [tab.props.label ?? ''],
      ),
    )

    const panels: Child[] = tabs.map((tab, index) => {
      const panel = tag(
        'div',
        {
          ...attrs(tab),
          'data-panel': target === 'html' ? '' : undefined,
          hidden: target === 'html' && index > 0 ? true : undefined,
        },
        children(tab),
      )
      return target === 'react' ? { when: `${active} === ${index}`, node: panel } : panel
    })

    return tag('div', { ...attrs(element), 'data-tabs': target === 'html' ? '' : undefined }, [
      tag('div', { class: 'pb-tablist', role: 'tablist' }, buttons),
      ...panels,
    ])
  }

  // The overlay lives at the end of <body>: a blurred or transformed parent (the sticky
  // header) would otherwise trap its position: fixed.
  function toPopup(element: PageElement, n: number): Child[] {
    const open = `isPopup${n}Open`
    const setOpen = `set${cap(open)}`
    const isReact = target === 'react'
    if (isReact) {
      result.state.push(`const [${open}, ${setOpen}] = useState(false)`)
      result.needsPortal = true
    } else {
      result.needsScript = true
    }

    const trigger = tag(
      'button',
      isReact
        ? { class: 'pb-button', type: 'button', onClick: { code: `() => ${setOpen}(true)` } }
        : { class: 'pb-button', type: 'button', 'data-open-popup': '' },
      [element.props.buttonText ?? ''],
    )
    const close = tag(
      'button',
      isReact
        ? {
            class: 'pb-close',
            type: 'button',
            'aria-label': 'Close',
            onClick: { code: `() => ${setOpen}(false)` },
          }
        : { class: 'pb-close', type: 'button', 'aria-label': 'Close', 'data-close-popup': '' },
      ['×'],
    )
    const box = tag(
      'div',
      isReact
        ? {
            ...attrs(element),
            role: 'dialog',
            onClick: { code: '(event) => event.stopPropagation()' },
          }
        : { ...attrs(element), role: 'dialog' },
      [close, ...children(element)],
    )
    const overlay = tag(
      'div',
      isReact
        ? { class: 'pb-overlay', onClick: { code: `() => ${setOpen}(false)` } }
        : { class: 'pb-overlay', hidden: true },
      [box],
    )

    return [trigger, isReact ? { when: open, node: overlay, portal: true } : overlay]
  }

  const body = getElement(page, page.bodyId)
  result.root = tag('div', { class: classNames[body.id] }, children(body))
  return result
}

function cap(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
