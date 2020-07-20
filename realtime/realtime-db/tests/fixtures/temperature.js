'use strict'

const temperature = {
  id: 1,
  value: 8,
  fridge: 1,
  createdAt: new Date(),
  updatedAt: new Date()
}

const temperatures = [
  temperature,
  extend(temperature, { id: 2, value: 'diego-diego-diego' }),
  extend(temperature, { id: 3, uuid: 'diego-diego', fridge: 2 }),
  extend(temperature, { id: 4, uuid: 'diego', fridge: 3 })
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: temperature,
  all: temperatures,
  byId: id => temperatures.filter(a => a.id === id).shift()
}
