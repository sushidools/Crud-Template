const router = require('express').Router();
const apiRouter = require('express').Router();

const petRoutes = require('./pet.routes');

const catchAll = require('./catch-all.routes');

router.use('/pets', petRoutes);

module.exports = apiRouter.use('/api', router).use(catchAll);