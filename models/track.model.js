const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackSchema = new Schema({
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
    ref: 'Album',
  },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    require: true
  },
  featured_artists: [{
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    require: true
  }],
}, { timestamps: true });

trackSchema.index({ title: 1, album: 1 }, { unique: true });
module.exports = mongoose.model('Track', trackSchema);
