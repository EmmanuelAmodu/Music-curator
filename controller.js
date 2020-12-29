const AlbumModel = require('./models/album.model')
const TrackModel = require('./models/track.model')

module.exports = {
  async createAlbum(req, res) {
    const album = await AlbumModel.create(req.body)
    res.send({
      status: true,
      data: album
    });
  },

  async getAlbum(req, res) {
    const album = await AlbumModel.findById(req.params.id)
    if (album) return res.send({
      status: true,
      data: album
    });

    res.status(404).send({
      status: false,
      message: 'No Album matches your request'
    })
  },

  // TODO get many album

  async getAlbumTracks(req, res) {
    const tracks = await TrackModel.find({album: req.params.id})
    if (tracks && tracks.length > 0) return res.send({
      status: true,
      data: tracks
    });

    res.status(404).send({
      status: false,
      message: 'No tracks found for this album'
    })
  },

  async updateAlbum(req, res) {
    const album = await AlbumModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    res.send({
      status: true,
      data: album
    });
  },

  async deleteAlbum(req, res) {
    const album = await AlbumModel.findByIdAndDelete(req.params.id)
    if (album) return res.send({
      status: true,
      data: 'Album successfully deleted'
    });

    res.status(404).send({
      status: false,
      message: 'No Album matches your request'
    })
  },

  async addTrack(req, res) {
    const album = await TrackModel.create(req.body)
    res.send({
      status: true,
      data: album
    });
  },

  async addTrackToAlum(req, res) {
    const track = await TrackModel.findByIdAndUpdate(req.params.track, {
      album: req.params.album
    }, {new: true});

    if (track) return res.send({
      status: true,
      data: track
    });

    res.status(404).send({
      status: false,
      message: 'No Track matches your request'
    })
  },

  async deleteTrack(req, res) {
    const track = await TrackModel.findByIdAndDelete(req.params.id)
    if (track) return res.send({
      status: true,
      data: 'Album successfully deleted'
    });

    res.status(404).send({
      status: false,
      message: 'No Album matches your request'
    })
  },

  async removeTrackFromAlbum(req, res) {
    const track = await TrackModel.findByIdAndUpdate(req.params.track, {
      album: null
    }, {new: true});
  
    if (track) return res.send({
      status: true,
      message: 'Album successfully dissociated',
      data: track
    });

    res.status(404).send({
      status: false,
      message: 'No Track matches your request'
    })
  },

  async updateTrack(req, res) {
    const track = await TrackModel.findByIdAndUpdate(
      req.params.track, req.body, { new: true });

    if (track) return res.send({
      status: true,
      message: 'Album successfully updated',
      data: track
    });

    res.status(404).send({
      status: false,
      message: 'No Track matches your request'
    })
  },
};
