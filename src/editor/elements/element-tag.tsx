import { Highlighted } from './highlighted'
import { AccordionTag } from './tags/accordion-tag'
import { PopupTag } from './tags/popup-tag'
import { TabsTag } from './tags/tabs-tag'
import { getAttributes, type TagProps } from './tags/tag-props'

export type { EditorProps } from './tags/tag-props'

const BUTTON = 'rounded-md bg-zinc-900 px-5 py-2.5 text-white'
const INPUT = 'rounded-md border border-zinc-300 px-3 py-2'

/**
 * Draws one element as its real HTML tag, with its styles on that tag:
 * a heading is an <h1 style="...">, a list a <ul style="...">.
 */
export function ElementTag(tagProps: TagProps) {
  const { element, editorProps, childViews, endLine } = tagProps
  const { props } = element
  const { ref, className } = editorProps
  const attributes = getAttributes(element, editorProps)

  switch (element.type) {
    case 'heading':
      return (
        <h1 ref={ref} className={`font-bold ${className}`} {...attributes}>
          {props.text}
        </h1>
      )

    case 'text':
      return (
        <p ref={ref} className={className} {...attributes}>
          <Highlighted text={props.text ?? ''} />
        </p>
      )

    case 'button':
      return (
        <button ref={ref} type="button" className={`${BUTTON} ${className}`} {...attributes}>
          {props.text}
        </button>
      )

    case 'link':
      return (
        <a ref={ref} href={props.href} className={`underline ${className}`} {...attributes}>
          {props.text}
        </a>
      )

    case 'list':
      return (
        <ul ref={ref} className={`list-disc pl-6 ${className}`} {...attributes}>
          {(props.items ?? '').split('\n').map((item, index) => (
            <li key={index}>
              <Highlighted text={item} />
            </li>
          ))}
        </ul>
      )

    case 'quote':
      return (
        <blockquote
          ref={ref}
          className={`border-l-4 border-zinc-300 pl-4 italic ${className}`}
          {...attributes}
        >
          <p>{props.text}</p>
          {props.author && <footer className="mt-2 text-sm not-italic">— {props.author}</footer>}
        </blockquote>
      )

    case 'divider':
      return <hr ref={ref} className={className} {...attributes} />

    case 'form':
      return (
        <form
          ref={ref}
          className={`flex flex-col gap-3 ${className}`}
          onSubmit={(event) => event.preventDefault()}
          {...attributes}
        >
          <input placeholder="Your name" className={INPUT} />
          <input placeholder="Your email" className={INPUT} />
          <button type="submit" className={`self-start ${BUTTON}`}>
            {props.buttonText}
          </button>
        </form>
      )

    case 'accordion':
      return <AccordionTag {...tagProps} />

    case 'tabs':
      return <TabsTag {...tagProps} />

    case 'popup':
      return <PopupTag {...tagProps} />

    default:
      // body, section, row, tab...: a box that holds other elements.
      return (
        <div ref={ref} className={className} {...attributes}>
          {childViews}
          {endLine}
        </div>
      )
  }
}
