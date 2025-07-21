import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <div className="max-w-[262px] h-max flex flex-row flex-wrap gap-0">
      <h1 className="w-[262px] text-xl min-h-[64px] pl-2 pt-9">Rely on_</h1>
      <aside className={twMerge('w-[262px] h-dvh', className)} {...props}>
        {children}
      </aside>
    </div>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={twMerge('flex-1 overflow-auto pt-8 px-2', className)} {...props}>
      {children}
    </div>
  )
)

Content.displayName = 'Content'
