'use strict'
import React, { useState, useEffect } from 'react'
import { Sensor } from '../Sensor'
import { Div, Title} from './styles'
import PropTypes from 'prop-types'
import socketIOClient from 'socket.io-client'


const ENDPOINT = 'http://localhost:4001'
const socket = socketIOClient(ENDPOINT)
// socket.heartbeatTimeout = 20000;
export const Fridge = ({ fridge = {} }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    socket.on('fridge/message', (msg) => {
      console.log(JSON.stringify(msg))
      if(msg.fridge.name == fridge.name){
        setData((data) => [...data, msg])
      }
    })
    return () => socket.disconnect()
  }, [])

  return (
    <Div>
      <Title>{fridge.name}</Title>
      <Sensor fridge={fridge} data={data}/>
    </Div>
  )
}
Fridge.propTypes = {
  fridge: PropTypes.object.isRequired
}
