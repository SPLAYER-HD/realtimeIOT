'use strict'

const debug = require('debug')('realtime:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const common = require('realtime-common')
const socketio = require('socket.io')
const api = require('./api')
const mqtt = require('mqtt')

const port = process.env.PORT || 3001
const app = asyncify(express())
const server = http.createServer(app)
const io = socketio(server, { origins: '*:*' })
let client = null

app.use('/api', api)

io.on('connect', socket => {
  console.log('front connected')
  client.subscribe('fridge/message')
  client.on('message', (topic, payload) => {
    payload = common.parsePayload(payload)
    debug(`payload ${payload}`)

    switch (topic) {
      case 'fridge/message':
        socket.emit('fridge/message', payload)
        break
    }
  })

  client.on('error', () => common.handleFatalError)
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
    client = mqtt.connect(common.mqttOptions.host)
  })
}

module.exports = server
