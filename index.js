const mongoose = require('mongoose')
const app = require('./express')();
require('./application')(app, mongoose, 6000)
