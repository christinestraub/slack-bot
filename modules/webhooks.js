'use strict'

const express = require('express')
const router  = express.Router()

router.get('/', (req, res, next) => {
  console.log(req.body)
  res.json({ message: 'hello' })
});

module.exports = router;
