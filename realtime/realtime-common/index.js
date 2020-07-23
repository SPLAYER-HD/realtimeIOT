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
  database: process.env.POSTGRES_DB || 'realtime',
  username: process.env.POSTGRES_USER || 'diego',
  password: process.env.POSTGRES_PASSWORD || '20Diego20',
  host: process.env.POSTGRES_HOST || 'localhost',
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
  interval: 7000,
  mqtt: {
    //host: 'mqtt://' + process.env.MQTT_URL || 'localhost'
    host: 'mqtt://localhost'
  }
}
console.log(JSON.stringify(mqttOptions))
module.exports = {
  handleFatalError,
  handleError,
  parsePayload,
  config,
  mqttOptions
}
