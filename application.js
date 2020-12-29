const mongoose = require('mongoose')

async function main(app) {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/music_curator?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    return app.listen(6000, () => console.log(`Listen on port 6000`))
  } catch (error) {
    console.log(error)
    return new Error('App initailization failed')
  }
}

module.exports = main
