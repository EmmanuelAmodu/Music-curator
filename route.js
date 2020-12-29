const router = require('express').Router();
const albumController = require('./controller')

router.post(
  '',
  albumController.createAlbum
);

router.get(
  '',
  albumController.getAlbum
);

router.patch(
  '/:id',
  albumController.updateAlbum
);

router.delete(
  '/:id',
  albumController.deleteAlbum
);

router.post(
  '/track',
  albumController.addTrack
);

router.post(
  '/track/:id',
  albumController.deleteTrack
);

module.exports = router;
