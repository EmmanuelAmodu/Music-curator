const AlbumModel = require('./models/album.model')
const TrackModel = require('./models/track.model')

module.exports = {
  async createAlbum(req, res) {
    const album = await AlbumModel.create(req.body);
    if (album) return req.send({
      status: true,
      data: album
    });

    req.status()
  },

  async getAlbum(req, res) {

  },

  async updateAlbum(req, res) {

  },

  async deleteAlbum(req, res) {

  },

  async addTrack(req, res) {

  },

  async deleteTrack(req, res) {

  },

  async editTrack(req, res) {

  },

  async updateTrack(req, res) {

  },
};
