'use strict'

const fridge = {
  id: 1,
  uuid: 'diego-diego-diego-diego',
  name: 'fridge1',
  createdAt: new Date(),
  updatedAt: new Date()
}

const fridges = [
  fridge,
  extend(fridge, { id: 2, uuid: 'diego-diego-diego' }),
  extend(fridge, { id: 3, uuid: 'diego-diego' }),
  extend(fridge, { id: 4, uuid: 'diego' })
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
