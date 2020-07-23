'use strict'
import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import PropTypes from 'prop-types'
import { Div, Img } from './styles'
import socketIOClient from 'socket.io-client'

const ENDPOINT = 'http://localhost:4001'
const socket = socketIOClient(ENDPOINT)
// socket.heartbeatTimeout = 20000;
export const Graph = ({ name , data = [] }) => {

  const src='http://localhost:9090/public/assets/'+name+'.png'
  return (
    <Div>
      <Img src={src}></Img>
        <LineChart
          width={400}
          height={150}
          data={
            data.length > 15
              ? data.slice(data.length - 15, data.length - 1)
              : data
          }
        >
          <Line type='monotone' dataKey='temperature.value' stroke='#8884d8' />
          <CartesianGrid stroke='#ccc' />
          <XAxis dataKey='timestamp' />
          <YAxis />
          <Tooltip />
        </LineChart>
      
    </Div>
  )
}
Graph.propTypes = {
  name: PropTypes.string.isRequired
}