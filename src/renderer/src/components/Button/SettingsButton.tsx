import { ActionButton, ActionButtonProps } from '@/components'
import { FaEllipsis } from 'react-icons/fa6'

export const SettingsButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <FaEllipsis className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
