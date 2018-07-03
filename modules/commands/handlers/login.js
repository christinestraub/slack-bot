'use strict'

const Saelos = require('../../libs/saleos')

function login(payload, cb) {
  const { user_name, text } = payload
  const m = text.split(' ')
  if (m.length === 2) {
    const username = m[0]
    const password = m[1]
    const saelos = new Saelos(user_name)

    saelos
      .oauth(username, password)
      .then(authenticated => {
        if (authenticated) {
          cb(null, 'You are authenticated successfully.')
        } else {
          cb(null, 'You did not authenticated.')
        }

      })
      .catch(err => cb(err))
  } else {
    cb(null, 'Usage: username password')
  }
}

module.exports = login
