'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const fridgeFixtures = require('./fixtures/fridge')
const temperatureFixtures = require('./fixtures/temperature')

let sandbox = null
let server = null
let dbStub = null
const uuid = '123-123'
const uuid404 = '456-951'
const FridgeStub = {}
const TemperatureStub = {}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox({})

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Fridge: FridgeStub,
    Temperature: TemperatureStub
  }))

  // Create Stub TemperatureStub.findByFridgeUuid
  TemperatureStub.findByFridgeUuid = sandbox.stub()
  TemperatureStub.findByFridgeUuid.withArgs(uuid).returns(Promise.resolve(temperatureFixtures.byId(1)))

  // Create Stub FridgeStub
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
      t.deepEqual(body, expected, 'response should be the expected')
      t.end()
    })
})

test.serial.cb('/api/temperature/:uuid', t => {
  request(server)
    .get(`/api/temperature/${uuid}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(temperatureFixtures.byId(1))
      t.deepEqual(body, expected, 'response should be the expected')
      t.end()
    })
})
test.serial.cb('/api/temperature/:uuid - not found', t => {
  request(server)
    .get(`/api/temperature/${uuid404}`)
    .expect(404)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      const body = JSON.stringify(res.body)
      const expected = JSON.stringify(temperatureFixtures.error(uuid404))
      t.deepEqual(body, expected, 'response should be the expected')
      t.end()
    })
})
