const mongoose = require('mongoose')
require('express-async-errors')
const app = require('./express')()
require('./application')(app, mongoose)
