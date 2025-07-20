import { ActionButtonProps } from '@/components'
import '../trafficLights.scss'

export const MaximizeButton = ({ ...props }: ActionButtonProps) => {
  return (
    <button
      id="maximize"
      className="traffic-light traffic-light-maximize"
      {...props}
      onClick={window.context.maximize}
    ></button>
  )
}
