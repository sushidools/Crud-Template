const { restaurantController } = require('../controllers');
const router = require('express').Router();

module.exports = router
  .get('/', restaurantController.index)
  .get('/:id', restaurantController.show)
  .post('/new', restaurantController.create)
  .put('/:id', restaurantController.update)
  .patch('/:id/review', restaurantController.updateReviews)
  .delete('/:id', restaurantController.destroy);
