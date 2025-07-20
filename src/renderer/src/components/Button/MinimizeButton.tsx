import { ActionButtonProps } from '@/components'
import '../trafficLights.scss'

export const MinimizeButton = ({ ...props }: ActionButtonProps) => {
  return (
    <button
      id="minimize"
      className="traffic-light traffic-light-minimize"
      {...props}
      onClick={window.context.minimize}
    ></button>
  )
}
