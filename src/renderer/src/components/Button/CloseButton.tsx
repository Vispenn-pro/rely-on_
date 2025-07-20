import { ActionButtonProps } from '@/components'
import '../trafficLights.scss'

export const CloseButton = ({ ...props }: ActionButtonProps) => {
  return (
    <button
      id="close"
      className="traffic-light traffic-light-close"
      {...props}
      onClick={window.context.close}
    ></button>
  )
}
