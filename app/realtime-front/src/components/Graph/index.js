'use strict'
import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'
import socketIOClient from 'socket.io-client'

export const Graph = ({ temp = 0 }) => {
    const ENDPOINT = 'http://127.0.0.1:3001'
                
    //let data_ = [{fridge:{uuid:'test', timestamp: '10:10:10', name:'pilsen', temperature:{value:4} }}, 
    //{fridge:{uuid:'test', timestamp: '10:10:10', name:'pilsen', temperature:{value:8} }}]
    const [data, setData] = useState([])
    const socket = socketIOClient(ENDPOINT)
    socket.heartbeatTimeout = 20000;
    socket.on("fridge/message", msg => {
        //console.log(`fffff ${JSON.stringify(data.slice(data.length-20, data.length-1))}`)
      //data.push(msg)
      //data.push(msg)
      if(data.length >20){
          setData(data.slice(data.length-20, data.length-1))
      }
      setData(data => [...data, msg])
    });
    
  return <LineChart width={400} height={150} data={data}>
    <Line type='monotone' dataKey='fridge.temperature.value' stroke='#8884d8' />
    <CartesianGrid stroke='#ccc' />
    <XAxis dataKey='fridge.timestamp' />
    <YAxis />
         </LineChart>
}
