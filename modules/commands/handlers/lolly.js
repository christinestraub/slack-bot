'use strict'

const Saelos = require('../../libs/saleos')

function lolly(payload, cb) {
  const { user_name, text } = payload
  const regex = /who *is *([a-zA-Z0-9_ ]*)/gm

  let m = regex.exec(text)
  const name = m[1]
  if (name) {
    const re = new RegExp(name, 'i')
    const saelos = new Saelos(user_name)

    saelos
      .contacts()
      .list()
      .then(data => {
        const contacts = data.data.filter(item => {
          const fullName = `${item.first_name} ${item.last_name}` 
          return fullName.match(re)
        })
        if (contacts.length) {
          const item = contacts[0]
          const res = `We found the contact: ${item.first_name} ${item.last_name}`
          cb(null, res)
        } else {
          cb(null, `Sorry, but I did not find ${name}`)
        }
      })
      .catch(err => cb(err))
  } else {
    cb(null, 'Please tell me who you want to look for')
  }
}

module.exports = lolly
