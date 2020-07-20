'use strict'
import React from 'react'
import { Graph }  from '../Graph'
import { IconSensor }  from '../IconSensor'
import { Div } from './styles';

export const Sensor = ({ sensor, metric }) => {

  return <Div>
            <IconSensor level='high' sensor='Thermometer'/>
            <Graph/>
         </Div>
}
