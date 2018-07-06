'use strict'

const Saelos = require('../../libs/saleos')

function whois (params) {
  console.log(params)

  const { user_name, match } = params
  const name = match[1]

  const re = new RegExp(name, 'i')
  const saelos = new Saelos(user_name)

  return saelos
    .contacts()
    .list()
    .then(data => {
      const contacts = data.data.filter(item => {
        const fullName = `${item.first_name} ${item.last_name}`
        return fullName.match(re)
      })
      if (contacts.length) {
        const item = contacts[0]
        return `We found the contact: ${item.first_name} ${item.last_name}`
      } else {
        return `Sorry, but I did not find ${name}`
      }
    })
}

module.exports = whois
