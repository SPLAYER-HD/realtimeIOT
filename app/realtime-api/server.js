'use strict'

const debug = require('debug')('realtime:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const common = require('realtime-common')
const socketio = require('socket.io')
const api = require('./api')

const port = process.env.PORT || 3001
const app = asyncify(express())
const server = http.createServer(app)
const io = socketio(server, { origins: '*:*'})

app.use('/api', api)

io.on('connect', socket => {
  //debug(`customer ${socket.id}`)
  socket.on('fridge/message', payload => {
    debug(`payload ${payload}`)
  })
  setInterval(()=> {
    socket.emit('fridge/message', {fridge:{uuid:'test', timestamp: '10:10:10', name:'pilsen', temperature:{value:8} }})
    socket.emit('fridge/message', {fridge:{uuid:'test', timestamp: '10:12:10', name:'pilsen', temperature:{value:3} }})
    socket.emit('fridge/message', {fridge:{uuid:'test', timestamp: '10:13:10', name:'pilsen', temperature:{value:6} }})
    socket.emit('fridge/message', {fridge:{uuid:'test', timestamp: '10:14:10', name:'pilsen', temperature:{value:1} }})
  }, 10000)

})
// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

if (!module.parent) {
  process.on('uncaughtException', common.handleFatalError)
  process.on('unhandledRejection', common.handleFatalError)

  server.listen(port, () => {
    console.log(`realtime-api server listening on port ${port}`)
  })
}

module.exports = server
