const router = require('express').Router();
const albumController = require('./controller')
const asyncErrorHandler = require('./asyncErrorHandler')

router.post(
  '/album',
  asyncErrorHandler(albumController.createAlbum)
);

router.get(
  '/album/:id',
  asyncErrorHandler(albumController.getAlbum)
);

router.get(
  '/album/:id/tracks',
  asyncErrorHandler(albumController.getAlbumTracks)
);

router.patch(
  '/album/:id',
  asyncErrorHandler(albumController.updateAlbum)
);

router.delete(
  '/album/:id',
  asyncErrorHandler(albumController.deleteAlbum)
);

router.post(
  '/track',
  asyncErrorHandler(albumController.addTrack)
);

router.patch(
  '/album/:album/track/:track',
  asyncErrorHandler(albumController.addTrackToAlum)
);

router.patch(
  '/track/:track',
  asyncErrorHandler(albumController.updateTrack)
);

router.patch(
  '/track/:track',
  asyncErrorHandler(albumController.removeTrackFromAlbum)
);

router.delete(
  '/track/:id',
  asyncErrorHandler(albumController.deleteTrack)
);

module.exports = router;
