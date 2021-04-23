const router = require('express').Router();
const userRoutes = require('./userRoutes');
const internalRoutes = require('./internalRoutes');

router.use('/users', userRoutes);
router.use('/internal', internalRoutes);


module.exports = router;