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
    required: true,
    immutable: true,
  },
  genre: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  }],
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    require: true
  },
  album_art: {
    type: String,
    minlength: 8,
    maxlength: 255,
  },
  description: {
    type: String,
    maxlength: 2000,
  },
}, { timestamps: true });

albumSchema.index({ artist: 1, title: 1 }, { unique: true });
module.exports = mongoose.model('Album', albumSchema);
