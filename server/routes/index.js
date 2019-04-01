const router = require('express').Router();
const apiRouter = require('express').Router();

const restaurantRoutes = require('./pet.routes');

const catchAll = require('./catch-all.routes');

router.use('/restaurants', restaurantRoutes);

module.exports = apiRouter.use('/api', router).use(catchAll);
