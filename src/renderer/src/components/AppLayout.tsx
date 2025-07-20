import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import ApplicationsMenu from './Button/ApplicationsMenu'
import { useAtomValue } from 'jotai'
import { currentApplicationAtom } from '@renderer/store'

export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {

  const currentApplication = useAtomValue(currentApplicationAtom)

  return (
    <div className="max-w-[250px] h-max flex flex-row flex-wrap gap-0">
      <div className="flex items-center justify-between min-h-[64px] w-full px-2 pt-9">
        <div className="flex flex-col">
          <h1 className="text-xl">Rely on_</h1>
          <span className="text-xs text-gray-300">{currentApplication.name}</span>
        </div>
        <ApplicationsMenu className={twMerge('p-1 cursor-pointer')} />
      </div>
      <aside
        className={twMerge('w-[250px] h-dvh', className)}
        {...props}
      >
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
