import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'section' | 'main' | 'header' | 'footer' | 'article' | 'nav'
  fluid?: boolean
  tight?: boolean
  narrow?: boolean
  fullHeight?: boolean
}

export const Container = ({
  children,
  as: Tag = 'div',
  fluid = false,
  tight = false,
  narrow = false,
  fullHeight = false,
  className,
  ...props
}: ContainerProps) => {
  return (
    <Tag
      className={cn(
        'mx-auto w-full',
        // Max-width logic — mutually exclusive, narrow wins over tight
        !fluid && (narrow ? 'max-w-[640px]' : tight ? 'max-w-[800px]' : 'max-w-[1280px]'),
        // Responsive horizontal gutters
        'px-6 md:px-12 lg:px-16',
        // Optional full-height stretch for heroes or overlays
        fullHeight && 'min-h-screen flex flex-col',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}