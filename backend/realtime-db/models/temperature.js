'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupTemperatureModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('temperature', {
    value: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })
}
