'use strict'
import React from 'react'
import { Graph } from '../Graph'
import { IconSensor } from '../IconSensor'
import { Metric } from '../Metric'
import { Div, Info } from './styles'
import PropTypes from 'prop-types'

export const Sensor = ({fridge, data = []}) => {
  return (
    <Div>
      <Info>
        <IconSensor level='high' sensor='Thermometer' />
        <Metric {...fridge} metric={data[data.length-1] ? data[data.length-1].temperature.value : 0} />
      </Info>
      <Graph {...fridge} data={data} />
    </Div>
  )
}
Sensor.propTypes = {
  fridge: PropTypes.object.isRequired
}