const express = require('express');
const router = express.Router();

router.use('/computers', require('./computers'));
router.use('/mice', require('./mice'));
router.use('/laptops', require('./laptops'));
router.use('/gpus', require('./gpus'));
router.use('/screens', require('./screens'));
router.use('/drives', require('./drives'));
router.use('/headphones', require('./headphones'));
router.use('/keyboards', require('./keyboards'));
router.use('/users', require('./users'));
router.use('/reset-password', require('./reset-password'));
router.use('/cases', require('./cases'));
router.use('/mainboards', require('./mainboards'));
router.use('/cpus', require('./cpus'));
router.use('/rams', require('./rams'));
router.use('/psus', require('./psus'));
router.use('/coolers', require('./coolers'));
router.use('/search', require('./search'));
router.use('/order', require('./order'));

module.exports = router;
