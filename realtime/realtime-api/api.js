'use strict'

const debug = require('debug')('realtime:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const db = require('realtime-db')
const common = require('realtime-common')

const api = asyncify(express.Router())

let services, Fridge, Temperature

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    console.log('Connecting to database')
    try {
      services = await db(common.config)
    } catch (e) {
      console.log(`Connecting to database error ${e}`)
      return next(e)
    }
    Fridge = services.Fridge
    Temperature = services.Temperature
  }
  next()
})

api.get('/fridges', async (req, res, next) => {
  debug('fridge service')
  let fridges = []
  try {
    fridges = await Fridge.findAll()
  } catch (e) {
    return next(e)
  }
  res.send(fridges)
})

api.get('/temperature/:uuid', async (req, res, next) => {
  const { uuid } = req.params

  debug(`request to /temperature/${uuid}`)

  let temperatures = []
  try {
    temperatures = await Temperature.findByFridgeUuid(uuid)
  } catch (e) {
    return next(e)
  }

  if (!temperatures || temperatures.length === 0) {
    return next(new Error(`Temperatures not found for fridge with uuid ${uuid}`))
  }

  res.send(temperatures)
})

module.exports = api
