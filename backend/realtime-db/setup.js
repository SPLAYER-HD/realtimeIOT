'use strict'

const debug = require('debug')('realtime:db:setup')
const db = require('./')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'realtime',
    username: process.env.DB_USER || 'diego',
    password: process.env.DB_PASS || '20Diego20',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s)
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`fatal error] ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
