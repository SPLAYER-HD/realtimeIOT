'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const fridgeFixtures = require('./fixtures/fridge')

let sandbox = null
let server = null
let dbStub = null
const FridgeStub = {}
const TemperatureStub = {}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox({})

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Fridge: FridgeStub,
    Temperature: TemperatureStub
  }))

  FridgeStub.findAll = sandbox.stub()
  FridgeStub.findAll.returns(Promise.resolve(fridgeFixtures.all))

  const api = proxyquire('../api', {
    'realtime-db': dbStub
  })

  server = proxyquire('../server', {
    './api': api
  })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test.serial.cb('/api/fridges', t => {
  request(server)
    .get('/api/fridges')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(fridgeFixtures.all)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})

test.serial.todo('/api/fridge/:uuid')
test.serial.todo('/api/fridge/:uuid - not found')

test.serial.todo('/api/temperature/:uuid')
test.serial.todo('/api/temperature/:uuid - not found')

test.serial.todo('/api/temperature/:uuid/:type')
test.serial.todo('/api/temperature/:uuid/:type - not found')
