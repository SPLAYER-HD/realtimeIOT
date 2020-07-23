import React from 'react'
import { FaTemperatureLow, FaTemperatureHigh } from 'react-icons/fa'
import { Div } from './styles'
import PropTypes from 'prop-types'

export const IconSensor = ({ level, sensor }) => {
  const Icon = level === 'high' ? FaTemperatureHigh : FaTemperatureLow
  return (
    <Div>
      <Icon size='32px' /> {sensor} 
    </Div>
  )
}

IconSensor.propTypes = {
  level: PropTypes.string.isRequired,
  sensor: PropTypes.string.isRequired
}
