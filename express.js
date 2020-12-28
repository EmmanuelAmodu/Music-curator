const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const router = require('./route')
const app = express()

module.exports = function () {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(helmet())
  app.use(cors())
  app.use(compression())
  app.use('/', router)
  return app
}
