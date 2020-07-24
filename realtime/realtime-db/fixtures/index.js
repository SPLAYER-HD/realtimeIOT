'use strict'

const debug = require('debug')('realtime:db:fixtures')
const defaults = require('defaults')
const common = require('realtime-common')
const db = require('..')

async function run () {
  const config = defaults(common.config, {
    logging: s => debug(s)
  })

  const { Fridge, Temperature } = await db(config).catch(common.handleFatalError)

  const pilsener = await Fridge.createOrUpdate({
    uuid: '123-456',
    name: 'Pilsner',
    min: 4,
    max: 6
  }).catch(common.handleFatalError)
  await Temperature.create(pilsener.uuid, {
    value: '6'
  }).catch(common.handleFatalError)
  const ipa = await Fridge.createOrUpdate({
    uuid: '123-456-789',
    name: 'IPA',
    min: 5,
    max: 6
  }).catch(common.handleFatalError)
  await Temperature.create(ipa.uuid, {
    value: '5'
  }).catch(common.handleFatalError)
  const larger = await Fridge.createOrUpdate({
    uuid: '123-456-789-1011',
    name: 'Lager',
    min: 4,
    max: 7
  }).catch(common.handleFatalError)
  await Temperature.create(larger.uuid, {
    value: '3'
  }).catch(common.handleFatalError)
  const stout = await Fridge.createOrUpdate({
    uuid: '123-456-789-1213',
    name: 'Stout',
    min: 6,
    max: 8
  }).catch(common.handleFatalError)
  await Temperature.create(stout.uuid, {
    value: '12'
  }).catch(common.handleFatalError)
  const wheatBeer = await Fridge.createOrUpdate({
    uuid: '123-456-789-1414',
    name: 'Wheat beer',
    min: 3,
    max: 5
  }).catch(common.handleFatalError)
  await Temperature.create(wheatBeer.uuid, {
    value: '12'
  }).catch(common.handleFatalError)
  const paleAle = await Fridge.createOrUpdate({
    uuid: '123-456-789-1415',
    name: 'Pale Ale',
    min: 4,
    max: 6
  }).catch(common.handleFatalError)
  await Temperature.create(paleAle.uuid, {
    value: '12'
  }).catch(common.handleFatalError)
}

run()
