import { useRef } from 'react'
import { DEVICE_WIDTHS } from '../state/devices'
import { useEditorStore, useIsPreview, usePage } from '../state/editor-store'
import { ElementView } from './element-view'
import { OVERLAY_LAYER_ID } from './overlay-layer'
import { SelectionLabel } from './selection-label'

// frame:    device width in Preview. Its transform makes position: fixed stay inside it.
// scroller: sticky sticks to its top. Margin (not padding) around the page, or sticky stops short.
// page:     the white page.
export function Canvas() {
  const page = usePage()
  const isPreview = useIsPreview()
  const device = useEditorStore((state) => state.device)
  const setHovered = useEditorStore((state) => state.setHovered)
  const pageRef = useRef<HTMLDivElement>(null)

  const width = isPreview ? DEVICE_WIDTHS[device] : null
  const frameClass = width
    ? 'my-6 rounded-[2rem] border-[10px] border-zinc-800 shadow-2xl'
    : 'w-full'
  const pageClass = isPreview ? 'min-h-full' : 'my-6 min-h-[calc(100%-3rem)] shadow-sm'

  return (
    <main
      className="flex justify-center overflow-hidden bg-backdrop"
      onMouseLeave={() => setHovered(null)}
    >
      <div
        className={`relative shrink-0 overflow-hidden [transform:translateZ(0)] ${frameClass}`}
        style={width ? { width: width + 20 } : undefined}
      >
        <div className={`h-full overflow-auto ${isPreview ? '' : 'px-6'}`}>
          <div ref={pageRef} className={`relative bg-white text-zinc-900 ${pageClass}`}>
            <ElementView elementId={page.bodyId} />
            {!isPreview && <SelectionLabel pageRef={pageRef} />}
          </div>
        </div>
        <div id={OVERLAY_LAYER_ID} />
      </div>
    </main>
  )
}
