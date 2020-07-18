'use strict'

function parsePayload (payload) {
  if (payload instanceof Buffer) {
    payload = payload.toString('utf8')
  }

  try {
    payload = JSON.parse(payload)
  } catch (e) {
    payload = null
  }

  return payload
}

const config = {
  database: process.env.DB_NAME || 'realtime',
  username: process.env.DB_USER || 'diego',
  password: process.env.DB_PASS || '20Diego20',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres'
}

function handleFatalError (err) {
  console.error(`Error ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

function handleError (err) {
  console.error(`Error ${err.message}`)
  console.error(err.stack)
}

const mqttOptions = {
  interval: 10000,
  mqtt: {
    host: 'mqtt://localhost'
  }
}

module.exports = {
  handleFatalError,
  handleError,
  parsePayload,
  config,
  mqttOptions
}
