const express = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')


const routes     = require('./modules/routes');

const app = express()

app.disable('etag')
app.set('trust proxy', true)

// const whitelist = ['https://ice-lolly.herokuapp.com/', 'http://localhost/'];
const corsOptions = {
  origin: ['*'],
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', express.static('static'))
app.use('/doc', express.static('doc'))

routes(app);

const port = process.env.PORT || 4000

app.listen(port, function () {
  console.log(`Ice Lolly listening on port ${port}!`)
})
