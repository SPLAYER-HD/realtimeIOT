'use strict'
import React, { useState, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import socketIOClient from 'socket.io-client'
import { Div } from './styles';

const ENDPOINT = 'http://localhost:4001'
const socket = socketIOClient(ENDPOINT)
// socket.heartbeatTimeout = 20000;
export const Graph = ({ temp = 0 }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    socket.on('fridge/message', msg => {
      console.log(JSON.stringify(msg))
      setData(data => [...data, msg])
    })
    return () => socket.disconnect()
  }, [])

  return <Div>

    <LineChart width={400} height={150} data={data.length > 15 ? data.slice(data.length - 15, data.length - 1) : data}>
      <Line type='monotone' dataKey='temperature.value' stroke='#8884d8' />
      <CartesianGrid stroke='#ccc' />
      <XAxis dataKey='timestamp' />
      <YAxis />
    </LineChart>
         </Div>
}
