'use strict'

module.exports = function setupTemperature (TemperatureModel, FridgeModel) {
  async function findByFridgeUuid (uuid) {
    return TemperatureModel.findAll({
      include: [{
        attributes: [],
        model: FridgeModel,
        where: {
          uuid
        }
      }],
      raw: true
    })
  }

  async function create (uuid, temperature) {
    const fridge = await FridgeModel.findOne({
      where: { uuid }
    })

    if (fridge) {
      Object.assign(temperature, { fridgeId: fridge.id })
      const result = await TemperatureModel.create(temperature)
      return result.toJSON()
    }
  }

  return {
    create,
    findByFridgeUuid
  }
}
