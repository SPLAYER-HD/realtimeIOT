'use strict'

module.exports = function setupFridge (FridgeModel) {
  async function createOrUpdate (Fridge) {
    const cond = {
      where: {
        uuid: Fridge.uuid
      }
    }

    const existingFridge = await FridgeModel.findOne(cond)

    if (existingFridge) {
      const updated = await FridgeModel.update(Fridge, cond)
      return updated ? FridgeModel.findOne(cond) : existingFridge
    }

    const result = await FridgeModel.create(Fridge)
    return result.toJSON()
  }

  function findById (id) {
    return FridgeModel.findById(id)
  }

  function findByUuid (uuid) {
    return FridgeModel.findOne({
      where: {
        uuid
      }
    })
  }

  function findAll () {
    return FridgeModel.findAll()
  }

  return {
    createOrUpdate,
    findById,
    findByUuid,
    findAll
  }
}
