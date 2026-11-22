import { useIsPreview } from '../../state/editor-store'
import { getAttributes, type TagProps } from './tag-props'

// a title you click to open or close the content (<details> and <summary>)
// it's always open while editing so you can change what's inside
export function AccordionTag({ element, editorProps, childViews, endLine }: TagProps) {
  const { ref, className } = editorProps
  const attributes = getAttributes(element, editorProps)
  const isPreview = useIsPreview()
  const startsOpen = element.props.open === 'yes'

  return (
    <details
      // new key when the mode changes so react makes a fresh <details>
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
