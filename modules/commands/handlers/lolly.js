'use strict'

const utils = require('../utils')
const actions = require('../actions')

function lolly(payload, cb) {
  const { user_name, text } = payload

  const action = utils.parse(text)

  if (action.name) {
    action.user_name = user_name

    // console.log('lolly', action, user_name)

    if (actions[action.name]) {
      actions[action.name](action, cb)
        .then(res => cb(null, res))
        .catch(err => cb(err))
    } else {
      cb(null, 'I can\'t handle your message')
    }
  } else {
    console.log(action)
    cb(null, 'Please tell me what do you want')
  }
}

module.exports = lolly
