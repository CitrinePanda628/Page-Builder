import { Monitor, Smartphone, Tablet, type LucideIcon } from 'lucide-react'
import { DEVICE_WIDTHS, type Device } from '../state/devices'
import { useEditorStore } from '../state/editor-store'
import { IconButton, Logo, TextButton } from './buttons'

const DEVICES: { device: Device; label: string; icon: LucideIcon }[] = [
  { device: 'desktop', label: 'Desktop', icon: Monitor },
  { device: 'tablet', label: 'Tablet', icon: Tablet },
  { device: 'phone', label: 'Phone', icon: Smartphone },
]

// top bar in preview: the screen sizes and the way back
export function PreviewBar() {
  const device = useEditorStore((state) => state.device)
  const setDevice = useEditorStore((state) => state.setDevice)
  const togglePreview = useEditorStore((state) => state.togglePreview)

  return (
    <header className="col-span-full flex items-center border-b border-line bg-panel">
      <Logo />
      <span className="mr-auto px-4 text-sm text-muted">
        Preview: click and scroll like a visitor. Esc to go back.
      </span>
      <div role="group" aria-label="Screen size" className="flex items-center gap-1 px-2">
        {DEVICES.map(({ device: value, label, icon: Icon }) => {
          const width = DEVICE_WIDTHS[value]
          return (
            <IconButton
              key={value}
              label={width ? `${label}, ${width}px` : label}
              pressed={value === device}
              onClick={() => setDevice(value)}
            >
              <Icon size={20} />
            </IconButton>
          )
        })}
      </div>
      <div className="px-3">
        <TextButton look="primary" onClick={togglePreview}>
          Back to editing
        </TextButton>
      </div>
    </header>
  )
}
