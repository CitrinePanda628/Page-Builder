import { X } from 'lucide-react'
import { useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { isInside } from '../../../core'
import { OVERLAY_LAYER_ID } from '../../canvas/overlay-layer'
import { useEditorStore, useIsPreview, usePage } from '../../state/editor-store'
import { getAttributes, type TagProps } from './tag-props'

/**
 * A button, and a box that opens on top of the page (a "modal").
 * The box is position: fixed, so it stays in view however far you scrolled.
 * While editing, it is open while it (or something in it) is selected.
 *
 * createPortal draws the box in the canvas's overlay layer instead of where the popup sits.
 * Inside a parent with a transform or a blur, fixed would be measured against that parent.
 */
export function PopupTag({ element, editorProps, childViews, endLine }: TagProps) {
  const { ref, className } = editorProps
  const attributes = getAttributes(element, editorProps)
  const page = usePage()
  const selectedId = useEditorStore((state) => state.selectedId)
  const select = useEditorStore((state) => state.select)
  const isPreview = useIsPreview()
  const [isOpenInPreview, setOpenInPreview] = useState(false)

  const holdsSelection =
    selectedId === element.id || (selectedId !== null && isInside(page, selectedId, element.id))
  const isOpen = isPreview ? isOpenInPreview : holdsSelection

  function open(event: MouseEvent) {
    event.stopPropagation()
    if (isPreview) setOpenInPreview(true)
    else select(element.id)
  }

  function close(event: MouseEvent) {
    event.stopPropagation()
    if (isPreview) setOpenInPreview(false)
    else select(null)
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="w-fit rounded-md bg-zinc-900 px-5 py-2.5 text-white"
      >
        {element.props.buttonText}
      </button>
      {isOpen &&
        createPortal(
          <div
            onClick={close}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
          >
            <div
              ref={ref}
              role="dialog"
              className={`relative max-h-full overflow-auto ${className}`}
              {...attributes}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="absolute top-3 right-3 rounded-full p-1 opacity-60 hover:opacity-100"
              >
                <X size={20} />
              </button>
              {childViews}
              {endLine}
            </div>
          </div>,
          document.getElementById(OVERLAY_LAYER_ID) ?? document.body,
        )}
    </>
  )
}
