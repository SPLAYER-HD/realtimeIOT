'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupFridgeModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('fridge', {
    uuid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
