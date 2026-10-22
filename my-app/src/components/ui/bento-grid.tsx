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

export interface BentoGridItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  className?: string
  title?: ReactNode
  description?: ReactNode
  header?: ReactNode
  icon?: ReactNode
  children?: ReactNode
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  children,
  ...props
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        'group/bento relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md',
        className
      )}
      {...props}
    >
      {header}
      {children}
      {(title || description || icon) && (
        <div className="transition duration-200 group-hover/bento:translate-x-1">
          {icon}
          {title && (
            <div className="font-semibold text-slate-800">
              {title}
            </div>
          )}
          {description && (
            <div className="text-xs text-slate-500">
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
