'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const fridgeFixtures = require('./fixtures/fridge')

const config = {
  logging () {}
}

const TemperatureStub = {
  belongsTo: sinon.spy()
}

const id = 1
const uuid = 'diego-diego-diego-diego'
let FridgeStub = null
let db = null
let sandbox = null

const single = Object.assign({}, fridgeFixtures.single)

const uuidArgs = {
  where: { uuid }
}

const newFridge = {
  uuid: 'diego-realtime-diego',
  name: 'FridgeTest'
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox({})

  FridgeStub = {
    hasMany: sandbox.spy()
  }

  // Model create Stub
  FridgeStub.create = sandbox.stub()
  FridgeStub.create.withArgs(newFridge).returns(Promise.resolve({
    toJSON () { return newFridge }
  }))

  // Model update Stub
  FridgeStub.update = sandbox.stub()
  FridgeStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))

  // Model findById Stub
  FridgeStub.findById = sandbox.stub()
  FridgeStub.findById.withArgs(id).returns(Promise.resolve(fridgeFixtures.byId(id)))

  // Model findOne Stub
  FridgeStub.findOne = sandbox.stub()
  FridgeStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(fridgeFixtures.byUuid(uuid)))

  // Model findAll Stub
  FridgeStub.findAll = sandbox.stub()
  FridgeStub.findAll.withArgs().returns(Promise.resolve(fridgeFixtures.all))

  const setupDatabase = proxyquire('../', {
    './models/fridge': () => FridgeStub,
    './models/temperature': () => TemperatureStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Fridge', t => {
  t.truthy(db.Fridge, 'Fridge service was exist')
})

test.serial('Setup', t => {
  t.true(FridgeStub.hasMany.called, 'FridgeModel.hasMany was ok')
  t.true(FridgeStub.hasMany.calledWith(TemperatureStub), 'Argument was be the TemperatureModel')
  t.true(TemperatureStub.belongsTo.called, 'TemperatureModel.belongsTo was ok')
  t.true(TemperatureStub.belongsTo.calledWith(FridgeStub), 'Argument was be the FridgeModel')
})

test.serial('Fridge#findById', async t => {
  const fridge = await db.Fridge.findById(id)

  t.true(FridgeStub.findById.called, 'findById was be called on model')
  t.true(FridgeStub.findById.calledOnce, 'findById was be called once')
  t.true(FridgeStub.findById.calledWith(id), 'findById was be called with specified id')

  t.deepEqual(fridge, fridgeFixtures.byId(id), 'was be the same')
})

test.serial('Fridge#findByUuid', async t => {
  const fridge = await db.Fridge.findByUuid(uuid)

  t.true(FridgeStub.findOne.called, 'findOne was be called on model')
  t.true(FridgeStub.findOne.calledOnce, 'findOne was be called once')
  t.true(FridgeStub.findOne.calledWith(uuidArgs), 'findOne was be called with uuid args')

  t.deepEqual(fridge, fridgeFixtures.byUuid(uuid), 'fridge was be the same')
})

test.serial('Fridge#findAll', async t => {
  const fridges = await db.Fridge.findAll()

  t.true(FridgeStub.findAll.called, 'findAll was be called on model')
  t.true(FridgeStub.findAll.calledOnce, 'findAll was be called once')
  t.true(FridgeStub.findAll.calledWith(), 'findAll was be called without args')

  t.is(fridges.length, fridgeFixtures.all.length, 'fridges was be the same amount')
  t.deepEqual(fridges, fridgeFixtures.all, 'fridges was be the same')
})

test.serial('Fridge#createOrUpdate - exists', async t => {
  const fridge = await db.Fridge.createOrUpdate(single)

  t.true(FridgeStub.findOne.called, 'findOne was be called on model')
  t.true(FridgeStub.findOne.calledTwice, 'findOne was be called twice')
  t.true(FridgeStub.findOne.calledWith(uuidArgs), 'findOne was be called with uuid args')
  t.true(FridgeStub.update.called, 'fridge.update called on model')
  t.true(FridgeStub.update.calledOnce, 'fridge.update was be called once')
  t.true(FridgeStub.update.calledWith(single), 'fridge.update was be called with specified args')

  t.deepEqual(fridge, single, 'fridge was be the same')
})

test.serial('Fridge#createOrUpdate - new', async t => {
  const fridge = await db.Fridge.createOrUpdate(newFridge)

  t.true(FridgeStub.findOne.called, 'findOne was be called on model')
  t.true(FridgeStub.findOne.calledOnce, 'findOne was be called once')
  t.true(FridgeStub.findOne.calledWith({
    where: { uuid: newFridge.uuid }
  }), 'findOne was be called with uuid args')
  t.true(FridgeStub.create.called, 'create was be called on model')
  t.true(FridgeStub.create.calledOnce, 'create was be called once')
  t.true(FridgeStub.create.calledWith(newFridge), 'create was be called with specified args')

  t.deepEqual(fridge, newFridge, 'fridge was be the same')
})
