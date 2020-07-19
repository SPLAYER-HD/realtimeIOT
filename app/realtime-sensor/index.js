'use strict'

const debug = require('debug')('realtime:sensor')
const common = require('realtime-common')
const mqtt = require('mqtt')
const defaults = require('defaults')
const EventEmitter = require('events')
const db = require('realtime-db')
var request = require('request-promise')

class RealtimeSensor extends EventEmitter {
  constructor (fridges) {
    super()
    this._options = common.mqttOptions
    this._started = false
    this._timer = null
    this._client = null
    this._fridges = null
    this.getFridges().then(fridges => {
      this._fridges = fridges
    }).catch(err => common.handleFatalError(err))
  }

  async getFridges () {
    const config = defaults(common.config, {
      logging: s => debug(s)
    })
    const services = await db(config).catch(common.handleFatalError)
    const Fridge = services.Fridge
    return await Fridge.findAll().catch(common.handleFatalError)
  }

  connect () {
    if (!this._started) {
      const opts = this._options
      this._client = mqtt.connect(opts.mqtt.host)
      this._started = true

      this._client.subscribe('fridge/message')
      this._client.on('connect', () => {
        this._timer = setInterval(async () => {
          if (this._fridges) {
            for (const fridge of this._fridges) {
              const host = `https://temperature-sensor-service.herokuapp.com/sensor/${fridge.name}`
              console.log(host)
              const result = await request({
                method: 'GET',
                uri: host,
                json: true,
                headers: {
                  'User-Sensors': 'ing.diego.torres95@gmail.com challenge app'
                }
              })
              const message = {
                fridge: fridge,
                temperature: { value: result.temperature },
                timestamp: new Date().getTime()
              }
              this._client.publish('fridge/message', JSON.stringify(message))
              
            }
          }
        }, opts.interval)
      })
     
      this._client.on('message', (topic, payload) => {
        console.log("mqtt sent a msg")
        payload = common.parsePayload(payload)
        debug(`payload ${payload}`)
        
      })
      this._client.on('error', () => common.handleFatalError)
    }
  }

  async getTemperature (host) {
    request({
      method: 'GET',
      uri: host,
      json: true,
      headers: {
        'User-Sensor': 'ing.diego.torres95@gmail.com challenge app'
      }
    }).then(function (result) {
      console.log('result----------------------')
      console.log(result)
      return result
      // this.emit('fridge/message', message)
    }).catch(function (err) {
      console.log(`Error calling pragmaTeam service: ${err}`)
    })
  }
}

module.exports = RealtimeSensor
