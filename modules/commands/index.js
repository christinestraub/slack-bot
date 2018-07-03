'use strict'

const express = require('express')
const router  = express.Router()
const handlers = require('../commands/handlers')

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
  const { command } = req.body
  const commandName = command.slice(1)
  const handler = handlers[commandName]

  if (handler) {
    handler(req.body, (err, result) => {
      
      if (err) {
        res.json({
          text: err.message || err
        })
      } else {
        res.json({
          text: result
        })
      }
    })
  } else {
    res.json({
      text: 'Sorry, but we can\'t respond for this command.'
    })
  }
})

module.exports = router;
