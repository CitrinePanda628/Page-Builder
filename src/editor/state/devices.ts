export type Device = 'desktop' | 'tablet' | 'phone'

// how wide the page is in preview per device, null = as wide as the canvas
export const DEVICE_WIDTHS: Record<Device, number | null> = {
  desktop: null,
  tablet: 768,
  phone: 390,
}
