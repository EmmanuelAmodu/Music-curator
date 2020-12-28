const router = require('express').Router();
const albumController = require('./controller')

router.post(
  '',
  asyncHandler(albumController.createAlbum)
);

router.get(
  '',
  asyncHandler(albumController.getAlbum)
);

router.patch(
  '/:id',
  asyncHandler(albumController.updateAlbum)
);

router.delete(
  '/:id',
  asyncHandler(albumController.deleteAlbum)
);

router.post(
  '/:id/track',
  asyncHandler(albumController.addTrack)
);

router.post(
  '/:id/track/:id',
  asyncHandler(albumController.deleteTrack)
);

module.exports = router;
