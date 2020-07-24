'use strict'

const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')

const port = process.env.FRONT_PORT || 8080
const app = asyncify(express())
const server = http.createServer(app)

app.use(express.static(__dirname))

server.listen(port, () => {
  console.log(`Front server listening on port ${port}`)
})
