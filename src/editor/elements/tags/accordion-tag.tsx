import { useIsPreview } from '../../state/editor-store'
import { getAttributes, type TagProps } from './tag-props'

/**
 * A title you click to open or close the content: <details> and <summary> in HTML.
 * While editing it is always open, so you can change what is inside.
 */
export function AccordionTag({ element, editorProps, childViews, endLine }: TagProps) {
  const { ref, className } = editorProps
  const attributes = getAttributes(element, editorProps)
  const isPreview = useIsPreview()
  const startsOpen = element.props.open === 'yes'

  return (
    <details
      // A new key when the mode changes: React makes a fresh <details>, open or closed again.
      key={isPreview ? 'preview' : 'edit'}
      ref={ref}
      open={!isPreview || startsOpen}
      className={`group ${className}`}
      {...attributes}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
        {element.props.title}
        <span className="text-xl transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="pt-3">
        {childViews}
        {endLine}
      </div>
    </details>
  )
}
