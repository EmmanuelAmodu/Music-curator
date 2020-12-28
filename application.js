const mongoose = require('mongoose')

async function main(app) {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/music_curator?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })//.then(e => console.log(e)).catch(err => console.log(err))
    return app.listen(4000, () => console.log(`Listen on port 4000`))
  } catch (error) {
    console.log(error)
    return new Error('App initailization failed')
  }
}

module.exports = main
