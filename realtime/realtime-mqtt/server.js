'use strict'

const defaults = require('defaults')
const mosca = require('mosca')
const debug = require('debug')('realtime:mqtt')
const redis = require('redis')
const common = require('realtime-common')
const db = require('realtime-db')

const backend = {
  type: 'redis',
  redis,
  return_buffers: true,
  host: "redis",
  port: 6379
}

const settings = {
  port: 1883,
  backend
}

const config = defaults(common.config, {
  logging: s => debug(s)
})

const server = new mosca.Server(settings)
const parsePayload = common.parsePayload
let Temperature

server.on('published', async (packet, client) => {
  debug(`Received: ${packet.topic}`)
  debug(`Packet Payload: ${packet.payload}`)
  switch (packet.topic) {
    case 'fridge/message': {
      const payload = parsePayload(packet.payload)
      debug(`Payload Fridge: ${payload}`)
      if (payload) {
        // Store Temperature
        try {
          await Temperature.create(payload.fridge.uuid, payload.temperature)
        } catch (e) {
          return common.handleError(e)
        }
      }
      break
    }
  }
})

server.on('ready', async () => {
  const services = await db(config).catch(common.handleFatalError)
  Temperature = services.Temperature
  console.log('mqtt is running')
})

server.on('error', common.handleFatalError)

process.on('uncaughtException', common.handleFatalError)
process.on('unhandledRejection', common.handleFatalError)
