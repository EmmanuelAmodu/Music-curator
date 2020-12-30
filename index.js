const mongoose = require('mongoose')
const app = require('./application')();
require('./server')(app, mongoose, 6000)
