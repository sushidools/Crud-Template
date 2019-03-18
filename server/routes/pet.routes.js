const { petController } = require('../controllers');
const router = require('express').Router();

module.exports = router
  .get('/', petController.index)
  .get('/:id', petController.show)
  .post('/new', petController.create)
  .put('/:id', petController.update)
  .patch('/likes/:id', petController.updateLikes)
  .delete('/:id', petController.destroy);