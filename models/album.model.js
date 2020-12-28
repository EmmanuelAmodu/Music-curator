const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: {
    type: String,
    unique: true,
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
    ref: 'Users',
  },
}, { timestamps: true });

albumSchema.index({ user: 1, symbol: 1 }, { unique: true });
module.exports = mongoose.model('Album', albumSchema);
