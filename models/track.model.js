const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: {
    type: String,
    minlength: 8,
    maxlength: 255,
  },
  release_date: {
    type: Number,
    immutable: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  featured_artists: [{
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
}, { timestamps: true });

albumSchema.index({ title: 1, album: 1 }, { unique: true });
module.exports = mongoose.model('Album', albumSchema);
