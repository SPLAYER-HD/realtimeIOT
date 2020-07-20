'use strict'

const debug = require('debug')('realtime:db:setup')
const common = require('realtime-common')
const defaults = require('defaults')
const db = require('./')

async function setup () {
  const config = defaults(common.config, {
    logging: s => debug(s),
    initialize: true
  })

  await db(config).catch(common.handleFatalError)

  console.log('Success!')
  process.exit(0)
}

setup()
