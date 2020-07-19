import React from 'react'
import { Circle, Svg, ContainerLoading } from './animation'

export const Loader = ({ size = 100 }) => {
  return (
    <ContainerLoading>
      <Svg
        width={size}
        height={size}
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'>
        <Circle cx='50' cy='50' r={45} />
      </Svg>
    </ContainerLoading>
  )
}
