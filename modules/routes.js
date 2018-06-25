'use strict'

module.exports = function(app) {
  app.use('/webhooks', require('./webhooks'))
  app.use('/commands', require('./commands'))

  app.use((req, res) => {
    res.status(404).send('Not Found')
  })

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.response || 'Something was broken')
  })
}
