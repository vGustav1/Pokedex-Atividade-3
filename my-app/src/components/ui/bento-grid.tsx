import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

export interface BentoGridProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: ReactNode
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
