import type { LucideIcon } from 'lucide-react'

interface IconBadgeProps {
  icon: LucideIcon
  size: 'small' | 'large'
}

// a block's icon in a light square
export function IconBadge({ icon: Icon, size }: IconBadgeProps) {
  const box = size === 'large' ? 'size-10 rounded-md' : 'size-7 rounded'
  return (
    <span className={`flex shrink-0 items-center justify-center bg-hover text-ink ${box}`}>
      <Icon size={size === 'large' ? 22 : 16} />
    </span>
  )
}
