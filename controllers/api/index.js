const router = require('express').Router();
const userRoutes = require('./userRoutes');
const familiesRoutes = require('./familiesRoutes');

router.use('/users', userRoutes);
router.use('/families', familiesRoutes);


module.exports = router;