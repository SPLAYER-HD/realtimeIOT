'use strict'

const debug = require('debug')('realtime:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const common = require('realtime-common')

const api = require('./api')

const port = process.env.PORT || 3000
const app = asyncify(express())
const server = http.createServer(app)

app.use('/api', api)

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
