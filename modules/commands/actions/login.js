'use strict'

const Saelos = require('../../libs/saleos')

function login (params) {
  console.log('login', params)
  const { user_name, match } = params
  const username = match[1]
  const password = match[2]

  if (username && password) {
    const saelos = new Saelos(user_name)

    return saelos
      .oauth(username, password)
      .then(success => {
        if (success) {
          return 'You are authenticated successfully.'
        } else {
          return 'You did not authenticate.'
        }
      })
      .catch(err => {
        return 'Authentication was failed.'
      })
  } else {
    return Promise.reject('Some parameters are missing.')
  }

}

module.exports = login