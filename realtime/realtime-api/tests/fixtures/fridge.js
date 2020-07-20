'use strict'

const fridge = {
  id: 1,
  uuid: '123-123',
  name: 'red beer',
  max: 0,
  min: 0,
  createdAt: new Date(),
  updatedAt: new Date()
}

const fridges = [
  fridge,
  extend(fridge, { id: 2, uuid: '123-123-123', min: 2, max: 8 }),
  extend(fridge, { id: 3, uuid: '123-123-124' }),
  extend(fridge, { id: 4, uuid: '123-123-125' })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: fridge,
  all: fridges,
  byUuid: id => fridges.filter(a => a.uuid === id).shift(),
  byId: id => fridges.filter(a => a.id === id).shift()
}
