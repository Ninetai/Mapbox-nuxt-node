require('dotenv').config()

const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const api = require('./api')

require('./plugins/auth')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/_health', (req, res, next) => {
  // TODO: check if db connection is ok for example
  res.set('Content-type', 'text/javascript')
  res.send(JSON.stringify({ status: 'Ok' }))
})

// API Routes
app.use('/', api)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.message || err, '\n', err.stack)
  res.status(err.statusCode || 500).send({
    message: err.message || 'Unexpected error!'
  })
})

const port = process.env.PORT || '3030'

app.listen(port, () => {
  console.info(`🚀  Listening at http://localhost:${port}`)
})
