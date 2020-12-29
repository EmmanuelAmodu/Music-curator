const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    minlength: 8,
    maxlength: 255,
  },
  typical_genre: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  }],
  details: {
    type: String,
    maxlength: 1000,
  },
}, { timestamps: true });

genreSchema.index({ name: 1 }, { unique: true });
module.exports = mongoose.model('Genre', genreSchema);
