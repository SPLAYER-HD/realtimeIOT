'use strict'

const debug = require('debug')('realtime:mqtt')
const mosca = require('mosca')
const redis = require('redis')
const db = require('realtime-db')
const common = require('realtime-common')
const defaults = require('defaults')

const backend = {
  type: 'redis',
  redis,
  return_buffers: true
}

const settings = {
  port: 1883,
  backend
}

const config = defaults(common.config, {
  logging: s => debug(s)
})

const server = new mosca.Server(settings)
const clients = new Map()

let Temperature

server.on('clientConnected', client => {
  debug(`Client Connected: ${client.id}`)
  clients.set(client.id, null)
})

server.on('clientDisconnected', async (client) => {
  debug(`Client Disconnected: ${client.id}`)
  // Delete client from Clients List
  clients.delete(client.id)
})

server.on('published', async (packet, client) => {
  debug(`Received: ${packet.topic}`)
  debug(`Packet Payload: ${packet.payload}`)
  const payload = common.parsePayload(packet.payload)
  debug(`Payload Fridge: ${payload}`)
  if (payload) {
    // Store Temperature
    try {
      await Temperature.create(payload.fridge.uuid, payload.temperature)
    } catch (e) {
      return common.handleError(e)
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
