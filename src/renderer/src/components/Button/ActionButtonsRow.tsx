import { ComponentProps } from 'react'
import { DeleteNoteButton, NewNoteButton, SettingsButton } from '@/components'
import { twMerge } from 'tailwind-merge'

export const ActionButtonsRow = ({ className }: ComponentProps<'div'>) => {
  return (
    <div className={className}>
      <NewNoteButton className={twMerge('px-10 py-2', className)} />
      <DeleteNoteButton className={twMerge('px-10 py-2', className)} />
      <SettingsButton className={twMerge('px-2 py-2', className)} />
    </div>
  )
}
