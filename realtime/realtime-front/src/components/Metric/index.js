'use strict'
import React, { useState, useEffect } from 'react'
import { Div, Constraint, Range, Title, Alert } from './styles'
import PropTypes from 'prop-types'

export const Metric = ({min, max, metric = 0}) => {

  return (
    <Div>
      <Constraint>
        <Title>Range°C</Title>
        <Range>{min}°C - {max}°C</Range>
      </Constraint>
      
      <Alert metric={metric} min={min} max={max} >{metric}°C</Alert>
    </Div>
  )
}
Metric.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  metric: PropTypes.number
}