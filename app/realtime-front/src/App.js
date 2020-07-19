'use strict'
import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import './App.css'
import { Graph } from './components/Graph'


const App = () => (
  // const [response, setResponse] = useState('')
  // const socket = socketIOClient(ENDPOINT);
/* socket.on("FromAPI", data => {
  setResponse(data);
}); */
  <Graph />
)
export default hot(module)(App)
