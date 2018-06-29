'use strict'

const express = require('express')
const router  = express.Router()
const saelos = require('./libs/saleos')

const handlers = {
  lolly: (text, cb) => {
    const regex = /who *is *([a-zA-Z0-9_ ]*)/gm
    let m = regex.exec(text)
    if (m[1]) {
      const name = m[1]
      const re = new RegExp(name, 'i')
      saelos
        .contacts
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
}

/**
 * request body
 *  {
 *    user_id: '',
 *    user_name: 'dbhurley',
 *    command: '/lolly',
 *    text: 'hi',
 *    response_url: 'https://hooks.slack.com/commands/T9RJJDDSQ/387506503588/YGMcOYeJP53B9kHKhauf3eaA',
 *    trigger_id: '387187609057.331630455908.693a816d89e1af0111804df5bf7c9bbe'
 *  }
 */
router.post('/', (req, res, next) => {
  const { command, text } = req.body

  const commandName = command.slice(1)
  if (handlers[commandName]) {
    handlers[commandName](text, (err, result) => {
      if (err) {
        res.json({
          text: err.message
        })
      } else {
        res.json({
          text: result
        })
      }
    })
  } else {
    res.json({
      text: 'Unknown commands'
    })
  }
})

module.exports = router;
