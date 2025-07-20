import { ComponentProps } from 'react'
import './trafficLights.scss'
import { CloseButton, MaximizeButton, MinimizeButton } from '@/components/Button'

export const TrafficLights = ({ ...props }: ComponentProps<'div'>) => {
  return (
    <div className="traffic-lights" {...props}>
      <CloseButton />
      <MinimizeButton />
      <MaximizeButton />
    </div>
  )
}
