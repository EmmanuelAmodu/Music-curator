/**
 * 
 * @param {Express} app
 * @param {Mongoose} mongoose 
 * @param {Number} port 
 */
async function main(app, mongoose, port) {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/music_curator?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    return await app.listen(port, () => console.log(`Listen on port ${port}`))
  } catch (error) {
    console.log(error)
    return new Error('App initailization failed')
  }
}

module.exports = main
