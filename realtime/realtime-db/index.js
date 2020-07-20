'use strict'

const setupDatabase = require('./lib/db')
const setupFridgeModel = require('./models/fridge')
const setupTemperatureModel = require('./models/temperature')
const setupFridge = require('./lib/fridge')
const setupTemperature = require('./lib/temperature')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const FridgeModel = setupFridgeModel(config)
  const TemperatureModel = setupTemperatureModel(config)

  FridgeModel.hasMany(TemperatureModel)
  TemperatureModel.belongsTo(FridgeModel)

  await sequelize.authenticate()

  if (config.initialize) {
    await sequelize.sync({ force: true })
  }

  const Fridge = setupFridge(FridgeModel)
  const Temperature = setupTemperature(TemperatureModel, FridgeModel)

  return {
    Fridge,
    Temperature
  }
}
